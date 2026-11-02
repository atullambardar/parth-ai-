import { ColorTheme } from '../types';

export interface ThemeConfig {
  id: ColorTheme;
  name: string;
  nameHi: string;
  badge: string;
  logoGradient: string;
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  accentText: string;
  borderActive: string;
  ringActive: string;
  heroGradient: string;
  dotColor: string;
  badgeBg: string;
  badgeText: string;
}

export const COLOR_THEMES: Record<ColorTheme, ThemeConfig> = {
  'sovereign-navy': {
    id: 'sovereign-navy',
    name: 'Sovereign Navy',
    nameHi: 'सॉवरेन नेवी (राजकीय)',
    badge: 'Navy & Royal Blue',
    logoGradient: 'from-blue-900 via-blue-700 to-teal-500',
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryText: 'text-blue-600 dark:text-blue-400',
    accentText: 'text-teal-600 dark:text-teal-400',
    borderActive: 'border-blue-600',
    ringActive: 'ring-blue-500/30',
    heroGradient: 'from-blue-50/70 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950',
    dotColor: '#2563eb',
    badgeBg: 'bg-blue-100 dark:bg-blue-950',
    badgeText: 'text-blue-800 dark:text-blue-300',
  },
  'saffron-gold': {
    id: 'saffron-gold',
    name: 'Ashoka Saffron',
    nameHi: 'अशोक केसरिया (राष्ट्र गौरव)',
    badge: 'Saffron & Gold',
    logoGradient: 'from-stone-900 via-amber-700 to-orange-500',
    primaryBg: 'bg-amber-600',
    primaryHover: 'hover:bg-amber-700',
    primaryText: 'text-amber-600 dark:text-amber-400',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    borderActive: 'border-amber-600',
    ringActive: 'ring-amber-500/30',
    heroGradient: 'from-amber-50/70 via-white to-orange-50/30 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950',
    dotColor: '#d97706',
    badgeBg: 'bg-amber-100 dark:bg-amber-950',
    badgeText: 'text-amber-800 dark:text-amber-300',
  },
  'emerald-justice': {
    id: 'emerald-justice',
    name: 'Barrister Emerald',
    nameHi: 'बैरिस्टर एमराल्ड (विधिक)',
    badge: 'Emerald & Gold',
    logoGradient: 'from-emerald-950 via-teal-800 to-amber-500',
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryText: 'text-emerald-600 dark:text-emerald-400',
    accentText: 'text-amber-600 dark:text-amber-400',
    borderActive: 'border-emerald-600',
    ringActive: 'ring-emerald-500/30',
    heroGradient: 'from-emerald-50/70 via-white to-teal-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950',
    dotColor: '#059669',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
  },
  'midnight-indigo': {
    id: 'midnight-indigo',
    name: 'Midnight Indigo',
    nameHi: 'मिडनाइट इंडिगो (साइबर)',
    badge: 'Indigo & Violet',
    logoGradient: 'from-slate-950 via-indigo-900 to-purple-600',
    primaryBg: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    primaryText: 'text-indigo-600 dark:text-indigo-400',
    accentText: 'text-purple-600 dark:text-purple-400',
    borderActive: 'border-indigo-600',
    ringActive: 'ring-indigo-500/30',
    heroGradient: 'from-indigo-50/70 via-white to-purple-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950',
    dotColor: '#6366f1',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950',
    badgeText: 'text-indigo-800 dark:text-indigo-300',
  },
};
