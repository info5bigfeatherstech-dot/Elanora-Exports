import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

// Layout & Global Components
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { SpecSheetModal } from './components/common/SpecSheetModal';
import { SampleRequestModal } from './components/common/SampleRequestModal';
import { ToastContainer } from './components/common/ToastContainer';

// Export Showcase Pages
import { HomePage } from './pages/HomePage';
import { CollectionsPage } from './pages/CollectionsPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { QuoteRequestPage } from './pages/QuoteRequestPage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { PrivateLabelPage } from './pages/PrivateLabelPage';
import { CompliancePage } from './pages/CompliancePage';
import { SamplingShippingPage } from './pages/SamplingShippingPage';
import { AboutPage } from './pages/AboutPage';
import { CataloguePage } from './pages/CataloguePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll Restoration & Lenis Handler
const ScrollAndLenisHandler: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <Router>
      <ScrollAndLenisHandler />
      
      <div className="flex flex-col min-h-screen bg-bone text-ink selection:bg-oxblood selection:text-bone">
        {/* Global Navigation Header */}
        <Header />

        {/* Dynamic Route Content (Pure Import/Export Showcase) */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetailPage />} />
            <Route path="/quote-request" element={<QuoteRequestPage />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/private-label" element={<PrivateLabelPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/sampling-shipping" element={<SamplingShippingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Export Drawers & Modals (Search, Tech Pack Specs, Sample Request, Toasts) */}
        <SearchModal />
        <SpecSheetModal />
        <SampleRequestModal />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
