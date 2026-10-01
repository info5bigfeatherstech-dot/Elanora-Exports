import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, FileSpreadsheet } from 'lucide-react';
import { useUIStore } from '../../store/useUIStore';
import { CATEGORIES } from '../../data/categories';

export const Header: React.FC = () => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const location = useLocation();

  const {
    openSearch,
    isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
  } = useUIStore();

  const closeMegaMenu = () => setIsMegaMenuOpen(false);

  return (
    <>
      {/* Slim Ink Announcement Bar (Preserved Navbar Sans) */}
      <div className="bg-ink text-bone border-b border-white/10 px-4 py-2 text-center text-[11px] font-navbar-sans tracking-widest uppercase flex items-center justify-center gap-3">
        <span className="inline-block w-1.5 h-1.5 bg-brass"></span>
        <span>Manufacturer & Exporter of Women's Apparel • Global Port Delivery (FOB/CIF/DDP)</span>
        <span className="hidden md:inline text-warmgrey">• Minimum 500 pcs per style</span>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-bone/95 backdrop-blur-md hairline-b transition-all duration-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Brand Wordmark (Left) */}
          <div className="flex-1 flex items-center justify-start min-w-0">
            <Link
              to="/"
              className="group flex flex-col"
              onClick={() => {
                closeMegaMenu();
                closeMobileMenu();
              }}
            >
              <span className="font-navbar-wordmark text-2xl sm:text-3xl tracking-tight text-ink font-normal uppercase group-hover:text-oxblood transition-colors">
                ELANORA
              </span>
              <span className="text-[9px] tracking-ultra text-warmgrey uppercase -mt-1 font-navbar-sans">
                Exports • Est. 1998
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links (Centered) */}
          <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-11 text-[13px] tracking-wider uppercase font-medium font-navbar-sans text-ink/85 flex-shrink-0">
            {/* Collections with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Link
                to="/collections"
                className={`editorial-link-brass flex items-center gap-1.5 py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                  location.pathname.startsWith('/collections') ? 'text-oxblood font-semibold' : ''
                }`}
              >
                <span>Export Catalogue</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-brass' : ''}`} />
              </Link>

              {/* Normal Collections Dropdown Menu */}
              {isMegaMenuOpen && (
                <div className="absolute top-full left-0 min-w-[240px] bg-bone border border-stone shadow-xl py-2 z-50 animate-fadeIn">
                  <div className="py-1">
                    {CATEGORIES.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/collections/${cat.id}`}
                        onClick={closeMegaMenu}
                        className="block px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-ink hover:text-oxblood hover:bg-stone/20 transition-colors font-navbar-sans"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    <div className="border-t border-stone my-1 pt-1">
                      <Link
                        to="/collections"
                        onClick={closeMegaMenu}
                        className="block px-5 py-2 text-xs uppercase tracking-wider font-semibold text-oxblood hover:bg-stone/20 transition-colors font-navbar-sans"
                      >
                        All Collections
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* <Link
              to="/capabilities"
              className={`editorial-link-brass py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                location.pathname === '/capabilities' ? 'text-oxblood font-semibold' : ''
              }`}
            >
              Capabilities
            </Link> */}
            {/* <Link
              to="/private-label"
              className={`editorial-link-brass py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                location.pathname === '/private-label' ? 'text-oxblood font-semibold' : ''
              }`}
            >
              Private Label
            </Link> */}
            {/* <Link
              to="/compliance"
              className={`editorial-link-brass py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                location.pathname === '/compliance' ? 'text-oxblood font-semibold' : ''
              }`}
            >
              Compliance
            </Link> */}
            <Link
              to="/sampling-shipping"
              className={`editorial-link-brass py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                location.pathname === '/sampling-shipping' ? 'text-oxblood font-semibold' : ''
              }`}
            >
              Logistics & Terms
            </Link>
            <Link
              to="/about"
              className={`editorial-link-brass py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                location.pathname === '/about' ? 'text-oxblood font-semibold' : ''
              }`}
            >
              About Factory
            </Link>
            <Link
              to="/contact"
              className={`editorial-link-brass py-7 text-ink hover:text-oxblood transition-colors font-navbar-sans ${
                location.pathname === '/contact' ? 'text-oxblood font-semibold' : ''
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons & RFQ Button */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-5 font-navbar-sans">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-ink hover:text-oxblood transition-colors flex items-center gap-1.5 text-xs font-navbar-sans group"
              aria-label="Search catalogue styles"
              title="Search style codes, fabrics, GSM"
            >
              <Search className="w-4 h-4 stroke-[1.5] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline uppercase tracking-wider text-[11px] text-warmgrey group-hover:text-ink transition-colors">Search</span>
            </button>

            {/* Download Linesheet */}
            {/* <Link
              to="/catalogue"
              className="hidden md:inline-flex items-center gap-1.5 p-2 text-warmgrey hover:text-ink transition-colors text-xs font-navbar-sans uppercase tracking-wider"
              title="Download Linesheet"
            >
              <FileSpreadsheet className="w-4 h-4 text-brass" />
              <span>Linesheets</span>
            </Link> */}

            {/* Direct RFQ Action Button */}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-oxblood text-bone hover:bg-oxblood-dark transition-colors text-xs uppercase tracking-widest font-semibold font-navbar-sans shadow-sm"
            >
              Request RFQ
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-2 text-ink hover:text-oxblood transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Ink Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-ink text-bone flex flex-col animate-fadeIn">
          {/* Top Bar inside Mobile Menu */}
          <div className="p-6 flex items-center justify-between hairline-ink-b">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="font-navbar-wordmark text-2xl uppercase tracking-wider text-bone"
            >
              ELANORA
            </Link>
            <button
              onClick={closeMobileMenu}
              className="text-stone hover:text-bone p-2"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Links Body */}
          <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="label-caps font-navbar-sans text-brass block">Export Directory</span>
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/collections"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors italic"
                >
                  Export Catalogue
                </Link>
                <div className="pl-4 space-y-2 hairline-l border-stone/20 py-2">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      to={`/collections/${c.id}`}
                      onClick={closeMobileMenu}
                      className="block text-sm font-navbar-sans text-stone hover:text-bone uppercase tracking-wider"
                    >
                      <span className="text-brass mr-2 font-mono text-xs">{c.number}</span>
                      {c.name}
                    </Link>
                  ))}
                </div>

                {/* <Link
                  to="/capabilities"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  Capabilities & Mills
                </Link> */}
                {/* <Link
                  to="/private-label"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  Private Label OEM/ODM
                </Link> */}
                {/* <Link
                  to="/compliance"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  Factory Compliance
                </Link> */}
                <Link
                  to="/sampling-shipping"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  Logistics & Terms
                </Link>
                <Link
                  to="/about"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  About Factory
                </Link>
                {/* <Link
                  to="/catalogue"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  Download Linesheets
                </Link> */}
                <Link
                  to="/contact"
                  onClick={closeMobileMenu}
                  className="font-navbar-wordmark text-3xl hover:text-brass transition-colors"
                >
                  Contact Factory Desk
                </Link>
              </nav>
            </div>

            {/* Mobile Footer CTA */}
            <div className="pt-8 space-y-4 hairline-ink-t font-navbar-sans">
              <Link
                to="/quote-request"
                onClick={closeMobileMenu}
                className="w-full py-4 bg-oxblood text-bone text-center block uppercase tracking-widest text-xs font-semibold hover:bg-oxblood-light transition-colors font-navbar-sans"
              >
                Request Export Quotation (RFQ)
              </Link>
              <p className="text-center text-xs text-warmgrey">
                Wholesale Manufacturing & Export Only • Min 500 pcs/style
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
