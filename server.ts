import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '25mb' }));

// Initialize Google GenAI SDK (Server-Side)
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// In-memory data store for analytics & feedback
const appStats = {
  totalQueries: 142,
  complaintsDrafted: 38,
  documentsAnalyzed: 19,
  categoriesCount: {
    'criminal-law': 45,
    'cybercrime': 39,
    'consumer-rights': 28,
    'fundamental-rights': 15,
    'women-child': 18,
    'property-land': 22,
    'gov-services-rti': 14,
  },
  feedbacks: [
    {
      id: 'fb-1',
      rating: 5,
      comment: 'Helped me understand the Zero FIR process when local police refused my complaint!',
      user: 'Rohan Sharma',
      date: '2026-10-31',
      category: 'Criminal Law'
    },
    {
      id: 'fb-2',
      rating: 5,
      comment: 'The 1930 cyber fraud advisory and complaint draft saved my money after a UPI scam.',
      user: 'Pooja Verma',
      date: '2026-11-01',
      category: 'Cybercrime'
    }
  ]
};

// Legal System Prompt for PARTH AI
const PARTH_SYSTEM_INSTRUCTION = `
You are PARTH AI, an intelligent, empathetic, and expert Indian Legal & Civic Awareness Assistant.
Tagline: "Legal Awareness. Simplified for Everyone."
Created by: Team PARTH, Rajkiya Engineering College, Banda.
Mission: "Bridging the Gap Between Citizens and Legal Awareness Through Artificial Intelligence."

CRITICAL SAFETY & OPERATIONAL MANDATES:
1. You provide educational legal information and civic awareness for Indian citizens. You are NOT a licensed advocate and you NEVER give binding legal counsel or guarantee legal outcomes.
2. ALWAYS include the disclaimer: "PARTH AI provides general legal information and civic guidance for educational purposes. It does not replace professional legal advice, legal representation or official government services."
3. ACCURACY: Refer to authentic Indian legislation: Bharatiya Nyaya Sanhita (BNS) 2023 / IPC 1860, Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 / CrPC 1973, Bharatiya Sakshya Adhiniyam (BSA) 2023 / Evidence Act, Consumer Protection Act 2019, Information Technology Act 2000, RTI Act 2005, Domestic Violence Act 2005, etc.
   - Mention both the new criminal laws (BNS / BNSS) and former equivalents (IPC / CrPC) so ordinary citizens understand both.
   - NEVER fabricate sections, laws, fake court judgments, or fake government links.
4. LANGUAGE ADAPTABILITY:
   - If the user writes in Hindi, respond in fluent, easy-to-understand Hindi (Devanagari script).
   - If the user writes in Hinglish (Roman Hindi, e.g., "Police complaint kaise karun"), respond in natural, friendly Hinglish with clear English/Hindi headings.
   - If the user writes in English, respond in clear English.
5. EMERGENCY TRIAGE:
   - If the user is facing imminent physical danger, domestic violence right now, assault, or ongoing financial cyber theft happening this hour:
     Highlight emergency helpline numbers AT THE TOP OF THE RESPONSE:
     - 112 (National Emergency for Police / Medical / Fire)
     - 1930 (National Cyber Financial Fraud Helpline - dial within 2 hours to freeze stolen money)
     - 181 (Women Helpline)
     - 1098 (Childline)
6. STRUCTURED RESPONSE FORMAT:
   Always structure comprehensive legal responses in these clear sections:
   ### 1. Understanding Your Problem (समस्या का विश्लेषण)
   ### 2. Relevant Legal Rights (आपके कानूनी अधिकार)
   ### 3. Applicable Legal Provisions (संबंधित कानूनी धाराएं एवं कानून)
   ### 4. Step-by-Step Guidance (कदम-दर-कदम मार्गदर्शन)
   ### 5. Documents & Evidence Required (आवश्यक दस्तावेज एवं सबूत)
   ### 6. Important Precautions (महत्वपूर्ण सावधानियां)
   ### 7. Official Resources & Portals (आधिकारिक सरकारी पोर्टल)
   ### 8. When to Consult a Lawyer (वकील से कब संपर्क करें)
   End with 3-4 practical suggested follow-up questions formatted as:
   [SUGGESTIONS]:
   - Follow-up 1
   - Follow-up 2
   - Follow-up 3
`;

// 1. CHAT API ENDPOINT
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], language = 'en' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    appStats.totalQueries += 1;

    // Detect language or preference instruction
    let languageInstruction = '';
    if (language === 'hi') {
      languageInstruction = 'User has requested response primarily in HINDI (हिन्दी भाषा में उत्तर दें).';
    } else if (language === 'hinglish') {
      languageInstruction = 'User prefers conversational HINGLISH (mix of Hindi & English written in Latin script, accessible to young Indians).';
    } else {
      languageInstruction = 'User prefers English. Keep explanations simple without legal jargon.';
    }

    // Format chat contents
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Append prior history if available
    for (const h of history.slice(-6)) {
      contents.push({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      });
    }

    // Append current message with language guidance
    contents.push({
      role: 'user',
      parts: [{ text: `${languageInstruction}\n\nUser Question:\n${message}` }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: PARTH_SYSTEM_INSTRUCTION,
      },
    });

    const text = response.text || 'Unable to generate response. Please try again.';

    // Extract suggestions if present
    let cleanedText = text;
    const suggestions: string[] = [];
    const suggestionsMarker = '[SUGGESTIONS]:';
    if (text.includes(suggestionsMarker)) {
      const parts = text.split(suggestionsMarker);
      cleanedText = parts[0].trim();
      const rawSuggestions = parts[1].trim().split('\n');
      for (const s of rawSuggestions) {
        const cleanS = s.replace(/^[-*•\d.]\s*/, '').trim();
        if (cleanS) suggestions.push(cleanS);
      }
    }

    // Detect emergency flag
    const isEmergency =
      message.toLowerCase().includes('emergency') ||
      message.toLowerCase().includes('suicide') ||
      message.toLowerCase().includes('kill') ||
      message.toLowerCase().includes('assault') ||
      message.toLowerCase().includes('1930') ||
      message.toLowerCase().includes('danger') ||
      message.toLowerCase().includes('maar peet') ||
      message.toLowerCase().includes('khatra');

    return res.json({
      content: cleanedText,
      suggestedActions: suggestions.slice(0, 4),
      isEmergency,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to process legal inquiry.',
      details: error.message || 'Server error',
    });
  }
});

// 2. COMPLAINT GENERATOR ENDPOINT
app.post('/api/complaint/generate', async (req: Request, res: Response) => {
  try {
    const formData = req.body;
    appStats.complaintsDrafted += 1;

    const prompt = `
Generate an authentic, highly professional formal legal complaint draft for India based on the following submitted details:

Category: ${formData.category || 'General Complaint'}
Language Preference: ${formData.language === 'hi' ? 'Hindi (Devanagari)' : 'English'}
Complainant Name: ${formData.complainantName}
Father/Spouse Name: ${formData.fatherOrSpouseName}
Complainant Address: ${formData.address}
Contact Phone: ${formData.phone}
Contact Email: ${formData.email}

Incident Date/Time: ${formData.incidentDate}
Incident Location: ${formData.incidentLocation}
Opposite Party/Accused: ${formData.oppositePartyName || 'Unknown / Under Investigation'}
Opposite Party Details: ${formData.oppositePartyDetails || 'As disclosed during investigation'}

Description of Incident:
${formData.incidentDescription}

Financial Loss / Damage: ${formData.financialLoss || 'Not applicable'}
Relief / Action Sought: ${formData.reliefSought}
Supporting Documents / Evidence: ${formData.evidenceList}

INSTRUCTIONS FOR GENERATION:
1. Format this exactly like an official Indian legal representation or complaint:
   - Addressee (e.g., "To: The Station House Officer (SHO)" or "To: The Hon'ble District Consumer Disputes Redressal Commission" or "To: The Cyber Crime Cell" or "To: The Labour Commissioner")
   - Formal Subject Line
   - Complainant particulars
   - Chronological Statement of Facts
   - Legal Grounds & Relevant Statutory Sections (cite both BNS/BNSS or IPC/CrPC or Consumer Protection Act 2019 or IT Act 2000 as appropriate)
   - Prayer / Relief Sought (e.g., registration of FIR, inquiry, recovery, compensation)
   - List of Enclosures / Documents Annexed
   - Verification clause ("I, ... do hereby solemnly verify and state that the contents of this complaint are true to my knowledge...")
   - Space for Signature, Date, and Place
2. Make it legally robust, polite, yet firm.
3. Include an unmissable DRAFT WATERMARK & DISCLAIMER at top:
   "[DRAFT FOR CITIZEN VERIFICATION - PARTH AI LEGAL AWARENESS PLATFORM]"
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a senior Indian legal drafting specialist creating clean, standard, court-admissible or police-admissible formal complaint drafts. Never invent false details.',
      },
    });

    const draftText = response.text || '';

    return res.json({
      draft: draftText,
      generatedAt: new Date().toISOString(),
      category: formData.category,
    });
  } catch (error: any) {
    console.error('Error generating complaint:', error);
    return res.status(500).json({ error: 'Failed to generate legal draft', details: error.message });
  }
});

// 3. DOCUMENT ANALYSIS & OCR ENDPOINT
app.post('/api/document/analyze', async (req: Request, res: Response) => {
  try {
    const { base64Data, mimeType, fileName } = req.body;

    if (!base64Data || !mimeType) {
      return res.status(400).json({ error: 'Document data and mime type are required' });
    }

    appStats.documentsAnalyzed += 1;

    // Remove data URL prefix if present
    const cleanBase64 = base64Data.replace(/^data:[^;]+;base64,/, '');

    const documentPart = {
      inlineData: {
        mimeType: mimeType,
        data: cleanBase64,
      },
    };

    const promptText = `
You are an expert Indian Legal Document & Notice Examiner.
Analyze this attached legal document (image or PDF page).
Extract the text via OCR and provide an exhaustive, structured explanation for a common citizen:

Return valid JSON with the following structure:
{
  "docType": "Short category of document, e.g. Police Notice, Legal Notice, Court Summons, Rent Agreement, Consumer Invoice, Cheque Bounce Notice",
  "summaryEn": "Clear 3-4 sentence explanation in simple English of what this document is and why it was issued.",
  "summaryHi": "Clear 3-4 sentence explanation in simple Hindi (Devanagari) explaining what this document is.",
  "keyClauses": [
    { "title": "Clause or Section heading", "description": "Plain language explanation", "importance": "high" | "medium" | "low" }
  ],
  "criticalDates": [
    { "event": "Reply deadline or Hearing date or Notice expiry", "date": "Date found or timeframe e.g. 15 days" }
  ],
  "actionItems": [
    "Concrete step the citizen must take immediately"
  ],
  "redFlags": [
    "Potential risks, penalty clauses, or missing elements to watch out for"
  ],
  "suggestedNextSteps": [
    "Practical follow-up steps (e.g. consult an advocate, reply in writing, preserve receipts)"
  ]
}

Only return valid JSON without backticks or markdown preamble.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [documentPart, { text: promptText }],
      },
    });

    const rawOutput = (response.text || '{}').trim();
    let cleanedOutput = rawOutput;
    if (cleanedOutput.startsWith('```json')) {
      cleanedOutput = cleanedOutput.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleanedOutput.startsWith('```')) {
      cleanedOutput = cleanedOutput.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanedOutput);
    } catch {
      parsedResult = {
        docType: 'Legal Document',
        summaryEn: rawOutput.slice(0, 300),
        summaryHi: 'इस दस्तावेज का सारांश तैयार किया गया है।',
        keyClauses: [{ title: 'Document Contents', description: rawOutput.slice(0, 200), importance: 'medium' }],
        criticalDates: [{ event: 'Review upon receipt', date: 'Immediate' }],
        actionItems: ['Read the document carefully and preserve the original.'],
        redFlags: ['Ensure no deadlines expire without response.'],
        suggestedNextSteps: ['Consult a legal professional with this document.']
      };
    }

    parsedResult.fileName = fileName || 'Uploaded Document';

    return res.json(parsedResult);
  } catch (error: any) {
    console.error('Error in document analysis:', error);
    return res.status(500).json({ error: 'Failed to analyze document', details: error.message });
  }
});

// 4. ADMIN & ANALYTICS STATS
app.get('/api/admin/stats', (_req: Request, res: Response) => {
  res.json({
    ...appStats,
    uptime: process.uptime(),
    systemStatus: 'Operational',
    version: '1.2.0',
    institution: 'Rajkiya Engineering College, Banda',
    team: 'PARTH',
  });
});

// 5. USER FEEDBACK ENDPOINT
app.post('/api/feedback', (req: Request, res: Response) => {
  const { rating, comment, user, category } = req.body;
  const newFeedback = {
    id: `fb-${Date.now()}`,
    rating: Number(rating) || 5,
    comment: String(comment || '').slice(0, 500),
    user: String(user || 'Anonymous Citizen'),
    date: new Date().toISOString().split('T')[0],
    category: String(category || 'General Assistance')
  };
  appStats.feedbacks.unshift(newFeedback);
  res.json({ success: true, feedback: newFeedback });
});

// Vite Setup (Development vs Production)
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PARTH AI] Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start PARTH AI server:', err);
});
