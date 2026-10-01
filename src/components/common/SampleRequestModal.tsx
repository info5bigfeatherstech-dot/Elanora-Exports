import React, { useState } from 'react';
import { useUIStore } from '../../store/useUIStore';
import { Product } from '../../types';
import { X, Send, CheckCircle2 } from 'lucide-react';

export const SampleRequestModal: React.FC = () => {
  const { sampleRequestModalProduct, closeSampleRequestModal, addToast } = useUIStore();

  const [company, setCompany] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [email, setEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [courierAccount, setCourierAccount] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('Medium (M)');
  const [submitted, setSubmitted] = useState(false);

  if (!sampleRequestModalProduct) return null;
  const product: Product = sampleRequestModalProduct;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !email || !shippingAddress) {
      addToast('Missing Required Details', 'Please enter company, email, and destination address.', 'warning');
      return;
    }
    setSubmitted(true);
    addToast('Sample Request Logged', `Sample request for ${product.styleCode} registered. Dispatched in ${product.sampleLeadTimeDays} days.`, 'success');
    setTimeout(() => {
      setSubmitted(false);
      closeSampleRequestModal();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/80 backdrop-blur-sm"
        onClick={closeSampleRequestModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-bone border border-stone shadow-2xl overflow-hidden z-10">
        
        {/* Header */}
        <div className="p-6 hairline-b flex items-center justify-between bg-stone/20">
          <div>
            <span className="label-caps text-brass block">Trade Buyer Development</span>
            <h3 className="font-serif text-xl font-normal text-ink">
              Request Prototype Sample: {product.styleCode}
            </h3>
          </div>
          <button
            onClick={closeSampleRequestModal}
            className="p-2 text-ink hover:text-oxblood transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-12 h-12 border border-brass text-brass mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-2xl text-ink">Sample Order Registered</h4>
            <p className="text-xs text-warmgrey max-w-md mx-auto leading-relaxed">
              Your sample docket for <strong>{product.styleCode} ({product.name})</strong> has been routed to our sampling room. Our export merchandiser will email tracking details within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Sampling Policy Alert */}
            <div className="p-3 bg-stone/30 border border-stone text-xs text-warmgrey space-y-1">
              <p className="text-ink font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-brass"></span>
                Lead Time: {product.sampleLeadTimeDays} business days ex-factory
              </p>
              <p>
                Sample development fee is invoiced upon dispatch and is <strong>100% credited against your bulk commercial order</strong>.
              </p>
            </div>

            {/* Spec Choices */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-caps text-warmgrey block mb-1.5">Colorway</label>
                <select
                  value={selectedColor || product.colors[0].name}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                >
                  {product.colors.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label-caps text-warmgrey block mb-1.5">Proto Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                >
                  <option value="Small (S)">Small (S / US 4)</option>
                  <option value="Medium (M)">Medium (M / US 6)</option>
                  <option value="Large (L)">Large (L / US 8)</option>
                  <option value="Full Size Set">Full Size Set (XS–XL)</option>
                </select>
              </div>
            </div>

            {/* Buyer Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-caps text-warmgrey block mb-1.5">Company Name *</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Nordstrom, Selfridges, Brand Co"
                  className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>

              <div>
                <label className="label-caps text-warmgrey block mb-1.5">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Buyer / Sourcing Manager"
                  className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-caps text-warmgrey block mb-1.5">Business Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="buyer@brand.com"
                  className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>

              <div>
                <label className="label-caps text-warmgrey block mb-1.5">DHL/FedEx Account (Optional)</label>
                <input
                  type="text"
                  value={courierAccount}
                  onChange={(e) => setCourierAccount(e.target.value)}
                  placeholder="e.g. DHL #962810332"
                  className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>
            </div>

            <div>
              <label className="label-caps text-warmgrey block mb-1.5">Courier Delivery Address *</label>
              <textarea
                required
                rows={2}
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Full delivery address including city, postal code, and country..."
                className="w-full bg-bone border border-stone p-2 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark transition-colors text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Sample Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
