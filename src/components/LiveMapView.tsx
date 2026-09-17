import React, { useState, useEffect } from 'react';
import { 
  Bus, 
  RotateCw, 
  Navigation, 
  Gauge, 
  Activity, 
  Compass, 
  Radar, 
  Layers, 
  Play, 
  Pause, 
  SkipForward, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Key, 
  Phone, 
  MessageSquare, 
  Video, 
  Thermometer, 
  Users, 
  Lock, 
  School, 
  Home,
  Copy,
  Check
} from 'lucide-react';
import { ASSETS, ROUTE_WAYPOINTS, INITIAL_BUS_TRIP, INITIAL_STUDENTS } from '../data/mockData';
import { Waypoint } from '../types';

interface LiveMapViewProps {
  onShowToast: (msg: string) => void;
  onOpenSos: () => void;
}

export const LiveMapView: React.FC<LiveMapViewProps> = ({
  onShowToast,
  onOpenSos
}) => {
  const [currentWaypointIdx, setCurrentWaypointIdx] = useState<number>(2); // Sector 4
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showGeofence, setShowGeofence] = useState<boolean>(true);
  const [mapMode, setMapMode] = useState<'standard' | 'contrast'>('standard');
  const [isRecentering, setIsRecentering] = useState<boolean>(false);
  const [pickupCode, setPickupCode] = useState<string>('8342');
  const [codeCopied, setCodeCopied] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now (4:25 PM)');

  const currentWp = ROUTE_WAYPOINTS[currentWaypointIdx] || ROUTE_WAYPOINTS[2];
  const bus = INITIAL_BUS_TRIP;
  const student = INITIAL_STUDENTS[0];

  // Auto playback simulation loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentWaypointIdx((prev) => {
          const next = (prev + 1) % ROUTE_WAYPOINTS.length;
          return next;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update sync timestamp on waypoint change
  useEffect(() => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    setLastSyncTime(`Just now (${h}:${m} ${ampm})`);
  }, [currentWaypointIdx]);

  const handleRecenter = () => {
    setIsRecentering(true);
    onShowToast(`Focused camera on Bus 12 (${currentWp.label})`);
    setTimeout(() => setIsRecentering(false), 600);
  };

  const handleToggleGeofence = () => {
    setShowGeofence((prev) => !prev);
    onShowToast(`500m Safety Geofence ${!showGeofence ? 'Enabled' : 'Hidden'}`);
  };

  const handleToggleLayer = () => {
    setMapMode((prev) => (prev === 'standard' ? 'contrast' : 'standard'));
    onShowToast(`Switched map display overlay mode`);
  };

  const handleAdvanceStop = () => {
    if (isPlaying) setIsPlaying(false);
    const nextIdx = (currentWaypointIdx + 1) % ROUTE_WAYPOINTS.length;
    setCurrentWaypointIdx(nextIdx);
    onShowToast(`Advanced to waypoint: ${ROUTE_WAYPOINTS[nextIdx].label}`);
  };

  const handleSimulateDropoff = () => {
    if (isPlaying) setIsPlaying(false);
    const finalIdx = ROUTE_WAYPOINTS.length - 1;
    setCurrentWaypointIdx(finalIdx);
    onShowToast('Bus arrived at Greenwood Heights (Home Stop)! Dynamic OTP Handshake required.');
  };

  const copyPickupCode = () => {
    navigator.clipboard?.writeText(pickupCode);
    setCodeCopied(true);
    onShowToast(`Parent Pickup Code ${pickupCode} copied! Hand to bus attendant.`);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const regenerateCode = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setPickupCode(newCode);
    onShowToast(`Generated new dynamic OTP handover code: ${newCode}`);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto pb-24">
      {/* Sticky Telemetry Ribbon */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-[#eaedff] shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-xs shrink-0">
              <Bus className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#131b2e] truncate">
                  BUS 12
                </span>
                <span className="text-xs text-[#747686]">• Route A-East</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
                <span className="text-[11px] text-[#004f35] font-semibold truncate">
                  Live GPS (2s stream)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 bg-[#e2e7ff] px-2.5 py-1.5 rounded-full">
            <RotateCw className="w-3.5 h-3.5 text-[#0037b0] animate-spin" />
            <span className="text-xs text-[#434655] font-medium">
              {lastSyncTime}
            </span>
          </div>
        </div>
      </section>

      {/* Main Map & Interactive Stage */}
      <section className="relative w-full overflow-hidden bg-[#f2f3ff] shadow-inner">
        <div
          id="map-stage"
          className={`relative w-full h-[380px] bg-slate-100 overflow-hidden select-none transition-all duration-300 ${
            mapMode === 'contrast' ? 'filter contrast-125 saturate-150' : ''
          }`}
        >
          {/* Static Map Background from HTML mockup */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-65 pointer-events-none"
            style={{ backgroundImage: `url(${ASSETS.mapRouteBg})` }}
          />

          {/* Stylized Vector Overlay Grid & Road Paths */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            fill="none"
            viewBox="0 0 390 380"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="routeGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#2151da" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#006948" stopOpacity="0.95" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1d4ed8" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Dynamic Transit Route Path */}
            <path
              d="M 45 45 C 90 60 110 120 160 140 C 210 160 220 220 280 230 C 320 240 330 300 345 325"
              opacity="0.8"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="8"
            />
            <path
              d="M 45 45 C 90 60 110 120 160 140 C 210 160 220 220 280 230 C 320 240 330 300 345 325"
              filter="url(#glow)"
              stroke="url(#routeGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />
            <path
              d="M 45 45 C 90 60 110 120 160 140"
              stroke="#004f35"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
            />

            {/* Geofence 500m Safety Perimeter Circle around Drop-off */}
            {showGeofence && (
              <circle
                cx="345"
                cy="325"
                r="54"
                fill="#006948"
                fillOpacity="0.12"
                stroke="#004f35"
                strokeDasharray="4 4"
                strokeWidth="2"
                className="transition-opacity duration-300"
              />
            )}
          </svg>

          {/* Origin Marker: Oakwood High */}
          <div className="absolute top-[28px] left-[26px] z-10 flex flex-col items-center pointer-events-none">
            <div className="px-2 py-0.5 rounded-full bg-[#dae2fd] shadow-xs text-[#131b2e] text-[10px] font-bold flex items-center gap-1 mb-1">
              <School className="w-3 h-3 text-[#0037b0]" />
              <span>Oakwood High</span>
            </div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#0037b0] ring-4 ring-[#0037b0]/20"></div>
          </div>

          {/* Intermediate Waypoint: Pine Crest */}
          <div className="absolute top-[128px] left-[152px] z-10 flex flex-col items-center pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-[#904d00] ring-2 ring-[#ffdcc3]"></div>
            <span className="text-[10px] text-[#434655] font-bold bg-white/90 px-1.5 py-0.5 rounded shadow-xs mt-1">
              Stop 1
            </span>
          </div>

          {/* Destination Student Pin: Greenwood Heights */}
          <div className="absolute top-[275px] left-[300px] z-10 flex flex-col items-center pointer-events-none">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-[#004f35] text-white flex items-center justify-center shadow-lg ring-4 ring-[#68dba9]/40">
                <Home className="w-4 h-4" />
              </div>
              {/* Student avatar badge */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#fe932c] text-[#2f1500] text-[9px] font-bold flex items-center justify-center shadow-xs">
                R
              </div>
            </div>
            <div className="px-2 py-0.5 mt-1 rounded-full bg-white shadow-md text-[#131b2e] text-[10px] font-bold flex items-center gap-1">
              <span>Rahul's Drop-off</span>
            </div>
          </div>

          {/* Floating Animated Bus Marker */}
          <div
            id="bus-marker"
            className={`absolute z-20 transition-all duration-700 ease-out -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
              isRecentering ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{ left: `${currentWp.x}px`, top: `${currentWp.y}px` }}
            onClick={handleRecenter}
          >
            {/* Pulsing radar halo */}
            <div className="absolute inset-0 -m-3 rounded-full bg-[#1d4ed8]/25 animate-ping pointer-events-none"></div>

            {/* Outer heading ring */}
            <div className="w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center ring-4 ring-[#1d4ed8]/35">
              <div className="w-8 h-8 rounded-full bg-[#0037b0] flex items-center justify-center text-white shadow-inner">
                <Bus className="w-4 h-4" />
              </div>
            </div>

            {/* Direction arrow badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#fe932c] text-[#2f1500] flex items-center justify-center shadow-xs">
              <Navigation className="w-2.5 h-2.5 fill-current transform rotate-45" />
            </div>
          </div>

          {/* Live Floating Telemetry Pill inside Map */}
          <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl shadow-md flex flex-col gap-1 max-w-[190px] border border-[#eaedff]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#747686] font-bold uppercase tracking-wider">
                TELEMETRY
              </span>
              <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Activity className="w-3.5 h-3.5 text-[#0037b0]" />
              <span className="font-bold text-[#131b2e]">
                {currentWp.speed}
              </span>
              <span className="text-[#c4c5d7]">•</span>
              <span className="text-[#434655] text-[11px]">
                {currentWp.heading}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#904d00] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#904d00]"></span>
              <span>Moderate Flow</span>
            </div>
          </div>

          {/* Quick Map Action Floating Strip */}
          <div className="absolute bottom-3 right-3 z-20 flex flex-col gap-1.5">
            <button
              onClick={handleRecenter}
              aria-label="Recenter Bus"
              className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-[#0037b0] shadow-md flex items-center justify-center hover:bg-[#f2f3ff] active:scale-95 transition-all border border-[#eaedff]"
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleGeofence}
              aria-label="Toggle Geofence Zones"
              className={`w-9 h-9 rounded-xl backdrop-blur-md shadow-md flex items-center justify-center active:scale-95 transition-all border border-[#eaedff] ${
                showGeofence
                  ? 'bg-[#004f35] text-white'
                  : 'bg-white/95 text-[#004f35] hover:bg-[#f2f3ff]'
              }`}
            >
              <Radar className="w-4 h-4" />
            </button>
            <button
              onClick={handleToggleLayer}
              aria-label="Toggle Layers"
              className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md text-[#434655] shadow-md flex items-center justify-center hover:bg-[#f2f3ff] active:scale-95 transition-all border border-[#eaedff]"
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>

          {/* Geofence Active Pill Indicator (Left bottom overlay) */}
          <div className="absolute bottom-3 left-3 z-20 bg-[#004f35]/90 text-white backdrop-blur-md px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#85f8c4]" />
            <span className="text-[11px] font-semibold">
              500m Safe Zone Active
            </span>
          </div>
        </div>

        {/* Live Simulation Demo Strip (Interactive Playground) */}
        <div className="bg-[#e2e7ff] px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar border-b border-[#dae2fd]">
          <div className="flex items-center gap-1.5 shrink-0">
            <Activity className="w-4 h-4 text-[#904d00]" />
            <span className="text-[11px] text-[#434655] font-bold uppercase tracking-wider">
              Demo Modes:
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                onShowToast(isPlaying ? 'Simulation paused' : 'Simulating live bus travel...');
              }}
              className="px-2.5 py-1 rounded-lg bg-white text-[#0037b0] text-xs font-bold shadow-xs hover:bg-[#f2f3ff] flex items-center gap-1 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 fill-current" />
                  <span>Pause Move</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-current" />
                  <span>Play Move</span>
                </>
              )}
            </button>

            <button
              onClick={handleAdvanceStop}
              className="px-2.5 py-1 rounded-lg bg-white text-[#131b2e] text-xs font-semibold shadow-xs hover:bg-[#f2f3ff] flex items-center gap-1 active:scale-95 transition-all"
            >
              <SkipForward className="w-3 h-3" />
              <span>Advance Stop</span>
            </button>

            <button
              onClick={handleSimulateDropoff}
              className="px-2.5 py-1 rounded-lg bg-[#004f35] text-white text-xs font-bold shadow-xs hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Simulate Drop-off</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Feed & Cards */}
      <div className="flex flex-col px-4 py-4 space-y-4">
        {/* Primary ETA Card */}
        <article className="p-4 rounded-2xl bg-white shadow-md border border-[#eaedff] flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#747686] uppercase tracking-wider">
                Estimated Drop-Off
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-display font-extrabold text-2xl text-[#0037b0]">
                  {currentWp.eta}
                </span>
                <span className="text-xs font-semibold text-[#004f35] bg-[#e2e7ff] px-2 py-0.5 rounded-full">
                  On Schedule
                </span>
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="font-display font-bold text-lg text-[#131b2e]">
                {currentWp.distance}
              </span>
              <span className="text-xs text-[#434655]">
                Remaining • ~{Math.max(2, Math.round(currentWp.progressPercent / 12))} mins
              </span>
            </div>
          </div>

          {/* Mini Stepwise Progress Journey */}
          <div className="pt-2 flex flex-col gap-2">
            <div className="w-full bg-[#e2e7ff] h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-[#0037b0] h-full rounded-full transition-all duration-500"
                style={{ width: `${currentWp.progressPercent}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between text-xs text-[#434655]">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#004f35]" />
                <span className="font-medium">Departed Oakwood</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-[#0037b0]">
                <MapPin className="w-3.5 h-3.5 animate-bounce" />
                <span className="truncate max-w-[140px]">{currentWp.label}</span>
              </div>
              <div className="flex items-center gap-1 opacity-60">
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </div>
            </div>
          </div>

          {/* Stop Sequence Breakdown */}
          <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col gap-2 border border-[#eaedff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center font-bold text-xs">
                  1
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#131b2e]">
                    Pine Crest
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    1 student alighting
                  </span>
                </div>
              </div>
              <span className="text-xs text-[#747686] font-medium">
                Next in 2m
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#dce1ff] text-[#001551] flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#0037b0]">
                    Greenwood Heights (Your Stop)
                  </span>
                  <span className="text-[11px] text-[#434655]">
                    Rahul Patel drop-off
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#0037b0]">
                Target 4:32 PM
              </span>
            </div>
          </div>
        </article>

        {/* Student & Safety Verification Protocol Card */}
        <article className="p-4 rounded-2xl bg-white shadow-md border border-[#eaedff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#dae2fd] border border-[#eaedff]">
                <img
                  src={ASSETS.rahulStudent}
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-display font-bold text-base text-[#131b2e]">
                    {student.name}
                  </h2>
                  <span className="bg-[#85f8c4] text-[#002114] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                    On Board
                  </span>
                </div>
                <span className="text-xs text-[#434655]">
                  {student.grade} • Seat #{student.seatNumber} • RFID {student.rfidTag}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#747686] uppercase font-bold tracking-wider">
                Dual Protocol
              </span>
              <ShieldCheck className="w-5 h-5 text-[#0037b0]" />
            </div>
          </div>

          {/* Handshake Shield Details */}
          <div className="p-3 rounded-xl bg-[#eaedff] flex items-start gap-2.5 border border-[#dae2fd]">
            <Key className="w-5 h-5 text-[#0037b0] shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#131b2e]">
                Student Drop-Off Verification
              </span>
              <p className="text-xs text-[#434655] mt-0.5 leading-relaxed">
                Requires dual NFC scan from attendant + dynamic 4-digit Parent OTP handover upon arrival.
              </p>
            </div>
          </div>

          {/* Dynamic Verification Ready State */}
          <div className="flex items-center justify-between bg-[#f2f3ff] px-3.5 py-2.5 rounded-xl border border-[#eaedff]">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#004f35]" />
              <span className="text-xs font-semibold text-[#131b2e]">
                Parent Pickup Code:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 rounded-lg bg-[#dae2fd] text-[#0037b0] font-display text-xl tracking-widest font-extrabold border border-[#0037b0]/20">
                {pickupCode}
              </div>
              <button
                onClick={copyPickupCode}
                aria-label="Copy pickup code"
                className="w-8 h-8 rounded-lg bg-white border border-[#c4c5d7] flex items-center justify-center text-[#434655] hover:text-[#0037b0] active:scale-95 transition-all"
              >
                {codeCopied ? (
                  <Check className="w-4 h-4 text-[#004f35]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={regenerateCode}
                aria-label="Regenerate code"
                className="w-8 h-8 rounded-lg bg-white border border-[#c4c5d7] flex items-center justify-center text-[#434655] hover:text-[#0037b0] active:scale-95 transition-all"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        {/* Driver & Bus Attendant Card */}
        <article className="p-4 rounded-2xl bg-white shadow-md border border-[#eaedff] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#747686] uppercase tracking-wider">
              Assigned Crew
            </span>
            <span className="text-xs text-[#004f35] font-bold bg-[#e2e7ff] px-2.5 py-0.5 rounded-full">
              Background Certified
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e2e7ff] shadow-xs border border-white">
                <img
                  src={ASSETS.rajeshDriver}
                  alt={bus.driverName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#131b2e]">
                  {bus.driverName}
                </span>
                <span className="text-xs text-[#434655]">
                  Commercial Driver • 12 Yrs Exp
                </span>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-xs font-bold text-[#131b2e]">
                    ★ 4.96 Rating
                  </span>
                  <span className="text-[#c4c5d7]">•</span>
                  <span className="text-xs text-[#434655]">
                    Zero Violations
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onShowToast(`Dialing Driver ${bus.driverName}...`)}
                aria-label="Direct Call Driver"
                className="w-10 h-10 rounded-xl bg-[#0037b0] text-white flex items-center justify-center shadow-md hover:bg-[#1d4ed8] active:scale-95 transition-all"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => onShowToast('Intercom radio active: Connected to Bus 12 attendant audio channel.')}
                aria-label="Dispatch Intercom"
                className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#131b2e] flex items-center justify-center shadow-xs hover:bg-[#dae2fd] active:scale-95 transition-all border border-[#dae2fd]"
              >
                <MessageSquare className="w-5 h-5 text-[#0037b0]" />
              </button>
            </div>
          </div>

          {/* Bus Hardware Telemetry Badge */}
          <div className="flex items-center justify-between pt-2 border-t border-[#eaedff] text-[#434655] text-xs">
            <div className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#004f35]" />
              <span>Dual Dashcam Live</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-[#0037b0]" />
              <span>AC Temp: {bus.acTemp}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#904d00]" />
              <span>{bus.seatsOccupied}/{bus.totalSeats} Seats</span>
            </div>
          </div>
        </article>

        {/* Strict Child Privacy Reassurance Banner */}
        <aside className="p-3.5 rounded-2xl bg-[#f2f3ff] flex items-start gap-3 border border-[#eaedff]">
          <div className="w-8 h-8 rounded-full bg-[#dae2fd] text-[#0037b0] flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-[#131b2e]">
              Strict Trip-Only Privacy Protocol
            </span>
            <p className="text-xs text-[#434655] mt-0.5 leading-relaxed">
              Tracking is strictly active during the scheduled school departure run. GPS stream terminates immediately upon student drop-off barcode verification.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};
