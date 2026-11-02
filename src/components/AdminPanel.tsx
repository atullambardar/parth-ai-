import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  BarChart3, 
  Users, 
  FileText, 
  FileSearch, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw, 
  Scale, 
  Server,
  Star,
  Send
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const [stats, setStats] = useState<any>({
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
    feedbacks: [],
    systemStatus: 'Operational',
    uptime: 3600,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackUser, setFeedbackUser] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: feedbackRating,
          comment: feedbackText,
          user: feedbackUser || 'Citizen User',
          category: 'General Civic Assistance',
        }),
      });

      if (res.ok) {
        setFeedbackSubmitted(true);
        setFeedbackText('');
        fetchStats();
        setTimeout(() => setFeedbackSubmitted(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-teal-400">
              Admin & Governance Console
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif">PARTH AI System Analytics</h2>
          <p className="text-xs text-slate-400 mt-1">
            Rajkiya Engineering College, Banda • Civic Legal-Tech Platform Monitoring
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={isLoading}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors self-start sm:self-auto border border-slate-700"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-blue-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Legal Queries</span>
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {stats.totalQueries}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">↑ 18% from last week</span>
        </div>

        <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-teal-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Complaints Drafted</span>
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {stats.complaintsDrafted}
          </div>
          <span className="text-[10px] text-blue-600 font-semibold">Police / Cyber / Consumer</span>
        </div>

        <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Notices Analyzed</span>
            <FileSearch className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">
            {stats.documentsAnalyzed}
          </div>
          <span className="text-[10px] text-teal-600 font-semibold">Gemini Vision OCR</span>
        </div>

        <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">System Health</span>
            <Server className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 font-mono">
            100% OK
          </div>
          <span className="text-[10px] text-slate-400 font-semibold">Port 3000 Active</span>
        </div>
      </div>

      {/* Two Column Section: Category Distribution & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Category Inquiries (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            <span>Inquiry Distribution by Domain</span>
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Criminal Law & FIR (BNS/BNSS)', count: 45, pct: 31, color: 'bg-rose-500' },
              { name: 'Cybercrime & 1930 Fraud', count: 39, pct: 27, color: 'bg-blue-600' },
              { name: 'Consumer Protection & Refunds', count: 28, pct: 19, color: 'bg-teal-500' },
              { name: 'Property & Land Disputes', count: 22, pct: 15, color: 'bg-amber-500' },
              { name: 'Women & Child Safeguards', count: 18, pct: 12, color: 'bg-purple-500' },
              { name: 'RTI & Public Grievance (CPGRAMS)', count: 14, pct: 9, color: 'bg-indigo-500' },
            ].map((cat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-medium">
                  <span>{cat.name}</span>
                  <span className="font-mono font-bold">{cat.count} inquiries ({cat.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Citizen Feedback Log & Submission (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Submit New Feedback Widget */}
          <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              <span>Submit Platform Feedback & Quality Review</span>
            </h3>

            <form onSubmit={handleFeedbackSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Adv. R. Patel)"
                  value={feedbackUser}
                  onChange={(e) => setFeedbackUser(e.target.value)}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                />
                <select
                  value={feedbackRating}
                  onChange={(e) => setFeedbackRating(Number(e.target.value))}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                  <option value={4}>⭐⭐⭐⭐ (4/5 Very Good)</option>
                  <option value={3}>⭐⭐⭐ (3/5 Average)</option>
                  <option value={2}>⭐⭐ (2/5 Needs Improvement)</option>
                  <option value={1}>⭐ (1/5 Critical Error)</option>
                </select>
              </div>

              <textarea
                rows={2}
                required
                placeholder="Share your experience with PARTH AI legal information..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 outline-none"
              />

              <div className="flex items-center justify-between">
                {feedbackSubmitted ? (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Feedback Recorded!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Used for continuous legal prompt refinement</span>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>

          {/* Feedback Review Log */}
          <div className="bg-white dark:bg-slate-850 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Citizen Feedback Stream ({stats.feedbacks?.length || 0})
            </h3>
            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {(stats.feedbacks || []).map((fb: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{fb.user}</span>
                    <span className="text-amber-500">{'★'.repeat(fb.rating)}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">{fb.comment}</p>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 block">{fb.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
