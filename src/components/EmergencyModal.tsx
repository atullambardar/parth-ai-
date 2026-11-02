import React from 'react';
import { 
  X, 
  PhoneCall, 
  ShieldAlert, 
  AlertTriangle, 
  Clock, 
  ExternalLink, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/resources';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectQuery?: (query: string) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, onSelectQuery }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-900/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        {/* Header */}
        <div className="sticky top-0 bg-rose-600 dark:bg-rose-700 text-white p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Emergency Assistance & Rapid Legal Redress</h2>
              <p className="text-xs text-rose-100">Direct Government Helplines & Immediate Citizen Safeguards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Urgent Warning if Immediate Danger */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200">
              <span className="font-bold">Are you in immediate physical danger?</span> Please do not stay on this website. Dial <strong>112</strong> immediately. Emergency responders will dispatch nearby patrol units with GPS positioning.
            </div>
          </div>

          {/* Quick Dial Helplines Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Verified 24/7 National Helplines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {EMERGENCY_CONTACTS.map((c) => (
                <div
                  key={c.number}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 hover:border-blue-400 transition-all flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-extrabold text-blue-700 dark:text-blue-400 font-mono">
                        {c.number}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                        {c.badge}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{c.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{c.desc}</p>
                  </div>
                  <a
                    href={`tel:${c.number}`}
                    className="shrink-0 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
                  >
                    Call Now
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Hour Cyber Fraud Protocol */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-200 font-bold text-sm">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Cyber Fraud: "Golden Hour" Protocol (First 2 Hours)</span>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
              If money has been stolen from your UPI, credit/debit card, or netbanking:
            </p>
            <ol className="list-decimal list-inside text-xs text-blue-950 dark:text-blue-200 space-y-1.5">
              <li><strong>Dial 1930 immediately:</strong> The operator creates a ticket on the National Cyber Crime Reporting Portal and coordinates with the recipient bank to freeze the stolen funds before the fraudster can withdraw.</li>
              <li><strong>Freeze Your Cards & Accounts:</strong> Call your bank customer care immediately to block unauthorized cards and UPI IDs.</li>
              <li><strong>File Complaint Online:</strong> Visit <em>cybercrime.gov.in</em> and upload the transaction UTR number and SMS screenshots.</li>
              <li><strong>Zero Customer Liability:</strong> Submit a written dispute to your bank branch within 3 days to protect your money under RBI customer liability guidelines.</li>
            </ol>
            {onSelectQuery && (
              <button
                onClick={() => {
                  onSelectQuery('Online payment fraud ho gaya, 1930 aur bank ke sath kya steps follow karun?');
                  onClose();
                }}
                className="mt-2 text-xs font-bold text-blue-700 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                Draft complete cyber complaint with PARTH AI →
              </button>
            )}
          </div>

          {/* What to do if Police Refuse FIR */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold text-sm">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              <span>What If Police Refuse to Register an FIR?</span>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Lalita Kumari Mandate:</strong> The Supreme Court held that registration of FIR is mandatory under Section 173 BNSS / 154 CrPC if a cognizable offence is disclosed. Refusal by police can lead to disciplinary and legal action.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Section 175(3) BNSS / 154(3) CrPC:</strong> Send the detailed written complaint by registered post or email to the Superintendent of Police (SP) or Deputy Commissioner of Police (DCP).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Section 175(4) BNSS / 156(3) CrPC Application:</strong> If SP fails to act, approach the Judicial Magistrate with an application to direct the police to register an FIR and submit an investigation report.</span>
              </li>
            </ul>
            {onSelectQuery && (
              <button
                onClick={() => {
                  onSelectQuery('Police FIR register nahi kar rahi, SP ko bhejne ke liye legal application draft kar do.');
                  onClose();
                }}
                className="mt-1 text-xs font-bold text-blue-600 dark:text-teal-400 hover:underline"
              >
                Draft legal application to Superintendent of Police (SP) →
              </button>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Close Emergency Guide
          </button>
        </div>
      </div>
    </div>
  );
};
