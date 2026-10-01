import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATS, CAPABILITIES, PRODUCTION_JOURNEY, COMPLIANCE_CERTIFICATIONS, TESTIMONIALS, FAQS, LOOKBOOK_SLIDES } from '../data/company';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { GlobalLogisticsGlobe } from '../components/common/GlobalLogisticsGlobe';
import { ArrowRight, ChevronRight, ChevronLeft, ArrowUpRight, Plus, Check } from 'lucide-react';

export const HomePage: React.FC = () => {
  // Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Lookbook Hotspot state
  const [activeLookbookSlide, setActiveLookbookSlide] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const featuredStyles = PRODUCTS.filter((p) => p.isFeatured);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  };
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentSlide = LOOKBOOK_SLIDES[activeLookbookSlide];

  return (
    <div className="bg-bone text-ink select-none overflow-x-hidden">
      
      {/* ============================================================ */}
      {/* 01 HERO SECTION (Split Screen) */}
      {/* ============================================================ */}
      <section className="hairline-b relative min-h-[calc(100vh-80px)] flex flex-col justify-between">
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-10 py-12 lg:py-16 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Massive Editorial Bodoni Display */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 pr-0 lg:pr-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-brass tracking-widest uppercase">01 / OVERVIEW</span>
              <span className="h-px w-10 bg-brass"></span>
              <span className="label-caps text-warmgrey">B2B Apparel Manufacturer & Exporter</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-6xl tracking-tight font-normal text-ink">
                Considered <span className="italic font-normal">Womenswear</span>, Made to Order for the <span className="italic font-normal">World</span>.
              </h1>
              <p className="text-base sm:text-base text-warmgrey-dark max-w-xl leading-relaxed pt-2">
                Wholesale manufacturing partner to international fashion brands, retailers, and boutique networks. Full-package private label knitwear, silk sleepwear, technical athleisure, and tailored outerwear.
              </p>
            </div>

            {/* CTAs & Key Terms */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/quote-request"
                className="px-8 py-4 bg-oxblood text-bone hover:bg-oxblood-dark transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-3"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/collections"
                className="px-8 py-4 border border-ink text-ink hover:bg-ink hover:text-bone transition-all text-xs uppercase tracking-widest font-semibold text-center"
              >
                Explore Collections
              </Link>
            </div>

            {/* Mini Footer within Hero */}
            <div className="pt-6 hairline-t grid grid-cols-3 gap-4 text-xs text-warmgrey">
              <div>
                <span className="block font-mono text-[10px] uppercase text-brass">Minimum Order</span>
                <span className="text-ink font-medium">500 pcs / style</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase text-brass">Sampling</span>
                <span className="text-ink font-medium">7–10 days dispatch</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] uppercase text-brass">Port of Export</span>
                <span className="text-ink font-medium">FOB Mumbai (JNPT)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Tall Portrait Campaign Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4.2] overflow-hidden border border-stone shadow-xl bg-stone/30">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=80"
                alt="Elanora Exports Campaign AW 26/27"
                className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-1000 ease-out"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-ink/90 text-bone border-l-2 border-brass">
                <div className="flex justify-between items-baseline">
                  <span className="label-caps text-brass">Campaign AW 26/27</span>
                  <span className="font-mono text-[10px] text-stone">LOOK 04</span>
                </div>
                <p className="font-serif text-sm italic mt-1">
                  Double-Faced Wool Blanket Coat & Architectural Rib Knitwear
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 SLOW MARQUEE STRIP */}
      {/* ============================================================ */}
      <section className="hairline-b bg-stone/20 py-3.5 overflow-hidden">
        <div className="flex items-center whitespace-nowrap animate-marquee">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 text-xs font-sans tracking-ultra uppercase text-ink/70 shrink-0">
              <span className="font-serif italic font-normal text-sm lowercase tracking-normal text-brass">02 /</span>
              <span>KNITWEAR & SWEATERS</span>
              <span>•</span>
              <span>LOUNGEWEAR & SILK SLEEPWEAR</span>
              <span>•</span>
              <span>TECHNICAL ACTIVEWEAR & INTERLOCK</span>
              <span>•</span>
              <span>TAILORED OUTERWEAR & SUITING</span>
              <span>•</span>
              <span>ZERO LIQUID DISCHARGE DYEING</span>
              <span>•</span>
              <span>PRIVATE LABEL OEM/ODM EXPORT</span>
              <span>•</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03 KEY NUMBERS STRIP */}
      {/* ============================================================ */}
      <section className="hairline-b bg-bone">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-12">
          <div className="flex items-center justify-between pb-8 hairline-b mb-8">
            <span className="label-caps text-brass">03 / Key Operational Metrics</span>
            <span className="text-xs text-warmgrey">Audited Export Capacity FY 2024–2026</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-stone">
            {STATS.map((stat, idx) => (
              <div key={idx} className="p-6 md:px-8 space-y-2">
                <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink block">
                  {stat.number}
                </span>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
                  {stat.label}
                </h4>
                <p className="text-[11px] text-warmgrey">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04 FOUR CATEGORY PANELS (Hover Image Reveal Grid) */}
      {/* ============================================================ */}
      <section className="hairline-b bg-bone">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 hairline-b">
            <div>
              <span className="label-caps text-brass block">04 / Product Architecture</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                Wholesale Manufacturing Divisions
              </h2>
            </div>
            <Link
              to="/collections"
              className="editorial-link-brass text-xs uppercase tracking-widest font-semibold text-ink flex items-center gap-1.5"
            >
              <span>View 32 Export Styles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Large Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 hairline divide-y lg:divide-y-0 lg:divide-x divide-stone mt-8">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/collections/${cat.id}`}
                className="group relative flex flex-col justify-between p-8 bg-bone hover:bg-ink transition-colors duration-500 overflow-hidden"
              >
                {/* Background image reveal on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                  <img
                    src={cat.bannerImage}
                    alt={cat.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-baseline">
                    <span className="font-serif text-3xl font-light text-brass italic">
                      {cat.number}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-stone group-hover:text-bone group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl text-ink group-hover:text-bone transition-colors font-normal">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-warmgrey group-hover:text-stone/80 transition-colors mt-2 leading-relaxed">
                      {cat.tagline}
                    </p>
                  </div>

                  {/* Subcategories list */}
                  <ul className="space-y-1.5 pt-2 text-[11px] text-warmgrey-dark group-hover:text-stone/60 transition-colors">
                    {cat.subcategories.map((sub, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-brass"></span>
                        <span>{sub}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 relative z-10 hairline-t border-stone/40 group-hover:border-white/10 mt-8">
                  <div className="flex justify-between text-[11px] text-warmgrey group-hover:text-stone/70">
                    <span>MOQ:</span>
                    <span className="font-mono text-ink group-hover:text-bone">{cat.typicalMOQ}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-warmgrey group-hover:text-stone/70 mt-1">
                    <span>Lead Time:</span>
                    <span className="font-mono text-ink group-hover:text-bone">{cat.leadTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05 FEATURED STYLES (Horizontal Scroll Row) */}
      {/* ============================================================ */}
      <section className="hairline-b bg-bone py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 hairline-b">
            <div>
              <span className="label-caps text-brass block">05 / Curated Wholesale Assortment</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                Featured Export Silhouettes
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-warmgrey font-mono hidden sm:inline">
                FOB TIERS AVAILABLE
              </span>
              <Link
                to="/collections"
                className="px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-bone transition-colors text-xs uppercase tracking-wider font-semibold"
              >
                View Full Line (32)
              </Link>
            </div>
          </div>

          {/* Grid of Featured Styles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {featuredStyles.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06 FULL-WIDTH INK SECTION: "Made to Order" Statement */}
      {/* ============================================================ */}
      <section className="bg-ink text-bone py-24 hairline-ink-b relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-8">
          <span className="label-caps text-brass">06 / Manufacturing Manifesto</span>
          
          <blockquote className="font-serif text-4xl leading-tight font-normal text-bone max-w-4xl mx-auto italic">
            “We do not hold speculative retail stock. Every stitch, dye lot, and carton is engineered strictly to client specifications, built for the rigors of international commerce.”
          </blockquote>

          <div className="h-px w-24 bg-brass mx-auto my-6"></div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-stone tracking-widest uppercase">
            <span>Precision Grading</span>
            <span>•</span>
            <span>OEKO-TEX Class 1 Non-Toxic</span>
            <span>•</span>
            <span>AQL 1.5 Quality Guarantee</span>
            <span>•</span>
            <span>Zero Liquid Discharge Facility</span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 07 CAPABILITIES: Indexed List with Hairline Dividers (No Icons) */}
      {/* ============================================================ */}
      {/* <section className="hairline-b bg-bone py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 hairline-b">
            <div>
              <span className="label-caps text-brass block">07 / Industrial Capacity</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                Manufacturing Divisions & Equipment
              </h2>
            </div>
            <Link
              to="/capabilities"
              className="editorial-link-brass text-xs uppercase tracking-widest font-semibold text-ink"
            >
              Explore Full Engineering Tour
            </Link>
          </div>

          <div className="divide-y divide-stone mt-8 hairline-t hairline-b">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-stone/10 px-4 transition-colors"
              >
                <div className="lg:col-span-2">
                  <span className="font-serif text-4xl text-brass italic font-light">
                    {cap.number}
                  </span>
                </div>

                <div className="lg:col-span-4 space-y-2">
                  <h3 className="font-serif text-2xl text-ink font-normal">{cap.title}</h3>
                  <p className="text-xs text-warmgrey uppercase tracking-wider">{cap.subtitle}</p>
                </div>

                <div className="lg:col-span-4 space-y-4">
                  <p className="text-sm text-ink/80 leading-relaxed">{cap.description}</p>
                  <ul className="space-y-1 text-xs text-warmgrey">
                    {cap.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-brass"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-2 flex flex-col justify-between h-full pt-1">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-warmgrey block mb-1">
                      Machinery
                    </span>
                    <p className="text-xs font-mono text-ink leading-snug">
                      {cap.equipment[0]}
                    </p>
                  </div>
                  <Link
                    to="/capabilities"
                    className="mt-4 text-xs font-medium text-oxblood hover:underline flex items-center gap-1"
                  >
                    View Specs <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ============================================================ */}
      {/* 08 PRODUCTION JOURNEY: Horizontal Numbered Timeline */}
      {/* ============================================================ */}
      <section className="hairline-b bg-stone/20 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 hairline-b">
            <div>
              <span className="label-caps text-brass block">08 / Export Workflow</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                The Production Timeline
              </h2>
            </div>
            <p className="text-xs text-warmgrey max-w-sm">
              From tech pack inception to final bill of lading container loading. Transparent stage gates with formal sign-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-0 hairline divide-y lg:divide-y-0 lg:divide-x divide-stone mt-8 bg-bone">
            {PRODUCTION_JOURNEY.map((step) => (
              <div key={step.number} className="p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-xs text-brass tracking-wider">
                      PHASE {step.number}
                    </span>
                    <span className="text-[10px] font-mono bg-stone/40 px-1.5 py-0.5 text-ink">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-ink font-medium leading-snug mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-warmgrey leading-relaxed line-clamp-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 hairline-t text-[11px] text-warmgrey">
                  <span className="block text-[10px] uppercase text-brass mb-1 font-semibold">
                    Gate Deliverable:
                  </span>
                  <span className="text-ink line-clamp-2">{step.deliverables[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 09 PRIVATE LABEL & CUSTOMIZATION SPLIT SECTION */}
      {/* ============================================================ */}
      <section className="hairline-b bg-bone py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left text column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="label-caps text-brass block">09 / Bespoke Branding</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-ink font-normal leading-tight">
                Complete Private Label Execution
              </h2>
              <p className="text-base text-warmgrey-dark leading-relaxed">
                Elevate your brand with comprehensive OEM/ODM packaging. We don't just assemble garments; we build retail-ready products equipped with custom trims, woven damask labels, engraved buttons, and barcoded polybags.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 border border-stone bg-white/40 space-y-1.5">
                  <h4 className="font-serif text-base text-ink font-medium">Bespoke Trims & Hardware</h4>
                  <p className="text-xs text-warmgrey leading-relaxed">
                    Laser-engraved real horn, corozo, or brass buttons; branded zipper pullers and custom aglets.
                  </p>
                </div>
                <div className="p-4 border border-stone bg-white/40 space-y-1.5">
                  <h4 className="font-serif text-base text-ink font-medium">Lab Dips & Pantone TCX</h4>
                  <p className="text-xs text-warmgrey leading-relaxed">
                    Custom yarn spinning and fabric dyeing to your exact seasonal Pantone reference within 5 days.
                  </p>
                </div>
                <div className="p-4 border border-stone bg-white/40 space-y-1.5">
                  <h4 className="font-serif text-base text-ink font-medium">Labelling & Hangtags</h4>
                  <p className="text-xs text-warmgrey leading-relaxed">
                    High-definition woven labels, printed care tags in multilingual formats, and embossed FSC card hangtags.
                  </p>
                </div>
                <div className="p-4 border border-stone bg-white/40 space-y-1.5">
                  <h4 className="font-serif text-base text-ink font-medium">Retail Packaging</h4>
                  <p className="text-xs text-warmgrey leading-relaxed">
                    Biodegradable polybags, barcode sticker placement, flat fold or wardrobe carton packing for department stores.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/private-label"
                  className="px-6 py-3.5 bg-ink text-bone hover:bg-oxblood transition-colors text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2"
                >
                  <span>Private Label Service Manual</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right imagery */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] overflow-hidden border border-stone shadow-xl bg-stone/20">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                  alt="Custom trims, labels, and packaging"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-ink/90 text-bone">
                  <span className="label-caps text-brass">Private Label OEM/ODM</span>
                  <p className="text-xs text-stone mt-0.5">
                    Proprietary hangtag and trim development for European and North American department stores.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

 

      {/* ============================================================ */}
      {/* 12 MARKETS SERVED (3D Global Logistics Hub) */}
      {/* ============================================================ */}
      <section className="hairline-b bg-stone/20 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 hairline-b">
            <div>
              <span className="label-caps text-brass block">12 / Global Logistics Hub</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
                Primary International Export Destinations
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-xs font-mono text-warmgrey uppercase tracking-wider">
                Live Vessel Routes • FOB / CIF / DDP
              </span>
            </div>
          </div>

          {/* Interactive 3D WebGL Globe & Destinations Matrix */}
          <GlobalLogisticsGlobe />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 13 BUYER TESTIMONIALS (One Large Editorial Quote) */}
      {/* ============================================================ */}
      <section className="hairline-b bg-bone py-20">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex justify-between items-center pb-6 hairline-b mb-12">
            <span className="label-caps text-brass">13 / International Trade References</span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 border border-stone hover:border-ink flex items-center justify-center text-ink transition-colors"
                aria-label="Previous quote"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-mono text-xs text-warmgrey px-2">
                0{activeTestimonial + 1} / 0{TESTIMONIALS.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 border border-stone hover:border-ink flex items-center justify-center text-ink transition-colors"
                aria-label="Next quote"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-8 animate-fadeIn">
            <blockquote className="font-serif text-4xl leading-snug font-normal text-ink italic">
              “{TESTIMONIALS[activeTestimonial].quote}”
            </blockquote>

            <div className="pt-4 hairline-t flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-serif text-lg text-ink font-medium">
                  {TESTIMONIALS[activeTestimonial].buyerName}
                </h4>
                <p className="text-xs text-warmgrey uppercase tracking-wider">
                  {TESTIMONIALS[activeTestimonial].title} • {TESTIMONIALS[activeTestimonial].company}
                </p>
                <p className="text-xs text-brass mt-0.5">
                  {TESTIMONIALS[activeTestimonial].location}
                </p>
              </div>

              <div className="p-3 bg-stone/20 border border-stone text-xs text-warmgrey font-mono">
                <span className="block text-[10px] uppercase text-brass">Procurement Scope</span>
                <span className="text-ink">{TESTIMONIALS[activeTestimonial].styleOrdered}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

   

      {/* ============================================================ */}
      {/* 15 CLOSING RFQ BANNER ON INK */}
      {/* ============================================================ */}
      <section className="bg-ink text-bone py-24 select-none">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-8">
          <span className="label-caps text-brass">15 / Begin Collaboration</span>
          <h2 className="font-serif text-[clamp(2.25rem,4.5vw,4.5rem)] font-normal text-bone leading-tight">
            Ready to Cost Your Next <span className="italic font-normal">Collection</span>?
          </h2>
          <p className="text-stone/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Submit your technical brief or assemble a draft order from our curated catalogue. Our trade desk provides formal FOB pricing breakdowns within 24 to 48 business hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/quote-request"
              className="px-10 py-4 bg-oxblood text-bone hover:bg-oxblood-light transition-all text-xs uppercase tracking-widest font-semibold flex items-center gap-3"
            >
              <span>Submit Request For Quote (RFQ)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/contact"
              className="px-10 py-4 border border-stone/40 text-bone hover:border-brass hover:text-brass transition-all text-xs uppercase tracking-widest font-semibold"
            >
              Schedule Factory Showroom Visit
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
