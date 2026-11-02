export type Language = 'en' | 'hi' | 'hinglish';
export type ColorTheme = 'sovereign-navy' | 'saffron-gold' | 'emerald-justice' | 'midnight-indigo';

export interface MessageAction {
  label: string;
  query: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
  isEmergency?: boolean;
  legalTags?: string[];
}

export interface LegalCategory {
  id: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  icon: string;
  popularTopics: {
    title: string;
    description: string;
    relevantLaws: string[];
    steps: string[];
    documents: string[];
    officialPortal: { name: string; url: string };
  }[];
}

export interface ComplaintFormData {
  category: 'police' | 'cybercrime' | 'consumer' | 'labour' | 'grievance' | 'property' | 'other';
  language: 'en' | 'hi';
  complainantName: string;
  fatherOrSpouseName: string;
  phone: string;
  email: string;
  address: string;
  incidentDate: string;
  incidentLocation: string;
  oppositePartyName: string;
  oppositePartyDetails: string;
  incidentDescription: string;
  financialLoss?: string;
  reliefSought: string;
  evidenceList: string;
}

export interface DocumentAnalysisResult {
  fileName: string;
  docType: string;
  summaryEn: string;
  summaryHi: string;
  keyClauses: { title: string; description: string; importance: 'high' | 'medium' | 'low' }[];
  criticalDates: { event: string; date: string }[];
  actionItems: string[];
  redFlags: string[];
  suggestedNextSteps: string[];
}

export interface ResourceItem {
  id: string;
  name: string;
  nameHi?: string;
  category: 'legal_aid' | 'police_crime' | 'consumer' | 'rti_grievance' | 'courts' | 'women_child';
  description: string;
  url: string;
  helpline?: string;
  purpose: string;
  state?: string;
}

export interface LegalTerm {
  term: string;
  hindiTerm: string;
  phonetic?: string;
  meaningEn: string;
  meaningHi: string;
  example: string;
  category: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
  category: string;
}
