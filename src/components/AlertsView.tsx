import React, { useState } from 'react';
import { Bell, Check, Radio, AlertTriangle, CheckCircle2, ShieldCheck, Filter, Trash2 } from 'lucide-react';
import { SafetyAlert } from '../types';

interface AlertsViewProps {
  alerts: SafetyAlert[];
  onMarkAllRead: () => void;
  onShowToast: (msg: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onMarkAllRead,
  onShowToast
}) => {
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'geofence' | 'delay'>('all');

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType === 'all') return true;
    return alert.type === filterType;
  });

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-3 pb-24 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-bold text-xl text-[#131b2e]">
            Departure & Safety Alerts
          </h1>
          <p className="text-xs text-[#434655]">
            Real-time geofence, RFID scan, and fleet telemetry logs
          </p>
        </div>
        <button
          onClick={() => {
            onMarkAllRead();
            onShowToast('All notifications marked as read.');
          }}
          className="text-xs font-semibold text-[#0037b0] hover:underline flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#f2f3ff] p-1 rounded-xl gap-1 border border-[#eaedff]">
        {(['all', 'verified', 'geofence', 'delay'] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold capitalize transition-all ${
              filterType === type
                ? 'bg-[#0037b0] text-white shadow-2xs'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            {type === 'verified' ? 'Boarding' : type}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#eaedff] p-6 text-[#747686]">
            <Bell className="w-8 h-8 mx-auto mb-2 text-[#dae2fd]" />
            <p className="text-xs font-medium">No alerts matching this filter</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            return (
              <div
                key={alert.id}
                className={`p-3.5 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex items-start gap-3 transition-all ${
                  !alert.read ? 'ring-1 ring-[#0037b0]/30' : ''
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    alert.type === 'verified'
                      ? 'bg-[#85f8c4] text-[#002114]'
                      : alert.type === 'geofence'
                      ? 'bg-[#dae2fd] text-[#0037b0]'
                      : alert.type === 'delay'
                      ? 'bg-[#ffdcc3] text-[#904d00]'
                      : 'bg-[#eaedff] text-[#0037b0]'
                  }`}
                >
                  {alert.type === 'verified' && <CheckCircle2 className="w-4 h-4" />}
                  {alert.type === 'geofence' && <Radio className="w-4 h-4" />}
                  {alert.type === 'delay' && <AlertTriangle className="w-4 h-4" />}
                  {alert.type === 'proximity' && <ShieldCheck className="w-4 h-4" />}
                  {alert.type === 'emergency' && <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-xs text-[#131b2e] truncate">
                      {alert.title}
                    </h3>
                    <span className="text-[11px] text-[#747686] shrink-0">
                      {alert.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                    {alert.description}
                  </p>
                  {alert.busNumber && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded bg-[#f2f3ff] text-[10px] font-semibold text-[#0037b0]">
                      {alert.busNumber}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
