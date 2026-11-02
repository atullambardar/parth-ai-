import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Cyber Safety',
    questionEn: 'If money is fraudulently deducted from your bank account via UPI, what is the single most critical phone number you must dial within 2 hours?',
    questionHi: 'यदि यूपीआई या ऑनलाइन धोखाधड़ी से आपके बैंक खाते से पैसे कट जाएं, तो 2 घंटे के भीतर कौन सा नंबर डायल करना सबसे जरूरी है?',
    optionsEn: ['100', '1930', '1098', '181'],
    optionsHi: ['100', '1930', '1098', '181'],
    correctIndex: 1,
    explanationEn: '1930 is the National Cyber Financial Fraud Helpline operated by the Ministry of Home Affairs (I4C). Calling within the "Golden Hour" allows banks to immediately freeze the money in the scammer beneficiary account.',
    explanationHi: '1930 राष्ट्रीय साइबर वित्तीय धोखाधड़ी हेल्पलाइन है। 2 घंटे (गोल्डन ऑवर) के अंदर कॉल करने से पुलिस और बैंक मिलकर फ्रॉड करने वाले के खाते में पैसे को फ्रीज करवा देते हैं।'
  },
  {
    id: 2,
    category: 'Criminal Law & Police Rights',
    questionEn: 'Can a police officer refuse to register an FIR for a serious (cognizable) offence like theft, robbery, or assault?',
    questionHi: 'क्या पुलिस किसी गंभीर (संज्ञेय) अपराध जैसे चोरी, डकैती या हमले की एफआईआर दर्ज करने से मना कर सकती है?',
    optionsEn: [
      'Yes, police have full discretion to refuse any FIR.',
      'No, the Supreme Court in Lalita Kumari vs Govt of UP held FIR registration is mandatory for cognizable offences.',
      'Only if the victim pays a registration fee.',
      'Only if approved by the local MLA.'
    ],
    optionsHi: [
      'हां, पुलिस की अपनी मर्जी है।',
      'नहीं, सुप्रीम कोर्ट के ललिता कुमारी फैसले के अनुसार संज्ञेय अपराध में एफआईआर लिखना कानूनी रूप से अनिवार्य है।',
      'केवल अगर शिकायतकर्ता फीस दे।',
      'केवल अगर स्थानीय विधायक अनुमति दें।'
    ],
    correctIndex: 1,
    explanationEn: 'Under Section 173 BNSS (Section 154 CrPC) and the Supreme Court Constitution Bench ruling in Lalita Kumari (2014), registration of FIR is mandatory if the information discloses commission of a cognizable offence.',
    explanationHi: 'सुप्रीम कोर्ट की संवैधानिक पीठ (ललिता कुमारी बनाम यूपी सरकार) के अनुसार संज्ञेय अपराध की सूचना मिलने पर पुलिस को तुरंत एफआईआर दर्ज करना अनिवार्य है, मना करने पर पुलिसकर्मी के खिलाफ कानूनी कार्रवाई हो सकती है।'
  },
  {
    id: 3,
    category: 'Consumer Rights',
    questionEn: 'What is the court fee to file an online consumer case on e-Daakhil for claims up to ₹5,00,000 (5 Lakhs)?',
    questionHi: 'ई-दाखिल पर 5 लाख रुपये तक के दावों के लिए उपभोक्ता केस दर्ज करने की कोर्ट फीस कितनी है?',
    optionsEn: ['₹5,000', '₹1,000', 'Zero (Nil / Completely Free)', '10% of total claim'],
    optionsHi: ['₹5,000', '₹1,000', 'शून्य (बिल्कुल मुफ्त)', 'कुल दावे का 10%'],
    correctIndex: 2,
    explanationEn: 'Under the Consumer Protection Rules 2020, there is zero court fee for filing cases before the District Consumer Commission for disputed values up to ₹5 Lakhs, ensuring hassle-free access to justice for ordinary citizens.',
    explanationHi: 'उपभोक्ता संरक्षण नियम 2020 के तहत ₹5 लाख तक के विवादों के लिए उपभोक्ता आयोग में कोई कोर्ट फीस नहीं लगती, यह पूरी तरह निशुल्क है।'
  },
  {
    id: 4,
    category: 'Fundamental Rights & Arrest',
    questionEn: 'Within how many hours must an arrested person be produced before the nearest Judicial Magistrate?',
    questionHi: 'गिरफ्तार किए गए व्यक्ति को कितने घंटों के भीतर निकटतम न्यायिक मजिस्ट्रेट के समक्ष पेश किया जाना अनिवार्य है?',
    optionsEn: ['48 hours', '72 hours', '24 hours (excluding travel time)', '1 week'],
    optionsHi: ['48 घंटे', '72 घंटे', '24 घंटे (यात्रा समय छोड़कर)', '1 सप्ताह'],
    correctIndex: 2,
    explanationEn: 'Article 22(2) of the Indian Constitution and Section 57 CrPC / Section 58 BNSS strictly mandate that no person shall be detained in police custody beyond 24 hours without the authority of a Magistrate.',
    explanationHi: 'संविधान के अनुच्छेद 22(2) और कानून के तहत पुलिस 24 घंटे से ज्यादा किसी को हिरासत में नहीं रख सकती, उसे मजिस्ट्रेट के सामने पेश करना अनिवार्य है।'
  },
  {
    id: 5,
    category: 'Right to Information (RTI)',
    questionEn: 'What is the normal time limit for a Public Information Officer (PIO) to provide requested information under the RTI Act 2005?',
    questionHi: 'आरटीआई अधिनियम 2005 के तहत जन सूचना अधिकारी (PIO) को कितने दिनों में जानकारी देना आवश्यक है?',
    optionsEn: ['90 days', '30 days (or 48 hours if related to life/liberty)', '15 days', '6 months'],
    optionsHi: ['90 दिन (या जीवन/स्वतंत्रता से जुड़े मामलों में 48 घंटे)', '30 दिन (या जीवन/स्वतंत्रता से जुड़े मामलों में 48 घंटे)', '15 दिन', '6 महीने'],
    correctIndex: 1,
    explanationEn: 'Under Section 7(1) of the RTI Act 2005, the public authority must respond within 30 days of receiving the request. If the information concerns the life or liberty of a person, it must be provided within 48 hours.',
    explanationHi: 'धारा 7(1) के तहत 30 दिनों के भीतर जानकारी देनी होती है। यदि जानकारी किसी व्यक्ति के जीवन या व्यक्तिगत स्वतंत्रता से जुड़ी हो, तो 48 घंटों में देनी अनिवार्य है।'
  }
];
