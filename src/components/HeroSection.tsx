import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Mic, 
  Paperclip, 
  Send, 
  Scale, 
  ShieldCheck, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  FileSearch,
  Globe2,
  BookMarked,
  Award,
  MessageSquare
} from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  onSearchSubmit: (text: string) => void;
  onSelectSuggested: (query: string) => void;
  language: Language;
  onExploreRights: () => void;
  onStartVoice: () => void;
  isListening: boolean;
  onAttachClick: () => void;
  onSelectTab?: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  onSelectSuggested,
  language,
  onExploreRights,
  onStartVoice,
  isListening,
  onAttachClick,
  onSelectTab,
}) => {
  const [inputText, setInputText] = useState('');

  const platformOptions = [
    { id: 'assistant', title: 'AI Legal Assistant', titleHi: 'एआई कानूनी सहायक', desc: 'Real-time guidance in Hindi, English & Hinglish', icon: MessageSquare, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/70 border-blue-200 dark:border-blue-800' },
    { id: 'complaint', title: 'Smart Complaint Generator', titleHi: 'शिकायत ड्राफ्ट जनरेटर', desc: 'Create court & police drafts with PDF download', icon: FileText, color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-950/70 border-teal-200 dark:border-teal-800' },
    { id: 'document', title: 'Document & Notice OCR', titleHi: 'दस्तावेज एवं नोटिस जांच', desc: 'Analyze summons, rent deeds & cheque bounce notices', icon: FileSearch, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-800' },
    { id: 'knowledge', title: '7 Legal Knowledge Hubs', titleHi: 'कानून ज्ञान केंद्र', desc: 'Fundamental, Criminal, Cyber, Consumer rights', icon: BookOpen, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800' },
    { id: 'resources', title: 'Official Govt Portals', titleHi: 'सरकारी पोर्टल एवं हेल्पलाइन', desc: 'Direct access to NALSA, 1930, eCourts, RTI', icon: Globe2, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/70 border-purple-200 dark:border-purple-800' },
    { id: 'dictionary', title: 'Legal Terms Dictionary', titleHi: 'कानूनी शब्दकोश', desc: 'Bail, FIR, Stay, Injunction explained in plain words', icon: BookMarked, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/70 border-rose-200 dark:border-rose-800' },
    { id: 'quiz', title: 'Rights Awareness Quiz', titleHi: 'अधिकार क्विज़ एवं प्रमाण पत्र', desc: 'Interactive scenarios & Certificate of Awareness', icon: Award, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800' },
  ];

  const suggestedQuestions = [
    {
      id: 1,
      query: 'Police FIR register nahi kar rahi, kya karun?',
      category: 'Criminal Law',
      icon: '🛡️',
      badge: 'FIR Procedure',
      gradient: 'from-blue-500/10 via-indigo-500/10 to-blue-600/5',
      darkGradient: 'dark:from-blue-950/40 dark:to-indigo-950/30',
      border: 'border-blue-300 dark:border-blue-700 hover:border-blue-600 hover:shadow-blue-500/10',
      tagBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      accentColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 2,
      query: 'Online payment fraud ho gaya, ab kya karna chahiye?',
      category: 'Cybercrime',
      icon: '💳',
      badge: '1930 Helpline',
      gradient: 'from-teal-500/10 via-cyan-500/10 to-teal-600/5',
      darkGradient: 'dark:from-teal-950/40 dark:to-cyan-950/30',
      border: 'border-teal-300 dark:border-teal-700 hover:border-teal-500 hover:shadow-teal-500/10',
      tagBg: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      accentColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      id: 3,
      query: 'RTI application kaise file karein?',
      category: 'Govt Services',
      icon: '📄',
      badge: 'RTI Act 2005',
      gradient: 'from-purple-500/10 via-violet-500/10 to-purple-600/5',
      darkGradient: 'dark:from-purple-950/40 dark:to-violet-950/30',
      border: 'border-purple-300 dark:border-purple-700 hover:border-purple-500 hover:shadow-purple-500/10',
      tagBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
      accentColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 4,
      query: 'Employer salary nahi de raha, mere kya rights hain?',
      category: 'Labour Rights',
      icon: '💼',
      badge: 'Wage Code',
      gradient: 'from-amber-500/10 via-orange-500/10 to-amber-600/5',
      darkGradient: 'dark:from-amber-950/40 dark:to-orange-950/30',
      border: 'border-amber-300 dark:border-amber-700 hover:border-amber-500 hover:shadow-amber-500/10',
      tagBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      accentColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 5,
      query: 'Consumer complaint kaise karein?',
      category: 'Consumer Rights',
      icon: '🛍️',
      badge: 'e-Daakhil',
      gradient: 'from-emerald-500/10 via-green-500/10 to-emerald-600/5',
      darkGradient: 'dark:from-emerald-950/40 dark:to-green-950/30',
      border: 'border-emerald-300 dark:border-emerald-700 hover:border-emerald-500 hover:shadow-emerald-500/10',
      tagBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      accentColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 6,
      query: 'Property dispute mein kya legal options hain?',
      category: 'Property Law',
      icon: '🏡',
      badge: 'Land Rights',
      gradient: 'from-rose-500/10 via-pink-500/10 to-rose-600/5',
      darkGradient: 'dark:from-rose-950/40 dark:to-pink-950/30',
      border: 'border-rose-300 dark:border-rose-700 hover:border-rose-500 hover:shadow-rose-500/10',
      tagBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
      accentColor: 'text-rose-600 dark:text-rose-400',
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSearchSubmit(inputText.trim());
      setInputText('');
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* REC Banda & Institutional Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold mb-5 shadow-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Team PARTH • Rajkiya Engineering College, Banda</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="text-teal-700 dark:text-teal-400 font-extrabold">Legal Awareness Simplified</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-serif mb-3 leading-tight">
          Your Rights. Your Voice. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 font-sans">
            Your Legal Guide.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
          Understand your rights, explore legal solutions and discover the right next steps. Just explain your problem in your preferred language — Hindi, English or Hinglish.
        </p>

        {/* Prominent AI Chat Input Box */}
        <div id="chat-section" className="max-w-3xl mx-auto mb-8 text-left">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white dark:bg-slate-850 rounded-2xl shadow-xl border-2 border-blue-500/40 dark:border-blue-500/50 p-2 sm:p-3 focus-within:border-blue-600 transition-all"
          >
            <div className="flex items-center px-2">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                rows={2}
                placeholder="Describe your problem in Hindi or English... (e.g., 'Police FIR register nahi kar rahi' or 'Tenant dispute')"
                className="w-full bg-transparent border-none outline-none resize-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 text-sm sm:text-base leading-normal font-medium"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-1 px-2">
              <div className="flex items-center gap-2">
                {/* Voice Input Mic */}
                <button
                  type="button"
                  onClick={onStartVoice}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title={isListening ? 'Listening... Speak now' : 'Voice Input (Hindi/English)'}
                >
                  <Mic className="w-4 h-4 text-inherit" />
                  <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice Mic'}</span>
                </button>

                {/* Document attachment */}
                <button
                  type="button"
                  onClick={onAttachClick}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 text-xs font-bold"
                  title="Upload Legal Notice or Document for OCR analysis"
                >
                  <Paperclip className="w-4 h-4" />
                  <span className="hidden sm:inline">Attach Notice / Doc</span>
                </button>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  inputText.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Ask PARTH AI</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* SECTION: ALL PLATFORM OPTIONS (DIRECTLY VISIBLE) */}
        <div className="mb-10 text-left">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>Explore Platform Options ({platformOptions.length} Direct Tools)</span>
            </h3>
            <span className="text-[11px] font-semibold text-blue-600 dark:text-teal-400">
              Tap any option to open
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {platformOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => onSelectTab && onSelectTab(opt.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer flex flex-col justify-between ${opt.bg}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl bg-white dark:bg-slate-900 shadow-2xs ${opt.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {language === 'hi' ? opt.titleHi : opt.title}
                    </h4>
                    <p className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 leading-tight mt-1 line-clamp-2">
                      {opt.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Suggested Questions Grid (Common Legal Problems) - COLORFUL REDESIGN */}
        <div className="mb-14 text-left">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-teal-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                Common Legal Problems (Tap to Ask Directly)
              </h3>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-teal-400 hidden sm:inline">
              Instant Legal AI Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {suggestedQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => onSelectSuggested(q.query)}
                className={`p-4 rounded-2xl border-2 bg-gradient-to-br ${q.gradient} ${q.darkGradient} ${q.border} shadow-xs hover:shadow-md hover:scale-[1.01] transition-all group flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-2xl p-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 shadow-2xs">
                      {q.icon}
                    </span>
                    <span className={`text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full border ${q.tagBg}`}>
                      {q.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-teal-300 leading-snug">
                    "{q.query}"
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold">
                  <span className={q.accentColor}>{q.category}</span>
                  <span className={`flex items-center gap-1 ${q.accentColor} group-hover:translate-x-1 transition-transform`}>
                    <span>Ask PARTH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* How PARTH AI Works (4 Steps) - COLORFUL PIPELINE REDESIGN */}
        <div className="pt-10 border-t-2 border-slate-200/80 dark:border-slate-800 text-left">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-gradient-to-r from-blue-100 via-teal-100 to-indigo-100 text-blue-900 dark:from-blue-950 dark:via-teal-950 dark:to-indigo-950 dark:text-teal-300 border border-blue-200 dark:border-blue-800 inline-block mb-2">
              Citizen Empowerment Architecture
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
              How PARTH AI Works
            </h3>
            <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">
              Democratizing Indian legal awareness in four transparent, practical steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1: Sapphire Blue */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/90 to-cyan-50/40 dark:from-slate-850 dark:to-blue-950/50 border-2 border-blue-300 dark:border-blue-800/80 hover:border-blue-500 shadow-sm transition-all hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-blue-500/25">
                    1
                  </div>
                  <span className="text-[10.5px] font-extrabold text-blue-700 dark:text-blue-300 uppercase tracking-wider bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full">
                    Step 1
                  </span>
                </div>
                <h4 className="text-sm font-bold text-blue-950 dark:text-blue-200 mb-1.5">
                  Explain Your Problem
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Describe what happened in Hindi, English or Hinglish using text or voice microphone.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-blue-200/60 dark:border-blue-900/60 text-[11px] font-bold text-blue-600 dark:text-blue-400">
                Voice & Text Input →
              </div>
            </div>

            {/* Step 2: Teal / Emerald */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50/90 to-emerald-50/40 dark:from-slate-850 dark:to-teal-950/50 border-2 border-teal-300 dark:border-teal-800/80 hover:border-teal-500 shadow-sm transition-all hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-teal-500/25">
                    2
                  </div>
                  <span className="text-[10.5px] font-extrabold text-teal-700 dark:text-teal-300 uppercase tracking-wider bg-teal-100 dark:bg-teal-950/80 px-2 py-0.5 rounded-full">
                    Step 2
                  </span>
                </div>
                <h4 className="text-sm font-bold text-teal-950 dark:text-teal-200 mb-1.5">
                  AI Assesses Situation
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  PARTH identifies whether it is criminal, cybercrime, consumer, or civil, checking urgency.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-teal-200/60 dark:border-teal-900/60 text-[11px] font-bold text-teal-600 dark:text-teal-400">
                Legal Classification →
              </div>
            </div>

            {/* Step 3: Indigo / Violet */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-purple-50/40 dark:from-slate-850 dark:to-indigo-950/50 border-2 border-indigo-300 dark:border-indigo-800/80 hover:border-indigo-500 shadow-sm transition-all hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-purple-500/25">
                    3
                  </div>
                  <span className="text-[10.5px] font-extrabold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full">
                    Step 3
                  </span>
                </div>
                <h4 className="text-sm font-bold text-indigo-950 dark:text-indigo-200 mb-1.5">
                  Get Relevant Legal Info
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Receive specific statutory sections (BNS, CrPC, IT Act), applicable rights, and required evidence.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                Statutory Citations →
              </div>
            </div>

            {/* Step 4: Amber / Saffron */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-orange-50/40 dark:from-slate-850 dark:to-amber-950/50 border-2 border-amber-300 dark:border-amber-800/80 hover:border-amber-500 shadow-sm transition-all hover:scale-[1.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-amber-500/25">
                    4
                  </div>
                  <span className="text-[10.5px] font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full">
                    Step 4
                  </span>
                </div>
                <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200 mb-1.5">
                  Follow Next Steps
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Generate formal complaint drafts, contact official portals, or reach free legal aid (NALSA).
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-amber-200/60 dark:border-amber-900/60 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                Action & PDF Draft →
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
