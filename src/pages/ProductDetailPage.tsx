import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useUIStore } from '../store/useUIStore';
import { Download, Send, ShieldCheck, ArrowLeft, ArrowRight, Package, Box, Layers, CheckCircle2 } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();

  const product = PRODUCTS.find(
    (p) => p.id === productId || p.styleCode.toLowerCase() === productId?.toLowerCase()
  );

  if (!product) {
    return <Navigate to="/collections" replace />;
  }

  // Active state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  // Stores
  const { openSpecSheetModal, openSampleRequestModal } = useUIStore();

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="bg-bone text-ink min-h-screen pb-24">
      
      {/* Breadcrumb & Navigation */}
      <div className="hairline-b bg-stone/20 py-4 px-4 sm:px-6 lg:px-10 text-xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-warmgrey">
            <Link to="/collections" className="hover:text-ink">Export Catalogue</Link>
            <span>/</span>
            <Link to={`/collections/${product.category}`} className="hover:text-ink">{product.categoryName}</Link>
            <span>/</span>
            <span className="font-mono text-ink font-semibold">{product.styleCode}</span>
          </div>

          <Link
            to="/collections"
            className="text-xs uppercase tracking-wider text-ink hover:text-oxblood flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Lineplan
          </Link>
        </div>
      </div>

      {/* Main Product Layout: Gallery Left, Export Specs Right */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Image Gallery with Multiple Views (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[3/4] border border-stone bg-stone/30 overflow-hidden group">
              <img
                src={product.galleryImages[activeImageIndex] || product.heroImage}
                alt={`${product.name} export style view`}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 bg-ink/90 text-bone text-xs font-mono px-3 py-1">
                STYLE CODE: {product.styleCode}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-24 aspect-[3/4] border shrink-0 overflow-hidden transition-all ${
                      activeImageIndex === idx
                        ? 'border-oxblood ring-2 ring-oxblood/30'
                        : 'border-stone opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality & Factory Assurance Box */}
            <div className="p-6 border border-stone bg-white/40 space-y-4 mt-8">
              <div className="flex items-center gap-2 text-xs font-mono text-brass uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Export Quality Clearance & Lab Testing</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-warmgrey">
                <div>
                  <span className="block text-ink font-semibold">Inspection Standard</span>
                  <span>AQL 1.5 Major / 2.5 Minor (PSI)</span>
                </div>
                <div>
                  <span className="block text-ink font-semibold">Testing Lab</span>
                  <span>ISO 17025 Pre-Clearance Tests</span>
                </div>
                <div>
                  <span className="block text-ink font-semibold">Port of Loading</span>
                  <span>FOB Mumbai / JNPT Terminal</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Export Technical Dossier & RFQ Action (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-warmgrey">
                <span className="label-caps text-brass">{product.categoryName}</span>
                <span className="font-mono">{product.season}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                {product.name}
              </h1>
              <p className="text-sm font-serif italic text-warmgrey-dark mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-xs text-ink/80 leading-relaxed">
              {product.description}
            </p>

            {/* Wholesale Export Order & Production Terms */}
            <div className="p-4 border border-stone bg-stone/20 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="label-caps text-ink">Wholesale Export Order Terms</span>
                <span className="font-mono text-[11px] text-brass">FOB / CIF / DDP</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 border border-stone bg-bone space-y-1">
                  <span className="text-[10px] text-warmgrey uppercase tracking-wider block">Minimum Order (MOQ)</span>
                  <p className="font-mono font-bold text-ink">
                    {product.moqTotal} pcs <span className="font-normal text-warmgrey">/ style</span>
                  </p>
                  <p className="text-[11px] text-warmgrey">
                    ({product.moqPerColor} pcs / colorway)
                  </p>
                </div>

                <div className="p-3 border border-stone bg-bone space-y-1">
                  <span className="text-[10px] text-warmgrey uppercase tracking-wider block">Commercial Pricing</span>
                  <p className="font-sans font-semibold text-oxblood">
                    Available on Request
                  </p>
                  <p className="text-[11px] text-warmgrey">
                    Volume-tiered formal RFQ
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] pt-1 text-warmgrey border-t border-stone/60 gap-1">
                <span>Port of Loading: Nhava Sheva (JNPT)</span>
                <span>Lead Time: {product.sampleLeadTimeDays}d sample / 45–60d bulk</span>
              </div>
            </div>

            {/* Colorways Available */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <label className="label-caps text-ink">
                  Available Colorways: <span className="font-medium text-warmgrey">{selectedColor.name}</span>
                </label>
                <span className="text-[11px] font-mono text-warmgrey">Pantone TCX matchable</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 border flex items-center gap-2 text-xs transition-all ${
                      selectedColor.name === c.name
                        ? 'border-ink bg-white font-semibold shadow-sm'
                        : 'border-stone hover:border-ink/50 bg-bone'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 inline-block border border-stone"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizing & Packaging Quick Info */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-stone bg-white/40">
                <span className="text-[10px] uppercase text-warmgrey block">Size Range</span>
                <span className="font-medium text-ink">{product.sizeRange}</span>
              </div>
              <div className="p-3 border border-stone bg-white/40">
                <span className="text-[10px] uppercase text-warmgrey block">Production Lead Time</span>
                <span className="font-medium text-ink">{product.leadTimeWeeks}</span>
              </div>
            </div>

            {/* Export Actions (No Cart, Direct RFQ & Specs) */}
            <div className="space-y-3 pt-2">
              <Link
                to={`/quote-request?style=${encodeURIComponent(product.styleCode)}`}
                className="w-full py-4 bg-oxblood text-bone hover:bg-oxblood-dark transition-colors text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 text-center shadow-md"
              >
                <span>Request Quotation for {product.styleCode}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => openSpecSheetModal(product)}
                  className="py-3 border border-ink text-ink hover:bg-ink hover:text-bone transition-colors text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Spec Sheet PDF</span>
                </button>

                <button
                  onClick={() => openSampleRequestModal(product)}
                  className="py-3 border border-stone hover:border-ink text-ink transition-colors text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Sample</span>
                </button>
              </div> */}
            </div>

            {/* Quick Export Logistics Highlights */}
            <div className="pt-4 hairline-t border-stone space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-warmgrey">Yarn / Fabric:</span>
                <span className="text-ink font-medium">{product.fabric}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-warmgrey">Areal Density:</span>
                <span className="font-mono text-ink">{product.gsm} GSM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-warmgrey">Master Export Pack:</span>
                <span className="text-ink">{product.packagingDetails}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone/30">
                <span className="text-warmgrey">Sample Dispatch:</span>
                <span className="font-mono text-ink">{product.sampleLeadTimeDays} business days</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Technical Specifications Table */}
        <div className="mt-16 pt-12 hairline-t">
          <div className="max-w-4xl space-y-6">
            <div>
              <span className="label-caps text-brass block">Manufacturing Parameters</span>
              <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
                Technical Specification Table
              </h2>
            </div>

            <div className="border border-stone divide-y divide-stone text-xs bg-white/40">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3">
                <span className="text-warmgrey uppercase font-semibold">Material Composition</span>
                <span className="col-span-2 text-ink">{product.composition}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3">
                <span className="text-warmgrey uppercase font-semibold">Gauge / Weave Construction</span>
                <span className="col-span-2 text-ink">{product.gauge || product.weaveOrKnit}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3">
                <span className="text-warmgrey uppercase font-semibold">Export Master Packaging</span>
                <span className="col-span-2 text-ink">{product.packagingDetails}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3">
                <span className="text-warmgrey uppercase font-semibold">Private Label Customization</span>
                <span className="col-span-2 text-ink">
                  {product.customizationOptions.join(' • ')}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-3">
                <span className="text-warmgrey uppercase font-semibold">Audit Certifications</span>
                <span className="col-span-2 text-ink font-mono text-brass">
                  {product.certifications.join(' • ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Styles Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 hairline-t">
            <div className="flex justify-between items-end pb-8">
              <div>
                <span className="label-caps text-brass block">Complementary Export Lines</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
                  Related Styles in {product.categoryName}
                </h3>
              </div>
              <Link
                to={`/collections/${product.category}`}
                className="editorial-link-brass text-xs uppercase tracking-wider text-ink"
              >
                View Category Division
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Export Action Bar */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-bone border-t border-stone p-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="font-mono text-[10px] text-warmgrey block">Export MOQ</span>
          <span className="font-mono text-sm font-bold text-ink">
            {product.moqTotal} pcs / style
          </span>
        </div>
        <Link
          to={`/quote-request?style=${encodeURIComponent(product.styleCode)}`}
          className="px-6 py-3 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-wider font-semibold"
        >
          Request RFQ
        </Link>
      </div>

    </div>
  );
};
