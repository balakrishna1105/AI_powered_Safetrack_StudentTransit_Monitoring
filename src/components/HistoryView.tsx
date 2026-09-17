import React from 'react';
import { History, Calendar, CheckCircle2, AlertTriangle, Clock, ArrowRight, Bus } from 'lucide-react';
import { HISTORICAL_TRIPS } from '../data/mockData';

interface HistoryViewProps {
  onShowToast: (msg: string) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onShowToast }) => {
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-3 pb-24 space-y-4">
      <div>
        <h1 className="font-display font-bold text-xl text-[#131b2e]">
          Trip History & Attendance
        </h1>
        <p className="text-xs text-[#434655]">
          Archived boarding logs, arrival timestamps, and route punctuality
        </p>
      </div>

      {/* High-level performance cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-[#e2e7ff] p-3 rounded-2xl border border-[#dae2fd] text-center">
          <span className="text-[10px] text-[#434655] font-semibold uppercase tracking-wider block">
            On-Time Rate
          </span>
          <span className="font-display font-extrabold text-2xl text-[#0037b0] block mt-0.5">
            96.4%
          </span>
          <span className="text-[10px] text-[#004f35] font-bold">
            Target 95%
          </span>
        </div>

        <div className="bg-[#f2f3ff] p-3 rounded-2xl border border-[#eaedff] text-center">
          <span className="text-[10px] text-[#434655] font-semibold uppercase tracking-wider block">
            Avg Duration
          </span>
          <span className="font-display font-extrabold text-2xl text-[#131b2e] block mt-0.5">
            41m
          </span>
          <span className="text-[10px] text-[#434655]">
            Morning & Eve
          </span>
        </div>

        <div className="bg-[#85f8c4]/30 p-3 rounded-2xl border border-[#85f8c4]/50 text-center">
          <span className="text-[10px] text-[#002114] font-semibold uppercase tracking-wider block">
            Total Trips
          </span>
          <span className="font-display font-extrabold text-2xl text-[#004f35] block mt-0.5">
            142
          </span>
          <span className="text-[10px] text-[#004f35] font-bold">
            Zero Incidents
          </span>
        </div>
      </div>

      {/* Historical Logs List */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-[#747686] uppercase tracking-wider">
          Recent Logged Runs:
        </h2>

        {HISTORICAL_TRIPS.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onShowToast(`Loaded historical telemetry replay for ${trip.date}: ${trip.route}`)}
            className="p-4 rounded-2xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-2 hover:bg-[#f2f3ff] cursor-pointer transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">
                  {trip.route}
                </span>
                <span className="text-[11px] text-[#747686]">
                  {trip.date} • {trip.busNumber} ({trip.driver})
                </span>
              </div>

              <span
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                  trip.onTime
                    ? 'bg-[#85f8c4]/50 text-[#004f35]'
                    : 'bg-[#ffdcc3] text-[#904d00]'
                }`}
              >
                {trip.onTime ? (
                  <CheckCircle2 className="w-3 h-3" />
                ) : (
                  <AlertTriangle className="w-3 h-3" />
                )}
                <span>{trip.status}</span>
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-[#434655] pt-2 border-t border-[#eaedff]">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#0037b0]" />
                <span>{trip.departureTime} → {trip.arrivalTime}</span>
              </div>
              <span className="font-semibold">{trip.duration} • {trip.distance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
