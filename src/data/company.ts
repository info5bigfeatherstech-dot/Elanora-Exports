export interface StatMetric {
  number: string;
  label: string;
  sublabel: string;
}

export const STATS: StatMetric[] = [
  { number: '28', label: 'Years in Export Manufacturing', sublabel: 'Operating since 1998' },
  { number: '42', label: 'Countries Served Worldwide', sublabel: 'USA, UK, EU, UAE, Australia' },
  { number: '250,000', label: 'Units Monthly Capacity', sublabel: 'Scalable across 3 dedicated units' },
  { number: '99.4%', label: 'On-Time Port Delivery', sublabel: 'Verified across FY24-26 audits' },
];

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  equipment: string[];
}

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'knitting',
    number: '01',
    title: 'Computerized Gauge Knitting',
    subtitle: 'German & Japanese flat bed technology from 3GG to 18GG',
    description: 'Our knitting division houses 84 computerized Shima Seiki and Stoll flatbed knitting machines capable of complex jacquards, intarsia, fully-fashioned armholes, and seamless continuous knit structures. We spin and knit Australian merino, baby alpaca, silk-cotton, and recycled cashmere yarns.',
    specs: ['Gauges: 3GG, 5GG, 7GG, 12GG, 14GG, 16GG', 'Intarsia, Cable, Milano, Rib, Plating stitches', 'Zero-yarn-waste fully fashioned panels'],
    equipment: ['Shima Seiki MACH2XS WHOLEGARMENT®', 'Stoll CMS 530 HP Flat Knitting', 'Computerized Yarn Tension Feeders'],
  },
  {
    id: 'cut-and-sew',
    number: '02',
    title: 'Precision Cut & Sew Tailoring',
    subtitle: 'CAD pattern grading with automated Gerber tensionless spreading',
    description: 'High-speed automated spreading and CNC knife cutting ensure millimeter-accurate panel matching across delicate silks, compact pontes, and stretch activewear fabrics. Over 450 skilled machinists operating specialized Juki and Pegasus workstations configured for french seams, bound lapels, and 4-needle flatlock construction.',
    specs: ['Automated tensionless spreading for elastane blends', 'Optitex & Lectra CAD pattern conversion', 'Daily cut capacity of 18,000 garments'],
    equipment: ['Gerber Paragon® Multi-Ply CNC Cutters', 'Juki DDL-9000C Digital Direct-Drive Lockstitch', 'Pegasus W500PV Interlock Flatlock Workstations'],
  },
  {
    id: 'dyeing-wash',
    number: '03',
    title: 'Eco-Certified Dyeing & Wash Plant',
    subtitle: 'Zero Liquid Discharge (ZLD) closed-loop water treatment facility',
    description: 'In-house continuous and garment dyeing supporting strict Pantone TCX color-matching standards. Our modern dyehouse utilizes low-liquor ratio soft-flow jets and enzymatic wash systems to achieve sandwashed cupro, vintage garment dyes, silicone softness, and water-repellent eco-coatings.',
    specs: ['Pantone Cotton TCX / TPX precision formulation', 'Delta-E color tolerance below 0.8', '100% biological Effluent Treatment & ZLD recycling'],
    equipment: ['Thies Eco-Bloc Soft-Flow Dye Vessels', 'Tonello Washing & Garment Dyeing Machines', 'Datacolor 800 Spectrophotometers'],
  },
  {
    id: 'embroidery-embellishment',
    number: '04',
    title: 'Architectural Embroidery & Trims',
    subtitle: 'Bespoke branding, laser etching, and corded threadwork',
    description: '24-head Barudan and Tajima computerized embroidery machines running high-tensile Madeira threads, metallic cords, and tonal applique. We engineer placement embroideries, silicone heat transfers, debossed leather patches, and custom metal aglets that give private label brands distinct shelf authority.',
    specs: ['Tonal satin stitch, tatami fill, 3D puff embroidery', 'Laser cut applique edge seals', 'Silicone micro-dot grip printing'],
    equipment: ['Tajima TMAR-KC 24-Head Multi-Needle', 'Barudan High-Speed Tubular Embroidery', 'Automated Thermal Heat Seal Presses'],
  },
  {
    id: 'finishing-lab',
    number: '05',
    title: 'Finishing, Pressing & In-House Testing Lab',
    subtitle: 'ISO 17025 accredited laboratory for pre-shipment clearance',
    description: 'Every production lot undergoes rigorous in-house physical and chemical testing prior to packing: Martindale pilling, dimensional stability after washing, lightfastness, and tensile seam strength. Garments are hand-steamed on vacuum tables, needle-detected twice, and packed according to international retail distribution protocols.',
    specs: ['AATCC / ISO test reports provided with each shipment', '100% needle detector scan with dual magnetic sensors', 'Custom barcoding, RFID tagging, and hanger packs'],
    equipment: ['Veit Steam Tables & Tunnel Finishers', 'Hashima Dual-Head Conveyor Needle Detectors', 'James Heal Martindale Pilling & Abrasion Tester'],
  },
];

export interface JourneyStep {
  number: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const PRODUCTION_JOURNEY: JourneyStep[] = [
  {
    number: '01',
    phase: 'Brief & Costing',
    title: 'Technical Brief & Target Costing',
    duration: '24–48 Hours',
    description: 'Submit your tech pack, reference garment, or select from our seasonal curated library. Our technical merchandising team evaluates consumption, yarn availability, and provides transparent FOB price breakdown with volume tiers.',
    deliverables: ['Detailed Bill of Materials (BOM)', 'Target FOB Price Confirmation', 'Material Swatch Cards Dispatch'],
  },
  {
    number: '02',
    phase: 'Sampling',
    title: 'Proto & Fit Sample Development',
    duration: '7–10 Days',
    description: 'Our pattern masters craft your initial physical prototype in requested size specifications. We provide digital 3D fitting simulations and ship physical samples via DHL/FedEx Express for buyer evaluation.',
    deliverables: ['1st Fit Prototype Sample', 'Lab Dips (Pantone TCX swatches)', 'Trim & Label Mockups'],
  },
  {
    number: '03',
    phase: 'Approval',
    title: 'Pre-Production (PP) Approval',
    duration: '3–5 Days',
    description: 'Upon buyer fit feedback, we execute the final Gold Seal Pre-Production sample in correct production bulk fabric with approved trims, polybags, and care labeling. Bulk production begins only after signed approval.',
    deliverables: ['Signed Gold Seal PP Sample', 'Size Set Grading Verification', 'Final Production Schedule Matrix'],
  },
  {
    number: '04',
    phase: 'Bulk Production',
    title: 'Bulk Manufacturing & In-Line QC',
    duration: '4–7 Weeks',
    description: 'Fabric knitting/weaving, dyeing, cutting, assembly, and embellishments run simultaneously across dedicated production lines. In-line quality inspectors monitor operations at every stage according to AQL 1.5 standards.',
    deliverables: ['Weekly Milestones & Photographic Updates', 'In-Line QC Progress Audits', 'Shipment Packaging Verification'],
  },
  {
    number: '05',
    phase: 'Final Inspection',
    title: 'Final Quality Audit (AQL 1.5/2.5)',
    duration: '2 Days',
    description: 'Comprehensive pre-shipment inspection (PSI) by our internal QA directorate or designated third-party auditor (SGS, Intertek, Bureau Veritas) checking measurements, stitching, color harmony, and carton barcodes.',
    deliverables: ['Signed Comprehensive QC Inspection Report', 'Lab Performance Test Certificates', 'Certificate of Origin Documentation'],
  },
  {
    number: '06',
    phase: 'Global Logistics',
    title: 'Customs Clearance & Port Dispatch',
    duration: 'Scheduled to Incoterms',
    description: 'Export clearance handled seamlessly. Containers loaded at our factory and trucked under GPS seal to loading ports (Nhava Sheva / Mumbai / Mundra) for ocean freight, or air freighted via Mumbai International (BOM).',
    deliverables: ['Commercial Invoice & Packing List', 'Bill of Lading (B/L) / Air Waybill (AWB)', 'GSP Form / EUR.1 / COO Documents'],
  },
];

export interface ComplianceCertification {
  name: string;
  issuer: string;
  scope: string;
  idNumber: string;
}

export const COMPLIANCE_CERTIFICATIONS: ComplianceCertification[] = [
  { name: 'OEKO-TEX® Standard 100', issuer: 'Hohenstein Institute', scope: 'Tested for harmful substances across all yarn, fabrics & trims (Class II Apparel)', idNumber: 'VN020 184922' },
  { name: 'GOTS Certified Organic', issuer: 'Control Union Certifications', scope: '100% Organic Cotton fiber procurement, processing & non-toxic dyeing', idNumber: 'CU-892147-GOTS' },
  { name: 'SEDEX SMETA 4-Pillar', issuer: 'Sedex Global / SGS Audit', scope: 'Labor standards, Health & Safety, Environmental stewardship, Business ethics', idNumber: 'SMETA-4P-2024-819' },
  { name: 'WRAP Gold Certificate', issuer: 'Worldwide Responsible Accredited Production', scope: 'Full compliance with 12 WRAP principles for ethical manufacturing', idNumber: 'WRAP-G-99412' },
  { name: 'amfori BSCI Grade A', issuer: 'amfori Social Audit', scope: 'Fair wages, no child labor, occupational safety, audited every 12 months', idNumber: 'BSCI-ID-182390' },
  { name: 'ZDHC Level 3 Compliant', issuer: 'Zero Discharge of Hazardous Chemicals', scope: 'Chemical gateway verified against MRSL standards for zero wastewater pollution', idNumber: 'ZDHC-IN-49210' },
];

export interface MarketServed {
  country: string;
  code: string;
  share: string;
  ports: string;
  leadTransit: string;
}

export const MARKETS_SERVED: MarketServed[] = [
  { country: 'United States', code: 'USA', share: '38% of Export Volume', ports: 'Long Beach, NY/NJ, Savannah, Los Angeles', leadTransit: '24–28 days ocean / 3–5 days air' },
  { country: 'United Kingdom', code: 'GBR', share: '24% of Export Volume', ports: 'Felixstowe, Southampton, London Gateway', leadTransit: '20–24 days ocean / 2–4 days air' },
  { country: 'European Union', code: 'EUR', share: '20% of Export Volume', ports: 'Rotterdam, Hamburg, Antwerp, Le Havre', leadTransit: '22–26 days ocean / 3–4 days air' },
  { country: 'Australia & NZ', code: 'AUS', share: '11% of Export Volume', ports: 'Sydney (Port Botany), Melbourne, Fremantle', leadTransit: '16–20 days ocean / 3–5 days air' },
  { country: 'Middle East', code: 'UAE', share: '7% of Export Volume', ports: 'Jebel Ali (Dubai), Jeddah, Dammam', leadTransit: '5–8 days ocean / 1–2 days air' },
];

export interface BuyerTestimonial {
  quote: string;
  buyerName: string;
  title: string;
  company: string;
  location: string;
  styleOrdered: string;
}

export const TESTIMONIALS: BuyerTestimonial[] = [
  {
    quote: "Finding an export partner who respects millimetric grading tolerances and delivers pristine double-cloth coats without delays transformed our wholesale margin. Elanora has produced our outerwear line for six consecutive seasons.",
    buyerName: 'Helena Vance',
    title: 'Sourcing Director',
    company: 'Atelier Mara London',
    location: 'London, United Kingdom',
    styleOrdered: 'Outerwear & Tailored Blazers (18,000 units/season)',
  },
  {
    quote: "Their seamless activewear interlock is genuinely superior to our previous Far East suppliers. Squat-test opacity is 100%, and their team handled custom silicone heat transfers and biodegradable packaging flawlessly.",
    buyerName: 'Marcus Lindqvist',
    title: 'Head of Product Development',
    company: 'NORD Athletics Retail Group',
    location: 'Stockholm, Sweden',
    styleOrdered: 'Technical Leggings & Bras (32,000 units/year)',
  },
  {
    quote: "Elanora understands private label nuances. When we requested custom Pantone dye lots on 22mm silk robes, lab dips arrived within 5 days and matched our master swatches on the first submission.",
    buyerName: 'Claire St. John',
    title: 'Senior Merchandiser',
    company: 'Vanderbilt & Co. Department Stores',
    location: 'New York, United States',
    styleOrdered: 'Silk & Modal Sleepwear Collections',
  },
  {
    quote: "For an independent multi-brand boutique chain in Melbourne, their 400-500 piece MOQs allowed us to produce proprietary knitwear lines without sitting on suffocating inventory. Delivery arrived three days ahead of schedule.",
    buyerName: 'Gemma Rossi',
    title: 'Founder & Buying Principal',
    company: 'Rossi Contemporary Boutiques',
    location: 'Melbourne, Australia',
    styleOrdered: 'Merino Knits & Cashmere Blends',
  },
];

export interface FAQItem {
  question: string;
  category: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    question: 'What is your Minimum Order Quantity (MOQ)?',
    category: 'Ordering & MOQ',
    answer: 'Our standard production MOQ is 500 pieces per style, with a minimum of 200–250 pieces per colorway across graded sizes (e.g., XS to XL). For specialized heavy outerwear, we accept initial trial orders starting at 300–400 pieces per style. We do not sell individual consumer units or open-stock retail packs.',
  },
  {
    question: 'How do you handle sample development and proto costs?',
    category: 'Sampling',
    answer: 'We develop physical proto samples, size sets, and counter-samples within 7 to 10 business days. Sample costs are charged at 2x the indicated FOB unit price plus DHL/FedEx courier fees. Upon receipt and placement of your commercial bulk purchase order, sample fees are 100% credited against your final invoice.',
  },
  {
    question: 'What are your standard bulk production lead times?',
    category: 'Lead Times',
    answer: 'Standard bulk production requires 6 to 8 weeks ex-factory upon final Pre-Production (Gold Seal) approval and receipt of fabric greige. For repeat re-orders using running stock yarns, lead times can be compressed to 4 to 5 weeks. Heavy tailored outerwear requires 8 to 10 weeks.',
  },
  {
    question: 'What payment terms do you offer international wholesale buyers?',
    category: 'Commercial Terms',
    answer: 'For first-time buyers, our standard terms are 30% advance deposit by Telegraphic Transfer (T/T) upon order confirmation, and the balance 70% against copy of Bill of Lading (B/L) and signed inspection clearance. We also routinely accept 100% Irrevocable Letter of Credit (L/C) at sight issued by first-class international banks for orders exceeding USD 50,000.',
  },
  {
    question: 'Which Incoterms and shipping methods do you support?',
    category: 'Logistics',
    answer: 'We quote predominantly on FOB (Free On Board) basis from Nhava Sheva (JNPT) or Mumbai Air Cargo. We also provide competitive CIF (Cost, Insurance & Freight) or DDP (Delivered Duty Paid) quotes directly to your regional fulfillment centers through our freight partnerships with Kuehne+Nagel, Maersk, and DHL Global Forwarding.',
  },
  {
    question: 'Can you manufacture to our proprietary tech packs and private label trims?',
    category: 'Private Label',
    answer: 'Yes. Over 85% of our production is full-package private label OEM/ODM. You may provide tech packs in PDF, AI, or Excel format. We produce custom woven damask labels, printed satin care tags, engraved horn/corozo/metal buttons, branded zippers, and barcoded retail polybags exactly to your brand manual.',
  },
  {
    question: 'What quality assurance standards and audit policies are enforced?',
    category: 'Quality Control',
    answer: 'Our facilities strictly adhere to AQL 1.5 for major defects and AQL 2.5 for minor defects. We maintain an in-house ISO 17025 accredited testing laboratory and welcome buyers or third-party inspection agencies (SGS, Intertek, Bureau Veritas) at any time during production or pre-shipment clearance.',
  },
];

export interface LookbookHotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  productId: string;
  styleCode: string;
  name: string;
  moq: string;
  fob: string;
}

export interface LookbookSlide {
  id: string;
  title: string;
  season: string;
  editorialNote: string;
  image: string;
  hotspots: LookbookHotspot[];
}

export const LOOKBOOK_SLIDES: LookbookSlide[] = [
  {
    id: 'lb-1',
    title: 'The Sartorial Heavyweights',
    season: 'Autumn / Winter Lineplan',
    editorialNote: 'Structured virgin wool tailoring paired against high-gauge Australian merino knits. Designed for clean international commercial merchandising.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    hotspots: [
      { id: 'h1', x: 42, y: 35, productId: 'ela-ow-103', styleCode: 'ELA-OW-103', name: 'Double-Breasted Wool Blazer', moq: 'MOQ 400 pcs', fob: 'Custom RFQ' },
      { id: 'h2', x: 65, y: 68, productId: 'ela-kn-012', styleCode: 'ELA-KN-012', name: 'Architectural Rib Cardigan', moq: 'MOQ 500 pcs', fob: 'Custom RFQ' },
    ],
  },
  {
    id: 'lb-2',
    title: 'Tactile Warmth & Raw Texture',
    season: 'Core Knitwear Assortment',
    editorialNote: 'Sculptural rib textures, organic combed cottons, and high-loft alpaca blends constructed on computerized flatbed knitting frames.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=80',
    hotspots: [
      { id: 'h3', x: 48, y: 44, productId: 'ela-kn-018', styleCode: 'ELA-KN-018', name: 'Fine Gauge High-Neck Pullover', moq: 'MOQ 500 pcs', fob: 'Custom RFQ' },
    ],
  },
  {
    id: 'lb-3',
    title: 'Pure Silk & Fluid Drapery',
    season: 'Sartorial Nightwear & Lounge',
    editorialNote: '22-momme sandwashed mulberry silk charmeuse with hand-finished french seams, built for luxury department stores and destination resorts.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80',
    hotspots: [
      { id: 'h4', x: 50, y: 52, productId: 'ela-lw-044', styleCode: 'ELA-LW-044', name: 'Washed Mulberry Silk Robe', moq: 'MOQ 400 pcs', fob: 'Custom RFQ' },
    ],
  },
];
