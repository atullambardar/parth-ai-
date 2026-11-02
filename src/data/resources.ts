import { ResourceItem } from '../types';

export const OFFICIAL_RESOURCES: ResourceItem[] = [
  {
    id: 'india-code',
    name: 'India Code - Digital Repository of All Central & State Acts',
    nameHi: 'इंडिया कोड - भारत के सभी केंद्रीय और राज्य कानूनों का आधिकारिक पोर्टल',
    category: 'courts',
    description: 'Official digital repository of all central acts, state enactments, subordinate legislations, notifications, and rules in India.',
    url: 'https://www.indiacode.nic.in',
    purpose: 'Verify exact wording of any Indian Act, Amendment, or Section directly from the authentic legislative repository.'
  },
  {
    id: 'nalsa',
    name: 'National Legal Services Authority (NALSA)',
    nameHi: 'राष्ट्रीय विधिक सेवा प्राधिकरण (नालसा) - निःशुल्क कानूनी सहायता',
    category: 'legal_aid',
    description: 'Provides free and competent legal services to the weaker sections of the society and organizes Lok Adalats for amicable settlement of disputes.',
    url: 'https://nalsa.gov.in',
    helpline: '15100',
    purpose: 'Free legal aid, assigned advocates, victim compensation, and Lok Adalat dispute settlement.'
  },
  {
    id: 'cybercrime-portal',
    name: 'National Cyber Crime Reporting Portal (NCRP)',
    nameHi: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल',
    category: 'police_crime',
    description: 'Government of India initiative to facilitate victims to report cyber crime complaints online, especially crimes against women and financial fraud.',
    url: 'https://cybercrime.gov.in',
    helpline: '1930',
    purpose: 'Report financial frauds, UPI scams, identity theft, child abuse material, and cyber harassment with tracking ID.'
  },
  {
    id: 'national-consumer-helpline',
    name: 'National Consumer Helpline (NCH / INGRAM)',
    nameHi: 'राष्ट्रीय उपभोक्ता हेल्पलाइन',
    category: 'consumer',
    description: 'Department of Consumer Affairs platform for pre-litigation resolution of consumer disputes and advisory services.',
    url: 'https://consumerhelpline.gov.in',
    helpline: '1915',
    purpose: 'Resolve issues regarding e-commerce refunds, defective electronics, airline cancellation, telecom bills, and insurance claims.'
  },
  {
    id: 'edaakhil',
    name: 'e-Daakhil Portal (Consumer Commission E-Filing)',
    nameHi: 'ई-दाखिल पोर्टल - उपभोक्ता आयोग में ऑनलाइन केस दर्ज करें',
    category: 'consumer',
    description: 'Digital platform by National Consumer Disputes Redressal Commission to file consumer cases across District, State, and National commissions online.',
    url: 'https://edaakhil.nic.in',
    purpose: 'File consumer petitions, pay online court fees, upload evidence, and monitor hearing status remotely.'
  },
  {
    id: 'rti-online',
    name: 'RTI Online Portal',
    nameHi: 'आरटीआई ऑनलाइन पोर्टल - सूचना का अधिकार',
    category: 'rti_grievance',
    description: 'Central portal to file RTI applications and First Appeals online for all Central Ministries, Departments, and Public Authorities.',
    url: 'https://rtionline.gov.in',
    purpose: 'Seek certified copies of government files, status of welfare applications, and official expenditure details for ₹10 fee.'
  },
  {
    id: 'cpgrams',
    name: 'CPGRAMS - Centralized Public Grievance Redressal System',
    nameHi: 'सीपीजीआरएएमएस - लोक शिकायत निवारण प्रणाली',
    category: 'rti_grievance',
    description: '24/7 online system for citizens to lodge complaints with any Central/State Ministry, Department, or Autonomous body with time-bound resolution.',
    url: 'https://pgportal.gov.in',
    purpose: 'Escalate administrative delay, non-payment of pension/scholarship, civic infrastructure failure, or official negligence.'
  },
  {
    id: 'ecourts',
    name: 'eCourts Services India',
    nameHi: 'ई-कोर्ट्स सर्विसेज - भारत की सभी अदालतों की केस स्थिति',
    category: 'courts',
    description: 'Official digital gateway to track case status, cause lists, daily orders, and judgments from District Courts, High Courts, and Supreme Court.',
    url: 'https://services.ecourts.gov.in',
    purpose: 'Check case CNR number, next hearing date, judge orders, and FIR court records online.'
  },
  {
    id: 'tele-law',
    name: 'Tele-Law: Mainstreaming Legal Aid to the Marginalized',
    nameHi: 'टेली-लॉ: जन सेवा केंद्र (CSC) के माध्यम से मुफ्त कानूनी सलाह',
    category: 'legal_aid',
    description: 'Department of Justice initiative connecting panel advocates with rural and marginalized citizens via video conferencing through Common Services Centres (CSC).',
    url: 'https://tele-law.in',
    helpline: '14455',
    purpose: 'Pre-litigation legal advice from expert lawyers directly in rural blocks and panchayats.'
  },
  {
    id: 'ncw',
    name: 'National Commission for Women (NCW)',
    nameHi: 'राष्ट्रीय महिला आयोग',
    category: 'women_child',
    description: 'Statutory body to safeguard women rights, investigate complaints of dowry harassment, domestic violence, rape, and workplace exploitation.',
    url: 'http://ncw.nic.in',
    helpline: '7827170170',
    purpose: 'Direct intervention in crimes against women, inquiry hearings, and emergency counseling.'
  }
];

export const EMERGENCY_CONTACTS = [
  {
    number: '112',
    name: 'National Emergency Response System (ERSS)',
    nameHi: 'राष्ट्रीय आपातकालीन नंबर (पुलिस, एम्बुलेंस, फायर)',
    desc: 'Unified single number across all Indian states for Police, Fire, and Ambulance services with GPS vehicle dispatch.',
    icon: 'PhoneCall',
    badge: 'Immediate Danger'
  },
  {
    number: '1930',
    name: 'Citizen Financial Cyber Fraud Reporting',
    nameHi: 'साइबर वित्तीय धोखाधड़ी हेल्पलाइन (1930)',
    desc: 'Golden Hour helpline under MHA & I4C. Call immediately within 2 hours of online banking or UPI fraud to freeze money in the culprit bank account.',
    icon: 'Shield',
    badge: 'Banking & UPI Fraud'
  },
  {
    number: '181',
    name: 'Women in Distress Helpline',
    nameHi: 'महिला हेल्पलाइन (181)',
    desc: '24/7 dedicated helpline for women facing domestic violence, harassment, sexual assault, or emotional distress across states.',
    icon: 'HeartHandshake',
    badge: 'Women Safety'
  },
  {
    number: '1098',
    name: 'Childline India',
    nameHi: 'चाइल्डलाइन (बच्चों की सुरक्षा)',
    desc: '24/7 toll-free emergency service for children in need of care, protection, shelter, and medical aid.',
    icon: 'Smile',
    badge: 'Child Protection'
  },
  {
    number: '15100',
    name: 'NALSA Legal Aid Helpline',
    nameHi: 'नालसा निःशुल्क कानूनी सहायता हेल्पलाइन',
    desc: 'National helpline for free legal counseling, court representation for marginalized citizens, women, SC/ST, and undertrials.',
    icon: 'Scale',
    badge: 'Free Legal Aid'
  }
];
