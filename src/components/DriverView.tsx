import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  Clock, 
  Users, 
  AlertTriangle, 
  Flag, 
  QrCode, 
  Camera, 
  Check, 
  Navigation, 
  MapPin, 
  CheckCircle2, 
  Wifi, 
  RotateCw,
  Nfc,
  Pin
} from 'lucide-react';
import { ASSETS, INITIAL_STUDENTS } from '../data/mockData';
import { Student } from '../types';

interface DriverViewProps {
  students: Student[];
  onConfirmDropoff: (studentId: string, studentName: string) => void;
  onOpenScanner: () => void;
  onOpenSos: () => void;
  onShowToast: (msg: string) => void;
}

export const DriverView: React.FC<DriverViewProps> = ({
  students,
  onConfirmDropoff,
  onOpenScanner,
  onOpenSos,
  onShowToast
}) => {
  // Trip timer starting from 37 mins 17 secs
  const [secondsElapsed, setSecondsElapsed] = useState<number>(37 * 60 + 17);
  const [tripCompleted, setTripCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (tripCompleted) return;
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [tripCompleted]);

  const formatTimer = (totalSec: number) => {
    const hrs = Math.floor(totalSec / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSec % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  const onboardStudents = students.filter((s) => s.status !== 'Dropped Off');
  const onboardCount = onboardStudents.length;
  const totalCount = students.length;

  const handleEndTrip = () => {
    if (onboardCount > 0) {
      onShowToast('Cannot end trip while students remain onboard! Verify all exits first.');
      return;
    }
    setTripCompleted(true);
    onShowToast('Trip Route A-East concluded successfully! Departure logs archived & reported to Dispatch.');
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-3 pb-24 space-y-3.5">
      {/* Driver Overview Card */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#eaedff] shrink-0 border-2 border-white shadow-xs">
              <img
                src={ASSETS.rajeshDriverCloseUp}
                alt="Rajesh Kumar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-base text-[#131b2e] truncate">
                  Rajesh Kumar
                </span>
                <span className="w-2 h-2 rounded-full bg-[#004f35]"></span>
              </div>
              <p className="text-xs text-[#434655] truncate">
                Bus 12 (DL-01-SB-4421)
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <span className="px-2.5 py-1 bg-[#eaedff] text-[#0037b0] text-xs font-bold rounded-full">
              Route A-East
            </span>
            <span className="text-[11px] text-[#747686] font-medium mt-0.5">
              Departure Trip
            </span>
          </div>
        </div>

        {/* GPS Telemetry Bar */}
        <div className="bg-[#f2f3ff] rounded-xl px-3 py-2 flex items-center justify-between border border-[#eaedff]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#004f35] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#004f35]"></span>
            </span>
            <span className="text-xs text-[#004f35] font-bold truncate">
              Active GPS Broadcast
            </span>
          </div>
          <span className="text-[10px] text-[#747686] bg-white px-2 py-0.5 rounded shadow-2xs font-semibold">
            High Accuracy (1.4m)
          </span>
        </div>
      </section>

      {/* Live Trip Master Control Banner */}
      <section className="bg-[#0037b0] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#fe932c] animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-wider text-[#cad3ff] font-extrabold">
                {tripCompleted ? 'Trip Concluded' : 'Trip In Progress'}
              </span>
            </div>
            <div className="font-display font-extrabold text-3xl tracking-tight">
              {formatTimer(secondsElapsed)}
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="bg-white/15 rounded-xl px-3 py-1.5 text-right backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-[#cad3ff] block font-semibold">
                Students Onboard
              </span>
              <span className="font-display font-bold text-xl">
                {onboardCount} of {totalCount}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Strip */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2.5 relative z-10">
          <button
            onClick={onOpenSos}
            className="flex-1 h-12 bg-[#ba1a1a] hover:bg-[#ba1a1a]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>EMERGENCY / SOS</span>
          </button>

          <button
            onClick={handleEndTrip}
            disabled={onboardCount > 0}
            className={`h-12 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              onboardCount === 0
                ? 'bg-[#004f35] text-white hover:bg-[#006948] active:scale-95 shadow-md'
                : 'bg-white/20 text-white/50 cursor-not-allowed'
            }`}
          >
            <Flag className="w-4 h-4" />
            <span>End Trip</span>
          </button>
        </div>
      </section>

      {/* Quick Access Scanner Hero Tile */}
      <section>
        <button
          onClick={onOpenScanner}
          className="w-full bg-[#dae2fd] hover:bg-[#cad3ff] active:scale-[0.99] transition-all rounded-2xl p-4 flex items-center justify-between text-left shadow-xs border border-[#0037b0]/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0037b0] text-white flex items-center justify-center shrink-0 shadow-sm">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-[#131b2e] block">
                Scan Student ID / QR
              </span>
              <span className="text-xs text-[#434655]">
                Tap camera scanner for instant boarding or drop-off log
              </span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-white text-[#0037b0] flex items-center justify-center shrink-0 shadow-xs">
            <Camera className="w-4 h-4" />
          </div>
        </button>
      </section>

      {/* Route Waypoints Turn-by-Turn Progress Bar */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-[#0037b0]" />
            <h2 className="font-display font-bold text-sm text-[#131b2e]">
              Route Progress
            </h2>
          </div>
          <span className="text-xs text-[#004f35] font-bold bg-[#85f8c4]/40 px-2.5 py-0.5 rounded-full">
            On Schedule
          </span>
        </div>

        {/* Waypoints List */}
        <div className="space-y-3">
          {/* Waypoint 1 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#004f35] text-white flex items-center justify-center z-10 shadow-2xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="w-0.5 h-8 bg-[#004f35]"></div>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between pb-1">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#131b2e] truncate">
                  1. Oakwood High
                </p>
                <p className="text-[11px] text-[#747686]">
                  Trip Origin • School Gate 2
                </p>
              </div>
              <span className="text-[11px] text-[#747686] shrink-0 bg-[#f2f3ff] px-2 py-0.5 rounded">
                Dep. 3:48 PM
              </span>
            </div>
          </div>

          {/* Waypoint 2 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#004f35] text-white flex items-center justify-center z-10 shadow-2xs">
                <Check className="w-3.5 h-3.5" />
              </div>
              <div className="w-0.5 h-8 bg-[#0037b0]"></div>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between pb-1">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#131b2e] truncate">
                  2. Sector 4 Crossway
                </p>
                <p className="text-[11px] text-[#747686]">
                  1 Drop-off verified
                </p>
              </div>
              <span className="text-[11px] text-[#747686] shrink-0 bg-[#f2f3ff] px-2 py-0.5 rounded">
                Passed 4:12 PM
              </span>
            </div>
          </div>

          {/* Waypoint 3: Approaching (Active) */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#0037b0] text-white flex items-center justify-center z-10 shadow-md animate-pulse">
                <Navigation className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="w-0.5 h-8 bg-[#eaedff]"></div>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between pb-1 bg-[#f2f3ff] px-2.5 py-1.5 rounded-xl border border-[#dae2fd]">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-[#0037b0] truncate">
                    3. Pine Crest
                  </p>
                  <span className="px-1.5 py-0.2 bg-[#ffdcc3] text-[#2f1500] text-[10px] font-bold rounded">
                    NEXT
                  </span>
                </div>
                <p className="text-[11px] text-[#434655]">
                  Stop for Zara Khan
                </p>
              </div>
              <span className="text-[11px] text-[#0037b0] font-bold shrink-0 bg-white px-2 py-0.5 rounded shadow-xs">
                ETA 4:22 PM
              </span>
            </div>
          </div>

          {/* Waypoint 4 */}
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-6 h-6 rounded-full bg-[#dae2fd] text-[#747686] flex items-center justify-center z-10">
                <MapPin className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-between pb-1">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#131b2e] truncate">
                  4. Greenwood Heights
                </p>
                <p className="text-[11px] text-[#747686]">
                  Terminal Drop-off (2 students)
                </p>
              </div>
              <span className="text-[11px] text-[#747686] shrink-0 bg-[#f2f3ff] px-2 py-0.5 rounded">
                Est. 4:32 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Boarding & Drop-off Verification Roster */}
      <section className="flex-1 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#131b2e]" />
            <h2 className="font-display font-bold text-sm text-[#131b2e]">
              Student Roster Verification
            </h2>
          </div>
          <span className="text-xs text-[#747686]">
            Tap card to verify
          </span>
        </div>

        {/* Interactive Student List */}
        <div className="space-y-3">
          {students.map((student) => {
            const isDroppedOff = student.status === 'Dropped Off';

            return (
              <article
                key={student.id}
                className={`bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] transition-all ${
                  isDroppedOff ? 'opacity-75 bg-white/80' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-[#eaedff] shrink-0 border border-[#c4c5d7]">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className={`font-display font-bold text-sm text-[#131b2e] truncate ${isDroppedOff ? 'line-through text-[#747686]' : ''}`}>
                          {student.name}
                        </h3>
                        <span className="text-[10px] text-[#747686] bg-[#f2f3ff] px-1.5 py-0.5 rounded font-semibold">
                          {student.grade}
                        </span>
                      </div>
                      <p className="text-xs text-[#434655] flex items-center gap-1 mt-0.5">
                        <Pin className="w-3 h-3 text-[#0037b0]" />
                        <span className="truncate">{student.stopName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  {isDroppedOff ? (
                    <span className="px-2.5 py-1 bg-[#85f8c4]/60 text-[#002114] text-[11px] rounded-full shrink-0 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Dropped Off
                    </span>
                  ) : (
                    <span className={`px-2.5 py-1 text-[11px] rounded-full shrink-0 font-bold ${
                      student.status === 'Near Home' 
                        ? 'bg-[#ffdcc3] text-[#2f1500]'
                        : 'bg-[#eaedff] text-[#0037b0]'
                    }`}>
                      {student.status}
                    </span>
                  )}
                </div>

                {/* Bottom Verification Action Strip */}
                <div className="mt-3 pt-2 bg-[#f2f3ff] rounded-xl p-2.5 flex items-center justify-between border border-[#eaedff]">
                  <div className="min-w-0 pr-2">
                    {isDroppedOff ? (
                      <span className="text-xs text-[#747686] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#004f35]" />
                        Verified via Handshake ({student.stopTime})
                      </span>
                    ) : (
                      <span className="text-xs text-[#004f35] flex items-center gap-1 font-medium">
                        <Nfc className="w-3.5 h-3.5 text-[#0037b0]" />
                        Gate 2 Verified ({student.scanTime || '3:48 PM'})
                      </span>
                    )}
                  </div>

                  {!isDroppedOff && (
                    <button
                      onClick={() => onConfirmDropoff(student.id, student.name)}
                      className="h-9 px-3 bg-[#0037b0] hover:bg-[#1d4ed8] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm Exit</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Live Connectivity & Buffer Diagnostic Strip */}
      <section className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between text-[#434655] border border-[#eaedff]">
        <div className="flex items-center gap-2 min-w-0">
          <Wifi className="w-4 h-4 text-[#004f35] shrink-0" />
          <span className="text-xs truncate">
            Network: <strong>4G Connected</strong> (Events buffered: 0)
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#004f35] shrink-0">
          <RotateCw className="w-3.5 h-3.5 animate-spin" />
          <span className="text-[11px] font-bold">Auto-sync</span>
        </div>
      </section>
    </div>
  );
};
