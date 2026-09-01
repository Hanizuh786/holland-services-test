

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const file = (...parts) => path.join(root, ...parts);

function exists(p) { return fs.existsSync(p); }
function backup(p) {
  if (!exists(p)) return;
  const b = `${p}.backup`;
  if (!exists(b)) fs.copyFileSync(p, b);
}
function read(p) { return fs.readFileSync(p, 'utf8'); }
function write(p, txt) { backup(p); fs.writeFileSync(p, txt, 'utf8'); }
function replaceMany(p, pairs) {
  if (!exists(p)) return;
  let txt = read(p);
  for (const [from, to] of pairs) txt = txt.split(from).join(to);
  write(p, txt);
}

const sitePath = file('data', 'siteData.json');
if (!exists(sitePath)) {
  console.error('ERROR: data/siteData.json not found. Run this script from the project root.');
  process.exit(1);
}
backup(sitePath);
const site = JSON.parse(read(sitePath));

site.tagline = 'Resourceful | reliable | responsive';
site.seoTitle = 'UAE legal support and Netherlands-related legal services | Holland Legal Services';
site.metaDescription = 'Legal support for UAE matters, Netherlands-related investments, real estate acquisitions and cross-border legal issues.';
site.homeHeading = 'UAE legal support and Netherlands-related legal services';
site.homeLead = 'Holland Legal Services provides legal support for international private and corporate clients with UAE legal matters, and for UAE-based companies, investors and families with Netherlands-related legal matters.';
site.homeIntro = 'We assist with UAE wills, probate, legal opinions, mediation, real estate, business acquisitions, company setup, RAKICC structures, foundations, commercial contracts, shareholder and director disputes, employment matters, privacy and data protection, regulatory complaints, tax, VAT, banking, KYC, document verification, debt collection, UAE documents for use in the Netherlands and UAE-to-Netherlands investments.';

if (site.experts) {
  site.experts = site.experts.map((x) => {
    if (x.name && x.name.includes('Paul Harts')) {
      return {
        ...x,
        name: 'Paul Harts MSc',
        focus: 'Company setup, UAE business structuring, banking readiness, RAKICC support, business acquisitions, leaving the UAE and UAE process coordination.'
      };
    }
    if (x.name && x.name.includes('Hilda')) {
      return {
        ...x,
        focus: 'UAE wills, inheritance, probate, guardianship, legal opinions, mediation, family matters, disputes, document verification, real estate matters and Netherlands-related legal support.'
      };
    }
    return x;
  });
}

if (site.contact) {
  site.contact.office = (site.contact.office || '').replace('Seventh floor', 'seventh floor');
}

const difc = 'https://eregistry.difccourts.ae/will-draftsmen';

const serviceFixes = {
  'expat-will': {
    title: 'UAE wills, probate and guardianship',
    category: 'Estate planning',
    lead: 'Estate planning support for international clients with assets, family or minor children in the UAE.',
    keywords: ['UAE wills', 'UAE probate', 'guardianship UAE', 'DIFC wills', 'ADJD wills'],
    forWho: ['International clients with assets, family or minor children in the UAE', 'Families reviewing guardianship arrangements', 'Clients comparing ADJD and DIFC will options'],
    sections: [
      'Estate planning support for international clients with assets, family or minor children in the UAE. We assist with UAE wills, ADJD and DIFC will options, guardianship arrangements, inheritance planning, probate and estate administration after death.',
      `Hilda van der Tuin is listed as a registered DIFC Will Draftsman. Visitors can verify this through the DIFC Courts registry: ${difc}`,
      'The page should focus on practical estate planning, guardianship, probate and cross-border document use rather than a narrow expat-only will offer.'
    ],
    process: ['Initial intake and family structure review', 'Asset and guardianship information collection', 'ADJD and DIFC will option review', 'Drafting and legal review', 'Registration route discussion and submission support'],
    faqs: [['Can visitors verify DIFC Will Draftsman registration?', `Yes. Add this registry link in the DIFC wills section: ${difc}`], ['Is this only for Dutch or Belgian clients?', 'No. The wording should address international private clients with UAE assets, families or minor children.']]
  },
  'vcc-variable-capital-company': {
    title: 'Company setup, RAKICC structures and business structuring in the UAE',
    category: 'Business structuring',
    lead: 'Company setup and business structuring support for entrepreneurs, investors and businesses in the UAE.',
    keywords: ['company setup UAE', 'business structuring UAE', 'RAKICC structures', 'banking readiness UAE', 'TRN readiness'],
    forWho: ['Entrepreneurs and investors setting up in the UAE', 'Clients reviewing freezone, mainland or RAKICC structures', 'Businesses that need banking, VAT, TRN and corporate tax readiness'],
    sections: ['Company setup and business structuring support for entrepreneurs, investors and businesses in the UAE.', 'We assist with freezone and mainland options, licence selection, shareholder structure, managers, UBO information, leases, banking readiness, VAT, TRN and corporate tax points.', 'We also assist with RAKICC companies, SPVs, foundations, governance documents, registers, annual filings, corporate records and ongoing legal coordination.'],
    process: ['Business purpose and founder profile review', 'Freezone, mainland and RAKICC option review', 'Banking-readiness document planning', 'Licence and incorporation coordination', 'TRN, VAT and corporate tax readiness checklist']
  },
  'leaving-the-uae': {
    title: 'Leaving the UAE and moving to the Netherlands',
    category: 'UAE transition',
    lead: 'Legal and coordination support for residents, families and entrepreneurs leaving the UAE or moving to the Netherlands.',
    keywords: ['leaving the UAE', 'moving to the Netherlands', 'UAE-to-Netherlands transition', 'tax residence UAE Netherlands'],
    forWho: ['Residents leaving the UAE', 'Families moving to the Netherlands', 'Entrepreneurs with UAE assets, companies or bank accounts'],
    sections: ['Legal and coordination support for residents, families and entrepreneurs leaving the UAE or moving to the Netherlands.', 'We assist with tax residence points, documents, UAE assets, companies, bank accounts, housing, healthcare, family issues, business interests and open obligations in the UAE.', 'The wording should avoid the question mark and make the scope clearer.'],
    process: ['Departure reason and destination mapping', 'Document and UAE obligation review', 'Tax residence and open business-interest review', 'Housing, healthcare and family coordination points', 'UAE bank account, asset and company follow-up']
  },
  'legalisations': {
    title: 'UAE document legalisation and notarial support for the Netherlands',
    category: 'Documents',
    lead: 'Support with UAE documents that need to be used in the Netherlands.',
    keywords: ['UAE document legalisation Netherlands', 'notarial support Netherlands', 'UAE documents for Dutch notary', 'document verification UAE'],
    forWho: ['Clients with UAE documents for use in the Netherlands', 'Companies preparing corporate documents for Dutch advisers', 'Families managing powers of attorney, certified copies or declarations'],
    sections: ['Support with UAE documents that need to be used in the Netherlands.', 'We assist with legalisation, notarisation, powers of attorney, certified copies, declarations, translations, document review and coordination with Dutch notaries, lawyers or other advisers.', 'Avoid broad wording about the European Union unless the matter clearly concerns a suitable jurisdiction.'],
    process: ['Document purpose review', 'Receiving-country requirement check', 'Notarisation, legalisation or translation coordination', 'Dutch notary, lawyer or adviser coordination', 'Final file consistency review']
  },
  'labor-disputes': {
    title: 'Employment and settlement support',
    category: 'Employment',
    lead: 'Employment support for employers, employees, managers, directors and senior staff in the UAE.',
    keywords: ['employment settlement UAE', 'labour support UAE', 'end-of-service gratuity UAE', 'settlement agreement UAE'],
    sections: ['Employment support for employers, employees, managers, directors and senior staff in the UAE.', 'We assist with employment contracts, termination, end-of-service gratuity, bonuses, non-compete clauses, confidentiality, settlement agreements, freezone forms, mainland employment issues and visa cancellation points.', 'Use British English. Avoid American spelling “Labor” in visible copy.'],
    process: ['Employment document review', 'Termination or settlement issue mapping', 'Freezone or mainland process check', 'Settlement correspondence and document support', 'Visa cancellation and final-obligation coordination']
  },
  'rent-disputes': {
    title: 'Real estate legal support and property acquisitions',
    category: 'Real estate',
    lead: 'Legal support for property buyers, owners, tenants and investors.',
    keywords: ['real estate legal support UAE', 'property acquisitions UAE', 'off-plan property disputes UAE', 'developer disputes UAE'],
    sections: ['Legal support for property buyers, owners, tenants and investors.', 'We assist with real estate purchases, SPA review, reservation forms, off-plan property issues, developer disputes, handover issues, title deed and Oqood issues, escrow issues, service charges, rent increases, deposit disputes and settlement negotiations.', 'Rent disputes are only one part of the real estate work, so the service name should be broader.'],
    process: ['Property document review', 'Risk and authority point identification', 'Negotiation or settlement strategy', 'Developer, landlord, tenant or authority correspondence', 'Completion, handover or escalation support']
  },
  'filing-for-divorce': {
    title: 'Divorce, marriage contracts and family matters',
    category: 'Family matters',
    lead: 'Legal support for cross-border family matters involving the UAE, the Netherlands or international families.',
    keywords: ['divorce UAE Netherlands', 'ADJD marriage contracts', 'family matters UAE', 'cross-border family UAE'],
    sections: ['Legal support for cross-border family matters involving the UAE, the Netherlands or international families.', 'We assist with divorce, ADJD marriage contracts, financial arrangements, children, relocation issues, travel restrictions, settlement discussions and documents for use in the UAE or the Netherlands.', 'The service should not be limited to filing for divorce.'],
    process: ['Family situation and jurisdiction review', 'Marriage contract or divorce document review', 'Children, relocation and travel issue mapping', 'Settlement discussion and document support', 'UAE or Netherlands document coordination']
  },
  'foundations': {
    title: 'Foundations and family wealth structuring',
    category: 'Private wealth',
    lead: 'Foundation and private wealth structuring for families, entrepreneurs and investors with UAE assets or cross-border interests.',
    keywords: ['RAKICC foundations', 'family wealth structuring UAE', 'succession planning UAE', 'private wealth UAE'],
    sections: ['Foundation and private wealth structuring for families, entrepreneurs and investors with UAE assets or cross-border interests.', 'We assist with succession planning, governance, Qualified Recipients, advisers, asset holding, real estate structures, probate-risk reduction and Netherlands-related attention points.', 'The title should show the private wealth, governance and succession angle.'],
    process: ['Family wealth objective review', 'Asset holding and governance mapping', 'Foundation or structure option review', 'Adviser and Qualified Recipient coordination', 'Ongoing records and compliance support']
  },
  'unpaid-invoices': {
    title: 'Debt collection and settlement negotiations',
    category: 'Claims and settlement',
    lead: 'Debt collection support for businesses and private clients dealing with unpaid invoices or outstanding claims.',
    keywords: ['debt collection UAE', 'settlement negotiations UAE', 'unpaid claims UAE', 'demand letters UAE'],
    sections: ['Debt collection support for businesses and private clients dealing with unpaid invoices or outstanding claims.', 'We assist with demand letters, evidence files, settlement negotiations, debtor communication, jurisdiction points, freezone or mainland debtor issues and escalation options.', 'The service is broader than invoices only, so avoid capitalised “Unpaid Invoices” as the service label.'],
    process: ['Evidence and claim review', 'Debtor and jurisdiction check', 'Demand letter or settlement route preparation', 'Debtor communication and negotiation support', 'Escalation option review']
  },
  'business-set-up': {
    title: 'Company setup and business structuring in the UAE',
    category: 'Business formation',
    lead: 'Company setup and business structuring support for entrepreneurs, investors and businesses in the UAE.',
    keywords: ['company setup UAE', 'business structuring UAE', 'corporate bank account UAE', 'licence UAE', 'TRN readiness'],
    sections: ['Company setup and business structuring support for entrepreneurs, investors and businesses in the UAE.', 'Formation should be designed around banking, activity, compliance and realistic operations, not only a quick licence.', 'We assist with freezone and mainland options, licence selection, shareholder structure, managers, UBO information, leases, banking readiness, VAT, TRN and corporate tax points.'],
    process: ['Business activity and founder profile review', 'Freezone versus mainland decision support', 'Banking-readiness document planning', 'Licence and incorporation coordination', 'TRN, VAT and corporate tax launch checklist']
  }
};

const extraServices = [
  ['legal-opinions-document-review-fraud-checks', 'Legal opinions, document review, second opinions and fraud checks', 'Independent legal opinions and document review for UAE and Netherlands-related matters.'],
  ['mediation-and-dispute-resolution', 'Mediation and dispute resolution', 'Mediation and dispute resolution support for family, business, employment, shareholder and cross-border disputes involving the UAE, the Netherlands or international parties.'],
  ['netherlands-related-legal-services', 'Netherlands-related legal services for UAE-based clients', 'Legal support for UAE-based clients, Emirati clients, UAE companies, investors and families with legal matters connected to the Netherlands.'],
  ['business-acquisitions-uae', 'Business acquisitions in the UAE', 'Legal support for clients buying or selling a business in the UAE.'],
  ['uae-to-netherlands-investment-acquisitions', 'UAE-to-Netherlands investment and acquisitions', 'Legal and practical support for UAE companies, Emirati investors and UAE-based family businesses investing in the Netherlands or acquiring a Dutch business.'],
  ['commercial-contracts-corporate-documents', 'Commercial contracts and corporate documents', 'Review and drafting support for commercial contracts and corporate documents.'],
  ['shareholder-director-disputes', 'Shareholder and director disputes', 'Legal support for shareholder and director disputes involving UAE companies, freezone entities, family businesses and cross-border structures.'],
  ['corporate-tax-vat-business-compliance', 'Corporate tax, VAT and business compliance', 'Legal and practical guidance for entrepreneurs, companies, foundations and structures in the UAE.'],
  ['banking-kyc-source-of-funds-support', 'Banking, KYC and source-of-funds support', 'Support with banking readiness, KYC questions, source-of-funds documentation and source-of-wealth documentation in UAE and Netherlands-related matters.'],
  ['privacy-gdpr-data-protection', 'Privacy, GDPR and data protection', 'Privacy and data protection support for businesses with UAE, Dutch or cross-border operations.'],
  ['regulatory-complaints-authority-escalation', 'Regulatory complaints and authority escalation', 'Support with complaints, escalation and authority communication in UAE-related matters.']
].map(([slug, title, lead]) => ({
  slug, title, category: 'Legal support', lead,
  keywords: [title, 'UAE legal support', 'Netherlands-related legal services'],
  forWho: ['International private and corporate clients', 'UAE-based companies, investors and families', 'Clients who need structured legal orientation before taking action'],
  sections: [lead, 'This service has been added to keep the original website structure while making the homepage service coverage broader and aligned with client feedback.'],
  process: ['Clarify the facts', 'Collect documents', 'Review options', 'Decide the next step'],
  faqs: [['Is this general information or legal advice?', 'The website provides orientation and invites a professional review for the specific situation.']]
}));

site.services = Array.isArray(site.services) ? site.services : [];
site.services = site.services.map((s) => serviceFixes[s.slug] ? { ...s, ...serviceFixes[s.slug] } : s);
for (const s of extraServices) {
  if (!site.services.some((existing) => existing.slug === s.slug)) site.services.push(s);
}

if (Array.isArray(site.insights)) {
  site.insights = site.insights.map((x) => {
    if (x.slug === 'vat-number') {
      return { ...x, title: 'VAT and TRN readiness', lead: 'A clear explanation of VAT, TRN readiness and why entrepreneurs should not treat tax registration as an afterthought.' };
    }
    if (x.slug === 'uae-inheritance-law-and-the-dutch') {
      return { ...x, title: 'UAE inheritance law', lead: 'Guidance for international clients who want to understand how UAE inheritance rules can interact with residence, wills, guardianship, probate and assets.', sections: (x.sections || []).map((p) => p.replace('Dutch residents in the UAE', 'International clients in the UAE').replace('Dutch families', 'international families').replace('Expat Will page', 'UAE wills, probate and guardianship page')) };
    }
    return x;
  });
}

write(sitePath, JSON.stringify(site, null, 2));

replaceMany(file('components', 'Header.jsx'), [
  ['Privacy=ON', 'Privacy'],
  ['Contact Us', 'Contact us']
]);
replaceMany(file('components', 'Footer.jsx'), [
  ['Privacy=ON', 'Privacy'],
  ['Contact Us', 'Contact us']
]);
replaceMany(file('components', 'CTA.jsx'), [
  ['Contact Us', 'Contact us'],
  ['route the enquiry to the right expert', 'send the enquiry to the right expert']
]);
replaceMany(file('components', 'ContactForm.jsx'), [
  ['Paul Harts M.sc', 'Paul Harts MSc']
]);
replaceMany(file('server', 'index.js'), [
  ['Paul Harts M.sc', 'Paul Harts MSc']
]);
replaceMany(file('components', 'ExpertStrip.jsx'), [
  ['People first, not layers', 'You know who handles your matter'],
  ['Visitors should see who they are contacting. The site therefore uses expert cards across service, insight and contact pages.', 'Visitors should immediately understand who they are dealing with. Holland Legal Services gives clients direct access to the people reviewing, structuring and coordinating their legal matter.']
]);
replaceMany(file('components', 'HomeSections.jsx'), [
  ['Legal Services in the UAE for Dutch & Belgian Entrepreneurs and Expats', 'UAE legal support and Netherlands-related legal services'],
  ['Start a company in Dubai, arrange your legal structure, and avoid costly mistakes. We provide direct expert support for business setup, wills, document legalisation, and corporate structuring — tailored for Dutch and Belgian clients.', 'Holland Legal Services provides legal support for international private and corporate clients with UAE legal matters, and for UAE-based companies, investors and families with Netherlands-related legal matters.'],
  ['Clear advice. Fixed pricing where possible. No outsourcing. Direct contact with experts who understand both Dutch and UAE systems.', 'Clear advice. Direct contact. Fixed fees where possible. Legal support from professionals who understand UAE legal processes and Netherlands-related legal matters.'],
  ['Guides & Answers', 'Legal guides and answers'],
  ['Contact Us', 'Contact us']
]);
replaceMany(file('app', 'layout.jsx'), [
  ['Holland Legal Services | Dutch Legal Experts in Dubai, UAE', 'UAE legal support and Netherlands-related legal services | Holland Legal Services'],
  ['SEO-focused Dutch legal services website for expats, entrepreneurs and families in Dubai and the UAE.', 'Legal support for UAE matters, Netherlands-related investments, real estate acquisitions and cross-border legal issues.'],
  ['Dutch lawyer Dubai', 'UAE legal support'],
  ['Dutch legal services UAE', 'Netherlands-related legal services'],
  ['Expat Will UAE', 'UAE wills'],
  ['business setup Dubai', 'company setup UAE'],
  ['legalisation UAE', 'UAE document legalisation Netherlands'],
  ['rent disputes Dubai', 'real estate legal support UAE'],
  ['UAE inheritance law Dutch', 'UAE inheritance law'],
  ['Resourceful, reliable and responsive legal services in the UAE.', 'UAE legal support and Netherlands-related legal services.']
]);
replaceMany(file('public', 'images', 'paul-placeholder.svg'), [
  ['Paul Harts M.sc', 'Paul Harts MSc']
]);
replaceMany(file('README.md'), [
  ['Contact Us', 'Contact us'],
  ['Privacy=ON page', 'Privacy page'],
  ['Expat Will', 'UAE wills, probate and guardianship'],
  ['VCC | Variable Capital Company', 'Company setup, RAKICC structures and business structuring'],
  ['Leaving the UAE?', 'Leaving the UAE and moving to the Netherlands'],
  ['Legalisations', 'UAE document legalisation and notarial support for the Netherlands'],
  ['labor-disputes', 'employment-settlement-support'],
  ['Labor disputes', 'Employment and settlement support'],
  ['Rent disputes', 'Real estate legal support and property acquisitions'],
  ['Filing for divorce', 'Divorce, marriage contracts and family matters'],
  ['Unpaid Invoices', 'Debt collection and settlement negotiations'],
  ['Business Set Up', 'Company setup and business structuring in the UAE'],
  ['uae-inheritance-law-and-the-dutch', 'uae-inheritance-law']
]);

console.log('Done. Client fixes applied without deleting original files or routes.');
console.log('Backups were created next to changed files.');
console.log('Run: npm run dev');
