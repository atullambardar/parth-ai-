import React from 'react';
import { Scale, ShieldCheck, HeartHandshake, PhoneCall, ExternalLink, Award } from 'lucide-react';

interface FooterProps {
  onOpenEmergency: () => void;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEmergency, setActiveTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Identity & Institution */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-400 flex items-center justify-center text-white">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                PARTH <span className="text-teal-400 font-sans">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Legal Awareness. Simplified for Everyone. Bridging the gap between Indian citizens and legal empowerment through conversational Artificial Intelligence.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px] space-y-1">
              <div className="flex items-center gap-1.5 text-teal-300 font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Project Category: Legal-Tech & Civic AI</span>
              </div>
              <p className="text-slate-300 font-medium">Team PARTH</p>
              <p className="text-slate-400">Rajkiya Engineering College, Banda</p>
            </div>
          </div>

          {/* Col 2: Legal Awareness Hub */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Core Modules</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('assistant')} className="hover:text-teal-300 transition-colors">
                  AI Legal Assistant (Hindi / English / Hinglish)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('complaint')} className="hover:text-teal-300 transition-colors">
                  Smart Complaint Generator (PDF Export)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('document')} className="hover:text-teal-300 transition-colors">
                  Legal Notice & Document Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('knowledge')} className="hover:text-teal-300 transition-colors">
                  Constitutional & Criminal Rights Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dictionary')} className="hover:text-teal-300 transition-colors">
                  Indian Legal Terminology Dictionary
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-teal-300 transition-colors">
                  Civic & Consumer Rights Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Govt Portals */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
              <span>Official Portals</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 flex items-center gap-1">
                  National Cyber Crime Portal (1930) <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://nalsa.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 flex items-center gap-1">
                  NALSA Free Legal Aid (15100) <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://consumerhelpline.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 flex items-center gap-1">
                  National Consumer Helpline (1915) <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://services.ecourts.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 flex items-center gap-1">
                  eCourts Case Status Portal <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://rtionline.gov.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 flex items-center gap-1">
                  RTI Online Application Portal <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="https://indiacode.nic.in" target="_blank" rel="noreferrer" className="hover:text-teal-300 flex items-center gap-1">
                  India Code Official Acts Repository <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Emergency Assistance */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>Emergency Hotlines</span>
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-rose-300">112 - Police & Medical</div>
                  <div className="text-[10px] text-slate-400">National Emergency Response</div>
                </div>
                <a href="tel:112" className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold">Call</a>
              </div>
              <div className="p-2.5 rounded-lg bg-blue-950/40 border border-blue-900/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-blue-300">1930 - Cyber Fraud</div>
                  <div className="text-[10px] text-slate-400">Freeze Bank Funds in 2 Hours</div>
                </div>
                <a href="tel:1930" className="px-2 py-1 bg-blue-600 text-white rounded text-[11px] font-bold">Call</a>
              </div>
              <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-900/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-teal-300">181 - Women Helpline</div>
                  <div className="text-[10px] text-slate-400">24/7 Safety & Assistance</div>
                </div>
                <a href="tel:181" className="px-2 py-1 bg-teal-600 text-white rounded text-[11px] font-bold">Call</a>
              </div>
              <button
                onClick={onOpenEmergency}
                className="w-full mt-1 text-center py-1.5 text-[11px] text-amber-300 hover:text-amber-200 underline cursor-pointer"
              >
                View all emergency protocols & remedies →
              </button>
            </div>
          </div>
        </div>

        {/* Mandatory Legal Disclaimer Banner */}
        <div className="mt-8 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-center">
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            <span className="text-amber-400 font-bold">LEGAL DISCLAIMER: </span>
            PARTH AI provides general legal information and civic guidance for educational purposes. It does not replace professional legal advice, legal representation or official government services. In case of complex legal matters or ongoing court litigation, please consult a registered advocate or approach your nearest District Legal Services Authority (DLSA).
          </p>
        </div>

        {/* Copyright & Team attribution */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <div>
            © {new Date().getFullYear()} PARTH AI. All rights reserved. Developed by Team PARTH at Rajkiya Engineering College, Banda.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-slate-300">User Dashboard</button>
            <button onClick={() => setActiveTab('admin')} className="hover:text-slate-300">Admin Metrics</button>
            <span>v1.2.0 (Powered by Google Gemini 3.8 Flash)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
