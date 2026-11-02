import { LegalTerm } from '../types';

export const LEGAL_TERMS: LegalTerm[] = [
  {
    term: 'FIR (First Information Report)',
    hindiTerm: 'प्रथम सूचना रिपोर्ट (एफआईआर)',
    category: 'Criminal Law',
    meaningEn: 'A written document prepared by police when they receive information about the commission of a cognizable offence. It sets criminal law in motion.',
    meaningHi: 'किसी संज्ञेय अपराध की सूचना मिलने पर पुलिस द्वारा तैयार किया गया लिखित दस्तावेज। इसके बाद पुलिस कानूनी जांच शुरू करती है।',
    example: 'Police cannot demand money for lodging an FIR; a free certified copy must be given to the complainant.'
  },
  {
    term: 'Zero FIR',
    hindiTerm: 'जीरो एफआईआर',
    category: 'Criminal Law',
    meaningEn: 'An FIR that can be registered in any police station in India, irrespective of whether the crime took place inside that station jurisdiction. It is later transferred to the appropriate station.',
    meaningHi: 'किसी भी थाने में बिना अधिकार क्षेत्र (Jurisdiction) की सीमा के दर्ज की जाने वाली एफआईआर। बाद में इसे संबंधित थाने को भेजा जाता है।',
    example: 'If an assault occurs while travelling in a train or another city, you can register a Zero FIR at your arrival station.'
  },
  {
    term: 'Cognizable vs Non-Cognizable Offence',
    hindiTerm: 'संज्ञेय बनाम असंज्ञेय अपराध',
    category: 'Criminal Law',
    meaningEn: 'In a cognizable offence (serious crimes like theft, murder, rape), police can arrest without a warrant and investigate immediately. In non-cognizable offences (minor scuffles, defamation), police require a Magistrate warrant.',
    meaningHi: 'संज्ञेय अपराध (गंभीर जैसे चोरी, मारपीट) में पुलिस बिना वारंट के गिरफ्तार कर सकती है। असंज्ञेय अपराध में मजिस्ट्रेट की अनुमति जरूरी होती है।',
    example: 'Financial cyber fraud above certain thresholds is treated as a cognizable offence.'
  },
  {
    term: 'Anticipatory Bail',
    hindiTerm: 'अग्रिम जमानत',
    category: 'Bail & Court Procedure',
    meaningEn: 'Direction issued by the Sessions Court or High Court granting bail to a person anticipating arrest in a non-bailable offence before the arrest actually takes place.',
    meaningHi: 'गिरफ्तारी से पहले ही सेशन कोर्ट या हाईकोर्ट से ली जाने वाली जमानत, ताकि पुलिस हिरासत में न ले सके।',
    example: 'Section 482 of BNSS (formerly Section 438 CrPC) governs anticipatory bail petitions.'
  },
  {
    term: 'Injunction (Stay Order)',
    hindiTerm: 'व्यादेश / स्टे आर्डर',
    category: 'Civil & Property Law',
    meaningEn: 'A judicial order restraining a person from beginning or continuing an action threatening or invading the legal right of another (e.g., stopping illegal demolition or construction on disputed land).',
    meaningHi: 'अदालत का वह आदेश जो किसी व्यक्ति को कोई अवैध काम करने (जैसे विवादित जमीन पर निर्माण या तोड़फोड़) से तुरंत रोकता है।',
    example: 'The court granted a temporary injunction prohibiting the landlord from cutting electricity.'
  },
  {
    term: 'Lok Adalat',
    hindiTerm: 'लोक अदालत (जन अदालत)',
    category: 'Alternative Dispute Resolution',
    meaningEn: 'Statutory forum where pending civil, matrimonial, compoundable criminal, and consumer cases are settled amicably without court fees. The award of Lok Adalat is final and binding with no appeal.',
    meaningHi: 'अदालत का वह मंच जहां बिना कोर्ट फीस के दोनों पक्षों की सहमति से मामलों का अंतिम और स्थायी निपटारा कराया जाता है।',
    example: 'Motor accident claims and unpaid electricity bills are frequently resolved amicably in National Lok Adalats.'
  },
  {
    term: 'Power of Attorney (PoA)',
    hindiTerm: 'मुख्तारनामा / पावर ऑफ अटॉर्नी',
    category: 'Property & Contracts',
    meaningEn: 'A formal legal document authorizing one person (agent/attorney) to act on behalf of another person (principal) in legal, business, or property matters.',
    meaningHi: 'एक कानूनी दस्तावेज जिसके द्वारा एक व्यक्ति किसी अन्य व्यक्ति को अपनी संपत्ति या कानूनी काम करने का अधिकार सौंपता है।',
    example: 'A registered General Power of Attorney is required for executing significant property transactions.'
  },
  {
    term: 'Quashing (482 CrPC / 528 BNSS)',
    hindiTerm: 'एफआईआर या केस रद्द करना (क्वैशिंग)',
    category: 'Criminal Law',
    meaningEn: 'The inherent power of the High Court to nullify a frivolous, false, or settled criminal proceeding or FIR to prevent abuse of the process of law.',
    meaningHi: 'हाईकोर्ट का वह विशेषाधिकार जिसके तहत झूठी एफआईआर या दुर्भावनापूर्ण कानूनी प्रक्रिया को पूरी तरह रद्द किया जाता है।',
    example: 'The High Court quashed the FIR as the parties had mutually settled the civil misunderstanding.'
  },
  {
    term: 'Affidavit',
    hindiTerm: 'शपथ पत्र / हलफनामा',
    category: 'Documentation',
    meaningEn: 'A written statement of facts voluntarily made by an affiant under an oath or affirmation administered by an authorized officer (Notary Public or Oath Commissioner).',
    meaningHi: 'शपथ लेकर नोटरी या कोर्ट कमिश्नर के समक्ष दिया गया लिखित कानूनी बयान, जो अदालत में साक्ष्य के रूप में मान्य होता है।',
    example: 'An affidavit was submitted declaring that all uploaded consumer bill copies were genuine.'
  },
  {
    term: 'Mutation (Dakhil Kharij)',
    hindiTerm: 'दाखिल-खारिज (म्यूटेशन)',
    category: 'Revenue & Land Law',
    meaningEn: 'Recording the transfer of property title from one person to another in the local municipal or revenue records for property tax and land ownership ledger.',
    meaningHi: 'जमीन की रजिस्ट्री के बाद सरकारी राजस्व रिकॉर्ड (खतौनी/नगर निगम) में पुराने मालिक का नाम हटाकर नए खरीदार का नाम दर्ज करना।',
    example: 'Registration of sale deed alone is incomplete until mutation (Dakhil Kharij) is carried out at the Tehsil office.'
  }
];
