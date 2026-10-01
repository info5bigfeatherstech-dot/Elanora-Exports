export interface CategoryMetadata {
  id: 'knitwear-sweaters' | 'loungewear-sleepwear' | 'activewear-athleisure' | 'outerwear-layering';
  number: string;
  name: string;
  shortTitle: string;
  tagline: string;
  description: string;
  subcategories: string[];
  bannerImage: string;
  featuredStyleCode: string;
  typicalMOQ: string;
  leadTime: string;
  primaryFabrics: string[];
}

export const CATEGORIES: CategoryMetadata[] = [
  {
    id: 'knitwear-sweaters',
    number: '01',
    name: 'Knitwear & Sweaters',
    shortTitle: 'Knitwear',
    tagline: 'Precision 3GG to 14GG Flat Knits & Italian Blend Yarns',
    description: 'Specialized gauge knitting engineered for international private label collections. From fine merino featherweight pullovers to sculptural chunky rib cardigans and coordinate knit skirts.',
    subcategories: ['Cardigans', 'Pullovers & Crewnecks', 'Knit Two-Piece Sets', 'Boleros & Shrugs', 'Ribbed Tunics'],
    bannerImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80',
    featuredStyleCode: 'ELA-KN-012',
    typicalMOQ: '500 pcs/style (200 pcs/color)',
    leadTime: '6 to 8 weeks ex-factory',
    primaryFabrics: ['100% Extrafine Merino Wool', 'Cashmere-Cotton Blend', 'Organic Combed Cotton', 'Alpaca Bouclé'],
  },
  {
    id: 'loungewear-sleepwear',
    number: '02',
    name: 'Loungewear & Sleepwear',
    shortTitle: 'Loungewear',
    tagline: 'Sartorial Nightwear & Pure Mulberry Silk Separates',
    description: 'Elevated at-home silhouettes tailored with french seams, piped lapels, and washed cupro drape. Built to retail standards for luxury department stores and resort boutiques.',
    subcategories: ['Robes & Kimonos', 'Pyjama Trouser Sets', 'Lounge Co-ords', 'Slip Nightdresses', 'Modal Sleep Shirts'],
    bannerImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    featuredStyleCode: 'ELA-LW-044',
    typicalMOQ: '500 pcs/style (250 pcs/color)',
    leadTime: '5 to 7 weeks ex-factory',
    primaryFabrics: ['22mm Mulberry Silk', 'Micro-Modal Satin', 'Sandwashed Cupro', 'Organic Bamboo Rib'],
  },
  {
    id: 'activewear-athleisure',
    number: '03',
    name: 'Activewear & Athleisure',
    shortTitle: 'Activewear',
    tagline: 'Seamless Performance Blends & Sculpting Interlocks',
    description: 'Four-way stretch high-recovery activewear tested for squat-proof opacity, moisture management, and flatlock durability. Certified recycled nylon and elastane constructions.',
    subcategories: ['Sculpt Leggings', 'Minimalist Sports Tops', 'Track Sets & Zip-Ups', 'Performance Shackets', 'Seamless Bike Shorts'],
    bannerImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    featuredStyleCode: 'ELA-AC-071',
    typicalMOQ: '600 pcs/style (300 pcs/color)',
    leadTime: '6 to 8 weeks ex-factory',
    primaryFabrics: ['Recycled Polyamide 6.6', 'Peached Interlock 280 GSM', 'Brushed Spandex', 'Merino Active Base'],
  },
  {
    id: 'outerwear-layering',
    number: '04',
    name: 'Outerwear & Layering',
    shortTitle: 'Outerwear',
    tagline: 'Tailored Suiting, Double-Faced Wool Coats & Unlined Trench Coats',
    description: 'Structured tailoring with hand-finished lapels, horn buttons, and bespoke interior bindings. Engineered for luxury wholesale drops and trans-seasonal commercial collections.',
    subcategories: ['Structured Blazers', 'Light Transitional Jackets', 'Tailored Wool Vests', 'Oversized Trench Coats', 'Duster Overcoats'],
    bannerImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80',
    featuredStyleCode: 'ELA-OW-103',
    typicalMOQ: '400 pcs/style (200 pcs/color)',
    leadTime: '8 to 10 weeks ex-factory',
    primaryFabrics: ['Double-Faced Wool Blend 580 GSM', 'Crisp Cotton Gabardine', 'Virgin Wool Twill', 'Structured Linen Blend'],
  },
];
