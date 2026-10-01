import React from 'react';
import { Link } from 'react-router-dom';
import { MARKETS_SERVED } from '../data/company';
import { Truck, Ship, Plane, ShieldCheck, Check, ArrowRight } from 'lucide-react';

export const SamplingShippingPage: React.FC = () => {
  return (
    <div className="bg-bone text-ink min-h-screen">
      
      {/* Header */}
      <section className="hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-caps text-brass block">Trade Terms & Operations</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink font-normal mt-1 tracking-tight">
            Sampling, Logistics & Incoterms
          </h1>
          <p className="text-base sm:text-lg text-warmgrey-dark max-w-2xl mt-3 leading-relaxed">
            Clear, transparent commercial parameters governing physical proto sample approvals, global ocean container transport, air cargo expedited schedules, and payment instruments.
          </p>
        </div>
      </section>

      {/* Sampling Policy Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 hairline-b">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="label-caps text-brass block">Sample Development</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Prototypes & Size-Set Verification
            </h2>
            <p className="text-sm text-warmgrey-dark leading-relaxed">
              We understand that fit accuracy, drape, and hand-feel are paramount before placing bulk commitments. Our dedicated sampling workshop functions independently from production lines to guarantee prompt turnaround.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 border border-stone bg-white/40 flex items-start gap-3 text-xs">
                <span className="w-5 h-5 border border-brass text-brass flex items-center justify-center font-mono font-bold shrink-0">1</span>
                <div>
                  <h4 className="font-semibold text-ink">Turnaround Time: 7 to 10 Business Days</h4>
                  <p className="text-warmgrey mt-0.5">Physical proto cut and sewn in requested fabric with digital CAD grading sheets.</p>
                </div>
              </div>

              <div className="p-4 border border-stone bg-white/40 flex items-start gap-3 text-xs">
                <span className="w-5 h-5 border border-brass text-brass flex items-center justify-center font-mono font-bold shrink-0">2</span>
                <div>
                  <h4 className="font-semibold text-ink">100% Refundable Against Bulk Commercial PO</h4>
                  <p className="text-warmgrey mt-0.5">Sample fee (charged at 2x FOB) is credited fully upon placing your bulk order.</p>
                </div>
              </div>

              <div className="p-4 border border-stone bg-white/40 flex items-start gap-3 text-xs">
                <span className="w-5 h-5 border border-brass text-brass flex items-center justify-center font-mono font-bold shrink-0">3</span>
                <div>
                  <h4 className="font-semibold text-ink">Courier Dispatch via DHL / FedEx Express</h4>
                  <p className="text-warmgrey mt-0.5">Express air waybill provided with tracked delivery to North America and Europe within 3–4 days.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 border border-stone p-8 bg-stone/20 space-y-4">
            <span className="label-caps text-ink block">Standard Incoterms Supported</span>
            <div className="divide-y divide-stone text-xs">
              <div className="py-3">
                <span className="font-mono font-bold text-oxblood">FOB (Free On Board) — Default Export Basis</span>
                <p className="text-warmgrey mt-1">We handle inland trucking, customs clearance, and loading onto ocean vessel at Nhava Sheva (JNPT) or Mumbai Air Cargo. Buyer manages ocean freight and destination duties.</p>
              </div>
              <div className="py-3">
                <span className="font-mono font-bold text-oxblood">CIF (Cost, Insurance & Freight)</span>
                <p className="text-warmgrey mt-1">We arrange and prepay ocean freight and marine cargo insurance up to your named discharge port (e.g., Long Beach, Rotterdam, Sydney).</p>
              </div>
              <div className="py-3">
                <span className="font-mono font-bold text-oxblood">DDP (Delivered Duty Paid)</span>
                <p className="text-warmgrey mt-1">Full door-to-door fulfillment directly to your regional 3PL warehouse, including destination customs clearance and import tariffs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Payment Terms */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 hairline-b bg-bone">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="label-caps text-brass">Banking & Treasury</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Commercial Payment Terms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 border border-stone bg-white/40 space-y-4">
              <span className="font-mono text-xs text-brass">OPTION A</span>
              <h3 className="font-serif text-2xl text-ink font-normal">Telegraphic Transfer (T/T 30/70)</h3>
              <p className="text-xs text-warmgrey leading-relaxed">
                Standard terms for initial trial orders and orders under USD 50,000. 30% advance deposit paid via bank wire upon order signing to initiate fabric procurement. Balance 70% payable against scanned copies of Bill of Lading (B/L) and signed final inspection certificates.
              </p>
            </div>

            <div className="p-8 border border-stone bg-white/40 space-y-4">
              <span className="font-mono text-xs text-brass">OPTION B</span>
              <h3 className="font-serif text-2xl text-ink font-normal">Irrevocable Letter of Credit (L/C at Sight)</h3>
              <p className="text-xs text-warmgrey leading-relaxed">
                Preferred by large department stores and international retail chains for orders exceeding USD 50,000. 100% Irrevocable Letter of Credit payable at sight issued by first-class international financial institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transit Times Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-10 bg-stone/20">
        <div className="max-w-[1440px] mx-auto space-y-6">
          <div>
            <span className="label-caps text-brass block">Global Logistics Matrix</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
              Port-to-Port Transit Durations
            </h2>
          </div>

          <div className="border border-stone divide-y divide-stone text-xs bg-bone">
            <div className="grid grid-cols-4 p-3 bg-stone/30 font-semibold text-ink uppercase tracking-wider text-[10px]">
              <span>Destination Region</span>
              <span>Primary Ports of Discharge</span>
              <span>Ocean Freight Lead</span>
              <span className="text-right">Air Cargo Expedited</span>
            </div>
            {MARKETS_SERVED.map((m) => (
              <div key={m.code} className="grid grid-cols-4 p-3 items-center">
                <span className="font-semibold text-ink">{m.country} ({m.code})</span>
                <span className="text-warmgrey">{m.ports}</span>
                <span className="font-mono text-ink">{m.leadTransit.split('/')[0]}</span>
                <span className="font-mono text-oxblood text-right font-medium">
                  {m.leadTransit.split('/')[1] || '3–4 days'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
