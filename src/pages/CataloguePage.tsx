import React from 'react';
import { Download, FileText, ArrowRight } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';

export const CataloguePage: React.FC = () => {
  const addToast = useUIStore((state) => state.addToast);

  const catalogues = [
    {
      title: 'Autumn / Winter 26/27 Wholesale Linesheet',
      season: 'AW 26/27',
      pages: '48 Pages',
      size: '24.2 MB',
      description: 'Complete technical linesheet including double-faced wool coats, 3GG–14GG merino knitwear, and winter weight interlocks with FOB tier tables.',
      filename: 'ELANORA_AW26_Wholesale_Linesheet.pdf',
    },
    {
      title: 'Spring / Summer 26 Core & Resort Lookbook',
      season: 'SS 26',
      pages: '36 Pages',
      size: '18.6 MB',
      description: 'Sandwashed 22mm silk sleepwear, double-gauze loungewear, and high-recovery recycled activewear collections.',
      filename: 'ELANORA_SS26_Resort_Lookbook.pdf',
    },
    {
      title: 'Private Label OEM/ODM Trim & Hardware Catalogue',
      season: 'Annual Edition',
      pages: '28 Pages',
      size: '12.4 MB',
      description: 'Comprehensive catalogue of real horn/corozo buttons, custom metal aglets, damask woven labels, and biodegradable retail packaging options.',
      filename: 'ELANORA_Trims_Hardware_Compendium.pdf',
    },
    {
      title: 'Compliance, Audit & ESG Credentials Dossier',
      season: 'FY 2024–2026',
      pages: '42 Pages',
      size: '15.1 MB',
      description: 'Complete certification audit reports for OEKO-TEX Standard 100, GOTS Organic Cotton, SEDEX SMETA 4-Pillar, and WRAP Gold.',
      filename: 'ELANORA_Factory_Compliance_Dossier.pdf',
    },
  ];

  const handleDownload = (filename: string) => {
    addToast('Document Dispatched', `${filename} generated and downloaded.`, 'success');
  };

  return (
    <div className="bg-bone text-ink min-h-screen py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 pb-8 hairline-b">
          <span className="label-caps text-brass block">Trade Buyer Downloads</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal">
            Digital Wholesale Catalogues & Linesheets
          </h1>
          <p className="text-sm text-warmgrey-dark max-w-xl mx-auto leading-relaxed">
            High-resolution vectorized digital lineplans and seasonal lookbooks curated for international retail buying teams.
          </p>
        </div>

        {/* Catalogues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {catalogues.map((cat, idx) => (
            <div
              key={idx}
              className="p-8 border border-stone bg-white/50 flex flex-col justify-between space-y-6 shadow-sm group hover:border-ink transition-colors"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs text-brass tracking-wider">
                    {cat.season}
                  </span>
                  <span className="font-mono text-[11px] text-warmgrey">
                    {cat.pages} • {cat.size}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-ink font-normal group-hover:text-oxblood transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-warmgrey-dark leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 hairline-t flex items-center justify-between">
                <span className="font-mono text-[11px] text-stone-dark truncate max-w-[200px]">
                  {cat.filename}
                </span>

                <button
                  onClick={() => handleDownload(cat.filename)}
                  className="px-5 py-2.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
