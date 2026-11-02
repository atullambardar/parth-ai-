import React, { useState } from 'react';
import { 
  FileSearch, 
  Upload, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  FileWarning, 
  Eye, 
  RotateCcw,
  Languages
} from 'lucide-react';
import { DocumentAnalysisResult, Language } from '../types';

interface DocumentAnalyzerProps {
  language: Language;
  onAskAboutDoc: (query: string) => void;
}

export const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({ language, onAskAboutDoc }) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DocumentAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sample legal document images / base64 for instant 1-click demo
  const sampleDocuments = [
    {
      name: 'Legal Notice: Section 138 NI Act (Cheque Bounce)',
      desc: 'Demand notice for dishonoured cheque with 15-day statutory deadline',
      sampleType: 'cheque_bounce',
      mockResult: {
        fileName: 'Legal_Notice_Sec138_NI_Act.pdf',
        docType: 'Statutory Legal Notice (Section 138 Negotiable Instruments Act 1881)',
        summaryEn:
          'This is a formal statutory demand notice issued by an advocate on behalf of a payee regarding a dishonoured cheque of ₹1,50,000 returned due to "Funds Insufficient". It demands payment within 15 days of receipt.',
        summaryHi:
          'यह चेक बाउंस (धारा 138 नेगोशिएबल इंस्ट्रूमेंट्स एक्ट) का कानूनी नोटिस है। इसमें ₹1,50,000 का चेक बाउंस होने पर 15 दिनों के अंदर भुगतान करने की मांग की गई है, अन्यथा आपराधिक मुकदमा दर्ज कराने की चेतावनी है।',
        keyClauses: [
          {
            title: 'Demand for Cheque Amount',
            description: 'Payment of ₹1,50,000 within 15 days from receipt of this notice.',
            importance: 'high' as const,
          },
          {
            title: 'Threat of Criminal Complaint',
            description: 'Notice states that failure to pay will lead to filing a criminal complaint under Section 138 of NI Act.',
            importance: 'high' as const,
          },
          {
            title: 'Legal Expenses Demand',
            description: 'Claim of ₹5,500 towards advocate drafting and postal charges.',
            importance: 'medium' as const,
          },
        ],
        criticalDates: [
          { event: 'Statutory Reply / Payment Window', date: 'Strictly 15 days from notice delivery date' },
          { event: 'Cheque Dishonour Date', date: 'Recorded as 12th October 2026' },
        ],
        actionItems: [
          'Verify whether the cheque was genuinely issued and verify the bank memo slip.',
          'Reply through a practicing advocate within the 15-day window to raise genuine defenses (e.g. security cheque, lack of legally enforceable debt).',
          'Do NOT ignore this notice, as failure to respond allows the complainant to file a criminal case in court.',
        ],
        redFlags: [
          'Strict 15-day limitation period starts from the date of postal delivery or WhatsApp receipt.',
          'Under Section 138, punishment includes imprisonment up to 2 years or fine up to double the cheque amount.',
        ],
        suggestedNextSteps: [
          'Consult a criminal or commercial advocate immediately with your bank passbook.',
          'Gather receipts or transaction proofs showing whether any partial payment was made.',
        ],
      },
    },
    {
      name: 'Police Appearance Notice (Section 35 BNSS / 41A CrPC)',
      desc: 'Notice to appear before investigating officer without immediate arrest',
      sampleType: 'police_notice',
      mockResult: {
        fileName: 'Notice_Section_35_BNSS.pdf',
        docType: 'Notice of Appearance before Police Officer (Section 35 BNSS / Section 41A CrPC)',
        summaryEn:
          'This is an official notice from the Investigating Officer directing the recipient to appear at the Police Station for questioning in relation to an FIR/inquiry without making an arbitrary arrest.',
        summaryHi:
          'यह पुलिस जांच अधिकारी द्वारा जारी उपस्थिति नोटिस (धारा 35 BNSS / 41A CrPC) है। इसमें आपको बिना सीधे गिरफ्तार किए पूछताछ के लिए थाने में उपस्थित होने का निर्देश दिया गया है।',
        keyClauses: [
          {
            title: 'Compliance with Appearance',
            description: 'The person is mandated to join investigation on the specified date and answer questions truthfully.',
            importance: 'high' as const,
          },
          {
            title: 'Protection from Arbitrary Arrest (Arnesh Kumar Guidelines)',
            description: 'As long as the person complies with the notice and cooperates, police shall not arrest them without court permission.',
            importance: 'high' as const,
          },
        ],
        criticalDates: [
          { event: 'Date of Appearance at Police Station', date: 'Within 5 days from notice receipt' },
        ],
        actionItems: [
          'Appear before the Investigating Officer on the given date with proof of identification.',
          'Take an acknowledgment receipt or written endorsement on the notice copy confirming your attendance.',
          'You have the right to be accompanied by an advocate during interrogation (though advocate cannot interfere).',
        ],
        redFlags: [
          'Willful non-appearance can give police legal grounds to petition the Magistrate for an arrest warrant.',
        ],
        suggestedNextSteps: [
          'Engage an advocate to accompany you to the police station.',
          'Prepare all relevant alibi proofs, bills, or communication logs related to the incident.',
        ],
      },
    },
  ];

  // Handle user file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    if (uploadedFile.size > 15 * 1024 * 1024) {
      setError('File size must be under 15MB.');
      return;
    }

    setFile(uploadedFile);
    setError(null);

    // Create preview
    if (uploadedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(uploadedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAnalyzeReal = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        const response = await fetch('/api/document/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Data,
            mimeType: file.type || 'application/pdf',
            fileName: file.name,
          }),
        });

        if (!response.ok) {
          throw new Error('Analysis server failed');
        }

        const data: DocumentAnalysisResult = await response.json();
        setResult(data);
        setIsAnalyzing(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error(err);
      setError('Failed to analyze document: ' + err.message);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 text-xs font-bold mb-3">
          <FileSearch className="w-3.5 h-3.5" />
          <span>Multimodal OCR & Statutory Clause Analysis</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
          Legal Notice & Document Analyzer
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Upload any legal notice, police summons, rent agreement, or consumer receipt to get plain-language explanations in English & Hindi with critical deadlines and action steps.
        </p>

        {/* 1-Click Samples */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold">Test with sample documents:</span>
          {sampleDocuments.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setResult(s.mockResult);
                setFile(null);
                setPreviewUrl(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-teal-400 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
            >
              📄 {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Upload & Analysis Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload Zone (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" />
              <span>Upload Document (PDF / Image)</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Supported formats: PDF, PNG, JPG (Max 15MB). Scanned notices, police summons, deeds.
            </p>

            <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50 dark:bg-slate-900 transition-all text-center group">
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-blue-600 mb-2 transition-colors" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {file ? file.name : 'Click to browse or drag file here'}
              </span>
              <span className="text-[10px] text-slate-400 mt-1">
                {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : 'Secure client-side OCR upload'}
              </span>
              <input
                type="file"
                accept="application/pdf,image/png,image/jpeg,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {previewUrl && (
              <div className="mt-4 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  <span>Image Preview</span>
                </div>
                <img src={previewUrl} alt="Document Preview" className="max-h-48 w-full object-contain rounded-lg" />
              </div>
            )}

            {file && (
              <button
                onClick={handleAnalyzeReal}
                disabled={isAnalyzing}
                className="mt-4 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing document clauses with Gemini Vision...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Document Now</span>
                  </>
                )}
              </button>
            )}

            {error && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Privacy Safeguard Note */}
            <div className="mt-4 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
              <strong className="block text-slate-800 dark:text-slate-200 font-semibold">
                🛡️ Data Privacy & Safety Protocol:
              </strong>
              <span>
                Uploaded files are processed in ephemeral server memory for OCR extraction only and are not permanently saved or shared with third parties.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Analysis Results (7 Cols) */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-6">
              {/* Document Header */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400 border border-teal-200 dark:border-teal-900">
                    {result.docType}
                  </span>
                  <button
                    onClick={() =>
                      onAskAboutDoc(
                        `Mujhe is document ke baare mein advice chahiye: ${result.docType}. Important dates aur steps kya hain?`
                      )
                    }
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Discuss in Chat</span>
                  </button>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-serif">
                  {result.fileName}
                </h3>
              </div>

              {/* Plain Language Summary (English & Hindi) */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900">
                  <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Plain English Explanation</span>
                  </h4>
                  <p className="text-xs text-blue-950 dark:text-blue-100 leading-relaxed font-normal">
                    {result.summaryEn}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900">
                  <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200 mb-1 flex items-center gap-1.5 font-hindi">
                    <Languages className="w-3.5 h-3.5 text-teal-600" />
                    <span>सरल हिन्दी व्याख्या (Hindi Summary)</span>
                  </h4>
                  <p className="text-xs text-teal-950 dark:text-teal-100 leading-relaxed font-hindi">
                    {result.summaryHi}
                  </p>
                </div>
              </div>

              {/* Critical Dates & Deadlines */}
              {result.criticalDates && result.criticalDates.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" />
                    <span>Critical Deadlines & Timelines</span>
                  </h4>
                  <div className="space-y-1.5">
                    {result.criticalDates.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-center justify-between text-xs"
                      >
                        <span className="font-semibold text-rose-950 dark:text-rose-200">{d.event}</span>
                        <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-100">
                          {d.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Clauses Extracted */}
              {result.keyClauses && result.keyClauses.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Key Clauses & What They Mean</span>
                  </h4>
                  <div className="space-y-2">
                    {result.keyClauses.map((c, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-750 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{c.title}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              c.importance === 'high'
                                ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {c.importance.toUpperCase()} PRIORITY
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{c.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Items */}
              {result.actionItems && result.actionItems.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Required Citizen Actions</span>
                  </h4>
                  <div className="space-y-1.5">
                    {result.actionItems.map((action, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200"
                      >
                        <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Red Flags / Warnings */}
              {result.redFlags && result.redFlags.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    <span>Important Legal Warnings & Red Flags</span>
                  </h4>
                  <ul className="list-disc list-inside text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    {result.redFlags.map((flag, i) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-md h-full flex flex-col items-center justify-center text-center text-slate-400">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-slate-800 text-teal-600 flex items-center justify-center mb-3">
                <FileSearch className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-1">
                No Document Selected
              </h4>
              <p className="text-xs max-w-sm">
                Upload your document on the left or click one of the sample legal notices above to inspect statutory clauses and deadlines.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
