import React, { useState } from 'react';
import { Lock, ShieldCheck, UserCheck, Key, EyeOff, FileText, Download, CheckCircle2 } from 'lucide-react';

interface PrivacyViewProps {
  onShowToast: (msg: string) => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onShowToast }) => {
  const [gpsTripOnly, setGpsTripOnly] = useState<boolean>(true);
  const [dualProtocol, setDualProtocol] = useState<boolean>(true);
  const [autoPurge30Days, setAutoPurge30Days] = useState<boolean>(true);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-3 pb-24 space-y-4">
      <div>
        <h1 className="font-display font-bold text-xl text-[#131b2e]">
          Privacy & Security Center
        </h1>
        <p className="text-xs text-[#434655]">
          Strict student biometric protection and trip-bounded telemetry policies
        </p>
      </div>

      {/* Hero Badge */}
      <div className="bg-[#eaedff] p-4 rounded-2xl border border-[#dae2fd] flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-[#0037b0] text-white flex items-center justify-center shrink-0 shadow-xs">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-display font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
            <span>SOC-2 Type II Certified</span>
            <span className="bg-[#85f8c4] text-[#002114] px-1.5 py-0.2 rounded text-[10px] font-bold">
              Active
            </span>
          </h2>
          <p className="text-xs text-[#434655] mt-0.5 leading-relaxed">
            SafeRoute operates under zero-knowledge encryption protocols. GPS coordinates are streamed exclusively during authorized bus runs and terminate instantly upon barcode drop-off verification.
          </p>
        </div>
      </div>

      {/* Control Switches */}
      <div className="bg-white rounded-2xl border border-[#eaedff] p-4 space-y-4 shadow-xs">
        <h3 className="text-xs font-bold text-[#747686] uppercase tracking-wider">
          Enforcement Policies:
        </h3>

        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-xs text-[#131b2e] block">
              Trip-Bounded GPS Streaming
            </span>
            <span className="text-[11px] text-[#434655] leading-snug block mt-0.5">
              Automatically disable location beacon once bus enters terminal stop or child alights.
            </span>
          </div>
          <input
            type="checkbox"
            checked={gpsTripOnly}
            onChange={(e) => {
              setGpsTripOnly(e.target.checked);
              onShowToast(`Trip-Bounded GPS: ${e.target.checked ? 'Enforced' : 'Relaxed'}`);
            }}
            className="w-5 h-5 rounded text-[#0037b0] accent-[#0037b0] shrink-0"
          />
        </div>

        <div className="border-t border-[#eaedff] pt-3 flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-xs text-[#131b2e] block">
              Dual Parent Handshake Protocol
            </span>
            <span className="text-[11px] text-[#434655] leading-snug block mt-0.5">
              Requires 4-digit dynamic OTP verification from guardian device to conclude drop-off.
            </span>
          </div>
          <input
            type="checkbox"
            checked={dualProtocol}
            onChange={(e) => {
              setDualProtocol(e.target.checked);
              onShowToast(`Dual Handshake Protocol: ${e.target.checked ? 'Active' : 'Disabled'}`);
            }}
            className="w-5 h-5 rounded text-[#0037b0] accent-[#0037b0] shrink-0"
          />
        </div>

        <div className="border-t border-[#eaedff] pt-3 flex items-center justify-between gap-3">
          <div>
            <span className="font-bold text-xs text-[#131b2e] block">
              30-Day Auto-Purge of GPS Telemetry
            </span>
            <span className="text-[11px] text-[#434655] leading-snug block mt-0.5">
              Hard deletion of granular vehicle breadcrumbs after verified monthly billing audits.
            </span>
          </div>
          <input
            type="checkbox"
            checked={autoPurge30Days}
            onChange={(e) => {
              setAutoPurge30Days(e.target.checked);
              onShowToast(`Auto-Purge 30-Day Retention: ${e.target.checked ? 'Enforced' : 'Custom'}`);
            }}
            className="w-5 h-5 rounded text-[#0037b0] accent-[#0037b0] shrink-0"
          />
        </div>
      </div>

      {/* Guardian Consent Status */}
      <div className="bg-white rounded-2xl border border-[#eaedff] p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-[#0037b0]" />
            <h3 className="font-bold text-xs text-[#131b2e]">
              Verified Guardian Status
            </h3>
          </div>
          <span className="text-[11px] text-[#004f35] font-bold bg-[#85f8c4]/40 px-2 py-0.5 rounded-full">
            Biometric Enrolled
          </span>
        </div>
        <p className="text-xs text-[#434655]">
          Sarah (Guardian ID: <strong>#GD-9041</strong>) is authorized for primary custody handover of Rahul G. Emergency contacts verified with Oakwood High.
        </p>

        <button
          onClick={() => onShowToast('Exporting encrypted compliance and GDPR consent certificate...')}
          className="w-full py-2.5 px-3 rounded-xl bg-[#f2f3ff] text-[#0037b0] text-xs font-bold hover:bg-[#eaedff] flex items-center justify-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Guardian Data & Security Certificate</span>
        </button>
      </div>
    </div>
  );
};
