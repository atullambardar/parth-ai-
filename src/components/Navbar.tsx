import React, { useState } from 'react';
import { 
  Scale, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  FileSearch, 
  Globe2, 
  HelpCircle, 
  PhoneCall, 
  ShieldCheck, 
  Sun, 
  Moon, 
  User, 
  BookMarked,
  Palette,
  Check
} from 'lucide-react';
import { Language, ColorTheme } from '../types';
import { COLOR_THEMES } from '../data/themes';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  onOpenEmergency: () => void;
  onOpenAuth: () => void;
  currentUser: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  colorTheme,
  setColorTheme,
  onOpenEmergency,
  onOpenAuth,
  currentUser,
}) => {
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const currentTheme = COLOR_THEMES[colorTheme] || COLOR_THEMES['sovereign-navy'];

  const navItems = [
    { id: 'assistant', label: 'AI Assistant', labelHi: 'एआई सहायक', icon: MessageSquare },
    { id: 'knowledge', label: 'Knowledge Hub', labelHi: 'कानून ज्ञान केंद्र', icon: BookOpen },
    { id: 'complaint', label: 'Draft Complaint', labelHi: 'शिकायत ड्राफ्ट', icon: FileText },
    { id: 'document', label: 'Analyze Notice/Doc', labelHi: 'दस्तावेज जांच', icon: FileSearch },
    { id: 'resources', label: 'Govt Portals', labelHi: 'सरकारी पोर्टल', icon: Globe2 },
    { id: 'dictionary', label: 'Legal Terms', labelHi: 'कानूनी शब्दकोश', icon: BookMarked },
    { id: 'quiz', label: 'Rights Quiz', labelHi: 'अधिकार क्विज़', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/98 dark:bg-slate-900/98 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm">
      {/* Top Branding & Utilities Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('assistant')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${currentTheme.logoGradient} flex items-center justify-center shadow-md shadow-slate-900/20 group-hover:scale-105 transition-transform`}>
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white font-serif">
                  PARTH <span className={`${currentTheme.primaryText} font-sans text-lg font-bold`}>AI</span>
                </span>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${currentTheme.badgeBg} ${currentTheme.badgeText} border border-current/20 hidden sm:inline`}>
                  {currentTheme.badge}
                </span>
              </div>
              <span className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 hidden md:inline -mt-0.5">
                Legal Awareness. Simplified for Everyone.
              </span>
            </div>
          </div>

          {/* Right Utility Buttons (Palette Picker, Visible Language Switcher, Emergency, Theme, Auth) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Color Palette Switcher */}
            <div className="relative">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors shadow-2xs"
                title="Change Color Theme"
              >
                <Palette className={`w-3.5 h-3.5 ${currentTheme.primaryText}`} />
                <span className="hidden sm:inline font-semibold">Theme</span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: currentTheme.dotColor }}
                />
              </button>

              {themeDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-850 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 p-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span>Select Color Palette</span>
                    <button onClick={() => setThemeDropdownOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
                  </div>
                  <div className="space-y-1 mt-1">
                    {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((thmKey) => {
                      const thm = COLOR_THEMES[thmKey];
                      const isSelected = colorTheme === thmKey;
                      return (
                        <button
                          key={thmKey}
                          onClick={() => {
                            setColorTheme(thmKey);
                            setThemeDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-slate-800 font-bold border border-slate-300 dark:border-slate-600'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-4 h-4 rounded-full shrink-0 shadow-xs ring-1 ring-slate-300"
                              style={{ backgroundColor: thm.dotColor }}
                            />
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white leading-tight">
                                {thm.name}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {thm.badge}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Always Visible Language Pill Selector */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'en'
                    ? `${currentTheme.primaryBg} text-white shadow-xs`
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                  language === 'hi'
                    ? `${currentTheme.primaryBg} text-white shadow-xs`
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
                title="Switch to हिन्दी"
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLanguage('hinglish')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all hidden md:inline-block ${
                  language === 'hinglish'
                    ? `${currentTheme.primaryBg} text-white shadow-xs`
                    : 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                }`}
                title="Switch to Hinglish (Mix)"
              >
                Hinglish
              </button>
            </div>

            {/* Emergency Hotline Button */}
            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white border border-rose-500 rounded-xl text-xs font-extrabold transition-all shadow-md animate-pulse shrink-0"
              title="Emergency Helplines (112 / 1930 / 181)"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span className="hidden md:inline">112 / 1930</span>
              <span className="md:hidden">112</span>
            </button>

            {/* Dark/Light Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* User Profile / Login */}
            <button
              onClick={onOpenAuth}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${currentTheme.primaryBg} ${currentTheme.primaryHover} text-white text-xs font-bold transition-colors shadow-2xs`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Horizontal Navigation Strip (ALWAYS VISIBLE on all viewports) */}
      <div className="bg-slate-100/90 dark:bg-slate-850/90 border-t border-slate-200 dark:border-slate-800 py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
                  isActive
                    ? `${currentTheme.primaryBg} text-white shadow-sm ring-2 ${currentTheme.ringActive}`
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-slate-400 hover:text-slate-900 shadow-2xs'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : currentTheme.primaryText}`} />
                <span>{language === 'hi' ? item.labelHi : item.label}</span>
              </button>
            );
          })}

          {/* Quick links to Dashboard and Admin */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'dashboard'
                ? `${currentTheme.primaryBg} text-white`
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all ${
              activeTab === 'admin'
                ? `${currentTheme.primaryBg} text-white`
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-500" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
};
