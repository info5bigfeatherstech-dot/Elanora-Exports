import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    return <Navigate to="/collections" replace />;
  }

  const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);

  return (
    <div className="bg-bone text-ink min-h-screen">
      
      {/* Category Hero Banner */}
      <section className="hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <Link
              to="/collections"
              className="text-xs uppercase tracking-wider text-warmgrey hover:text-ink flex items-center gap-2 mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Collections
            </Link>

            <div className="flex items-center gap-3">
              <span className="font-serif text-3xl text-brass italic font-light">
                {category.number}
              </span>
              <span className="h-px w-12 bg-brass"></span>
              <span className="label-caps text-warmgrey">Manufacturing Division</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-ink font-normal tracking-tight">
              {category.name}
            </h1>

            <p className="text-lg text-ink/90 font-serif italic">
              {category.tagline}
            </p>

            <p className="text-sm text-warmgrey-dark max-w-xl leading-relaxed">
              {category.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 hairline-t border-stone text-xs">
              <div>
                <span className="text-[10px] uppercase text-warmgrey block">Typical MOQ</span>
                <span className="font-mono text-ink font-semibold">{category.typicalMOQ}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-warmgrey block">Production Lead</span>
                <span className="font-mono text-ink font-semibold">{category.leadTime}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-warmgrey block">Export Port</span>
                <span className="font-mono text-ink font-semibold">FOB Mumbai (JNPT)</span>
              </div>
            </div>

            {/* Subcategories tags */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="label-caps text-warmgrey mr-1">Silhouettes:</span>
              {category.subcategories.map((sub) => (
                <span
                  key={sub}
                  className="px-2.5 py-1 bg-bone border border-stone text-[11px] text-ink uppercase tracking-wider"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] border border-stone overflow-hidden shadow-xl bg-stone/40">
              <img
                src={category.bannerImage}
                alt={category.name}
                className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-ink/90 text-bone">
                <span className="label-caps text-brass block">Primary Fabrics</span>
                <p className="text-xs text-stone mt-1">
                  {category.primaryFabrics.join(' • ')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Product Grid Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 hairline-b">
            <div>
              <span className="label-caps text-brass block">Curated Assortment</span>
              <h2 className="font-serif text-3xl text-ink font-normal mt-1">
                {category.name} Lineplan ({categoryProducts.length} Styles)
              </h2>
            </div>
            <Link
              to="/quote-request"
              className="px-6 py-3 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              <span>Request Division Costing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
