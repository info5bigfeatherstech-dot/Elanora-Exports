import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('New Wholesale RFQ');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const addToast = useUIStore((state) => state.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email || !message) {
      addToast('Missing Required Fields', 'Please complete all trade contact fields.', 'warning');
      return;
    }
    setSubmitted(true);
    addToast('Trade Message Dispatched', 'Your inquiry has been routed to our international merchandising desk.', 'success');
  };

  return (
    <div className="bg-bone text-ink min-h-screen py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="label-caps text-brass block">Trade Inquiries</span>
          <h1 className="font-serif text-4xl sm:text-6xl text-ink font-normal tracking-tight">
            Connect With the Factory Export Desk
          </h1>
          <p className="text-base text-warmgrey-dark leading-relaxed">
            Our international trade desk coordinates sample development, proforma quotations, container vessel bookings, and technical design consultations.
          </p>
        </div>

        {/* Split Grid: Form Left, Factory Information Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form (7 cols) */}
          <div className="lg:col-span-7 border border-stone bg-white/50 p-8 sm:p-12 space-y-6 shadow-sm">
            <div>
              <span className="label-caps text-brass">Direct Dispatch</span>
              <h2 className="font-serif text-2xl text-ink font-normal mt-1">
                Commercial Inquiry Form
              </h2>
            </div>

            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 border border-brass text-brass mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl text-ink">Inquiry Received</h3>
                <p className="text-xs text-warmgrey max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong> ({company}). A dedicated senior export merchandiser will reply with line sheets and initial FOB costing within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-stone text-xs uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-caps text-warmgrey block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marcus Lindqvist"
                      className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-warmgrey block mb-1">Company / Brand *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. NORD Retail Group"
                      className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label-caps text-warmgrey block mb-1">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="buyer@brand.com"
                      className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                    />
                  </div>
                  <div>
                    <label className="label-caps text-warmgrey block mb-1">Inquiry Nature</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                    >
                      <option value="New Wholesale RFQ">New Wholesale RFQ</option>
                      <option value="Sample Development">Physical Sample Development</option>
                      <option value="Showroom Visit">Factory / Showroom Visit</option>
                      <option value="Private Label Program">Private Label Custom OEM/ODM</option>
                      <option value="General Trade Query">General Export Trade Query</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-caps text-warmgrey block mb-1">Your Brief or Order Requirements *</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include target styles, estimated order volumes, target delivery season, and preferred Incoterm..."
                    className="w-full bg-bone border border-stone p-2.5 text-xs text-ink focus:outline-none focus:border-ink rounded-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-oxblood text-bone hover:bg-oxblood-dark text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Send Trade Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Quick Connect */}
            <a
              href="https://wa.me/919820000000?text=Hello%20Elanora%20Exports%20Export%20Desk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-ink text-bone border border-ink flex items-center justify-between group transition-colors block"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-brass text-brass flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <span className="label-caps text-brass block">Instant Export Chat</span>
                  <h4 className="font-serif text-lg text-bone">Trade Desk on WhatsApp</h4>
                  <p className="text-xs text-stone mt-0.5">Average response: &lt; 30 minutes</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-brass group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Factory Address */}
            <div className="p-6 border border-stone bg-white/40 space-y-4">
              <span className="label-caps text-brass block">Manufacturing Campus & Head Office</span>
              <div className="space-y-3 text-xs text-warmgrey">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-ink shrink-0 mt-0.5" />
                  <p className="text-ink leading-relaxed">
                    <strong>ELANORA EXPORTS PVT. LTD.</strong><br />
                    Plot 48–52, Export Processing Industrial Zone,<br />
                    Taloja MIDC, Navi Mumbai 410208, Maharashtra, India
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Port of Export:</strong> Jawaharlal Nehru Port Trust (JNPT / Nhava Sheva) — 28 km by road
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-ink shrink-0" />
                  <span className="font-mono text-ink">+91 22 4920 8800 (Hunting Line)</span>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-ink shrink-0" />
                  <span className="font-mono text-ink">trade.desk@elanora-exports.com</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 border border-stone bg-stone/20 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-ink font-semibold">
                <Clock className="w-4 h-4 text-brass" />
                <span>Export Merchandising Desk Hours</span>
              </div>
              <p className="text-warmgrey leading-relaxed">
                Monday – Friday: 08:30 to 19:30 IST (GMT +5:30)<br />
                Saturday: 09:00 to 14:00 IST<br />
                <em>(Synchronized with European & US East Coast business hours)</em>
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
