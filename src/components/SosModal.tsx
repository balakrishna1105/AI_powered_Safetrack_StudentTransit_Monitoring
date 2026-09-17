import React, { useState } from 'react';
import { 
  AlertTriangle, 
  X, 
  Stethoscope, 
  Wrench, 
  Car, 
  ShieldAlert, 
  AlertOctagon, 
  PhoneCall, 
  CheckCircle2 
} from 'lucide-react';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: 'parent' | 'driver' | 'admin';
  onEmergencyBroadcast: (reason: string) => void;
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  role,
  onEmergencyBroadcast
}) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isOpen) return null;

  const emergencyOptions = [
    {
      id: 'medical',
      label: 'Medical Emergency',
      desc: 'Immediate paramedic assistance requested',
      icon: Stethoscope,
      color: 'text-[#ba1a1a]',
      bg: 'bg-[#ffdad6]'
    },
    {
      id: 'breakdown',
      label: 'Vehicle Breakdown',
      desc: 'Engine, tire, or mechanical halt',
      icon: Wrench,
      color: 'text-[#904d00]',
      bg: 'bg-[#ffdcc3]'
    },
    {
      id: 'collision',
      label: 'Accident / Collision',
      desc: 'Traffic collision requiring escort & emergency dispatch',
      icon: Car,
      color: 'text-[#ba1a1a]',
      bg: 'bg-[#ffdad6]'
    },
    {
      id: 'safety',
      label: 'Safety Concern / Disturbance',
      desc: 'Perimeter violation or student safety conflict',
      icon: ShieldAlert,
      color: 'text-[#0037b0]',
      bg: 'bg-[#dae2fd]'
    },
    {
      id: 'obstruction',
      label: 'Route Obstruction / Severe Hazard',
      desc: 'Flooded road, blocked arterial corridor, or roadblock',
      icon: AlertOctagon,
      color: 'text-[#434655]',
      bg: 'bg-[#eaedff]'
    }
  ];

  const handleBroadcast = (reasonLabel: string) => {
    setSelectedReason(reasonLabel);
    setBroadcastSent(true);
    onEmergencyBroadcast(reasonLabel);
    setTimeout(() => {
      setBroadcastSent(false);
      setSelectedReason(null);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-[#283044]/70 backdrop-blur-sm transition-all duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl p-5 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-md animate-pulse">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#ba1a1a] leading-tight font-display">
                Emergency Dispatch SOS
              </h3>
              <p className="text-xs text-[#434655]">
                {role === 'driver' 
                  ? 'Priority distress signal transmits GPS to School Command & Police' 
                  : 'Direct line to Oakwood Security Control Room'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {broadcastSent ? (
          <div className="py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#004f35] text-white flex items-center justify-center mb-3 shadow-lg animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-[#131b2e] font-display">
              EMERGENCY BROADCAST SENT!
            </h4>
            <p className="text-sm text-[#434655] mt-1 max-w-xs">
              Dispatched: <strong>{selectedReason}</strong>.<br />
              Central Command, Police Patrol & 24 Guardians notified with live vehicle beacon.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 mt-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#747686]">
              Select Emergency Reason for Automated Escalation:
            </p>

            <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
              {emergencyOptions.map((opt) => {
                const IconComp = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleBroadcast(opt.label)}
                    className={`w-full p-3 rounded-xl ${opt.bg} hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-between text-left`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center ${opt.color} shadow-xs shrink-0`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${opt.color}`}>
                          {opt.label}
                        </div>
                        <div className="text-xs text-[#434655] leading-snug">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 bg-white/60 rounded-md text-[#131b2e]">
                      Trigger
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#eaedff] flex items-center gap-2">
              <a
                href="tel:911"
                className="flex-1 h-11 bg-[#ba1a1a] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 911 / Police Direct</span>
              </a>
              <button
                onClick={onClose}
                className="px-4 h-11 bg-[#eaedff] text-[#434655] rounded-xl font-medium text-sm hover:bg-[#dae2fd] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
