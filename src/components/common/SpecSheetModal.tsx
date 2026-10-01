import React from 'react';
import { useUIStore } from '../../store/useUIStore';
import { Product } from '../../types';
import { X, Download, FileText, CheckCircle2 } from 'lucide-react';

export const SpecSheetModal: React.FC = () => {
  const { specSheetModalProduct, closeSpecSheetModal, addToast } = useUIStore();

  if (!specSheetModalProduct) return null;
  const product: Product = specSheetModalProduct;

  const handleDownload = () => {
    addToast('Spec Sheet Generated', `${product.styleCode}_Technical_Data_Sheet.pdf downloaded.`, 'success');
    closeSpecSheetModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={closeSpecSheetModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-bone border border-stone shadow-2xl overflow-hidden z-10">
        
        {/* Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-stone/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-stone flex items-center justify-center bg-bone text-brass">
              <FileText className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div>
              <span className="label-caps text-brass block">Official Technical Specification</span>
              <h3 className="font-serif text-xl font-normal text-ink">
                {product.styleCode} — Technical Spec Sheet
              </h3>
            </div>
          </div>
          <button
            onClick={closeSpecSheetModal}
            className="p-2 text-ink hover:text-oxblood transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Style Header Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-stone bg-white/40 text-xs">
            <div>
              <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Style Code</span>
              <span className="font-mono font-bold text-ink">{product.styleCode}</span>
            </div>
            <div>
              <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Category</span>
              <span className="font-medium text-ink">{product.categoryName}</span>
            </div>
            <div>
              <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Season</span>
              <span className="font-medium text-ink">{product.season}</span>
            </div>
            <div>
              <span className="text-warmgrey uppercase tracking-wider block text-[10px]">Factory Standard</span>
              <span className="font-mono text-brass">AQL 1.5 Level II</span>
            </div>
          </div>

          {/* Textile & Construction Specs Table */}
          <div className="space-y-2">
            <h4 className="label-caps text-ink">01 Technical Fabric Parameters</h4>
            <div className="border border-stone divide-y divide-stone text-xs">
              <div className="grid grid-cols-3 p-2.5 bg-stone/10 font-semibold text-ink">
                <span>Parameter</span>
                <span className="col-span-2">Specification</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Composition</span>
                <span className="col-span-2 text-ink font-medium">{product.composition}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Areal Density (GSM)</span>
                <span className="col-span-2 text-ink font-mono">{product.gsm} g/m² (±3%)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Gauge / Weave</span>
                <span className="col-span-2 text-ink">{product.gauge || product.weaveOrKnit}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Yarn Origin</span>
                <span className="col-span-2 text-ink">Responsible Wool Standard / GOTS Organic Certified</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Dimensional Shrinkage</span>
                <span className="col-span-2 text-ink font-mono">&lt; 3.0% Length × &lt; 2.5% Width (ISO 6330 40°C)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Color Fastness to Wash</span>
                <span className="col-span-2 text-ink font-mono">Grade 4.5 (AATCC 61 2A)</span>
              </div>
            </div>
          </div>

          {/* Sizing & Packaging */}
          <div className="space-y-2">
            <h4 className="label-caps text-ink">02 Sizing & Export Packaging</h4>
            <div className="border border-stone divide-y divide-stone text-xs">
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Available Size Range</span>
                <span className="col-span-2 text-ink font-mono">{product.sizeRange}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Master Export Pack</span>
                <span className="col-span-2 text-ink">{product.packagingDetails}</span>
              </div>
              <div className="grid grid-cols-3 p-2.5">
                <span className="text-warmgrey">Customization Scope</span>
                <span className="col-span-2 text-ink">
                  {product.customizationOptions.join(' • ')}
                </span>
              </div>
            </div>
          </div>

          {/* Compliance & Lab Sign-Off */}
          <div className="p-3 bg-stone/20 border border-stone flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-warmgrey">
              <CheckCircle2 className="w-4 h-4 text-brass" />
              <span>Certified under OEKO-TEX Standard 100 & SEDEX SMETA 4-Pillar</span>
            </div>
            <span className="font-mono text-[10px] text-warmgrey">DOC REF: EL-TDS-2026</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 hairline-t bg-stone/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-warmgrey">
            Downloadable as vectorized high-resolution PDF for buyer procurement records.
          </p>
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-6 py-3 bg-oxblood text-bone hover:bg-oxblood-dark transition-colors text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Spec PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
