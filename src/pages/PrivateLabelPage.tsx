import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, FileText, Tag, Palette, Box } from 'lucide-react';

export const PrivateLabelPage: React.FC = () => {
  return (
    <div className="bg-bone text-ink min-h-screen">
      
      {/* Hero Banner */}
      <section className="hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-caps text-brass block">Full-Package Manufacturing</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink font-normal mt-1 tracking-tight">
            Private Label & Custom OEM/ODM
          </h1>
          <p className="text-base sm:text-lg text-warmgrey-dark max-w-2xl mt-3 leading-relaxed">
            Turnkey apparel production engineered to your exact brand book. From custom Pantone color spinning to bespoke hardware, luxury hangtags, and retail barcoding.
          </p>
        </div>
      </section>

      {/* 4 Pillars of Private Label */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-8 border border-stone bg-white/40 space-y-4">
            <div className="w-12 h-12 border border-brass text-brass flex items-center justify-center">
              <Tag className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-ink font-normal">01 / Woven Labels & Hangtags</h3>
            <p className="text-xs text-warmgrey leading-relaxed">
              High-definition damask woven neck labels, soft satin wash-care labels in compliant multilingual formats, and heavy FSC cardstock hangtags with foil stamping or debossing.
            </p>
            <ul className="text-[11px] text-ink space-y-1 font-mono pt-2 hairline-t">
              <li>• Damask 50 Denier weave</li>
              <li>• Heat-transfer tagless prints</li>
              <li>• GOTS organic cotton labels</li>
            </ul>
          </div>

          <div className="p-8 border border-stone bg-white/40 space-y-4">
            <div className="w-12 h-12 border border-brass text-brass flex items-center justify-center">
              <Palette className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-ink font-normal">02 / Custom Pantone Dyeing</h3>
            <p className="text-xs text-warmgrey leading-relaxed">
              Formulate proprietary colorways matched to Pantone Cotton TCX / TPX references. 5-day lab dip turnaround with Delta-E tolerances kept under 0.8 for cross-factory consistency.
            </p>
            <ul className="text-[11px] text-ink space-y-1 font-mono pt-2 hairline-t">
              <li>• Low liquor ratio soft-flow jets</li>
              <li>• Sandwashed cupro & enzyme washes</li>
              <li>• ZDHC Level 3 eco-compliance</li>
            </ul>
          </div>

          <div className="p-8 border border-stone bg-white/40 space-y-4">
            <div className="w-12 h-12 border border-brass text-brass flex items-center justify-center">
              <Box className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl text-ink font-normal">03 / Hardware & Trims</h3>
            <p className="text-xs text-warmgrey leading-relaxed">
              Bespoke engraved corozo, real buffalo horn, or matte metal buttons. Custom YKK or SBS metal zippers with branded pullers, drawcord brass aglets, and silicone grip elastic.
            </p>
            <ul className="text-[11px] text-ink space-y-1 font-mono pt-2 hairline-t">
              <li>• Laser-etched logo branding</li>
              <li>• Nickel-free certified metal trims</li>
              <li>• Custom molded zipper pullers</li>
            </ul>
          </div>

          <div className="p-8 border border-stone bg-white/40 space-y-4">
            <div className="w-12 h-12 border border-brass text-brass flex items-center justify-center">
              <FileText className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl font-normal text-ink">04 / Packaging & Barcoding</h3>
            <p className="text-xs text-warmgrey leading-relaxed">
              Department-store compliant distribution packaging: biodegradable printed polybags, UPC/EAN retail barcode stickers, size clips, and heavy 5-ply export master cartons.
            </p>
            <ul className="text-[11px] text-ink space-y-1 font-mono pt-2 hairline-t">
              <li>• Oxo-biodegradable polybags</li>
              <li>• Wardrobe carton hanging pack</li>
              <li>• Amazon FBA compliant labeling</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Tech Pack Guidelines */}
      <section className="hairline-t hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="label-caps text-brass">Technical Handover</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Tech Pack Ingestion Guidelines
            </h2>
            <p className="text-xs text-warmgrey max-w-lg mx-auto">
              We accept CAD drawings, pattern grading sheets, and technical measurement specifications across standard international industry software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-bone p-8 border border-stone">
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-medium text-ink">Supported File Formats</h4>
              <p className="text-xs text-warmgrey leading-relaxed">
                Vector PDF, Adobe Illustrator (.AI), DXF / AAMA, Optitex (.PDS), Gerber Accumark, and Excel grading specs.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-medium text-ink">Required Technical Fields</h4>
              <p className="text-xs text-warmgrey leading-relaxed">
                Flat sketches with callouts, bill of materials (BOM), tolerance measurement table across XS–2XL, and stitch types.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-serif text-lg font-medium text-ink">Don't Have a Tech Pack?</h4>
              <p className="text-xs text-warmgrey leading-relaxed">
                Ship us a physical vintage or reference garment. Our technical pattern masters will reverse-engineer complete digital CAD patterns within 5 days.
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link
              to="/quote-request"
              className="px-8 py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2"
            >
              <span>Upload Tech Pack to Trade Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
