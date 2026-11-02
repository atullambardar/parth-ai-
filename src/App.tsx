import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { ChatAssistant } from './components/ChatAssistant';
import { KnowledgeHub } from './components/KnowledgeHub';
import { ComplaintGenerator } from './components/ComplaintGenerator';
import { DocumentAnalyzer } from './components/DocumentAnalyzer';
import { ResourceDirectory } from './components/ResourceDirectory';
import { LegalDictionary } from './components/LegalDictionary';
import { LegalQuiz } from './components/LegalQuiz';
import { UserDashboard } from './components/UserDashboard';
import { AdminPanel } from './components/AdminPanel';
import { EmergencyModal } from './components/EmergencyModal';
import { AuthModal } from './components/AuthModal';
import { ChatMessage, Language, ColorTheme } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('assistant');
  const [language, setLanguage] = useState<Language>('en');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('sovereign-navy');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [complaintContext, setComplaintContext] = useState<string>('');

  // Initial welcome message from PARTH AI
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Namaste! I am **PARTH AI**, your intelligent Indian Legal Awareness & Civic Guidance Assistant.
Tagline: *"Legal Awareness. Simplified for Everyone."*
Developed by Team PARTH at **Rajkiya Engineering College, Banda**.

### 1. How I Can Assist You (मैं आपकी कैसे सहायता कर सकता हूँ)
You can ask your questions in **Hindi (हिन्दी)**, **English**, or **Hinglish** regarding:
- **Police & Criminal Law:** Police refusing FIR, Zero FIR procedure, arrest rights (D.K. Basu guidelines), bail mechanisms under BNS & BNSS.
- **Cyber Financial Fraud:** Golden Hour response for UPI/banking fraud, dialing **1930**, freezing illicit beneficiary accounts.
- **Consumer Protection:** Product replacement, e-commerce refund refusals, lodging claims on **e-Daakhil** with zero court fees up to ₹5 Lakhs.
- **Labour & Employment:** Unpaid wages, wrongful termination, Labour Commissioner complaints.
- **Women & Child Rights:** Domestic violence safeguards (PWDVA), maintenance under Section 144 BNSS / 125 CrPC, workplace harassment (POSH).
- **RTI & Govt Grievances:** Drafting RTI applications, escalating administrative delays on CPGRAMS.

*Select any topic below or describe your issue in your own words.*`,
      timestamp: new Date().toISOString(),
      suggestedActions: [
        'Police FIR register nahi kar rahi, kya karun?',
        'Online payment fraud ho gaya, ab kya karna chahiye?',
        'RTI application kaise file karein?',
        'Employer salary nahi de raha, mere kya rights hain?'
      ]
    }
  ]);

  // Sync dark mode and color theme classes with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.remove(
      'theme-sovereign-navy',
      'theme-saffron-gold',
      'theme-emerald-justice',
      'theme-midnight-indigo'
    );
    document.documentElement.classList.add(`theme-${colorTheme}`);
  }, [colorTheme]);

  // Helper to handle queries from other modules (Knowledge Hub, Hero, Quiz, Dictionary)
  const handleAskQueryInChat = (queryText: string) => {
    setActiveTab('assistant');
    // Simulate user asking this query
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);

    // Send to backend
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: queryText,
        history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        language: language,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const assistantMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.content,
          suggestedActions: data.suggestedActions || [],
          isEmergency: data.isEmergency,
          timestamp: data.timestamp || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Switch to Complaint Draft with context from chat
  const handleOpenDraftWithContext = (contextText: string) => {
    setComplaintContext(contextText);
    setActiveTab('complaint');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        colorTheme={colorTheme}
        setColorTheme={setColorTheme}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'assistant' && (
          <div>
            <HeroSection
              onSearchSubmit={handleAskQueryInChat}
              onSelectSuggested={handleAskQueryInChat}
              language={language}
              onExploreRights={() => setActiveTab('knowledge')}
              onStartVoice={() => {
                // Focus chat and trigger voice
                const micBtn = document.querySelector('button[title*="Voice Input"]') as HTMLButtonElement;
                micBtn?.click();
              }}
              isListening={false}
              onAttachClick={() => setActiveTab('document')}
              onSelectTab={setActiveTab}
            />

            <ChatAssistant
              messages={messages}
              setMessages={setMessages}
              language={language}
              onOpenDraftWithContext={handleOpenDraftWithContext}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
          </div>
        )}

        {activeTab === 'knowledge' && (
          <KnowledgeHub
            language={language}
            onAskTopic={handleAskQueryInChat}
          />
        )}

        {activeTab === 'complaint' && (
          <ComplaintGenerator
            initialContext={complaintContext}
            language={language}
          />
        )}

        {activeTab === 'document' && (
          <DocumentAnalyzer
            language={language}
            onAskAboutDoc={handleAskQueryInChat}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceDirectory language={language} />
        )}

        {activeTab === 'dictionary' && (
          <LegalDictionary
            language={language}
            onAskTerm={handleAskQueryInChat}
          />
        )}

        {activeTab === 'quiz' && (
          <LegalQuiz
            language={language}
            onAskAI={handleAskQueryInChat}
          />
        )}

        {activeTab === 'dashboard' && (
          <UserDashboard
            currentUser={currentUser}
            messages={messages}
            onClearHistory={() => setMessages([])}
            language={language}
            setLanguage={setLanguage}
            setActiveTab={setActiveTab}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onSelectQuery={handleAskQueryInChat}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}
