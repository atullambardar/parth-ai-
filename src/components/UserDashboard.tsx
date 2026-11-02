import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  FileText, 
  FileSearch, 
  Trash2, 
  ShieldCheck, 
  Languages, 
  Settings, 
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { ChatMessage, Language } from '../types';

interface UserDashboardProps {
  currentUser: { name: string; email: string } | null;
  messages: ChatMessage[];
  onClearHistory: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({
  currentUser,
  messages,
  onClearHistory,
  language,
  setLanguage,
  setActiveTab,
  onOpenAuth,
}) => {
  const [activeTab, setSubTab] = useState<'history' | 'preferences' | 'privacy'>('history');

  const userQueries = messages.filter((m) => m.role === 'user');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 to-teal-400 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {currentUser ? currentUser.name.charAt(0).toUpperCase() : 'G'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {currentUser ? currentUser.name : 'Citizen Guest User'}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300">
                {currentUser ? 'Verified Citizen' : 'Guest Explorer'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentUser ? currentUser.email : 'Exploring legal awareness anonymously'}
            </p>
          </div>
        </div>

        {!currentUser ? (
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Sign In with Email / Google
          </button>
        ) : (
          <div className="text-xs text-slate-400">
            Account Protected under Digital Personal Data Protection (DPDP) Act
          </div>
        )}
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-6 text-xs font-semibold">
        <button
          onClick={() => setSubTab('history')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Recent Queries ({userQueries.length})</span>
        </button>
        <button
          onClick={() => setSubTab('preferences')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'preferences'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          <span>Language & Voice</span>
        </button>
        <button
          onClick={() => setSubTab('privacy')}
          className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'privacy'
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy & Data Wipe</span>
        </button>
      </div>

      {/* Tab 1: History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Your Legal Inquiries
            </h3>
            {userQueries.length > 0 && (
              <button
                onClick={onClearHistory}
                className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All History</span>
              </button>
            )}
          </div>

          {userQueries.length > 0 ? (
            <div className="space-y-2">
              {userQueries.map((q, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                        {q.content}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(q.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('assistant')}
                    className="shrink-0 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 text-blue-600 dark:text-teal-400 text-xs font-bold"
                  >
                    Continue
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p className="text-xs">No saved inquiries yet. Ask questions on the AI Assistant page.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Preferences */}
      {activeTab === 'preferences' && (
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Language & Interaction Settings
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Default Assistant Language
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'en', label: 'English', desc: 'Official Indian legal English' },
                { id: 'hi', label: 'हिन्दी (Hindi)', desc: 'सरल एवं स्पष्ट राजभाषा' },
                { id: 'hinglish', label: 'Hinglish (Mix)', desc: 'Conversational Roman Hindi' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as Language)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    language === lang.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-white font-bold'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="text-xs">{lang.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{lang.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Privacy */}
      {activeTab === 'privacy' && (
        <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Citizen Privacy & Local Data Sovereignty</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            In compliance with the <em>Digital Personal Data Protection Act (DPDP) 2023</em>, PARTH AI gives you complete control over your conversation history.
          </p>

          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-rose-900 dark:text-rose-200">
                Purge Personal Session History
              </h4>
              <p className="text-[11px] text-rose-800 dark:text-rose-300">
                Permanently wipes all active chat messages and OCR records from this browser session.
              </p>
            </div>
            <button
              onClick={onClearHistory}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0"
            >
              Wipe Data Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
