import React, { useState } from 'react';
import { 
  Scale, 
  ShieldAlert, 
  Laptop, 
  ShoppingBag, 
  HeartHandshake, 
  Home, 
  FileText, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  FileCheck, 
  Sparkles, 
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { LEGAL_CATEGORIES } from '../data/legalKnowledge';
import { LegalCategory, Language } from '../types';

interface KnowledgeHubProps {
  language: Language;
  onAskTopic: (query: string) => void;
}

export const KnowledgeHub: React.FC<KnowledgeHubProps> = ({ language, onAskTopic }) => {
  const [selectedCategory, setSelectedCategory] = useState<LegalCategory>(LEGAL_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  // Icon mapping
  const getIcon = (id: string) => {
    switch (id) {
      case 'fundamental-rights':
        return Scale;
      case 'criminal-law':
        return ShieldAlert;
      case 'cybercrime':
        return Laptop;
      case 'consumer-rights':
        return ShoppingBag;
      case 'women-child':
        return HeartHandshake;
      case 'property-land':
        return Home;
      case 'gov-services-rti':
        return FileText;
      default:
        return BookOpen;
    }
  };

  // Filter topics based on search
  const filteredCategories = LEGAL_CATEGORIES.map((cat) => {
    if (!searchQuery.trim()) return cat;
    const lower = searchQuery.toLowerCase();
    const matchesCategory =
      cat.titleEn.toLowerCase().includes(lower) ||
      cat.titleHi.toLowerCase().includes(lower) ||
      cat.descriptionEn.toLowerCase().includes(lower);

    const matchingTopics = cat.popularTopics.filter(
      (t) =>
        t.title.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower) ||
        t.relevantLaws.some((l) => l.toLowerCase().includes(lower))
    );

    if (matchesCategory || matchingTopics.length > 0) {
      return {
        ...cat,
        popularTopics: matchingTopics.length > 0 ? matchingTopics : cat.popularTopics,
      };
    }
    return null;
  }).filter(Boolean) as LegalCategory[];

  const activeCategory =
    filteredCategories.find((c) => c.id === selectedCategory.id) || filteredCategories[0] || LEGAL_CATEGORIES[0];
  const activeTopic = activeCategory.popularTopics[selectedTopicIndex] || activeCategory.popularTopics[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>7 Verified Indian Legal Pillars</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif mb-3">
          Legal Awareness & Knowledge Hub
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Explore essential citizen rights, statutory acts (BNS, CrPC/BNSS, IT Act, Consumer Protection), procedural checklists, and official grievance portals.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedTopicIndex(0);
            }}
            placeholder="Search rights, statutes, or procedures (e.g. 'FIR', 'Bail', 'Refund', 'RTI')..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>
      </div>

      {/* Main Grid: Category List + Topic Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Categories (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
            Categories ({filteredCategories.length})
          </h3>
          <div className="space-y-1.5">
            {filteredCategories.map((cat) => {
              const Icon = getIcon(cat.id);
              const isSelected = activeCategory.id === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedTopicIndex(0);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md ring-2 ring-blue-500/30'
                      : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-blue-500 dark:hover:border-slate-600 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-teal-400 group-hover:scale-105'
                      } transition-transform shadow-2xs`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-xs sm:text-sm font-bold leading-snug ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                        {language === 'hi' ? cat.titleHi : cat.titleEn}
                      </h4>
                      <p
                        className={`text-[11px] font-medium mt-0.5 line-clamp-1 ${
                          isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {cat.popularTopics.length} core legal procedures
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-white' : 'text-slate-400 group-hover:translate-x-1'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Topic View (8 Cols) */}
        <div className="lg:col-span-8">
          {activeCategory && activeTopic && (
            <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-6">
              {/* Category Header */}
              <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-teal-400 border border-blue-200 dark:border-blue-900">
                    {language === 'hi' ? activeCategory.titleHi : activeCategory.titleEn}
                  </span>
                  <button
                    onClick={() =>
                      onAskTopic(
                        `Mujhe ${activeTopic.title} ke baare mein poori jankari chahiye. Relevant sections aur practical steps batayein.`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ask PARTH AI about this</span>
                  </button>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-serif">
                  {activeTopic.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {activeTopic.description}
                </p>
              </div>

              {/* Sub-topic switcher tabs if multiple topics in this category */}
              {activeCategory.popularTopics.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {activeCategory.popularTopics.map((top, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTopicIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                        selectedTopicIndex === idx
                          ? 'bg-slate-900 text-white dark:bg-blue-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {top.title.slice(0, 35)}...
                    </button>
                  ))}
                </div>
              )}

              {/* Relevant Statutory Laws */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  <span>Applicable Indian Statutes & Sections</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeTopic.relevantLaws.map((law, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 font-mono"
                    >
                      § {law}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Procedure */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Step-by-Step Action Protocol</span>
                </h4>
                <div className="space-y-2">
                  {activeTopic.steps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-start gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents Required Checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Essential Documents to Preserve</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeTopic.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Portal Link */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-200/60 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-teal-400">
                    Verified Government Redress Portal
                  </span>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeTopic.officialPortal.name}
                  </h5>
                </div>
                <a
                  href={activeTopic.officialPortal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
