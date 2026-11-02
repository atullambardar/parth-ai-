import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Share2, 
  Trash2, 
  Download, 
  FileEdit, 
  ShieldAlert, 
  Sparkles, 
  Scale, 
  ExternalLink, 
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { ChatMessage, Language } from '../types';

interface ChatAssistantProps {
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  language: Language;
  onOpenDraftWithContext?: (contextText: string) => void;
  onOpenEmergency: () => void;
}

export const ChatAssistant: React.FC<ChatAssistantProps> = ({
  messages,
  setMessages,
  language,
  onOpenDraftWithContext,
  onOpenEmergency,
}) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Web Speech Recognition (Speech-to-Text)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome/Edge or type your question.');
      setTimeout(() => setSpeechError(null), 5000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      // Configure language based on active preference
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission was denied. Please allow microphone access in your browser settings.');
        } else {
          setSpeechError(`Voice input error: ${event.error}`);
        }
        setTimeout(() => setSpeechError(null), 5000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error(err);
      setIsListening(false);
    }
  };

  // Text-to-Speech (Read response aloud)
  const handleToggleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown before speaking
    const cleanText = text
      .replace(/[#*`_~\[\]]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .slice(0, 1000); // Read first 1000 chars

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'assistant',
          content:
            language === 'hi'
              ? 'नमस्ते! मैं पार्थ एआई (PARTH AI) हूँ। आप अपनी कानूनी समस्या या शिकायत के बारे में हिन्दी या अंग्रेजी में पूछ सकते हैं।'
              : 'Namaste! I am PARTH AI, your legal awareness assistant. You can explain your issue in Hindi, English, or Hinglish to receive rights, sections, and practical guidance.',
          timestamp: new Date().toISOString(),
          suggestedActions: [
            'Police FIR register nahi kar rahi, kya karun?',
            'Online payment fraud ho gaya, ab kya karna chahiye?',
            'RTI application kaise file karein?'
          ]
        }
      ]);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const handleExportChat = () => {
    const textData = messages
      .map((m) => `[${m.role.toUpperCase()} - ${m.timestamp}]\n${m.content}\n\n`)
      .join('---\n');
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PARTH_AI_Legal_Chat_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Submit query to /api/chat
  const handleSend = async (customMessage?: string) => {
    const textToSend = customMessage || input;
    if (!textToSend.trim() || isLoading) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.content,
        suggestedActions: data.suggestedActions || [],
        isEmergency: data.isEmergency,
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          'We encountered an issue processing your request. Please ensure network connectivity and try asking again, or check the Emergency hotlines if your situation is urgent.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render markdown-like sections cleanly with highlighted section badges
  const renderMessageContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Check for section headers (### 1. Understanding... etc.)
      if (line.startsWith('### ')) {
        const headerTitle = line.replace('### ', '');
        return (
          <div key={idx} className="mt-4 mb-2 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold text-xs">
              {headerTitle}
            </span>
          </div>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-slate-900 dark:text-white mt-3 mb-1">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 ml-4 list-disc leading-relaxed my-0.5">
            {formatBold(line.replace(/^[-*]\s*/, ''))}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed my-1">
            {formatBold(line)}
          </p>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      return (
        <p key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed my-1">
          {formatBold(line)}
        </p>
      );
    });
  };

  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-slate-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Chat Container Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col h-[750px]">
        {/* Top Chat Bar */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-slate-800 dark:text-white font-serif">
                  PARTH AI Legal Consult
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 font-semibold">
                  Online
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Context-aware legal analysis • BNS/BNSS • IT Act • Consumer Protection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleExportChat}
              className="p-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Export Conversation (.txt)"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleClearHistory}
              className="p-1.5 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              title="Clear Conversation History"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Speech Error Banner if any */}
        {speechError && (
          <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{speechError}</span>
            </div>
            <button onClick={() => setSpeechError(null)} className="font-bold ml-2">×</button>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-700 to-teal-400 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Scale className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] sm:max-w-[78%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Emergency alert card if message triggered safety */}
                  {m.isEmergency && (
                    <div className="mb-2 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-300 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 w-full flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold">EMERGENCY NOTICE:</strong>
                        If you are facing immediate danger or financial cybercrime, dial <strong>112</strong> (Police) or <strong>1930</strong> (Cyber Fraud) without delay.
                        <button
                          onClick={onOpenEmergency}
                          className="mt-1 block text-rose-700 dark:text-rose-300 underline font-bold"
                        >
                          Open Emergency Response Directory →
                        </button>
                      </div>
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200 dark:border-slate-750 shadow-xs'
                    }`}
                  >
                    {isUser ? (
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    ) : (
                      <div>{renderMessageContent(m.content)}</div>
                    )}
                  </div>

                  {/* Actions under Assistant Message */}
                  {!isUser && (
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(m.id, m.content)}
                        className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        title="Copy Response"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      {/* Text-to-Speech Play/Stop */}
                      <button
                        onClick={() => handleToggleSpeak(m.id, m.content)}
                        className="px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                        title={isSpeakingId === m.id ? 'Stop reading' : 'Read aloud (Voice output)'}
                      >
                        {isSpeakingId === m.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-500 animate-pulse" />
                            <span className="text-rose-500 font-bold">Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Read Aloud</span>
                          </>
                        )}
                      </button>

                      {/* Open Complaint Generator with this context */}
                      {onOpenDraftWithContext && (
                        <button
                          onClick={() => onOpenDraftWithContext(m.content)}
                          className="px-2 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-950/60 text-blue-600 dark:text-teal-400 font-medium flex items-center gap-1"
                          title="Generate a formal legal complaint based on this advice"
                        >
                          <FileEdit className="w-3 h-3" />
                          <span>Draft Complaint Draft</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Follow-up suggestions */}
                  {m.suggestedActions && m.suggestedActions.length > 0 && (
                    <div className="mt-3 w-full">
                      <p className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>Suggested Next Questions:</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {m.suggestedActions.map((sug, i) => (
                          <button
                            key={i}
                            onClick={() => handleSend(sug)}
                            className="text-left px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-teal-300 text-xs border border-slate-200 dark:border-slate-700 transition-colors"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs text-xs font-bold">
                    You
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs animate-pulse">
                <Scale className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl rounded-bl-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                <span>PARTH AI is analyzing legal statutes and rights...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Voice Listening Active Waveform Banner */}
        {isListening && (
          <div className="px-4 py-2 bg-blue-50 dark:bg-blue-950/80 border-t border-blue-200 dark:border-blue-900 flex items-center justify-between text-xs text-blue-700 dark:text-blue-300">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="font-bold">Listening in {language === 'hi' ? 'Hindi' : 'English'}... Speak now.</span>
            </div>
            <button
              onClick={toggleListening}
              className="px-2 py-0.5 rounded bg-rose-600 text-white text-[11px] font-bold"
            >
              Stop Mic
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic Button */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? 'bg-rose-500 text-white shadow-md animate-pulse'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={isListening ? 'Click to stop' : 'Voice Input (Microphone)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'अपनी कानूनी समस्या यहाँ लिखें (जैसे: सैलरी नहीं मिली, एफआईआर)...'
                  : 'Describe your legal question in Hindi, English or Hinglish...'
              }
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-transparent focus:border-blue-500 dark:focus:border-teal-400 outline-none transition-all"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={`p-2.5 rounded-xl transition-all ${
                input.trim() && !isLoading
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom disclaimer micro-text */}
          <div className="mt-2 text-center text-[10px] text-slate-400 dark:text-slate-500">
            PARTH AI provides legal information, not licensed advocacy. Verify with registered advocates or DLSA.
          </div>
        </div>
      </div>
    </div>
  );
};
