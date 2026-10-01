import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults(PRODUCTS.slice(0, 6)); // show trending styles when empty
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.styleCode.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.composition.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isSearchModalOpen) return null;

  const handleSelect = (productId: string) => {
    closeSearch();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex items-start justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-bone border border-stone shadow-2xl overflow-hidden z-10">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 hairline-b flex items-center gap-4 bg-bone">
          <Search className="w-5 h-5 text-warmgrey shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search styles, style codes (e.g. ELA-KN-012), fabrics, GSM..."
            className="w-full bg-transparent text-ink text-base sm:text-lg focus:outline-none placeholder:text-warmgrey font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-warmgrey hover:text-ink text-xs uppercase tracking-wider font-mono"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearch}
            className="p-1 text-ink hover:text-oxblood transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-6 py-3 bg-stone/20 hairline-b flex flex-wrap items-center gap-2 text-xs text-warmgrey">
          <span className="label-caps text-brass">Quick Filters:</span>
          {['Merino Wool', 'Silk Charmeuse', 'Outerwear', 'Activewear', '500 pcs MOQ'].map((pill) => (
            <button
              key={pill}
              onClick={() => setQuery(pill)}
              className="px-2.5 py-1 border border-stone hover:border-ink hover:text-ink transition-colors bg-bone"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-warmgrey pb-2">
            <span>{query ? `Found ${results.length} wholesale styles` : 'Featured Styles'}</span>
            <span className="font-mono text-[10px]">FOB MUMBAI</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-warmgrey">
              <p className="font-serif text-lg text-ink">No matching styles found for "{query}"</p>
              <p className="text-xs mt-1">Try searching by category, material, or style code like ELA-KN or ELA-OW.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelect(product.id)}
                  className="p-3 border border-stone hover:border-oxblood bg-white/40 cursor-pointer flex gap-3 group transition-colors"
                >
                  <div className="w-16 aspect-[3/4] bg-stone shrink-0 overflow-hidden">
                    <img
                      src={product.heroImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-brass">{product.styleCode}</span>
                        <span className="text-[10px] font-mono text-warmgrey">MOQ {product.moqTotal}</span>
                      </div>
                      <h4 className="font-serif text-sm text-ink group-hover:text-oxblood transition-colors font-medium truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-warmgrey line-clamp-1">{product.fabric}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="font-mono text-xs text-warmgrey uppercase tracking-wider">
                        {product.gsm} GSM
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-stone group-hover:text-oxblood group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone/30 hairline-t flex items-center justify-between text-xs text-warmgrey">
          <span>Press ESC or click outside to dismiss</span>
          <button
            onClick={() => {
              closeSearch();
              navigate('/collections');
            }}
            className="text-ink hover:text-oxblood font-medium underline flex items-center gap-1"
          >
            View Entire Catalogue <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
