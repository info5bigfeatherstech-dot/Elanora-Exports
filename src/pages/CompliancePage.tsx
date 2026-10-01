import React from 'react';
import { COMPLIANCE_CERTIFICATIONS } from '../data/company';
import { ShieldCheck, Download, CheckCircle2, FileCheck, ArrowRight } from 'lucide-react';
import { useUIStore } from '../store/useUIStore';

export const CompliancePage: React.FC = () => {
  const addToast = useUIStore((state) => state.addToast);

  const handleDownloadAuditPack = () => {
    addToast('Audit Dossier Generated', 'Elanora_2026_Social_Environmental_Audit_Pack.pdf downloaded.', 'success');
  };

  return (
    <div className="bg-bone text-ink min-h-screen">
      
      {/* Hero */}
      <section className="hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-caps text-brass block">Ethical Governance</span>
            <h1 className="font-serif text-4xl sm:text-6xl text-ink font-normal mt-1 tracking-tight">
              Quality, Labor & Social Compliance
            </h1>
            <p className="text-base sm:text-lg text-warmgrey-dark max-w-2xl mt-3 leading-relaxed">
              Complete supply chain transparency. Every Elanora manufacturing unit is certified annually by accredited third-party registrars against global social, chemical, and environmental benchmarks.
            </p>
          </div>

          <button
            onClick={handleDownloadAuditPack}
            className="px-6 py-3.5 bg-ink text-bone hover:bg-oxblood text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shrink-0 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Full Audit Dossier (PDF)</span>
          </button>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto space-y-8">
          <div>
            <span className="label-caps text-brass block">Active Accreditations</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-ink font-normal mt-1">
              Third-Party Verified Certificates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMPLIANCE_CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-8 border border-stone bg-white/50 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-xs text-brass font-bold">
                      {cert.idNumber}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-warmgrey bg-stone/30 px-2 py-0.5">
                      Valid Thru Dec 2026
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-ink font-normal">{cert.name}</h3>
                  <p className="text-xs text-warmgrey mt-1">Audit Body: {cert.issuer}</p>

                  <p className="text-xs text-ink/80 leading-relaxed mt-4 pt-3 hairline-t">
                    {cert.scope}
                  </p>
                </div>

                <div className="pt-2 flex justify-between items-center text-xs text-warmgrey">
                  <span className="flex items-center gap-1.5 text-ink font-medium">
                    <CheckCircle2 className="w-4 h-4 text-brass" />
                    <span>Annual Audit Passed</span>
                  </span>
                  <button
                    onClick={() => {
                      addToast('Certificate Dispatched', `${cert.name} certificate copy downloaded.`, 'info');
                    }}
                    className="text-oxblood hover:underline text-[11px] font-semibold"
                  >
                    View Certificate →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Commitments */}
      <section className="hairline-t hairline-b bg-stone/20 py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-bone border border-stone space-y-3">
            <span className="font-mono text-xs text-brass">PILLAR 01</span>
            <h4 className="font-serif text-xl text-ink font-normal">Zero Liquid Discharge (ZLD)</h4>
            <p className="text-xs text-warmgrey leading-relaxed">
              Our closed-loop industrial water treatment recovers and recycles 96% of processing water back into production, preventing contaminated effluent discharge into local waterways.
            </p>
          </div>

          <div className="p-6 bg-bone border border-stone space-y-3">
            <span className="font-mono text-xs text-brass">PILLAR 02</span>
            <h4 className="font-serif text-xl text-ink font-normal">Fair Living Wages & Equity</h4>
            <p className="text-xs text-warmgrey leading-relaxed">
              All 650+ factory workers earn wages exceeding statutory minimum wage tables by an average of 24%, with full medical insurance, paid leave, and zero uncompensated overtime.
            </p>
          </div>

          <div className="p-6 bg-bone border border-stone space-y-3">
            <span className="font-mono text-xs text-brass">PILLAR 03</span>
            <h4 className="font-serif text-xl text-ink font-normal">Solar Powered Manufacturing</h4>
            <p className="text-xs text-warmgrey leading-relaxed">
              Over 40% of our facility power demands are generated by a 1.2 MW rooftop solar photovoltaic installation, cutting grid carbon intensity across knitting and cutting operations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
