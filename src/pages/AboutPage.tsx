import React from 'react';
import { Link } from 'react-router-dom';
import { STATS } from '../data/company';
import { ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-bone text-ink min-h-screen">
      
      {/* Editorial Header Banner */}
      <section className="hairline-b bg-stone/20 py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6">
            <span className="label-caps text-brass block">Heritage & Governance</span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ink font-normal tracking-tight leading-none">
              Modern Industry, <span className="italic font-normal">Quiet Authority</span>.
            </h1>
            <p className="text-lg text-warmgrey-dark max-w-2xl leading-relaxed">
              Founded in 1998, Elanora Exports began with sixteen hand-flat knitting frames. Today, we are a premier manufacturer-exporter of womenswear, serving established luxury labels and progressive boutique chains across forty-two countries.
            </p>
          </div>
          <div className="lg:col-span-4 p-8 border border-stone bg-white/50 space-y-2">
            <span className="font-serif text-5xl text-brass italic font-light">28</span>
            <h3 className="font-serif text-xl text-ink">Years of Export Manufacturing</h3>
            <p className="text-xs text-warmgrey leading-relaxed">
              Continuous operations from our integrated industrial campus in Mumbai, shipping over 3 million export units annually.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section: Split Image and Text */}
      <section className="py-20 px-4 sm:px-6 lg:px-10 hairline-b">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative aspect-[3/4] border border-stone overflow-hidden bg-stone/30">
            <img
              src="https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?auto=format&fit=crop&w=1200&q=80"
              alt="Craftsmanship and precision tailoring"
              className="w-full h-full object-cover grayscale contrast-110"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="label-caps text-brass block">Manufacturing Ethos</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal leading-tight">
              We Believe in Substantial Clothes, Built to Endure.
            </h2>
            <div className="space-y-4 text-sm text-ink/80 leading-relaxed">
              <p>
                In an era dominated by disposable fast fashion, Elanora operates on the conviction that wholesale garments must possess true structural integrity. Our double-faced coats require hours of hand-splitting along each lapel. Our knitwear uses high-recovery Australian merino yarns that resist pilling through dozens of commercial cleans.
              </p>
              <p>
                We do not outsource critical operations to anonymous sub-contractors. Pattern development, tensionless fabric spreading, computerized flatbed knitting, and eco-certified garment dyeing occur under our direct supervision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 hairline-t">
              <div>
                <h4 className="font-serif text-lg text-ink font-medium">Vertical Integrity</h4>
                <p className="text-xs text-warmgrey mt-1">In-house yarn testing, knitting, assembly, and needle detection eliminate third-party quality variance.</p>
              </div>
              <div>
                <h4 className="font-serif text-lg text-ink font-medium">Ethical Workplace</h4>
                <p className="text-xs text-warmgrey mt-1">Fair living wages, health security, and zero child labor certified under WRAP Gold and SEDEX SMETA.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Strip */}
      <section className="bg-ink text-bone py-16 px-4 sm:px-6 lg:px-10 hairline-ink-b">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-4xl sm:text-5xl text-brass italic font-light block">{s.number}</span>
              <span className="text-xs uppercase tracking-wider text-bone block">{s.label}</span>
              <span className="text-[11px] text-stone/60">{s.sublabel}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership & Facility Tour CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-10 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <span className="label-caps text-brass">Global Partnerships</span>
          <h3 className="font-serif text-3xl font-normal text-ink">Collaborate With Elanora</h3>
          <p className="text-xs text-warmgrey leading-relaxed">
            Whether you are an established department store seeking dependable production scale or an independent label ready to transition from local ateliers to international wholesale, we welcome your brief.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/quote-request"
              className="px-8 py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              <span>Submit RFQ</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3.5 border border-ink text-ink hover:bg-ink hover:text-bone text-xs uppercase tracking-widest font-semibold"
            >
              Contact Factory Desk
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
