import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-bone text-ink min-h-[calc(100vh-80px)] py-24 px-4 sm:px-6 lg:px-10 flex items-center justify-center text-center">
      <div className="max-w-md space-y-6">
        <span className="font-serif text-7xl sm:text-8xl text-brass italic font-light block">
          404
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
          Style Docket Not Located
        </h1>
        <p className="text-xs text-warmgrey leading-relaxed">
          The requested export documentation, product silhouette, or manufacturing division URL does not exist or has been archived into prior seasonal records.
        </p>
        <div className="pt-2">
          <Link
            to="/collections"
            className="px-8 py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2"
          >
            <span>Return to Current Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
