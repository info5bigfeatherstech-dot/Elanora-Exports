import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { useUIStore } from '../store/useUIStore';
import { api } from '../services/api';
import { QuoteRequestData, Incoterm } from '../types';
import { Check, Upload, FileText, ArrowRight, ArrowLeft, ShieldCheck, Download, CheckCircle2, Plus, Trash2 } from 'lucide-react';

export const QuoteRequestPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillStyle = searchParams.get('style');
  const addToast = useUIStore((state) => state.addToast);

  // Form State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [confirmedQuote, setConfirmedQuote] = useState<QuoteRequestData | null>(null);

  // Selected Styles for Quotation
  const [selectedStyles, setSelectedStyles] = useState<Array<{ styleCode: string; quantity: number }>>(() => {
    if (prefillStyle) {
      return [{ styleCode: prefillStyle, quantity: 500 }];
    }
    return [
      { styleCode: 'ELA-KN-012', quantity: 1000 },
      { styleCode: 'ELA-OW-103', quantity: 500 },
    ];
  });

  // Step 1: Company & Buyer Details
  const [companyName, setCompanyName] = useState('Nordic Apparel Group AB');
  const [buyerName, setBuyerName] = useState('Ingrid Bergman');
  const [businessEmail, setBusinessEmail] = useState('ingrid.b@nordicapparel.se');
  const [phone, setPhone] = useState('+46 8 555 120 40');
  const [country, setCountry] = useState('Sweden');
  const [website, setWebsite] = useState('https://nordicapparel.se');
  const [taxOrVatId, setTaxOrVatId] = useState('SE556012345601');
  const [buyerType, setBuyerType] = useState<QuoteRequestData['buyerType']>('Retailer');

  // Step 2: Logistics & Specifications
  const [incoterm, setIncoterm] = useState<Incoterm>('FOB');
  const [destinationPort, setDestinationPort] = useState('Gothenburg Port / Stockholm');
  const [targetDeliveryDate, setTargetDeliveryDate] = useState('2026-11-20');
  const [packagingRequirements, setPackagingRequirements] = useState(
    'Individual oxo-biodegradable polybags with barcode stickers, standard export master cartons'
  );
  const [customizationNotes, setCustomizationNotes] = useState(
    'Private label damask neck labels, custom engraved horn buttons, and custom Pantone TCX dyeing'
  );
  const [requireSamplesBeforeBulk, setRequireSamplesBeforeBulk] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([
    'Nordic_AW26_TechPack_MerinoCardigan.pdf',
    'Suiting_Blazer_Grading_Chart.xlsx',
  ]);

  useEffect(() => {
    if (prefillStyle && !selectedStyles.some((s) => s.styleCode === prefillStyle)) {
      setSelectedStyles((prev) => [{ styleCode: prefillStyle, quantity: 500 }, ...prev]);
    }
  }, [prefillStyle]);

  const totalVolume = selectedStyles.reduce((acc, s) => acc + s.quantity, 0);

  const addStyleToRFQ = () => {
    setSelectedStyles((prev) => [...prev, { styleCode: PRODUCTS[0].styleCode, quantity: 500 }]);
  };

  const removeStyleFromRFQ = (index: number) => {
    setSelectedStyles((prev) => prev.filter((_, i) => i !== index));
  };

  const updateStyleCode = (index: number, code: string) => {
    setSelectedStyles((prev) => {
      const updated = [...prev];
      updated[index].styleCode = code;
      return updated;
    });
  };

  const updateStyleQty = (index: number, qty: number) => {
    setSelectedStyles((prev) => {
      const updated = [...prev];
      updated[index].quantity = Math.max(100, qty);
      return updated;
    });
  };

  const validateStep1 = () => {
    if (!companyName.trim() || !buyerName.trim() || !businessEmail.trim() || !phone.trim()) {
      addToast('Incomplete Company Details', 'Please complete all required company fields.', 'warning');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (selectedStyles.length === 0) {
      addToast('No Styles Specified', 'Please add at least one style code for quotation.', 'warning');
      return false;
    }
    if (!destinationPort.trim() || !targetDeliveryDate) {
      addToast('Missing Logistics', 'Please specify destination port and target delivery date.', 'warning');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => f.name);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      addToast('File Attached', `${newFiles.length} tech pack files attached to RFQ.`, 'info');
    }
  };

  const removeUploadedFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== fileName));
  };

  const handleSubmitQuote = async () => {
    setIsSubmitting(true);
    try {
      // Build mock EnquiryItem array for storage
      const itemsList = selectedStyles.map((item, idx) => {
        const prod = PRODUCTS.find((p) => p.styleCode === item.styleCode) || PRODUCTS[0];
        return {
          id: `rfq_item_${idx}`,
          productId: prod.id,
          product: prod,
          selectedColor: prod.colors[0],
          sizeRatio: prod.sizeRatioDefault,
          quantity: item.quantity,
          targetPriceUSD: prod.fobPriceStartingUSD,
        };
      });

      const estTotal = itemsList.reduce((acc, it) => acc + it.quantity * it.product.fobPriceStartingUSD, 0);

      const result = await api.submitRFQ({
        companyName,
        buyerName,
        businessEmail,
        phone,
        country,
        website,
        taxOrVatId,
        buyerType,
        items: itemsList,
        totalUnits: totalVolume,
        estimatedTotalFOB: estTotal,
        incoterm,
        destinationPort,
        targetDeliveryDate,
        packagingRequirements,
        customizationNotes,
        requireSamplesBeforeBulk,
        uploadedTechPackNames: uploadedFiles,
      });

      setConfirmedQuote(result);
      setCurrentStep(4);
      addToast('RFQ Submitted Successfully', `Quotation Docket ${result.referenceNumber} created.`, 'success');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      addToast('Submission Error', 'Failed to generate quote. Please try again.', 'warning');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // CONFIRMATION VIEW (STEP 4)
  // ============================================================
  if (currentStep === 4 && confirmedQuote) {
    return (
      <div className="bg-bone min-h-screen py-16 px-4 sm:px-6 lg:px-10 animate-fadeIn">
        <div className="max-w-3xl mx-auto border border-stone bg-white/50 p-8 sm:p-12 space-y-8 shadow-xl">
          
          <div className="text-center space-y-3 pb-8 hairline-b">
            <div className="w-16 h-16 border-2 border-brass text-brass mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 stroke-[2.5]" />
            </div>
            <span className="label-caps text-brass block">Export RFQ Logged</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal">
              Request for Quotation Confirmed
            </h1>
            <p className="font-mono text-lg font-bold text-oxblood">
              REFERENCE: {confirmedQuote.referenceNumber}
            </p>
            <p className="text-xs text-warmgrey max-w-md mx-auto leading-relaxed">
              Our export merchandising desk will email formal FOB/CIF proforma pricing, material availability schedules, and lab dip dates within <strong>1–2 business days</strong>.
            </p>
          </div>

          {/* Docket Summary Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border border-stone bg-bone text-xs">
            <div>
              <span className="text-[10px] text-warmgrey uppercase block">Company</span>
              <span className="font-semibold text-ink">{confirmedQuote.companyName}</span>
            </div>
            <div>
              <span className="text-[10px] text-warmgrey uppercase block">Total Volume</span>
              <span className="font-mono font-semibold text-ink">{confirmedQuote.totalUnits.toLocaleString()} pcs</span>
            </div>
            <div>
              <span className="text-[10px] text-warmgrey uppercase block">Incoterm</span>
              <span className="font-mono font-semibold text-ink">{confirmedQuote.incoterm} ({confirmedQuote.destinationPort})</span>
            </div>
            <div>
              <span className="text-[10px] text-warmgrey uppercase block">Status</span>
              <span className="font-mono text-brass font-semibold">Under Technical Costing</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => {
                addToast('Summary Saved', `RFQ_${confirmedQuote.referenceNumber}_Docket.pdf downloaded.`, 'success');
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Quotation Docket PDF</span>
            </button>

            <Link
              to="/collections"
              className="w-full sm:w-auto px-6 py-3.5 border border-stone hover:border-ink text-ink text-xs uppercase tracking-widest font-semibold text-center"
            >
              Return to Export Catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // 3-STEP WIZARD
  // ============================================================
  return (
    <div className="bg-bone text-ink min-h-screen py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Wizard Stepper */}
        <div className="pb-8 hairline-b mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="label-caps text-brass block">Wholesale Export Costing</span>
            <h1 className="font-serif text-3xl sm:text-4xl text-ink font-normal mt-1">
              Request for Export Quotation (RFQ)
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
            <span className={`px-3 py-1 border ${currentStep === 1 ? 'bg-ink text-bone border-ink' : 'border-stone text-warmgrey'}`}>
              01 Company
            </span>
            <span className="text-stone">→</span>
            <span className={`px-3 py-1 border ${currentStep === 2 ? 'bg-ink text-bone border-ink' : 'border-stone text-warmgrey'}`}>
              02 Styles & Logistics
            </span>
            <span className="text-stone">→</span>
            <span className={`px-3 py-1 border ${currentStep === 3 ? 'bg-ink text-bone border-ink' : 'border-stone text-warmgrey'}`}>
              03 Review & Submit
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="border border-stone bg-white/50 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto">
          
          {/* STEP 1: COMPANY DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="hairline-b pb-4">
                <span className="label-caps text-brass">Step 01 / 03</span>
                <h2 className="font-serif text-2xl text-ink font-normal mt-1">
                  Buyer Corporate Entity & Contact
                </h2>
                <p className="text-xs text-warmgrey mt-1">
                  Required for official proforma export invoicing and commercial quota checks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps text-warmgrey block mb-1">Company Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Nordic Apparel Group AB"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>

                <div>
                  <label className="label-caps text-warmgrey block mb-1">Sourcing Officer / Buyer Name *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Ingrid Bergman"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps text-warmgrey block mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    required
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    placeholder="buyer@nordicapparel.se"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>

                <div>
                  <label className="label-caps text-warmgrey block mb-1">Phone / WhatsApp Line *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+46 8 555 120 40"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="label-caps text-warmgrey block mb-1">Country of Import *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  >
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Canada">Canada</option>
                    <option value="Other">Other International</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-warmgrey block mb-1">Tax / VAT / EIN (Optional)</label>
                  <input
                    type="text"
                    value={taxOrVatId}
                    onChange={(e) => setTaxOrVatId(e.target.value)}
                    placeholder="e.g. SE556012345601"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>

                <div>
                  <label className="label-caps text-warmgrey block mb-1">Company Website</label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://nordicapparel.se"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <span>Proceed to Styles & Logistics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: STYLES, LOGISTICS & TECH PACK */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="hairline-b pb-4">
                <span className="label-caps text-brass">Step 02 / 03</span>
                <h2 className="font-serif text-2xl text-ink font-normal mt-1">
                  Styles, Target Quantities & Logistics
                </h2>
                <p className="text-xs text-warmgrey mt-1">
                  Specify which export styles and volumes you wish to cost, plus destination shipping terms.
                </p>
              </div>

              {/* Styles Selector Table */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <label className="label-caps text-ink">Export Style Codes & Volumes</label>
                  <button
                    type="button"
                    onClick={addStyleToRFQ}
                    className="text-oxblood hover:underline text-xs font-semibold flex items-center gap-1 uppercase tracking-wider"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Another Style</span>
                  </button>
                </div>

                <div className="border border-stone divide-y divide-stone text-xs bg-bone">
                  <div className="grid grid-cols-12 p-2.5 bg-stone/20 font-semibold uppercase tracking-wider text-[10px] text-warmgrey">
                    <span className="col-span-7">Select Style Code</span>
                    <span className="col-span-4">Target Order Units</span>
                    <span className="col-span-1 text-center">Action</span>
                  </div>

                  {selectedStyles.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-2.5 items-center gap-2">
                      <div className="col-span-7">
                        <select
                          value={item.styleCode}
                          onChange={(e) => updateStyleCode(idx, e.target.value)}
                          className="w-full bg-white border border-stone p-1.5 text-xs text-ink focus:outline-none"
                        >
                          {PRODUCTS.map((p) => (
                            <option key={p.id} value={p.styleCode}>
                              {p.styleCode} — {p.name} ({p.categoryName.split('&')[0]})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-4 flex items-center gap-1.5">
                        <input
                          type="number"
                          min="100"
                          step="50"
                          value={item.quantity}
                          onChange={(e) => updateStyleQty(idx, parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-stone p-1.5 text-xs font-mono text-ink text-right focus:outline-none"
                        />
                        <span className="text-[10px] text-warmgrey font-mono">pcs</span>
                      </div>

                      <div className="col-span-1 text-center">
                        {selectedStyles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStyleFromRFQ(idx)}
                            className="text-warmgrey hover:text-oxblood p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center text-xs text-warmgrey pt-1 font-mono">
                  <span>Total Order Scope:</span>
                  <span className="font-bold text-ink">{totalVolume.toLocaleString()} units</span>
                </div>
              </div>

              {/* Incoterm & Port */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="label-caps text-warmgrey block mb-1">Incoterm Basis *</label>
                  <select
                    value={incoterm}
                    onChange={(e) => setIncoterm(e.target.value as Incoterm)}
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none font-mono"
                  >
                    <option value="FOB">FOB (Free On Board — Mumbai / JNPT)</option>
                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                    <option value="EXW">EXW (Ex-Factory Gate)</option>
                    <option value="DDP">DDP (Delivered Duty Paid to Door)</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-warmgrey block mb-1">Discharge Port / Warehouse City *</label>
                  <input
                    type="text"
                    required
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="e.g. Long Beach Port, Rotterdam, Sydney"
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>
              </div>

              {/* Delivery Date & Sample Checkbox */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-caps text-warmgrey block mb-1">Target Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={targetDeliveryDate}
                    onChange={(e) => setTargetDeliveryDate(e.target.value)}
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={requireSamplesBeforeBulk}
                      onChange={(e) => setRequireSamplesBeforeBulk(e.target.checked)}
                      className="accent-oxblood w-4 h-4 rounded-none"
                    />
                    <span className="text-ink font-medium">Require physical Gold-Seal pre-production sample</span>
                  </label>
                </div>
              </div>

              {/* Private Label Notes */}
              <div>
                <label className="label-caps text-warmgrey block mb-1">Private Label & Custom Trims Brief</label>
                <textarea
                  rows={2}
                  value={customizationNotes}
                  onChange={(e) => setCustomizationNotes(e.target.value)}
                  placeholder="Custom woven neck labels, custom engraved horn buttons, pantone color codes, custom packaging..."
                  className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                />
              </div>

              {/* Tech Pack Upload */}
              <div>
                <label className="label-caps text-warmgrey block mb-1">
                  Attach Tech Packs / CAD Grading Sheets (Optional)
                </label>
                <div className="border-2 border-dashed border-stone p-6 text-center bg-white/30 space-y-2">
                  <Upload className="w-6 h-6 text-warmgrey mx-auto stroke-[1.5]" />
                  <p className="text-xs text-ink">
                    Drag and drop tech packs here or{' '}
                    <label className="text-oxblood font-semibold underline cursor-pointer">
                      browse files
                      <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                    </label>
                  </p>
                  <p className="text-[11px] text-warmgrey">PDF, AI, XLSX, ZIP</p>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 border border-stone bg-bone text-xs">
                        <span className="font-mono text-ink flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-brass" />
                          {file}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeUploadedFile(file)}
                          className="text-warmgrey hover:text-oxblood text-[10px] uppercase font-mono"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-stone text-warmgrey hover:text-ink text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3.5 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
                >
                  <span>Review Quotation Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="hairline-b pb-4">
                <span className="label-caps text-brass">Step 03 / 03</span>
                <h2 className="font-serif text-2xl text-ink font-normal mt-1">
                  Review Export Docket & Submit RFQ
                </h2>
                <p className="text-xs text-warmgrey mt-1">
                  Verify commercial terms. Official proforma quotation will be returned within 1-2 business days.
                </p>
              </div>

              {/* Styles Summary */}
              <div className="p-4 border border-stone bg-white/40 space-y-2 text-xs">
                <div className="flex justify-between items-baseline hairline-b pb-2">
                  <span className="label-caps text-brass">Order Volume Scope</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-oxblood hover:underline text-[11px] font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1">
                  {selectedStyles.map((s, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="font-mono text-ink font-semibold">{s.styleCode}</span>
                      <span className="font-mono text-ink">{s.quantity.toLocaleString()} pcs</span>
                    </div>
                  ))}
                  <div className="pt-2 hairline-t flex justify-between font-bold text-ink">
                    <span>Total Volume:</span>
                    <span>{totalVolume.toLocaleString()} pcs</span>
                  </div>
                </div>
              </div>

              {/* Company & Port Verification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 border border-stone bg-white/40 space-y-2">
                  <span className="label-caps text-brass block">Buyer Entity</span>
                  <p><span className="text-warmgrey">Company:</span> <strong className="text-ink">{companyName}</strong></p>
                  <p><span className="text-warmgrey">Buyer:</span> {buyerName}</p>
                  <p><span className="text-warmgrey">Email:</span> {businessEmail}</p>
                  <p><span className="text-warmgrey">Country:</span> {country}</p>
                </div>

                <div className="p-4 border border-stone bg-white/40 space-y-2">
                  <span className="label-caps text-brass block">Incoterm & Destination</span>
                  <p><span className="text-warmgrey">Incoterm:</span> <strong className="text-ink">{incoterm}</strong></p>
                  <p><span className="text-warmgrey">Port:</span> {destinationPort}</p>
                  <p><span className="text-warmgrey">Delivery Target:</span> {targetDeliveryDate}</p>
                  <p><span className="text-warmgrey">Pre-Production Sample:</span> {requireSamplesBeforeBulk ? 'Required' : 'Waived'}</p>
                </div>
              </div>

              {/* Undertaking */}
              <div className="p-4 bg-stone/20 border border-stone text-xs text-warmgrey flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brass shrink-0" />
                <p>
                  Non-binding commercial quotation. Proforma documents will provide guaranteed production slots, vessel sailing dates, and letter of credit guidelines.
                </p>
              </div>

              {/* Buttons */}
              <div className="pt-6 flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 border border-stone text-warmgrey hover:text-ink text-xs uppercase tracking-wider font-semibold flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleSubmitQuote}
                  className="px-10 py-4 bg-oxblood text-bone hover:bg-oxblood-dark transition-colors text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <span>Registering RFQ Docket...</span>
                  ) : (
                    <>
                      <span>Transmit Formal RFQ to Export Desk</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
