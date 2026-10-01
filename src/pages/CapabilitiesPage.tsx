import React from 'react';
import { Link } from 'react-router-dom';
import { CAPABILITIES } from '../data/company';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const CapabilitiesPage: React.FC = () => {
  return (
    <div className="bg-bone text-ink min-h-screen">
      
      {/* Header */}
      <section className="hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-caps text-brass block">Manufacturing Infrastructure</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink font-normal mt-1 tracking-tight">
            Industrial Capabilities & Engineering
          </h1>
          <p className="text-base sm:text-lg text-warmgrey-dark max-w-2xl mt-3 leading-relaxed">
            Operating 3 specialized manufacturing facilities encompassing computerized knitting, precision CAD cut & sew, eco-certified dyehouses, and in-house ISO 17025 testing laboratories.
          </p>
        </div>
      </section>

      {/* Main Divisions */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-16">
          {CAPABILITIES.map((cap) => (
            <div
              key={cap.id}
              className="p-8 sm:p-12 border border-stone bg-white/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm"
            >
              <div className="lg:col-span-3 space-y-3">
                <span className="font-serif text-5xl text-brass italic font-light block">
                  {cap.number}
                </span>
                <h2 className="font-serif text-2xl text-ink font-normal">{cap.title}</h2>
                <p className="text-xs text-warmgrey uppercase tracking-wider">{cap.subtitle}</p>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <p className="text-sm text-ink/80 leading-relaxed">{cap.description}</p>
                <div className="space-y-2 pt-2">
                  <span className="label-caps text-brass block">Technical Tolerances</span>
                  <ul className="space-y-1.5 text-xs text-warmgrey">
                    {cap.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-brass"></span>
                        <span className="text-ink">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-4 p-6 bg-stone/20 border border-stone space-y-4">
                <span className="label-caps text-ink block">Primary Machinery Fleet</span>
                <ul className="space-y-2 text-xs font-mono text-ink">
                  {cap.equipment.map((eq, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Testing Standards Strip */}
      <section className="hairline-t hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-bone border border-stone space-y-2">
            <span className="font-mono text-xs text-brass">TEST 01</span>
            <h4 className="font-serif text-lg text-ink font-medium">Martindale Pilling Test</h4>
            <p className="text-xs text-warmgrey">Evaluated to ISO 12945-2 at 5,000 cycles. Grade 4.0 minimum required for shipment clearance.</p>
          </div>
          <div className="p-6 bg-bone border border-stone space-y-2">
            <span className="font-mono text-xs text-brass">TEST 02</span>
            <h4 className="font-serif text-lg text-ink font-medium">Dimensional Stability</h4>
            <p className="text-xs text-warmgrey">Tested across 3 home launder cycles (ISO 6330). Maximum allowed residual shrinkage &lt; 3.0%.</p>
          </div>
          <div className="p-6 bg-bone border border-stone space-y-2">
            <span className="font-mono text-xs text-brass">TEST 03</span>
            <h4 className="font-serif text-lg text-ink font-medium">Colorfastness to Light</h4>
            <p className="text-xs text-warmgrey">Xenon Arc exposure (ISO 105-B02). Blue scale rating Grade 4–5 across all Pantone TCX formulas.</p>
          </div>
          <div className="p-6 bg-bone border border-stone space-y-2">
            <span className="font-mono text-xs text-brass">TEST 04</span>
            <h4 className="font-serif text-lg text-ink font-medium">Seam Tensile Strength</h4>
            <p className="text-xs text-warmgrey">Grab test method (ASTM D5034). Seam rupture load verified at &gt; 180N on activewear and suiting.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-ink text-bone py-16 px-4 sm:px-6 lg:px-10 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="font-serif text-3xl font-normal">Schedule an On-Site Factory Audit</h3>
          <p className="text-xs text-stone/80 leading-relaxed">
            We invite international sourcing directors and technical designers to visit our manufacturing campus in Mumbai. Showroom appointments available year-round.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-oxblood text-bone hover:bg-oxblood-light text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2"
          >
            <span>Book Factory Visit</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};
