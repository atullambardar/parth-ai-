import React, { useState } from 'react';
import { BookMarked, Search, Volume2, Sparkles, Scale, Info, Check } from 'lucide-react';
import { LEGAL_TERMS } from '../data/legalDictionary';
import { Language } from '../types';

interface LegalDictionaryProps {
  language: Language;
  onAskTerm: (query: string) => void;
}

export const LegalDictionary: React.FC<LegalDictionaryProps> = ({ language, onAskTerm }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [speakingTerm, setSpeakingTerm] = useState<string | null>(null);

  const filteredTerms = LEGAL_TERMS.filter((t) => {
    const q = searchTerm.toLowerCase();
    return (
      t.term.toLowerCase().includes(q) ||
      t.hindiTerm.toLowerCase().includes(q) ||
      t.meaningEn.toLowerCase().includes(q) ||
      t.meaningHi.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });

  const handleSpeak = (text: string, term: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingTerm === term) {
      window.speechSynthesis.cancel();
      setSpeakingTerm(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.onend = () => setSpeakingTerm(null);
    utterance.onerror = () => setSpeakingTerm(null);
    setSpeakingTerm(term);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Indian Legal Jargon Simplified</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
          Legal Terminology & Concept Dictionary
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Demystifying court terminology, police jargon, and statutory concepts with simple English & Hindi explanations and everyday examples.
        </p>

        {/* Search */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search legal terms (e.g., 'Zero FIR', 'Anticipatory Bail', 'Mutation', 'Quashing')..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Grid of Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((t, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                  {t.category}
                </span>
                <button
                  onClick={() =>
                    handleSpeak(
                      language === 'hi' ? `${t.hindiTerm}. ${t.meaningHi}` : `${t.term}. ${t.meaningEn}`,
                      t.term
                    )
                  }
                  className="p-1 rounded text-slate-400 hover:text-blue-600 dark:hover:text-teal-400"
                  title="Listen definition"
                >
                  <Volume2 className={`w-4 h-4 ${speakingTerm === t.term ? 'text-rose-500 animate-pulse' : ''}`} />
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-0.5 font-serif">
                {t.term}
              </h3>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 font-hindi mb-3">
                {t.hindiTerm}
              </p>

              <div className="space-y-2 text-xs leading-relaxed">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <strong className="block text-slate-900 dark:text-white mb-0.5 font-semibold">
                    English Meaning:
                  </strong>
                  <span className="text-slate-700 dark:text-slate-300">{t.meaningEn}</span>
                </div>

                <div className="p-3 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900/60">
                  <strong className="block text-teal-900 dark:text-teal-200 mb-0.5 font-hindi font-semibold">
                    हिन्दी में अर्थ (Meaning in Hindi):
                  </strong>
                  <span className="text-teal-950 dark:text-teal-100 font-hindi">{t.meaningHi}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/60 text-[11px] text-amber-900 dark:text-amber-200">
                  <strong>Practical Example:</strong> {t.example}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() =>
                  onAskTerm(
                    `Mujhe "${t.term}" (${t.hindiTerm}) ke baare mein detail mein samjhaiye, iske practical legal implications kya hain?`
                  )
                }
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-teal-400 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask PARTH about "{t.term}"</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
