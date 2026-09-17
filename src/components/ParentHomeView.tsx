import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Gauge, 
  Phone, 
  ExternalLink, 
  Navigation, 
  MapPin, 
  QrCode, 
  Check, 
  School, 
  Bus, 
  Radio, 
  Lock, 
  Bell, 
  LifeBuoy, 
  Maximize2,
  PhoneCall,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { ASSETS, INITIAL_BUS_TRIP, INITIAL_STUDENTS } from '../data/mockData';
import { Student, UserRole, NavigationTab } from '../types';

interface ParentHomeViewProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenSos: () => void;
  onShowToast: (msg: string) => void;
}

export const ParentHomeView: React.FC<ParentHomeViewProps> = ({
  currentRole,
  onRoleChange,
  onNavigateTab,
  onOpenSos,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState<'At School' | 'Boarded' | 'On Route' | 'Near Home' | 'Arrived'>('On Route');
  const student = INITIAL_STUDENTS[0]; // Rahul G
  const bus = INITIAL_BUS_TRIP;

  const handleCallDriver = () => {
    onShowToast(`Calling Driver ${bus.driverName} (${bus.driverPhone})...`);
  };

  const handleCallDesk = () => {
    onShowToast('Connecting to Oakwood International High Dispatch Desk: +1 (555) 987-6543...');
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-3 pb-24 space-y-4">
      {/* Role Switch Selector Bar */}
      <section className="flex items-center justify-between py-1">
        <div className="inline-flex p-1 bg-[#eaedff] rounded-full w-full justify-between items-center shadow-xs">
          <button
            onClick={() => onRoleChange('parent')}
            className={`flex-1 py-1.5 px-3 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
              currentRole === 'parent'
                ? 'bg-[#0037b0] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Parent</span>
          </button>
          <button
            onClick={() => onRoleChange('driver')}
            className={`flex-1 py-1.5 px-3 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
              currentRole === 'driver'
                ? 'bg-[#0037b0] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <Bus className="w-3.5 h-3.5" />
            <span>Driver</span>
          </button>
          <button
            onClick={() => onRoleChange('admin')}
            className={`flex-1 py-1.5 px-3 rounded-full font-semibold text-xs flex items-center justify-center gap-1.5 transition-all ${
              currentRole === 'admin'
                ? 'bg-[#0037b0] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>
      </section>

      {/* Guardian Welcome Banner */}
      <section className="flex items-center justify-between bg-[#f2f3ff] rounded-2xl p-4 shadow-xs border border-[#dae2fd]/60">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-display font-bold text-xl text-[#131b2e] tracking-tight">
              Good Evening, Sarah
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-[#dae2fd] px-2.5 py-0.5 rounded-full text-[#0037b0] text-xs font-bold shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0037b0]" />
              Verified Guardian
            </span>
            <span className="text-[#434655] text-xs font-medium">
              • ID #GD-9041
            </span>
          </div>
        </div>
        <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md shrink-0 bg-[#e2e7ff] border-2 border-white">
          <img
            src={ASSETS.sarahGuardian}
            alt="Sarah Guardian"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Child In-Transit Card (Hero Surface) */}
      <section className="bg-white rounded-2xl p-4 shadow-md border border-[#eaedff] flex flex-col space-y-4 relative overflow-hidden">
        {/* Top Row: Student Identity & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-[#dae2fd] shrink-0 border border-[#eaedff]">
              <img
                src={ASSETS.rahulStudent}
                alt="Rahul G"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#004f35] rounded-full border-2 border-white"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="font-display font-bold text-lg text-[#131b2e] truncate">
                  Rahul G
                </h2>
                <span className="bg-[#eaedff] px-1.5 py-0.5 rounded text-[#434655] text-[11px] font-semibold">
                  {student.grade}
                </span>
              </div>
              <span className="text-[#434655] text-xs">
                Student ID: {student.studentId}
              </span>
              <span className="text-[#0037b0] text-xs font-semibold mt-0.5">
                {student.school}
              </span>
            </div>
          </div>

          {/* Live Pulsing Status Badge */}
          <div className="flex flex-col items-end">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdcc3] text-[#2f1500] shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe932c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#904d00]"></span>
              </span>
              <span className="text-xs font-bold tracking-wide">
                On the Way
              </span>
            </div>
            <span className="text-[#434655] text-xs font-medium mt-1">
              Bus Route 12
            </span>
          </div>
        </div>

        {/* Quick Status Filter / Milestone Progress Bar */}
        <div className="bg-[#f2f3ff] rounded-xl p-2 flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {(['At School', 'Boarded', 'On Route', 'Near Home', 'Arrived'] as const).map((step) => {
            const isActive = activeFilter === step;
            return (
              <button
                key={step}
                onClick={() => {
                  setActiveFilter(step);
                  onShowToast(`Milestone filtered: ${step}`);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#0037b0] text-white shadow-xs'
                    : 'bg-[#eaedff] text-[#434655] hover:text-[#131b2e]'
                }`}
              >
                {step}
              </button>
            );
          })}
        </div>

        {/* Live ETA & Telemetry Widget */}
        <div className="bg-gradient-to-br from-[#e2e7ff] to-[#eaedff] p-4 rounded-2xl flex items-center justify-between border border-[#dae2fd]">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#0037b0] uppercase font-bold tracking-wider">
              Estimated Drop-off
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-display font-extrabold text-3xl text-[#131b2e]">
                {bus.etaTime.split(' ')[0]}
              </span>
              <span className="text-sm text-[#131b2e] font-bold">
                {bus.etaTime.split(' ')[1]}
              </span>
            </div>
            <span className="text-[#004f35] text-xs font-semibold flex items-center gap-1 mt-0.5">
              <Clock className="w-3.5 h-3.5" />
              On Time • {bus.etaMinutes} mins away
            </span>
          </div>

          <div className="flex flex-col items-end text-right">
            <div className="bg-white px-2.5 py-1 rounded-lg shadow-xs mb-1.5 flex items-center gap-1.5 border border-[#eaedff]">
              <Gauge className="w-4 h-4 text-[#0037b0]" />
              <span className="text-xs font-bold text-[#131b2e]">
                {bus.vehicleSpeed} km/h
              </span>
            </div>
            <span className="text-[#434655] text-xs">
              Distance: {bus.distanceRemaining} remaining
            </span>
            <span className="text-[#434655] text-xs font-medium">
              Drop: {bus.dropOffLocation}
            </span>
          </div>
        </div>

        {/* Vehicle, Driver & Dispatcher Information */}
        <div className="bg-[#f2f3ff] rounded-2xl p-3 space-y-2.5 border border-[#eaedff]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#dae2fd] shadow-xs shrink-0 border border-white">
                <img
                  src={ASSETS.rajeshDriver}
                  alt={bus.driverName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-sm text-[#131b2e] truncate">
                    {bus.driverName}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#004f35]" />
                </div>
                <span className="text-[#434655] text-xs">
                  {bus.driverRating} ★ • {bus.busNumber} ({bus.licensePlate})
                </span>
              </div>
            </div>

            <button
              onClick={handleCallDriver}
              className="min-h-[40px] px-3.5 rounded-full bg-[#0037b0] text-white flex items-center justify-center gap-1.5 text-xs font-bold shadow-xs hover:bg-[#1d4ed8] active:scale-95 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Driver</span>
            </button>
          </div>

          {/* Quick transport coordinator access */}
          <div className="flex items-center justify-between pt-1 border-t border-[#dae2fd]/60 text-[#434655] text-xs">
            <span className="flex items-center gap-1.5">
              <School className="w-4 h-4 text-[#434655]" />
              Coordinator: Oakwood Dispatch Desk
            </span>
            <button
              onClick={handleCallDesk}
              className="text-[#0037b0] font-semibold hover:underline flex items-center gap-0.5"
            >
              <span>Call Desk</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Major Action Button: View Live Location */}
        <button
          onClick={() => onNavigateTab('map')}
          className="relative w-full py-3.5 px-4 rounded-xl bg-[#0037b0] hover:bg-[#1d4ed8] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 overflow-hidden active:scale-98 transition-all"
        >
          <span className="absolute left-4 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Navigation className="w-4 h-4 fill-current" />
          <span className="tracking-wider uppercase">
            VIEW LIVE LOCATION (TRACK NOW)
          </span>
        </button>
      </section>

      {/* Live Trip Progress Stepper */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0037b0]" />
            <h3 className="font-display font-bold text-base text-[#131b2e]">
              Trip Progress
            </h3>
          </div>
          <span className="bg-[#85f8c4] text-[#002114] px-2 py-0.5 rounded-full text-xs font-bold">
            Trip #TR-4402
          </span>
        </div>

        <div className="relative flex flex-col space-y-4 pl-1">
          {/* Continuous Background Track Line */}
          <div className="absolute top-3 bottom-5 left-4.5 w-0.5 bg-[#dae2fd]"></div>

          {/* Step 1: Completed */}
          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-[#004f35] text-white flex items-center justify-center shrink-0 z-10 shadow-xs">
              <Check className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#131b2e]">
                  1. At School
                </span>
                <span className="text-[#434655] text-[11px]">3:30 PM</span>
              </div>
              <p className="text-[#434655] text-xs mt-0.5">
                Campus assembly hall check-in completed.
              </p>
            </div>
          </div>

          {/* Step 2: Completed */}
          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-[#004f35] text-white flex items-center justify-center shrink-0 z-10 shadow-xs">
              <QrCode className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#131b2e]">
                  2. Bus Boarding Verified
                </span>
                <span className="text-[#434655] text-[11px]">3:48 PM</span>
              </div>
              <p className="text-[#434655] text-xs mt-0.5">
                QR Code scanned by Attendant at Gate 2.
              </p>
            </div>
          </div>

          {/* Step 3: Completed */}
          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-[#004f35] text-white flex items-center justify-center shrink-0 z-10 shadow-xs">
              <Bus className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#131b2e]">
                  3. Left School Geofence
                </span>
                <span className="text-[#434655] text-[11px]">3:55 PM</span>
              </div>
              <p className="text-[#434655] text-xs mt-0.5">
                Exited Oakwood Perimeter via Main Boulevard.
              </p>
            </div>
          </div>

          {/* Step 4: Active Current */}
          <div className="flex items-start gap-3 relative">
            <div className="w-7 h-7 rounded-full bg-[#0037b0] text-white flex items-center justify-center shrink-0 z-10 shadow-md animate-pulse">
              <Bus className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 bg-[#eaedff] p-3 rounded-xl flex flex-col min-w-0 border border-[#dae2fd]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#0037b0]">
                  4. On the Way (Current Stop)
                </span>
                <span className="bg-[#904d00] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                  Active
                </span>
              </div>
              <span className="text-[#131b2e] text-xs font-bold mt-1">
                Sector 4 Crossway Signal
              </span>
              <span className="text-[#434655] text-xs mt-0.5">
                Crossed underpass. Next halt approaching in 3 mins.
              </span>
            </div>
          </div>

          {/* Step 5: Pending Destination */}
          <div className="flex items-start gap-3 relative opacity-70">
            <div className="w-7 h-7 rounded-full bg-[#e2e7ff] text-[#434655] flex items-center justify-center shrink-0 z-10">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#131b2e]">
                  5. Final Drop-off
                </span>
                <span className="text-[#0037b0] text-xs font-bold">
                  Est 4:32 PM
                </span>
              </div>
              <p className="text-[#434655] text-xs mt-0.5">
                Greenwood Heights Gate 1 (Home Stop)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Geofence Snippet Preview */}
      <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#eaedff] flex flex-col">
        <div className="p-3.5 flex items-center justify-between bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#0037b0]" />
            <h3 className="font-display font-bold text-sm text-[#131b2e]">
              Current Route Geofence
            </h3>
          </div>
          <span className="text-[#004f35] text-xs flex items-center gap-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#004f35]"></span>
            Inside Corridor
          </span>
        </div>

        {/* Map View Container with static background */}
        <div
          className="w-full h-44 bg-cover bg-center relative flex items-end p-3"
          style={{ backgroundImage: `url(${ASSETS.mapRouteBg})` }}
        >
          {/* Floating Map Info Pill */}
          <div className="w-full bg-white/95 backdrop-blur-md p-2.5 rounded-xl shadow-md flex items-center justify-between border border-white/60">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#0037b0] text-white flex items-center justify-center shrink-0">
                <Navigation className="w-3.5 h-3.5 fill-current" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] truncate">
                  Sector 4 Ring Road • Moving North
                </span>
                <span className="text-[11px] text-[#434655]">
                  Live telemetry synced 10s ago
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('map')}
              className="px-2.5 py-1 bg-[#eaedff] text-[#0037b0] rounded-lg text-xs font-bold hover:bg-[#0037b0] hover:text-white transition-all flex items-center gap-1"
            >
              <Maximize2 className="w-3 h-3" />
              <span>Enlarge</span>
            </button>
          </div>
        </div>
      </section>

      {/* Security & Privacy Assurance Card */}
      <section className="bg-[#eaedff] rounded-2xl p-4 shadow-xs border border-[#dae2fd]">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#dae2fd] text-[#0037b0] flex items-center justify-center shrink-0 shadow-xs">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex flex-col space-y-1">
            <h4 className="font-display font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
              <span>Privacy-First Tracking Active</span>
              <ShieldCheck className="w-4 h-4 text-[#004f35]" />
            </h4>
            <p className="text-xs text-[#434655] leading-relaxed">
              Live GPS streaming is authorized exclusively during this active school departure trip. Location broadcasting automatically terminates upon verified student drop-off at Gate 1.
            </p>
          </div>
        </div>
      </section>

      {/* Recent Geofence & Safety Notifications Feed */}
      <section className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#0037b0]" />
            <h3 className="font-display font-bold text-sm text-[#131b2e]">
              Safety Log
            </h3>
          </div>
          <span className="text-xs text-[#434655]">Today's Commute</span>
        </div>

        {/* Notification 1 */}
        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f2f3ff] transition-colors border border-[#eaedff]">
          <div className="w-8 h-8 rounded-full bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0 mt-0.5 font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#131b2e] truncate">
                Boarding Verified (RFID/QR)
              </p>
              <span className="text-[11px] text-[#434655]">3:48 PM</span>
            </div>
            <p className="text-xs text-[#434655] mt-0.5">
              Rahul scanned badge and boarded Bus #12 at Oakwood Gate 2.
            </p>
          </div>
        </div>

        {/* Notification 2 */}
        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f2f3ff] transition-colors border border-[#eaedff]">
          <div className="w-8 h-8 rounded-full bg-[#dae2fd] text-[#0037b0] flex items-center justify-center shrink-0 mt-0.5">
            <Radio className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#131b2e] truncate">
                School Geofence Exited
              </p>
              <span className="text-[11px] text-[#434655]">3:55 PM</span>
            </div>
            <p className="text-xs text-[#434655] mt-0.5">
              Bus #12 safely crossed school boundary onto Sector Expressway.
            </p>
          </div>
        </div>

        {/* Notification 3 */}
        <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#f2f3ff] transition-colors border border-[#eaedff]">
          <div className="w-8 h-8 rounded-full bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center shrink-0 mt-0.5">
            <Navigation className="w-4 h-4 fill-current" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-[#131b2e] truncate">
                Approaching Sector 4
              </p>
              <span className="text-[11px] text-[#434655]">4:10 PM</span>
            </div>
            <p className="text-xs text-[#434655] mt-0.5">
              Vehicle entered Sector 4 perimeter. 3 stops ahead of home drop-off.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Dispatch Assistance Trigger */}
      <section className="bg-[#ffdad6] p-4 rounded-2xl flex items-center justify-between shadow-xs border border-[#ba1a1a]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 shadow-sm">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm text-[#93000a]">
              Need Immediate Help?
            </span>
            <span className="text-xs text-[#93000a]/80">
              Direct priority line to School Dispatch
            </span>
          </div>
        </div>
        <button
          onClick={onOpenSos}
          className="min-h-[40px] px-3.5 py-2 rounded-xl bg-[#ba1a1a] text-white text-xs font-bold shadow-md flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>SOS Desk</span>
        </button>
      </section>
    </div>
  );
};
