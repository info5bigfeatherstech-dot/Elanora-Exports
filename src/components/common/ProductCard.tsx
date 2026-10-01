import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { ArrowRight, FileText } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'tall';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = 'portrait',
}) => {
  return (
    <div className="group flex flex-col bg-bone border border-stone/80 hover:border-ink transition-colors duration-300 relative">
      
      {/* Image Container with B&W to Color Hover Effect */}
      <div className={`relative overflow-hidden bg-stone/40 ${aspectRatio === 'tall' ? 'aspect-[2/3]' : 'aspect-[3/4]'}`}>
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.heroImage}
            alt={`${product.name} - ${product.styleCode}`}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[10px] bg-ink/90 text-bone px-2 py-0.5 tracking-wider uppercase">
            {product.styleCode}
          </span>
          {product.season && (
            <span className="text-[10px] bg-bone/90 text-ink border border-stone px-2 py-0.5 tracking-widest uppercase font-semibold">
              {product.season}
            </span>
          )}
        </div>

        {/* Quick View Overlay on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-ink/90 via-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-between">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 py-2 px-3 bg-bone text-ink hover:bg-oxblood hover:text-bone text-[11px] uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Inspect Export Specs</span>
          </Link>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col justify-between flex-1 hairline-t space-y-3 bg-bone">
        <div>
          {/* Category & Gauge/GSM */}
          <div className="flex items-center justify-between text-[11px] text-warmgrey uppercase tracking-wider">
            <span>{product.categoryName.split('&')[0].trim()}</span>
            <span className="font-mono">{product.gsm} GSM</span>
          </div>

          {/* Style Name */}
          <h3 className="font-serif text-lg text-ink font-normal tracking-tight group-hover:text-oxblood transition-colors mt-1 line-clamp-1">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>

          {/* Fabric Line */}
          <p className="text-xs text-warmgrey line-clamp-1 mt-0.5">{product.fabric}</p>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {product.colors.slice(0, 4).map((col) => (
              <span
                key={col.name}
                title={col.name}
                className="w-2.5 h-2.5 inline-block border border-stone-dark/50"
                style={{ backgroundColor: col.hex }}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-warmgrey font-mono">
                +{product.colors.length - 4} colors
              </span>
            )}
          </div>
        </div>

        {/* Wholesale Export Commercial Details */}
        <div className="pt-2 hairline-t flex items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-warmgrey block">MOQ</span>
            <span className="font-mono text-xs text-ink font-medium">
              {product.moqTotal} pcs
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-warmgrey block">Port Delivery</span>
            <span className="font-mono text-xs text-ink font-medium">
              FOB / CIF / DDP
            </span>
          </div>
        </div>

        {/* Action Link */}
        <div className="pt-2">
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2 border border-stone hover:border-ink text-ink hover:bg-stone/20 text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Technical Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
