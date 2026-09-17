import React, { useState } from 'react';
import { 
  Radio, 
  ShieldCheck, 
  Users, 
  Bus, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Eye, 
  Phone, 
  MoreVertical, 
  BellRing, 
  Shuffle, 
  QrCode, 
  Lock, 
  FileSpreadsheet, 
  ChevronRight, 
  Send, 
  X, 
  Check, 
  Maximize2,
  FileCheck,
  AlertOctagon,
  Download
} from 'lucide-react';
import { ASSETS, FLEET_BUSES } from '../data/mockData';
import { NavigationTab } from '../types';

interface AdminConsoleViewProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
  onOpenSos: () => void;
}

export const AdminConsoleView: React.FC<AdminConsoleViewProps> = ({
  onNavigateTab,
  onShowToast,
  onOpenSos
}) => {
  const [activeSegment, setActiveSegment] = useState<'map' | 'trips' | 'compliance'>('map');
  const [showNotifyModal, setShowNotifyModal] = useState<boolean>(false);
  const [smsChecked, setSmsChecked] = useState<boolean>(true);
  const [focusedBus, setFocusedBus] = useState<string | null>(null);

  const handleNotifyParents = () => {
    setShowNotifyModal(false);
    onShowToast(`High-Priority Alert & ${smsChecked ? 'SMS ' : ''}transmitted to 24 guardians of Bus 18.`);
  };

  const handleExportCsv = () => {
    const csvContent = `BusNumber,Route,Driver,Status,ETA,StudentsOnboard,GeofenceStatus\nBus 12,Route A-East,Rajesh Kumar,On Route,4:32 PM,28/30,Corridor OK\nBus 18,Route B-North,Sunil Verma,Delayed (+12m),4:50 PM,24/24,Congestion\nBus 07,Route C-West,Amit Roy,Boarding Gate 1,4:40 PM,26/32,Depot Gate 1\n`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SafeRoute_Daily_Log_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast('SafeRoute Daily Departure CSV generated and downloaded!');
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-3 pb-24 space-y-4">
      {/* Interactive Top Control & Status Pill Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-[#004f35] animate-ping"></span>
          <span className="font-bold text-xs text-[#004f35] uppercase tracking-wider">
            Dispatch Live
          </span>
          <span className="text-xs text-[#434655]">· Real-time sync</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#f2f3ff] px-3 py-1 rounded-full border border-[#eaedff]">
          <ShieldCheck className="w-4 h-4 text-[#004f35]" />
          <span className="text-xs text-[#131b2e] font-semibold">
            Campus Perimeter Armed
          </span>
        </div>
      </div>

      {/* Executive Safety Metrics Rail (Horizontally Scrollable Cards) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* Card 1: Total Enrolled */}
        <div className="bg-[#eaedff] p-3 rounded-2xl shadow-2xs flex flex-col justify-between border border-[#dae2fd]">
          <div className="flex items-center justify-between text-[#434655]">
            <span className="text-xs font-semibold">Enrolled</span>
            <Users className="w-4 h-4 text-[#0037b0]" />
          </div>
          <div className="mt-2">
            <div className="font-display font-extrabold text-2xl text-[#131b2e]">
              1,245
            </div>
            <div className="text-[11px] text-[#004f35] mt-0.5 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3 h-3" />
              <span>100% ID Tagged</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Trips */}
        <div className="bg-[#e2e7ff] p-3 rounded-2xl shadow-2xs flex flex-col justify-between border border-[#dae2fd]">
          <div className="flex items-center justify-between text-[#434655]">
            <span className="text-xs font-semibold">Active Trips</span>
            <Bus className="w-4 h-4 text-[#0037b0]" />
          </div>
          <div className="mt-2">
            <div className="font-display font-extrabold text-2xl text-[#0037b0]">
              27 <span className="text-xs font-normal text-[#434655]">/ 38</span>
            </div>
            <div className="text-[11px] text-[#434655] mt-0.5">
              11 parked / idle
            </div>
          </div>
        </div>

        {/* Card 3: Delayed Trips */}
        <div className="bg-[#ffdcc3] p-3 rounded-2xl shadow-2xs flex flex-col justify-between border border-[#fe932c]/40">
          <div className="flex items-center justify-between text-[#6e3900]">
            <span className="text-xs font-bold">Delayed</span>
            <AlertTriangle className="w-4 h-4 text-[#904d00]" />
          </div>
          <div className="mt-2">
            <div className="font-display font-extrabold text-2xl text-[#2f1500]">
              4
            </div>
            <div className="text-[11px] text-[#6e3900] mt-0.5 font-medium">
              Traffic bottlenecks
            </div>
          </div>
        </div>

        {/* Card 4: SOS Alerts */}
        <div className="bg-white p-3 rounded-2xl shadow-2xs flex flex-col justify-between border border-[#eaedff]">
          <div className="flex items-center justify-between text-[#434655]">
            <span className="text-xs font-semibold">SOS Alerts</span>
            <CheckCircle2 className="w-4 h-4 text-[#004f35]" />
          </div>
          <div className="mt-2">
            <div className="font-display font-extrabold text-2xl text-[#004f35]">
              0 <span className="text-xs text-[#434655] font-normal">Active</span>
            </div>
            <div className="text-[11px] text-[#434655] mt-0.5">
              1 resolved (8:14 AM)
            </div>
          </div>
        </div>
      </section>

      {/* Segmented Navigation Tabs */}
      <div className="flex bg-[#f2f3ff] p-1 rounded-2xl gap-1 border border-[#eaedff]">
        <button
          onClick={() => setActiveSegment('map')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeSegment === 'map'
              ? 'bg-[#0037b0] text-white shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Fleet Map</span>
        </button>

        <button
          onClick={() => setActiveSegment('trips')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeSegment === 'trips'
              ? 'bg-[#0037b0] text-white shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <Bus className="w-3.5 h-3.5" />
          <span>Active Trips (27)</span>
        </button>

        <button
          onClick={() => setActiveSegment('compliance')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
            activeSegment === 'compliance'
              ? 'bg-[#0037b0] text-white shadow-sm'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Safety Audit</span>
        </button>
      </div>

      {/* SEGMENT 1: FLEET MAP */}
      {(activeSegment === 'map' || activeSegment === 'trips') && (
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-md border border-[#eaedff]">
          {/* Static Map Background from HTML mockup */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${ASSETS.fleetMapBg})` }}
          />

          {/* Map Status Chips Top Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md flex items-center gap-2 pointer-events-auto border border-[#eaedff]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#004f35]"></span>
              <span className="text-xs font-semibold text-[#131b2e]">23 Safe</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#fe932c] ml-1"></span>
              <span className="text-xs font-semibold text-[#131b2e]">4 Delayed</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ml-1"></span>
              <span className="text-xs font-semibold text-[#131b2e]">0 Alert</span>
            </div>

            <button
              onClick={() => onShowToast('Map recentered on Oakwood School Campus & 27 active transit beacons.')}
              aria-label="Recenter live fleet"
              className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-md flex items-center justify-center text-[#0037b0] pointer-events-auto active:scale-95 transition-all border border-[#eaedff]"
            >
              <Compass className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Map Pins: Floating Vehicle Visuals */}
          {/* Pin 1: Bus 12 (Safe - Green) */}
          <div
            onClick={() => {
              setFocusedBus('Bus 12');
              onShowToast('Focused on Bus 12 · On Route, ETA 4:32 PM');
            }}
            className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto transition-transform hover:scale-110"
          >
            <div className="relative flex flex-col items-center">
              <div className="px-2 py-0.5 bg-white rounded-full shadow-md text-[11px] font-bold text-[#131b2e] flex items-center gap-1 mb-1 border border-[#eaedff]">
                <span className="w-2 h-2 rounded-full bg-[#004f35]"></span>
                <span>Bus 12</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#004f35] text-white flex items-center justify-center shadow-lg ring-2 ring-white">
                <Bus className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Pin 2: Bus 18 (Delayed - Amber) */}
          <div
            onClick={() => {
              setFocusedBus('Bus 18');
              onShowToast('Focused on Bus 18 · Delayed by 12 mins (Highway construction)');
            }}
            className="absolute top-2/3 right-1/4 -translate-x-1/2 -translate-y-1/2 cursor-pointer group pointer-events-auto transition-transform hover:scale-110"
          >
            <div className="relative flex flex-col items-center">
              <div className="px-2 py-0.5 bg-[#ffdcc3] text-[#2f1500] rounded-full shadow-md text-[11px] font-bold flex items-center gap-1 mb-1 animate-bounce">
                <AlertTriangle className="w-3 h-3 text-[#904d00]" />
                <span>+12m</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#fe932c] text-[#2f1500] flex items-center justify-center shadow-lg ring-2 ring-white">
                <Bus className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Pin 3: Bus 07 (Campus Depot - Boarding) */}
          <div
            onClick={() => {
              setFocusedBus('Bus 07');
              onShowToast('Focused on Bus 07 · Gate 1 Depot Boarding (81% complete)');
            }}
            className="absolute bottom-12 left-1/4 -translate-x-1/2 cursor-pointer group pointer-events-auto transition-transform hover:scale-110"
          >
            <div className="relative flex flex-col items-center">
              <div className="px-2 py-0.5 bg-[#dae2fd] text-[#0037b0] rounded-full shadow-md text-[11px] font-bold flex items-center gap-1 mb-1">
                <span>Gate 1</span>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#0037b0] text-white flex items-center justify-center shadow-md ring-2 ring-white">
                <Bus className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Geofence Safe Zone indicator ring */}
          <div className="absolute bottom-6 left-12 w-28 h-28 rounded-full bg-[#004f35]/15 border-2 border-dashed border-[#004f35] pointer-events-none flex items-center justify-center">
            <span className="text-[10px] font-bold text-[#004f35] bg-white/90 px-1.5 py-0.5 rounded shadow-2xs">
              Campus Zone
            </span>
          </div>

          {/* Floating bottom filter options */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => onShowToast('Safe corridor boundaries toggled')}
              className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-sm text-xs font-semibold text-[#131b2e] flex items-center gap-1 hover:bg-[#f2f3ff] transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#0037b0]" />
              <span>Geofences</span>
            </button>
            <button
              onClick={() => onNavigateTab('map')}
              className="w-7 h-7 bg-white/95 backdrop-blur-md rounded-full shadow-sm flex items-center justify-center text-[#131b2e] hover:bg-[#f2f3ff]"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* SEGMENT 2: LIVE ROUTE TELEMETRY */}
      {(activeSegment === 'trips' || activeSegment === 'map') && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-base text-[#131b2e]">
                Live Route Telemetry
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-xs font-bold text-[#434655]">
                3 Priority Rows
              </span>
            </div>
            <button
              onClick={() => onShowToast('Routes sorted by latest ETA')}
              className="text-xs font-semibold text-[#0037b0] flex items-center gap-0.5"
            >
              <span>Sort ETA</span>
              <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
          </div>

          {/* Bus Card 1: Bus 12 (Safe / Green) */}
          <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#85f8c4] flex items-center justify-center text-[#002114] shadow-xs">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-[#131b2e]">
                      Bus 12
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#434655] text-xs font-semibold">
                      Route A-East
                    </span>
                  </div>
                  <div className="text-xs text-[#434655] flex items-center gap-1 mt-0.5">
                    <span>Rajesh Kumar (Driver)</span>
                    <span>·</span>
                    <span className="font-semibold text-[#131b2e]">28/30 Checked in</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4]/40 text-[#004f35] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#004f35] animate-pulse"></span>
                  <span>On Route</span>
                </div>
                <span className="text-xs text-[#434655] mt-1 font-medium">
                  ETA 4:32 PM
                </span>
              </div>
            </div>

            {/* Quick Telemetry Bar */}
            <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex items-center justify-between text-[#434655] text-xs border border-[#eaedff]">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="text-[#004f35]">38 km/h</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Sector 42 Crossing</span>
              </div>
              <div className="flex items-center gap-1 text-[#004f35] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>All Clear</span>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onNavigateTab('map')}
                className="flex-1 py-2.5 rounded-xl bg-[#0037b0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#1d4ed8] active:scale-95 transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Track Live</span>
              </button>
              <button
                onClick={() => onShowToast('Calling Rajesh Kumar on Bus 12...')}
                aria-label="Call Driver Rajesh"
                className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#131b2e] hover:bg-[#dae2fd] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0037b0]" />
              </button>
              <button
                onClick={() => onShowToast('Bus 12 diagnostics: Engine Normal, Telemetry 100%')}
                aria-label="Bus details"
                className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#131b2e] hover:bg-[#dae2fd] transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bus Card 2: Bus 18 (Delayed / Amber) */}
          <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col gap-3 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#fe932c]"></div>
            <div className="flex items-start justify-between pl-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#ffdcc3] flex items-center justify-center text-[#904d00] font-bold shadow-xs">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-[#131b2e]">
                      Bus 18
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#434655] text-xs font-semibold">
                      Route B-North
                    </span>
                  </div>
                  <div className="text-xs text-[#434655] flex items-center gap-1 mt-0.5">
                    <span>Sunil Verma (Driver)</span>
                    <span>·</span>
                    <span className="font-semibold text-[#131b2e]">24 Students</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                  <span>+12 min Delay</span>
                </div>
                <span className="text-xs text-[#904d00] font-bold mt-1">
                  Heavy Highway Congestion
                </span>
              </div>
            </div>

            {/* Delay Reason Notice */}
            <div className="bg-[#ffdcc3]/50 p-2.5 rounded-xl flex items-center justify-between text-[#2f1500] text-xs pl-3 border border-[#ffdcc3]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#904d00]" />
                <span>Flyover construction hold-up</span>
              </div>
              <span className="text-xs font-bold text-[#904d00]">
                ETA revised 4:50 PM
              </span>
            </div>

            {/* Card Action Buttons */}
            <div className="flex items-center gap-2 pt-1 pl-1">
              <button
                onClick={() => setShowNotifyModal(true)}
                className="flex-1 py-2.5 rounded-xl bg-[#fe932c] hover:bg-[#904d00] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>Notify 24 Parents</span>
              </button>
              <button
                onClick={() => onShowToast('Calculating alternative corridor via Outer Ring Road bypassing flyover...')}
                className="px-3.5 py-2.5 rounded-xl bg-[#eaedff] text-[#0037b0] text-xs font-bold flex items-center justify-center gap-1 hover:bg-[#dae2fd] transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Reroute</span>
              </button>
            </div>
          </div>

          {/* Bus Card 3: Bus 07 (Campus Boarding) */}
          <div className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#0037b0] shadow-xs">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-[#131b2e]">
                      Bus 07
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#434655] text-xs font-semibold">
                      Route C-West
                    </span>
                  </div>
                  <div className="text-xs text-[#434655] flex items-center gap-1 mt-0.5">
                    <span>Amit Roy (Driver)</span>
                    <span>·</span>
                    <span className="font-semibold text-[#0037b0]">32 Scheduled</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dce1ff] text-[#001551] text-xs font-bold">
                  <span>Boarding: Gate 1</span>
                </div>
                <span className="text-xs text-[#434655] mt-1">
                  Departs in 8 min
                </span>
              </div>
            </div>

            {/* Visual Student Check-in Progress Tracker */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#434655]">
                <span>RFID Student Scans Complete</span>
                <span className="font-bold text-[#131b2e]">26 of 32 Boarded (81%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                <div className="h-full bg-[#0037b0] rounded-full" style={{ width: '81%' }}></div>
              </div>
            </div>

            {/* Card Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onShowToast('Opened Gate 1 Roster: 26 present, 6 approaching.')}
                className="flex-1 py-2.5 rounded-xl bg-[#eaedff] text-[#0037b0] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>View Gate Roster</span>
              </button>
              <button
                onClick={() => onShowToast('Calling Gate 1 Attendant Desk...')}
                className="px-3.5 py-2.5 rounded-xl bg-[#f2f3ff] text-[#434655] text-xs font-semibold flex items-center justify-center gap-1 hover:bg-[#eaedff] transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Attendant</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SEGMENT 3: SAFETY & COMPLIANCE CONTROLS */}
      {(activeSegment === 'compliance' || activeSegment === 'map') && (
        <section className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-base text-[#131b2e]">
              Safety & Compliance Controls
            </h2>
            <span className="text-xs text-[#004f35] font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" />
              <span>SOC-2 Certified</span>
            </span>
          </div>

          {/* Parent Consent Verification Rate Highlight Tile */}
          <div className="w-full bg-[#eaedff] p-4 rounded-2xl shadow-xs flex items-center justify-between border border-[#dae2fd]">
            <div className="flex items-center gap-3.5">
              {/* Circular Progress Ring Visual */}
              <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#dae2fd]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-[#004f35]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="99.2, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute text-[11px] font-extrabold text-[#131b2e]">
                  99.2%
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[#131b2e]">
                  Parent Consent Rate
                </div>
                <div className="text-xs text-[#434655] mt-0.5 leading-snug">
                  1,235 of 1,245 guardians verified with legal biometric authorization.
                </div>
              </div>
            </div>
            <button
              onClick={() => onShowToast('Reviewing 10 pending parental consent approvals...')}
              aria-label="Review pending 10 parent authorizations"
              className="p-2 rounded-xl bg-white text-[#0037b0] shadow-2xs hover:bg-[#dae2fd] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Geofence Breach & Audit Trail Stack */}
          <div className="grid grid-cols-1 gap-2.5">
            {/* Geofence Breach Log Row */}
            <div
              onClick={() => onShowToast('0 Geofence perimeter anomalies detected across all 38 active routes.')}
              className="w-full bg-white p-3.5 rounded-2xl shadow-xs flex items-center justify-between border border-[#eaedff] cursor-pointer hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#0037b0] shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#131b2e] truncate">
                    Geofence Breach Logs
                  </div>
                  <div className="text-xs text-[#004f35] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Zero unplanned perimeter deviations this week</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#747686]" />
            </div>

            {/* Immutable Parent Location Requests Audit Log */}
            <div
              onClick={() => onShowToast('Opening encrypted immutable audit ledger: 4,192 events logged.')}
              className="w-full bg-white p-3.5 rounded-2xl shadow-xs flex items-center justify-between border border-[#eaedff] cursor-pointer hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#dae2fd] flex items-center justify-center text-[#0037b0] shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs text-[#131b2e] truncate">
                    Immutable Audit Trail
                  </div>
                  <div className="text-xs text-[#434655] truncate mt-0.5">
                    Parent access & location request logs recorded on ledger
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[11px] font-bold text-[#434655]">
                  4,192 Events
                </span>
                <ChevronRight className="w-4 h-4 text-[#747686]" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* COORDINATOR QUICK ACTIONS */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-base text-[#131b2e]">
            Coordinator Quick Actions
          </h2>
          <span className="text-xs text-[#434655]">Instant overrides</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Action 1: Broadcast Emergency */}
          <button
            onClick={onOpenSos}
            className="p-3.5 rounded-2xl bg-[#ffdad6] text-[#93000a] text-left flex flex-col justify-between h-28 shadow-xs active:scale-[0.98] transition-all border border-[#ba1a1a]/20"
          >
            <div className="flex items-center justify-between w-full">
              <AlertOctagon className="w-6 h-6 text-[#ba1a1a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
            </div>
            <div>
              <div className="font-bold text-xs leading-tight font-display">
                Broadcast Emergency
              </div>
              <div className="text-[11px] text-[#ba1a1a] mt-0.5">
                All drivers & parents
              </div>
            </div>
          </button>

          {/* Action 2: Manage Geofences */}
          <button
            onClick={() => onShowToast('Geofence Safe Radius modified to 500m around school & bus corridors.')}
            className="p-3.5 rounded-2xl bg-white text-[#131b2e] text-left flex flex-col justify-between h-28 shadow-xs active:scale-[0.98] transition-all border border-[#eaedff]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#0037b0]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight font-display">
                Manage Geofences
              </div>
              <div className="text-[11px] text-[#434655] mt-0.5">
                Modify safe corridors
              </div>
            </div>
          </button>

          {/* Action 3: Add / Link Student RFID */}
          <button
            onClick={() => onShowToast('Student RFID Issuance Console: Ready for NFC card scan.')}
            className="p-3.5 rounded-2xl bg-white text-[#131b2e] text-left flex flex-col justify-between h-28 shadow-xs active:scale-[0.98] transition-all border border-[#eaedff]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#0037b0]">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight font-display">
                Link Student RFID
              </div>
              <div className="text-[11px] text-[#434655] mt-0.5">
                NFC & QR issuance
              </div>
            </div>
          </button>

          {/* Action 4: Export Daily CSV Report */}
          <button
            onClick={handleExportCsv}
            className="p-3.5 rounded-2xl bg-white text-[#131b2e] text-left flex flex-col justify-between h-28 shadow-xs active:scale-[0.98] transition-all border border-[#eaedff]"
          >
            <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#0037b0]">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs leading-tight font-display">
                Export Daily CSV
              </div>
              <div className="text-[11px] text-[#434655] mt-0.5 flex items-center gap-1">
                <span>Boarding logs & delays</span>
                <Download className="w-3 h-3 text-[#0037b0]" />
              </div>
            </div>
          </button>
        </div>
      </section>

      {/* Interactive Modal Drawer for 'Notify Parents' */}
      {showNotifyModal && (
        <div className="fixed inset-0 z-50 bg-[#283044]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all">
          <div className="w-full bg-white rounded-t-3xl sm:rounded-2xl p-5 max-w-md shadow-2xl flex flex-col gap-4 animate-in slide-in-from-bottom duration-200">
            <div className="w-12 h-1.5 rounded-full bg-[#c4c5d7] self-center mb-1"></div>

            <div className="flex items-start justify-between">
              <div>
                <div className="font-display font-bold text-base text-[#131b2e]">
                  Notify Route B-North Parents
                </div>
                <div className="text-xs text-[#434655]">
                  Bus 18 · Delayed by 12 minutes (Highway Traffic)
                </div>
              </div>
              <button
                onClick={() => setShowNotifyModal(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-xl text-xs text-[#434655] leading-relaxed border border-[#eaedff]">
              &ldquo;SafeRoute Alert: Bus 18 is experiencing moderate traffic delays near Highway Sector 4. Revised estimated arrival time at stop is 4:50 PM. Your child is safe on board.&rdquo;
            </div>

            <div className="flex items-center gap-2.5">
              <input
                id="sms-broadcast"
                type="checkbox"
                checked={smsChecked}
                onChange={(e) => setSmsChecked(e.target.checked)}
                className="w-4 h-4 rounded text-[#0037b0] accent-[#0037b0]"
              />
              <label htmlFor="sms-broadcast" className="text-xs text-[#131b2e] font-medium cursor-pointer">
                Send simultaneous SMS backup & In-App Push
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleNotifyParents}
                className="flex-1 py-3 rounded-xl bg-[#0037b0] hover:bg-[#1d4ed8] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transmit to 24 Guardians</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
