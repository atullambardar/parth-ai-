import { LegalCategory } from '../types';

export const LEGAL_CATEGORIES: LegalCategory[] = [
  {
    id: 'fundamental-rights',
    titleEn: 'Fundamental Rights & Constitutional Remedies',
    titleHi: 'मौलिक अधिकार एवं संवैधानिक उपचार',
    descriptionEn: 'Articles 12-35 of the Indian Constitution safeguarding equality, liberty, freedom of speech, and protection against discrimination.',
    descriptionHi: 'भारतीय संविधान के अनुच्छेद 12-35 जो समानता, स्वतंत्रता, अभिव्यक्ति और शोषण के विरुद्ध सुरक्षा प्रदान करते हैं।',
    icon: 'Scale',
    popularTopics: [
      {
        title: 'Right to Equality (Articles 14 - 18)',
        description: 'Guarantees equality before law, prohibits discrimination based on religion, race, caste, sex, or place of birth.',
        relevantLaws: ['Article 14 (Equality before Law)', 'Article 15 (Prohibition of Discrimination)', 'Article 16 (Equal Opportunity in Public Employment)'],
        steps: [
          'Identify specific discrimination or arbitrary state action.',
          'Gather documentary evidence or correspondence proving disparate treatment.',
          'Approach High Court under Article 226 or Supreme Court under Article 32 via Writ Petition.'
        ],
        documents: ['Identity Proof', 'Official Orders/Communication of denial', 'Proof of discrimination'],
        officialPortal: { name: 'Constitution of India (Legislative Dept)', url: 'https://legislative.gov.in/constitution-of-india/' }
      },
      {
        title: 'Right to Life and Personal Liberty (Article 21)',
        description: 'Comprehensive right covering dignity, privacy, clean environment, speedy trial, right to health, and legal aid.',
        relevantLaws: ['Article 21 of Indian Constitution', 'Puttaswamy Judgment (Right to Privacy)', 'Legal Services Authorities Act, 1987'],
        steps: [
          'If personal liberty or bodily safety is threatened by arbitrary state or private action, immediately report to Magistrate or High Court.',
          'Underprivileged citizens can demand free legal representation from NALSA / DLSA.'
        ],
        documents: ['Incident timeline', 'Police representations', 'Medical/Legal notices'],
        officialPortal: { name: 'National Legal Services Authority (NALSA)', url: 'https://nalsa.gov.in' }
      },
      {
        title: 'Constitutional Remedies (Article 32 & 226)',
        description: 'Enables citizens to file Writs (Habeas Corpus, Mandamus, Prohibition, Certiorari, Quo-Warranto) for enforcement of rights.',
        relevantLaws: ['Article 32 (Supreme Court)', 'Article 226 (High Courts)'],
        steps: [
          'Determine the suitable writ (e.g., Habeas Corpus for illegal detention, Mandamus to compel public duty).',
          'Consult a High Court/Supreme Court advocate or contact State Legal Aid clinic.'
        ],
        documents: ['Representation letters sent to authorities without response', 'Detention details if applicable'],
        officialPortal: { name: 'Supreme Court of India', url: 'https://www.sci.gov.in' }
      }
    ]
  },
  {
    id: 'criminal-law',
    titleEn: 'Criminal Law & Police Procedures',
    titleHi: 'आपराधिक कानून एवं पुलिस प्रक्रियाएं',
    descriptionEn: 'FIR registration, arrest rights, bail procedure, Zero FIR, non-cognizable reports under Bharatiya Nyaya Sanhita (BNS) & BNSS.',
    descriptionHi: 'एफआईआर दर्ज कराने की प्रक्रिया, गिरफ्तारी के अधिकार, जमानत, जीरो एफआईआर और पुलिस जांच नियम।',
    icon: 'ShieldAlert',
    popularTopics: [
      {
        title: 'What to Do if Police Refuse to Register FIR',
        description: 'Police are legally mandated under Section 154 CrPC / Section 173 BNSS (Lalita Kumari judgment) to lodge an FIR for cognizable offences.',
        relevantLaws: ['Section 173 BNSS / Section 154 CrPC', 'Section 175(3) BNSS / Section 154(3) CrPC (Complaint to SP)', 'Section 175(4) BNSS / Section 156(3) CrPC (Magistrate Order)'],
        steps: [
          'Request the duty officer to record the information in writing and give a signed, free copy of the FIR.',
          'If refused, note the officer badge/name and send the complaint via Registered Post / Email to the Superintendent of Police (SP / DCP).',
          'If no action within reasonable time, file an application before the Judicial Magistrate under Section 175(4) BNSS / 156(3) CrPC to order police investigation.',
          'File an online grievance on your State Police Citizen Portal or CPGRAMS.'
        ],
        documents: ['Written complaint with date and time', 'Proof of postal/email receipt sent to SP', 'Any audio/video/witness details'],
        officialPortal: { name: 'Digital Police Citizen Portal (MHA)', url: 'https://digitalpolice.gov.in' }
      },
      {
        title: 'Arrest Rights & Bail Procedures',
        description: 'Fundamental safeguards under D.K. Basu guidelines, right to know grounds of arrest, right to consult lawyer, and medical checkup.',
        relevantLaws: ['Section 35 BNSS / Section 41 CrPC (Notice of appearance)', 'Article 22(1) Constitution', 'Section 54 BNSS (Mandatory medical examination)'],
        steps: [
          'Police must prepare an Arrest Memo with signature of at least one respectable witness.',
          'Arrested person has the right to inform one family member or friend immediately.',
          'Must be produced before nearest Magistrate within 24 hours of arrest (excluding travel time).',
          'Apply for regular or anticipatory bail through counsel or DLSA assigned legal aid advocate.'
        ],
        documents: ['Arrest memo copy', 'Identity cards', 'Surety documents for bail'],
        officialPortal: { name: 'eCourts Services', url: 'https://services.ecourts.gov.in' }
      },
      {
        title: 'Zero FIR Concept',
        description: 'An FIR can be registered at ANY police station irrespective of the territorial jurisdiction where the crime occurred.',
        relevantLaws: ['Section 173(1) BNSS', 'MHA Advisory on Zero FIR', 'Supreme Court guidelines'],
        steps: [
          'Approach the nearest police station immediately in emergency or serious crime.',
          'Insist on recording a "Zero FIR" which receives a provisional number without police jurisdiction boundaries.',
          'The station will initiate preliminary inquiry and transfer it to the jurisdictional police station.'
        ],
        documents: ['Written statement of the incident', 'Victim ID proof', 'Medical report if injury occurred'],
        officialPortal: { name: 'Ministry of Home Affairs (Citizen Services)', url: 'https://mha.gov.in' }
      }
    ]
  },
  {
    id: 'cybercrime',
    titleEn: 'Cybercrime & Online Fraud',
    titleHi: 'साइबर अपराध एवं ऑनलाइन धोखाधड़ी',
    descriptionEn: 'UPI fraud, banking scams, phishing, identity theft, social media blackmail, and reporting to 1930 / cybercrime.gov.in.',
    descriptionHi: 'यूपीआई फ्रॉड, बैंक खाता खाली होना, फर्जी लोन एप्स, सोशल मीडिया हैकिंग और 1930 हेल्पलाइन पर शिकायत।',
    icon: 'Laptop',
    popularTopics: [
      {
        title: 'UPI / Bank Financial Fraud (Golden Hour Action)',
        description: 'Immediate protocol when money is fraudulently debited via UPI, debit card, OTP scam or unauthorized transaction.',
        relevantLaws: ['Section 43 & 66D of Information Technology Act 2000', 'RBI Circular on Limited Liability of Customers in Fraudulent Transactions (2017)'],
        steps: [
          'CRITICAL FIRST STEP: Dial 1930 (National Cyber Financial Fraud Helpline) within 2 hours. Provide transaction ID, bank account, and mobile number to freeze funds in the beneficiary account.',
          'Immediately call your bank helpline to block your ATM card, UPI services, and netbanking credentials.',
          'File a formal cyber complaint on cybercrime.gov.in with screenshots of SMS, debit alerts, and transaction reference (UTR) numbers.',
          'Submit a written dispute form to your bank branch within 3 days to claim zero/limited customer liability under RBI regulations.'
        ],
        documents: ['Bank Account Statement', 'SMS transaction screenshots', 'Call logs/WhatsApp chats with fraudster', 'Cyber complaint acknowledgment copy'],
        officialPortal: { name: 'National Cyber Crime Reporting Portal', url: 'https://cybercrime.gov.in' }
      },
      {
        title: 'Social Media Harassment & Deepfake / Extortion',
        description: 'Protection against non-consensual image sharing, blackmail, fake profiles, and cyberbullying.',
        relevantLaws: ['Section 66E, 67, 67A IT Act', 'Section 78 & 79 Bharatiya Nyaya Sanhita (Stalking & Insulting Modesty)'],
        steps: [
          'Do NOT delete messages or chat logs; take timestamped screenshots and URLs of fake profiles.',
          'Report the account to the platform (Instagram, WhatsApp, Facebook) using in-app report tools.',
          'File a report under "Report Crime Against Women/Children" on cybercrime.gov.in (can be done anonymously).',
          'Never pay any ransom money to extortionists; it will not stop the harassment.'
        ],
        documents: ['Profile URLs of the harasser', 'Unedited chat/call screenshots', 'Phone numbers / email IDs used by attacker'],
        officialPortal: { name: 'Cyber Crime Women & Child Portal', url: 'https://cybercrime.gov.in/Webform/Crime_AuthoLogin.aspx' }
      }
    ]
  },
  {
    id: 'consumer-rights',
    titleEn: 'Consumer Protection & E-Commerce Disputes',
    titleHi: 'उपभोक्ता संरक्षण एवं ई-कॉमर्स विवाद',
    descriptionEn: 'Defective products, refusal of refund, deceptive advertising, service deficiencies, and filing on e-Daakhil / NCH.',
    descriptionHi: 'दोषपूर्ण उत्पाद, रिफंड न मिलना, ई-कॉमर्स धोखाधड़ी और उपभोक्ता आयोग (e-Daakhil) में शिकायत।',
    icon: 'ShoppingBag',
    popularTopics: [
      {
        title: 'Refund Refusal & Defective Products (Consumer Protection Act 2019)',
        description: 'Consumers have the right to seek replacement, full refund, and compensation for deficiency in service or misleading ads.',
        relevantLaws: ['Consumer Protection Act, 2019', 'Consumer Protection (E-Commerce) Rules, 2020'],
        steps: [
          'Send a formal grievance email/letter to customer care and grievance officer of the company.',
          'Call National Consumer Helpline (NCH) at 1915 or register on consumerhelpline.gov.in.',
          'If unresolved within 30 days, file an online consumer complaint on e-Daakhil (edaakhil.nic.in) before District Consumer Commission without mandatory advocate requirement.'
        ],
        documents: ['Tax Invoice / Bill', 'Warranty card', 'Order confirmation email', 'Photos/Videos showing defect', 'Chat/Email correspondence with seller'],
        officialPortal: { name: 'National Consumer Helpline (NCH)', url: 'https://consumerhelpline.gov.in' }
      },
      {
        title: 'How to File a Case on e-Daakhil',
        description: 'Digital platform for filing consumer cases before District, State, and National Consumer Disputes Redressal Commissions.',
        relevantLaws: ['Section 35 Consumer Protection Act 2019', 'e-Daakhil Rules'],
        steps: [
          'Register on edaakhil.nic.in with Aadhaar / mobile verification.',
          'Draft petition outlining facts, grounds of deficiency, and relief sought with index and pagination.',
          'Pay nominal online court fee (zero fee for claims up to ₹5 Lakhs!).',
          'Upload scanned petition, documents, and sworn affidavit.'
        ],
        documents: ['Complaint petition in PDF', 'Supporting invoices & notices', 'Affidavit in prescribed format'],
        officialPortal: { name: 'e-Daakhil Portal', url: 'https://edaakhil.nic.in' }
      }
    ]
  },
  {
    id: 'women-child',
    titleEn: 'Women & Child Rights and Safety',
    titleHi: 'महिला एवं बाल अधिकार एवं सुरक्षा',
    descriptionEn: 'Domestic violence protection, POSH (workplace harassment), POCSO, maintenance under Section 144 BNSS / 125 CrPC, and helpline 181.',
    descriptionHi: 'घरेलू हिंसा से सुरक्षा, कार्यस्थल पर उत्पीड़न (POSH), भरण-पोषण (125 CrPC), बाल संरक्षण और 181 हेल्पलाइन।',
    icon: 'HeartHandshake',
    popularTopics: [
      {
        title: 'Protection of Women from Domestic Violence Act (PWDVA 2005)',
        description: 'Protection against physical, emotional, sexual, verbal, and economic abuse in a shared household.',
        relevantLaws: ['Protection of Women from Domestic Violence Act, 2005', 'Section 85 & 86 BNS / Section 498A IPC (Cruelty by Husband/Relatives)'],
        steps: [
          'Contact Protection Officer (PO) in your district, registered Service Provider NGO, or dial Women Helpline 181 / 112.',
          'File Domestic Incident Report (DIR) before Judicial Magistrate for Protection Orders, Residence Orders, and Monetary Relief.',
          'Can claim free legal representation from DLSA.'
        ],
        documents: ['Marriage certificate or wedding photos', 'Medical reports if assaulted', 'Police complaints/diary entries', 'Details of shared household'],
        officialPortal: { name: 'National Commission for Women (NCW)', url: 'http://ncw.nic.in' }
      },
      {
        title: 'Workplace Sexual Harassment (POSH Act 2013)',
        description: 'Mandatory Internal Complaints Committee (ICC) in every organization with 10+ employees to redress complaints in a time-bound manner.',
        relevantLaws: ['Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013'],
        steps: [
          'Submit written complaint to ICC within 3 months of the incident.',
          'ICC must complete inquiry within 90 days following principles of natural justice.',
          'If employer has no ICC, file complaint with the Local Complaints Committee (LCC) at District Magistrate office or SHe-Box portal.'
        ],
        documents: ['Written complaint detailing date, time, and incident', 'Witness names', 'Relevant emails, chats, or audio recordings'],
        officialPortal: { name: 'SHe-Box (Ministry of Women & Child Development)', url: 'https://shebox.nic.in' }
      }
    ]
  },
  {
    id: 'property-land',
    titleEn: 'Property, Land & Tenancy Laws',
    titleHi: 'संपत्ति, भूमि एवं किरायेदारी अधिकार',
    descriptionEn: 'Sale deed verification, land mutation, RERA builder disputes, tenant eviction safeguards, boundary disputes, and inheritance.',
    descriptionHi: 'जमीन की रजिस्ट्री, दाखिल-खारिज (म्यूटेशन), रेरा (RERA) बिल्डर विवाद, किरायेदार सुरक्षा और पैतृक संपत्ति अधिकार।',
    icon: 'Home',
    popularTopics: [
      {
        title: 'Due Diligence Before Buying Land / Property',
        description: 'Essential checklist to avoid land fraud, double sale, illegal encumbrance, and litigation traps.',
        relevantLaws: ['Transfer of Property Act, 1882', 'Registration Act, 1908', 'Real Estate (Regulation and Development) Act 2016 (RERA)'],
        steps: [
          'Obtain Encumbrance Certificate (EC) for past 30 years from Sub-Registrar office.',
          'Verify Chain of Title deeds (original title documents of previous owners).',
          'Check revenue records (Khatauni / Jamabandi / 7/12 extract) to verify seller is recorded owner with mutation entered.',
          'Ensure approved building plan from local development authority and valid RERA registration number for builder flats.'
        ],
        documents: ['Title Deed copies', 'Encumbrance Certificate', 'Revenue records (Khatauni/7/12)', 'Property tax receipts', 'NOC from society/bank'],
        officialPortal: { name: 'RERA National Portal', url: 'https://rera.mohua.gov.in' }
      },
      {
        title: 'Tenant Rights & Illegal Eviction Safeguards',
        description: 'Tenants cannot be evicted arbitrarily without valid legal grounds, proper notice, or court orders under Model Tenancy Act.',
        relevantLaws: ['Model Tenancy Act, 2021', 'State Rent Control Acts', 'Transfer of Property Act, 1882'],
        steps: [
          'Always execute a registered or notarized Rent Agreement specifying tenure, security deposit, and notice period.',
          'Landlord cannot cut water, electricity, or essential amenities even in case of rent dispute.',
          'Landlord must issue written notice (usually 15-30 days) before initiating eviction proceedings before Rent Authority.'
        ],
        documents: ['Signed Rent Agreement', 'Rent payment receipts / bank transfers', 'Utility bills', 'Correspondence with landlord'],
        officialPortal: { name: 'Ministry of Housing and Urban Affairs', url: 'https://mohua.gov.in' }
      }
    ]
  },
  {
    id: 'gov-services-rti',
    titleEn: 'RTI, Public Grievances & Civic Services',
    titleHi: 'आरटीआई, जन शिकायत एवं सरकारी सेवाएं',
    descriptionEn: 'How to file Right to Information (RTI), CPGRAMS public grievance redressal, obtaining certificates, and government welfare schemes.',
    descriptionHi: 'सूचना का अधिकार (RTI) कैसे लगाएं, CPGRAMS पर सरकारी विभाग की शिकायत, जाति/आय प्रमाण पत्र और सरकारी योजनाएं।',
    icon: 'FileText',
    popularTopics: [
      {
        title: 'How to File an RTI Application (RTI Act 2005)',
        description: 'Every citizen has the legal right to inspect government records, ask questions, and request copies of public documents.',
        relevantLaws: ['Right to Information Act, 2005', 'Section 6 (Filing of application)', 'Section 7 (Time limit of 30 days, or 48 hours for life/liberty)'],
        steps: [
          'Identify the relevant Public Authority (Ministry, Department, PSU).',
          'Frame questions clearly and specifically (ask for facts/records, not opinions/clarifications).',
          'File online at rtionline.gov.in (for Central ministries) or state RTI portal with ₹10 nominal fee (BPL citizens exempt).',
          'If no reply within 30 days, file First Appeal under Section 19(1) to First Appellate Authority.'
        ],
        documents: ['Specific questions list', 'Proof of BPL status if seeking fee exemption', 'Online transaction receipt'],
        officialPortal: { name: 'RTI Online Portal', url: 'https://rtionline.gov.in' }
      },
      {
        title: 'CPGRAMS - Centralized Public Grievance Redress and Monitoring System',
        description: 'National portal to register complaints against delays, corruption, or inaction by any Central or State government department.',
        relevantLaws: ['Department of Administrative Reforms and Public Grievances (DARPG) Guidelines'],
        steps: [
          'Register on pgportal.gov.in with mobile number.',
          'Select the concerned Ministry / Department (Railways, Banking, Telecom, Road Transport, etc.).',
          'Detail your grievance, past representations, and attach evidence (PDF up to 4MB).',
          'Receive unique registration tracking number; authorities must respond within 30-45 days.'
        ],
        documents: ['Previous complaint reference numbers', 'Identity proof', 'Supporting correspondence'],
        officialPortal: { name: 'CPGRAMS Portal', url: 'https://pgportal.gov.in' }
      }
    ]
  }
];
