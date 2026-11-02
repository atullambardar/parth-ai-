import React, { useState } from 'react';
import { 
  Globe2, 
  Search, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Building2, 
  HeartHandshake, 
  CheckCircle2, 
  Filter
} from 'lucide-react';
import { OFFICIAL_RESOURCES } from '../data/resources';
import { ResourceItem, Language } from '../types';

interface ResourceDirectoryProps {
  language: Language;
}

export const ResourceDirectory: React.FC<ResourceDirectoryProps> = ({ language }) => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Portals (10)' },
    { id: 'police_crime', label: 'Cyber & Police (1930)' },
    { id: 'legal_aid', label: 'Free Legal Aid (NALSA)' },
    { id: 'consumer', label: 'Consumer & E-Daakhil' },
    { id: 'rti_grievance', label: 'RTI & Public Grievance' },
    { id: 'courts', label: 'Acts & eCourts' },
  ];

  const filteredResources = OFFICIAL_RESOURCES.filter((res) => {
    const matchesFilter = filter === 'all' || res.category === filter;
    const lower = search.toLowerCase();
    const matchesSearch =
      !search.trim() ||
      res.name.toLowerCase().includes(lower) ||
      (res.nameHi && res.nameHi.toLowerCase().includes(lower)) ||
      res.description.toLowerCase().includes(lower) ||
      res.purpose.toLowerCase().includes(lower);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Authentic Indian Government Portals (NIC / GOI)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
          Official Government & Legal Resource Directory
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Direct, verified access to official judicial repositories, statutory complaint portals, RTI online services, and free legal aid authorities.
        </p>

        {/* Search */}
        <div className="mt-6 relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search verified portals (e.g., 'NALSA', '1930', 'eCourts', 'RTI')..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-750 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-teal-400 border border-blue-200 dark:border-blue-900">
                  {res.category.replace('_', ' ')}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified GOI</span>
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                {res.name}
              </h3>
              {res.nameHi && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-hindi mb-2">
                  {res.nameHi}
                </p>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                {res.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 mb-4">
                <strong className="block text-slate-900 dark:text-white mb-0.5">Primary Purpose:</strong>
                <span>{res.purpose}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              {res.helpline ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 dark:text-teal-400 font-mono">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <a href={`tel:${res.helpline}`} className="hover:underline">
                    Helpline: {res.helpline}
                  </a>
                </div>
              ) : (
                <span className="text-[11px] text-slate-400">24/7 Digital Portal</span>
              )}

              <a
                href={res.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500 text-xs font-semibold shadow-xs transition-colors"
              >
                <span>Visit Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
