import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/categories';
import { useUIStore } from '../../store/useUIStore';
import { ArrowUpRight, Check, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const addToast = useUIStore((state) => state.addToast);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || !emailInput.includes('@')) {
      addToast('Invalid email', 'Please provide a valid trade buyer business email.', 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Catalogue Dispatch Queued', `Seasonal linesheet will be sent to ${emailInput}.`, 'success');
    setEmailInput('');
  };

  return (
    <footer className="bg-ink text-bone pt-20 pb-12 hairline-ink-t select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Grid: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 hairline-ink-b">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="label-caps text-brass block">Manufacturer-Exporter</span>
            <h3 className="font-serif text-3xl font-normal tracking-tight text-bone">
              ELANORA EXPORTS
            </h3>
            <p className="text-sm text-stone/80 leading-relaxed max-w-sm">
              Considered womenswear engineered to order for global fashion houses, boutique chains, and independent department stores. Certified ethical manufacturing, scalable from 500 pieces per style.
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs text-warmgrey">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brass"></span>
                Port of Loading: Nhava Sheva (JNPT) & Mumbai Air Cargo
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brass"></span>
                Incoterms: FOB, CIF, EXW, DDP
              </span>
            </div>
          </div>

          {/* Categories Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="label-caps text-brass block">01 Collections</span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-stone/70">
              {CATEGORIES.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/collections/${c.id}`}
                    className="hover:text-bone hover:underline transition-colors block py-0.5"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/collections" className="text-brass hover:underline block pt-1">
                  Full Catalogue (32 Styles)
                </Link>
              </li>
            </ul>
          </div>

          {/* Infrastructure Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="label-caps text-brass block">02 Operations</span>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-stone/70">
              <li>
                <Link to="/capabilities" className="hover:text-bone hover:underline transition-colors block py-0.5">
                  Machinery & Mills
                </Link>
              </li>
              <li>
                <Link to="/private-label" className="hover:text-bone hover:underline transition-colors block py-0.5">
                  Private Label Trims
                </Link>
              </li>
              <li>
                <Link to="/compliance" className="hover:text-bone hover:underline transition-colors block py-0.5">
                  Audit Certifications
                </Link>
              </li>
              <li>
                <Link to="/sampling-shipping" className="hover:text-bone hover:underline transition-colors block py-0.5">
                  Sampling & Logistics
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-bone hover:underline transition-colors block py-0.5">
                  Manufacturing Ethos
                </Link>
              </li>
            </ul>
          </div>

          {/* Trade Enquiry & WhatsApp (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <span className="label-caps text-brass block">03 Trade Desk</span>
            
            {/* WhatsApp direct link */}
            <a
              href="https://wa.me/919820000000?text=Hello%20Elanora%20Exports%2C%20we%20are%20interested%20in%20wholesale%20apparel%20sourcing"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-4 py-3 bg-stone/10 border border-stone/30 hover:border-brass text-bone text-xs uppercase tracking-wider w-full justify-between transition-all"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-brass" />
                <span>Instant Buyer Desk via WhatsApp</span>
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Newsletter / Catalogue request */}
            <div className="pt-2">
              <p className="text-xs text-stone/70 mb-2">
                Receive our seasonal wholesale digital lookbook and line plans:
              </p>
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Buyer corporate email..."
                  className="bg-transparent border border-stone/30 text-xs px-3 py-2.5 text-bone placeholder:text-stone/40 focus:outline-none focus:border-brass flex-1 rounded-none"
                />
                <button
                  type="submit"
                  className="bg-oxblood hover:bg-oxblood-light text-bone px-4 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4 text-brass" /> : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Giant Monolithic Wordmark */}
        <div className="py-12 hairline-ink-b text-center overflow-hidden">
          <h2 className="font-serif text-[clamp(2.5rem,11.5vw,10.5rem)] leading-none tracking-tighter text-stone/20 font-bold uppercase select-none hover:text-stone/30 transition-colors">
            ELANORA
          </h2>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-warmgrey gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span>© 1998–2026 Elanora Exports Ltd. All rights reserved.</span>
            <span>•</span>
            <span>Wholesale Manufacturer & Exporter</span>
            <span>•</span>
            <Link to="/compliance" className="hover:text-bone underline">
              SEDEX SMETA / OEKO-TEX Certified
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-bone transition-colors">
              Factory Terms
            </Link>
            <Link to="/sampling-shipping" className="hover:text-bone transition-colors">
              Export Incoterms
            </Link>
            <Link to="/contact" className="text-brass hover:underline transition-colors">
              Request Factory Visit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
