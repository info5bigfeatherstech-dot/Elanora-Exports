export type ProductCategory = 
  | 'knitwear-sweaters'
  | 'loungewear-sleepwear'
  | 'activewear-athleisure'
  | 'outerwear-layering'
  | 'resort-wear'
  | 'boutique-apparel'
  | 'ladies-dresses';

export interface PriceTier {
  minQty: number;
  maxQty: number | null; // null means "and above"
  priceUSD: number;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  styleCode: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  tagline: string;
  description: string;
  heroImage: string;
  galleryImages: string[];
  fabric: string;
  composition: string;
  gsm: number;
  gauge?: string;
  weaveOrKnit: string;
  colors: ProductColor[];
  sizeRange: string;
  sizeRatioDefault: string; // e.g. "S:M:L:XL (1:2:2:1)"
  moqTotal: number;
  moqPerColor: number;
  fobPriceStartingUSD: number;
  priceTiers: PriceTier[];
  leadTimeWeeks: string;
  packagingDetails: string;
  customizationOptions: string[];
  sampleAvailability: boolean;
  sampleLeadTimeDays: number;
  season: 'AW 26/27' | 'SS 26' | 'Core Collection' | 'Resort 26';
  features: string[];
  certifications: string[];
  isFeatured?: boolean;
}

export interface EnquiryItem {
  id: string; // unique item id in basket (productId + color + sizeRatio)
  productId: string;
  product: Product;
  selectedColor: ProductColor;
  sizeRatio: string;
  quantity: number;
  targetPriceUSD?: number;
  customTrimsNotes?: string;
}

export type Incoterm = 'FOB' | 'CIF' | 'EXW' | 'DDP';

export interface QuoteRequestData {
  id?: string;
  referenceNumber: string;
  createdAt: string;
  status: 'Submitted' | 'Under Review' | 'Costing In Progress' | 'Quoted' | 'Sample Dispatched';
  // Company info
  companyName: string;
  buyerName: string;
  businessEmail: string;
  phone: string;
  country: string;
  website?: string;
  taxOrVatId?: string;
  buyerType: 'Retailer' | 'Importer' | 'Boutique Chain' | 'Private Label Brand' | 'Department Store';
  // Order specifics
  items: EnquiryItem[];
  totalUnits: number;
  estimatedTotalFOB: number;
  incoterm: Incoterm;
  destinationPort: string;
  targetDeliveryDate: string;
  packagingRequirements: string;
  customizationNotes: string;
  requireSamplesBeforeBulk: boolean;
  uploadedTechPackNames: string[];
}

export interface BuyerUser {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  buyerType: string;
  taxId?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}
