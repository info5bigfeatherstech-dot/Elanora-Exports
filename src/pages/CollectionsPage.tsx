import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/common/ProductCard';
import { ProductCategory } from '../types';
import { Filter, X, SlidersHorizontal, Grid2X2, Grid3X3, LayoutGrid } from 'lucide-react';

export const CollectionsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Active Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedMoqMax, setSelectedMoqMax] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique fabrics for filter
  const allFabrics = useMemo(() => {
    const list = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.fabric.includes('Merino')) list.add('Merino Wool');
      if (p.fabric.includes('Silk')) list.add('Mulberry Silk');
      if (p.fabric.includes('Cotton')) list.add('Organic Cotton');
      if (p.fabric.includes('Cupro')) list.add('Cupro');
      if (p.fabric.includes('Modal')) list.add('Modal');
      if (p.fabric.includes('Interlock') || p.fabric.includes('Polyamide')) list.add('Technical Interlock');
      if (p.fabric.includes('Wool') || p.fabric.includes('Gabardine')) list.add('Virgin Wool & Gabardine');
    });
    return Array.from(list);
  }, []);

  // Filtered & Sorted items
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedFabric !== 'all') {
      result = result.filter((p) =>
        p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())
      );
    }

    if (selectedSeason !== 'all') {
      result = result.filter((p) => p.season === selectedSeason);
    }

    if (selectedMoqMax < 1000) {
      result = result.filter((p) => p.moqTotal <= selectedMoqMax);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.fobPriceStartingUSD - b.fobPriceStartingUSD);
        break;
      case 'price-desc':
        result.sort((a, b) => b.fobPriceStartingUSD - a.fobPriceStartingUSD);
        break;
      case 'moq-asc':
        result.sort((a, b) => a.moqTotal - b.moqTotal);
        break;
      case 'moq-desc':
        result.sort((a, b) => b.moqTotal - a.moqTotal);
        break;
      case 'code':
        result.sort((a, b) => a.styleCode.localeCompare(b.styleCode));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, selectedFabric, selectedSeason, selectedMoqMax, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setSelectedFabric('all');
    setSelectedSeason('all');
    setSelectedMoqMax(1000);
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFabric !== 'all' ||
    selectedSeason !== 'all' ||
    selectedMoqMax < 1000;

  return (
    <div className="bg-bone text-ink min-h-screen">
      {/* Header Banner */}
      <div className="hairline-b bg-stone/20 py-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <span className="label-caps text-brass block">Wholesale Catalogue</span>
          <h1 className="font-serif text-4xl sm:text-5xl text-ink font-normal mt-1">
            Complete Export Collection
          </h1>
          <p className="text-sm text-warmgrey-dark max-w-2xl mt-2 leading-relaxed">
            All styles engineered to export specifications with minimum order quantities, factory production dockets, and full private label customization scope.
          </p>
        </div>
      </div>

      {/* Main Layout: Left Sidebar Filter + Product Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8">
        
        {/* Top Control Bar: Total Count, Sort, Grid Switcher, Mobile Filter Button */}
        <div className="hairline-b pb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 border border-ink text-ink hover:bg-ink hover:text-bone text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            <span className="text-xs font-mono text-warmgrey uppercase">
              Showing {displayedProducts.length} of {filteredProducts.length} Wholesale Styles
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <label className="text-warmgrey uppercase tracking-wider hidden sm:inline">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-bone border border-stone py-1.5 px-3 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
              >
                <option value="featured">Featured Lines</option>
                <option value="moq-asc">MOQ: Smallest to Largest</option>
                <option value="moq-desc">MOQ: Largest to Smallest</option>
                <option value="code">Style Code (A–Z)</option>
              </select>
            </div>

            {/* Grid Column Selector (Desktop) */}
            <div className="hidden md:flex items-center border border-stone">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 transition-colors ${gridColumns === 2 ? 'bg-ink text-bone' : 'text-warmgrey hover:text-ink'}`}
                title="2 Columns"
              >
                <Grid2X2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition-colors ${gridColumns === 3 ? 'bg-ink text-bone' : 'text-warmgrey hover:text-ink'}`}
                title="3 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(4)}
                className={`p-1.5 transition-colors ${gridColumns === 4 ? 'bg-ink text-bone' : 'text-warmgrey hover:text-ink'}`}
                title="4 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="py-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="label-caps text-brass mr-1">Active:</span>
            {selectedCategory !== 'all' && (
              <span className="px-2.5 py-1 bg-stone/40 text-ink flex items-center gap-1.5 font-mono text-[11px]">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')} className="hover:text-oxblood">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFabric !== 'all' && (
              <span className="px-2.5 py-1 bg-stone/40 text-ink flex items-center gap-1.5 font-mono text-[11px]">
                Fabric: {selectedFabric}
                <button onClick={() => setSelectedFabric('all')} className="hover:text-oxblood">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSeason !== 'all' && (
              <span className="px-2.5 py-1 bg-stone/40 text-ink flex items-center gap-1.5 font-mono text-[11px]">
                Season: {selectedSeason}
                <button onClick={() => setSelectedSeason('all')} className="hover:text-oxblood">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedMoqMax < 1000 && (
              <span className="px-2.5 py-1 bg-stone/40 text-ink flex items-center gap-1.5 font-mono text-[11px]">
                Max MOQ: {selectedMoqMax} pcs
                <button onClick={() => setSelectedMoqMax(1000)} className="hover:text-oxblood">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-[11px] uppercase tracking-wider text-oxblood hover:underline font-semibold ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
          
          {/* Left Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-6 hairline-r">
            
            {/* Category Filter */}
            <div className="space-y-3">
              <span className="label-caps text-brass block">01 / Category</span>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left py-1.5 px-2 flex justify-between transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-ink text-bone font-semibold'
                      : 'text-ink/80 hover:bg-stone/30'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="font-mono text-[11px]">32</span>
                </button>
                {CATEGORIES.map((c) => {
                  const count = PRODUCTS.filter((p) => p.category === c.id).length;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`w-full text-left py-1.5 px-2 flex justify-between transition-colors ${
                        selectedCategory === c.id
                          ? 'bg-ink text-bone font-semibold'
                          : 'text-ink/80 hover:bg-stone/30'
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="font-mono text-[11px]">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fabric Material Filter */}
            <div className="space-y-3 hairline-t pt-6">
              <span className="label-caps text-brass block">02 / Material & Yarn</span>
              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => setSelectedFabric('all')}
                  className={`w-full text-left py-1 px-2 ${selectedFabric === 'all' ? 'font-bold text-oxblood' : 'text-warmgrey hover:text-ink'}`}
                >
                  All Fabrics
                </button>
                {allFabrics.map((fabric) => (
                  <button
                    key={fabric}
                    onClick={() => setSelectedFabric(fabric)}
                    className={`w-full text-left py-1 px-2 ${selectedFabric === fabric ? 'font-bold text-oxblood' : 'text-warmgrey hover:text-ink'}`}
                  >
                    {fabric}
                  </button>
                ))}
              </div>
            </div>

            {/* Season Filter */}
            <div className="space-y-3 hairline-t pt-6">
              <span className="label-caps text-brass block">03 / Production Season</span>
              <div className="space-y-1.5 text-xs">
                {['all', 'AW 26/27', 'SS 26', 'Core Collection', 'Resort 26'].map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    className={`w-full text-left py-1 px-2 uppercase ${selectedSeason === season ? 'font-bold text-oxblood' : 'text-warmgrey hover:text-ink'}`}
                  >
                    {season === 'all' ? 'All Seasons' : season}
                  </button>
                ))}
              </div>
            </div>

            {/* MOQ Threshold Slider */}
            <div className="space-y-3 hairline-t pt-6">
              <div className="flex justify-between items-baseline">
                <span className="label-caps text-brass">04 / Maximum MOQ</span>
                <span className="font-mono text-xs text-ink font-semibold">
                  {selectedMoqMax >= 1000 ? 'Any' : `≤ ${selectedMoqMax} pcs`}
                </span>
              </div>
              <input
                type="range"
                min="400"
                max="1000"
                step="100"
                value={selectedMoqMax}
                onChange={(e) => setSelectedMoqMax(parseInt(e.target.value))}
                className="w-full accent-oxblood"
              />
              <div className="flex justify-between text-[10px] text-warmgrey font-mono">
                <span>400 pcs</span>
                <span>600 pcs</span>
                <span>1000+ pcs</span>
              </div>
            </div>

          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {displayedProducts.length === 0 ? (
              <div className="py-20 text-center border border-stone bg-white/30 space-y-4">
                <h3 className="font-serif text-2xl text-ink font-normal">No styles match current criteria</h3>
                <p className="text-xs text-warmgrey max-w-sm mx-auto">
                  Try broadening your MOQ slider or clearing fabric filters to view available export lines.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 bg-ink text-bone hover:bg-oxblood text-xs uppercase tracking-wider font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-6 ${
                    gridColumns === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : gridColumns === 4
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="mt-12 text-center pt-8 hairline-t">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                      className="px-10 py-4 bg-ink text-bone hover:bg-oxblood transition-colors text-xs uppercase tracking-widest font-semibold"
                    >
                      Load More Styles ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden animate-fadeIn">
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="fixed inset-x-0 bottom-0 bg-bone max-h-[85vh] overflow-y-auto p-6 space-y-6 shadow-2xl border-t border-stone">
            <div className="flex justify-between items-center hairline-b pb-4">
              <h3 className="font-serif text-xl text-ink">Wholesale Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-ink"
                aria-label="Close filters"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <span className="label-caps text-brass block">Category</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`p-2 border text-left ${selectedCategory === 'all' ? 'bg-ink text-bone border-ink' : 'border-stone'}`}
                >
                  All Categories
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`p-2 border text-left truncate ${selectedCategory === c.id ? 'bg-ink text-bone border-ink' : 'border-stone'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Season */}
            <div className="space-y-2">
              <span className="label-caps text-brass block">Season</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['all', 'AW 26/27', 'SS 26', 'Core Collection'].map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    className={`px-3 py-1.5 border uppercase ${selectedSeason === season ? 'bg-ink text-bone border-ink' : 'border-stone'}`}
                  >
                    {season === 'all' ? 'All' : season}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={resetAllFilters}
                className="flex-1 py-3 border border-ink text-ink text-xs uppercase tracking-wider font-semibold"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-oxblood text-bone text-xs uppercase tracking-wider font-semibold"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
