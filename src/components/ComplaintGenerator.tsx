import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RotateCcw, 
  ShieldAlert, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  Building,
  User,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { ComplaintFormData, Language } from '../types';

interface ComplaintGeneratorProps {
  initialContext?: string;
  language: Language;
}

export const ComplaintGenerator: React.FC<ComplaintGeneratorProps> = ({ initialContext, language }) => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    category: 'police',
    language: 'en',
    complainantName: '',
    fatherOrSpouseName: '',
    phone: '',
    email: '',
    address: '',
    incidentDate: new Date().toISOString().split('T')[0],
    incidentLocation: '',
    oppositePartyName: '',
    oppositePartyDetails: '',
    incidentDescription: initialContext || '',
    financialLoss: '',
    reliefSought: '',
    evidenceList: 'Bank SMS, WhatsApp screenshots, Purchase invoice',
  });

  const [generatedDraft, setGeneratedDraft] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const categories = [
    { id: 'police', label: 'Police Complaint', labelHi: 'पुलिस शिकायत (FIR)', desc: 'FIR refusal, theft, assault, harassment', icon: '🛡️' },
    { id: 'cybercrime', label: 'Cyber Fraud / 1930', labelHi: 'साइबर अपराध', desc: 'UPI scam, banking fraud, online extortion', icon: '💳' },
    { id: 'consumer', label: 'Consumer Forum', labelHi: 'उपभोक्ता आयोग', desc: 'Defective product, refund denial, e-Daakhil', icon: '🛍️' },
    { id: 'labour', label: 'Labour / Wages', labelHi: 'श्रम आयुक्त', desc: 'Unpaid salary, wrongful termination', icon: '💼' },
    { id: 'grievance', label: 'Govt Grievance', labelHi: 'सरकारी जन-शिकायत', desc: 'CPGRAMS, administrative delay, civic', icon: '🏛️' },
    { id: 'property', label: 'Property / Rent', labelHi: 'संपत्ति / किरायेदारी', desc: 'Illegal eviction, rent disputes, land', icon: '🏡' },
  ];

  // Auto-fill a practical Indian scenario for instant demonstration
  const handlePreFillSample = (type: string) => {
    if (type === 'cybercrime') {
      setFormData({
        category: 'cybercrime',
        language: 'en',
        complainantName: 'Ramesh Kumar Gupta',
        fatherOrSpouseName: 'Late Sh. Satish Gupta',
        phone: '9876543210',
        email: 'ramesh.gupta@example.com',
        address: 'H.No 42, Civil Lines, Banda, Uttar Pradesh - 210001',
        incidentDate: '2026-10-31',
        incidentLocation: 'Online / Mobile Banking Transaction',
        oppositePartyName: 'Unknown Fraudster claiming to be Bank Manager',
        oppositePartyDetails: 'Mobile No: 9811XXXXXX, UPI ID: fastpay.merch@okaxis',
        incidentDescription:
          'On 31st October 2026 at approximately 2:15 PM, I received a phone call from an unknown person posing as my bank customer service representative. He informed me that my ATM card needed KYC verification and sent a malicious link. Upon clicking, ₹48,500 was debited from my Savings Account via UPI without my authorized consent. Reference UTR: 4298192019.',
        financialLoss: '₹48,500 (Forty-eight thousand five hundred Rupees)',
        reliefSought:
          'Immediate registration of cyber complaint under Sections 66C and 66D of the IT Act 2000, freezing of the beneficiary bank account, and recovery of stolen funds.',
        evidenceList: 'Bank statement copy, Debit SMS alert screenshots, Caller phone record, Call logs',
      });
    } else if (type === 'police') {
      setFormData({
        category: 'police',
        language: 'en',
        complainantName: 'Anjali Sharma',
        fatherOrSpouseName: 'W/o Deepak Sharma',
        phone: '9899123456',
        email: 'anjali.sharma@example.com',
        address: 'Sector 14, Housing Board Colony, Banda (U.P.)',
        incidentDate: '2026-10-30',
        incidentLocation: 'Main Market Road, Near District Hospital',
        oppositePartyName: 'Two unidentified motorbikers',
        oppositePartyDetails: 'Black Pulsar without rear number plate, wearing helmets',
        incidentDescription:
          'On 30th October 2026 at around 7:45 PM while walking back from the market, two unidentified men on a black motorcycle snatched my gold chain and handbag containing my Aadhaar card, phone and ₹4,000 in cash. When I visited the local police post, the duty officer refused to write an FIR and told me to submit a lost report instead.',
        financialLoss: 'Gold chain (~15 grams) and ₹4,000 cash',
        reliefSought:
          'Registration of regular FIR under relevant provisions of BNS 2023 for chain snatching and robbery, CCTV footage examination, and recovery of stolen articles.',
        evidenceList: 'CCTV locations list on Market Road, Photocopy of Aadhaar Card, Purchase bill of gold chain',
      });
    } else if (type === 'consumer') {
      setFormData({
        category: 'consumer',
        language: 'en',
        complainantName: 'Vikram Singh',
        fatherOrSpouseName: 'S/o Rajesh Singh',
        phone: '9822334455',
        email: 'vikram.singh@example.com',
        address: 'Flat 302, Green Valley Apartments, Banda, UP',
        incidentDate: '2026-10-15',
        incidentLocation: 'Online E-commerce Platform (MegaMart India)',
        oppositePartyName: 'MegaMart E-Commerce Pvt Ltd & Apex Electronics',
        oppositePartyDetails: 'Registered Office: Connaught Place, New Delhi - 110001',
        incidentDescription:
          'I ordered a Smart LED Television (Order ID #MM-981294) on 15th October 2026 for ₹32,999. The package delivered on 20th October had a completely broken screen. Despite reporting within 24 hours with unboxing video, customer support rejected the return claim citing baseless reasons. Multiple follow-up emails have gone unanswered.',
        financialLoss: '₹32,999 purchase amount plus mental harassment',
        reliefSought:
          'Full refund of ₹32,999 with 12% interest, ₹25,000 compensation for mental harassment and deficiency in service, and litigation costs of ₹5,000.',
        evidenceList: 'Tax invoice, Delivery receipt, High-res photos of cracked display, Unboxing video, Email thread with support',
      });
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.complainantName || !formData.incidentDescription) {
      alert('Please fill in your name and description of the incident.');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/complaint/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate draft');
      }

      const data = await response.json();
      setGeneratedDraft(data.draft);
      setIsEditing(false);
    } catch (err: any) {
      console.error(err);
      alert('Error generating complaint draft: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download PDF with formal formatting and legal layout
  const handleDownloadPDF = () => {
    if (!generatedDraft) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxLineWidth = pageWidth - margin * 2;

    // Header Banner
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('PARTH AI - CITIZEN LEGAL COMPLAINT DRAFT', margin, 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text('Developed by Team PARTH, Rajkiya Engineering College, Banda | Legal Awareness Initiative', margin, 18);

    // Disclaimer Box
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(248, 113, 113);
    doc.roundedRect(margin, 28, maxLineWidth, 14, 2, 2, 'FD');

    doc.setTextColor(153, 27, 27);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.text('IMPORTANT CITIZEN NOTICE & VERIFICATION REQUIREMENT:', margin + 3, 33);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'This document is an AI-generated structured draft for educational & administrative guidance. Please verify facts, sign,',
      margin + 3,
      37
    );
    doc.text(
      'and attach necessary documentary evidence before physical submission to concerned law enforcement or tribunal.',
      margin + 3,
      40
    );

    // Main Draft Content
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // Split text to fit within page margins
    const splitText = doc.splitTextToSize(generatedDraft, maxLineWidth);

    let cursorY = 48;
    const pageHeight = doc.internal.pageSize.getHeight();

    for (let i = 0; i < splitText.length; i++) {
      if (cursorY > pageHeight - 20) {
        doc.addPage();
        cursorY = 20;
      }
      doc.text(splitText[i], margin, cursorY);
      cursorY += 5;
    }

    // Save PDF
    const categoryName = formData.category.toUpperCase();
    doc.save(`PARTH_Legal_Complaint_${categoryName}_${Date.now()}.pdf`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <FileText className="w-3.5 h-3.5" />
          <span>Statutory Indian Formats (BNS / Consumer / Cyber)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-serif mb-2">
          Smart Legal Complaint Generator
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Transform your raw grievance into a formally structured, court-standard complaint draft ready for print or online submission.
        </p>

        {/* Quick Demo Pre-fill Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px] font-semibold">Try sample scenario:</span>
          <button
            type="button"
            onClick={() => handlePreFillSample('cybercrime')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-teal-400 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
          >
            💳 UPI Bank Fraud (₹48,500)
          </button>
          <button
            type="button"
            onClick={() => handlePreFillSample('police')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-teal-400 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
          >
            🛡️ FIR Refusal / Chain Snatching
          </button>
          <button
            type="button"
            onClick={() => handlePreFillSample('consumer')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-blue-700 dark:text-teal-400 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
          >
            🛍️ Damaged LED TV Refund Dispute
          </button>
        </div>
      </div>

      {/* Main Form & Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: 6 Cols */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md">
          <form onSubmit={handleGenerate} className="space-y-4">
            {/* Category Option Cards - Visibly Displayed */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                Select Complaint Authority / Forum ({categories.length} Options)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {categories.map((c) => {
                  const isSelected = formData.category === c.id;
                  return (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setFormData({ ...formData, category: c.id as any })}
                      className={`p-3 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/70 shadow-sm ring-2 ring-blue-500/30'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/60 hover:border-blue-400 hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{c.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-bold ${isSelected ? 'text-blue-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                            {c.label}
                          </h4>
                          {isSelected && (
                            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-teal-400" />
                          )}
                        </div>
                        <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          {c.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Complainant Particulars */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Complainant Particulars (Your Info)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.complainantName}
                    onChange={(e) => setFormData({ ...formData, complainantName: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Father's / Spouse's Name</label>
                  <input
                    type="text"
                    value={formData.fatherOrSpouseName}
                    onChange={(e) => setFormData({ ...formData, fatherOrSpouseName: e.target.value })}
                    placeholder="e.g. S/o Late Satish Kumar"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Residential Address with Pin code *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. H.No 12, Civil Lines, Banda, UP - 210001"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Incident Particulars */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>2. Incident & Opposite Party</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Date of Incident</label>
                  <input
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Location of Incident</label>
                  <input
                    type="text"
                    value={formData.incidentLocation}
                    onChange={(e) => setFormData({ ...formData, incidentLocation: e.target.value })}
                    placeholder="e.g. Market road / Online Portal"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Opposite Party / Accused Name</label>
                  <input
                    type="text"
                    value={formData.oppositePartyName}
                    onChange={(e) => setFormData({ ...formData, oppositePartyName: e.target.value })}
                    placeholder="e.g. ABC Seller / Unidentified"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-500 mb-1">Financial Loss (if any)</label>
                  <input
                    type="text"
                    value={formData.financialLoss}
                    onChange={(e) => setFormData({ ...formData, financialLoss: e.target.value })}
                    placeholder="e.g. ₹25,000"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            {/* Description & Facts */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>3. Chronological Statement of Facts</span>
              </h4>
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Describe what happened in your own words (Hindi or English) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.incidentDescription}
                  onChange={(e) => setFormData({ ...formData, incidentDescription: e.target.value })}
                  placeholder="Explain sequence of events: what happened, who did what, when did it happen, and any communication held..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mt-2">
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Specific Relief / Action Sought</label>
                <input
                  type="text"
                  value={formData.reliefSought}
                  onChange={(e) => setFormData({ ...formData, reliefSought: e.target.value })}
                  placeholder="e.g. Immediate registration of FIR / Full refund with interest / Inspection"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="mt-2">
                <label className="block text-[11px] font-medium text-slate-500 mb-1">Enclosures / Evidence List</label>
                <input
                  type="text"
                  value={formData.evidenceList}
                  onChange={(e) => setFormData({ ...formData, evidenceList: e.target.value })}
                  placeholder="e.g. Bank statement, SMS screenshots, WhatsApp chats, Invoice copy"
                  className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 transition-all"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>PARTH AI is drafting formal legal representation...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Structured Complaint Draft</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Preview: 6 Cols */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-md flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-600" />
                  <span>Draft Preview & Official Export</span>
                </h3>
                <p className="text-[10.5px] text-slate-400">
                  Formatted for Indian law enforcement, tribunals & commissioners
                </p>
              </div>

              {generatedDraft && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                  >
                    {isEditing ? 'Preview Mode' : 'Edit Inline'}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    title="Copy Draft"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                    title="Download court-formatted PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              )}
            </div>

            {/* Draft Watermark Warning */}
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 mb-4 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>DRAFT VERIFICATION NOTICE:</strong> Every document generated by PARTH AI is a draft requiring your personal review, signature, and verification before submission. PARTH AI never files complaints automatically.
              </div>
            </div>

            {/* Generated Content Body */}
            <div className="flex-1 min-h-[380px] bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 overflow-y-auto font-mono text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
              {generatedDraft ? (
                isEditing ? (
                  <textarea
                    rows={18}
                    value={generatedDraft}
                    onChange={(e) => setGeneratedDraft(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none resize-none font-mono text-xs text-slate-800 dark:text-slate-200"
                  />
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                    {generatedDraft}
                  </pre>
                )
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 text-blue-500 flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">
                    No Draft Generated Yet
                  </h4>
                  <p className="text-xs max-w-sm">
                    Fill in your grievance details on the left or click one of the sample scenarios above to generate an official complaint draft with statutory sections.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
