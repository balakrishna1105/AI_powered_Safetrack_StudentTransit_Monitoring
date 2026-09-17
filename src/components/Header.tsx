import React from 'react';
import { ArrowLeft, User, ShieldAlert, Radio } from 'lucide-react';
import { ASSETS } from '../data/mockData';
import { UserRole } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  subtitle: string;
  onOpenSos: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  subtitle,
  onOpenSos,
  showBackButton = false,
  onBack
}) => {
  return (
    <header className="sticky top-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-4 max-w-2xl mx-auto flex items-center justify-between gap-2">
        {/* Left branding */}
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={onBack}
              aria-label="Go Back"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onRoleChange('parent')}>
            <img
              src={ASSETS.logo}
              alt="SafeRoute Logo"
              className="h-8 w-8 object-contain rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight text-[#0037b0] leading-none">
                SafeRoute
              </span>
              <span className="text-[10px] text-[#434655] font-bold tracking-wide uppercase">
                {subtitle}
              </span>
            </div>
          </div>
        </div>

        {/* Right action items */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e2e7ff] text-[#004f35] text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
            <span>Real-Time</span>
          </div>

          {/* Emergency SOS Broadcast Button */}
          <button
            onClick={onOpenSos}
            aria-label="Emergency SOS Broadcast"
            className="min-h-[38px] px-3 h-9 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center gap-1 shadow-[0_2px_8px_rgba(186,26,26,0.25)] hover:opacity-95 active:scale-95 transition-all"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs uppercase font-bold pr-0.5 tracking-wider">
              SOS
            </span>
          </button>

          {/* User Profile Avatar / Role quick menu */}
          <div className="relative group">
            <button
              aria-label="User Profile"
              className="w-8 h-8 rounded-full bg-[#0037b0] flex items-center justify-center text-white shadow-sm hover:opacity-90 transition-all overflow-hidden"
            >
              {currentRole === 'parent' ? (
                <img
                  src={ASSETS.sarahGuardian}
                  alt="Sarah Guardian"
                  className="w-full h-full object-cover"
                />
              ) : currentRole === 'driver' ? (
                <img
                  src={ASSETS.rajeshDriver}
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
