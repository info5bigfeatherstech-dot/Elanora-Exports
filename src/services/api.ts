import { Product, ProductCategory, QuoteRequestData } from '../types';
import { PRODUCTS } from '../data/products';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const QUOTE_HISTORY_STORAGE_KEY = 'elanora_quote_history';

export const api = {
  async getProducts(params?: {
    category?: ProductCategory;
    search?: string;
    fabric?: string;
    season?: string;
    sortBy?: 'moq-asc' | 'moq-desc' | 'price-asc' | 'price-desc' | 'featured' | 'code';
  }): Promise<Product[]> {
    await delay(120);
    let results = [...PRODUCTS];

    if (params?.category) {
      results = results.filter((p) => p.category === params.category);
    }

    if (params?.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.styleCode.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q)
      );
    }

    if (params?.fabric && params.fabric !== 'All Fabrics') {
      results = results.filter((p) => p.fabric.toLowerCase().includes(params.fabric!.toLowerCase()));
    }

    if (params?.season && params.season !== 'All Seasons') {
      results = results.filter((p) => p.season === params.season);
    }

    if (params?.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          results.sort((a, b) => a.fobPriceStartingUSD - b.fobPriceStartingUSD);
          break;
        case 'price-desc':
          results.sort((a, b) => b.fobPriceStartingUSD - a.fobPriceStartingUSD);
          break;
        case 'moq-asc':
          results.sort((a, b) => a.moqTotal - b.moqTotal);
          break;
        case 'moq-desc':
          results.sort((a, b) => b.moqTotal - a.moqTotal);
          break;
        case 'code':
          results.sort((a, b) => a.styleCode.localeCompare(b.styleCode));
          break;
        case 'featured':
        default:
          results.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return results;
  },

  async getProductById(idOrCode: string): Promise<Product | null> {
    await delay(100);
    const normalized = idOrCode.toLowerCase();
    const product = PRODUCTS.find(
      (p) => p.id.toLowerCase() === normalized || p.styleCode.toLowerCase() === normalized
    );
    return product || null;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    await delay(100);
    return PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  },

  async getRelatedProducts(category: ProductCategory, currentId: string): Promise<Product[]> {
    await delay(100);
    return PRODUCTS.filter((p) => p.category === category && p.id !== currentId).slice(0, 4);
  },

  async submitRFQ(quoteData: Omit<QuoteRequestData, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Promise<QuoteRequestData> {
    await delay(400);
    const existingQuotes = this.getStoredQuotes();
    const quoteNumber = 1000 + existingQuotes.length + 1;
    const refCode = `EL-RFQ-${quoteNumber}`;

    const newQuote: QuoteRequestData = {
      ...quoteData,
      id: `rfq_${Date.now()}`,
      referenceNumber: refCode,
      createdAt: new Date().toISOString(),
      status: 'Submitted',
    };

    const updated = [newQuote, ...existingQuotes];
    localStorage.setItem(QUOTE_HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return newQuote;
  },

  getStoredQuotes(): QuoteRequestData[] {
    try {
      const data = localStorage.getItem(QUOTE_HISTORY_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback
    }
    return [];
  },
};
