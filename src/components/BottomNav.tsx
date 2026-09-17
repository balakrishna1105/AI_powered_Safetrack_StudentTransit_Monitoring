import React from 'react';
import { Users, Compass, Bell, History, ShieldCheck } from 'lucide-react';
import { NavigationTab } from '../types';

interface BottomNavProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  unreadAlertsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadAlertsCount = 0
}) => {
  const tabs = [
    {
      id: 'child' as NavigationTab,
      label: 'Child',
      icon: Users
    },
    {
      id: 'map' as NavigationTab,
      label: 'Map',
      icon: Compass
    },
    {
      id: 'alerts' as NavigationTab,
      label: 'Alerts',
      icon: Bell,
      badge: unreadAlertsCount
    },
    {
      id: 'history' as NavigationTab,
      label: 'History',
      icon: History
    },
    {
      id: 'privacy' as NavigationTab,
      label: 'Privacy',
      icon: ShieldCheck
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-2">
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-16 h-12 transition-all relative ${
                isActive
                  ? 'text-[#0037b0] font-bold scale-105'
                  : 'text-[#434655] hover:text-[#131b2e]'
              }`}
            >
              <div className="relative">
                <IconComp className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#ba1a1a] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 font-medium tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 bg-[#0037b0] rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
