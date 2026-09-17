/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ParentHomeView } from './components/ParentHomeView';
import { LiveMapView } from './components/LiveMapView';
import { DriverView } from './components/DriverView';
import { AdminConsoleView } from './components/AdminConsoleView';
import { AlertsView } from './components/AlertsView';
import { HistoryView } from './components/HistoryView';
import { PrivacyView } from './components/PrivacyView';
import { SosModal } from './components/SosModal';
import { ScannerModal } from './components/ScannerModal';
import { INITIAL_STUDENTS, INITIAL_ALERTS } from './data/mockData';
import { UserRole, NavigationTab, Student, SafetyAlert } from './types';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('parent');
  const [activeTab, setActiveTab] = useState<NavigationTab>('child');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [alerts, setAlerts] = useState<SafetyAlert[]>(INITIAL_ALERTS);
  const [isSosOpen, setIsSosOpen] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'alert' | 'success'; id: number } | null>(null);

  const showToast = (message: string, type: 'info' | 'alert' | 'success' = 'info') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  // Handle student exit verification from Driver view or Scanner
  const handleConfirmDropoff = (studentId: string, studentName: string) => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    const timeStr = `${h}:${m} ${ampm}`;

    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, status: 'Dropped Off', stopTime: timeStr }
          : s
      )
    );

    // Add to safety alert logs
    const newAlert: SafetyAlert = {
      id: `alert-${Date.now()}`,
      title: `Drop-off Verified: ${studentName}`,
      timestamp: timeStr,
      description: `${studentName} verified exit from Bus #12 via Parent Handshake & NFC confirmation.`,
      type: 'verified',
      read: false,
      studentName
    };

    setAlerts((prev) => [newAlert, ...prev]);
    showToast(`${studentName} drop-off confirmed! Guardian notified immediately.`, 'success');
  };

  // Handle scanning student badge
  const handleStudentScanned = (studentId: string, action: 'board' | 'dropoff') => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    const timeStr = `${h}:${m} ${ampm}`;

    const student = students.find((s) => s.id === studentId);
    if (!student) return;

    if (action === 'dropoff') {
      handleConfirmDropoff(studentId, student.name);
    } else {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === studentId
            ? { ...s, status: 'Boarded', scanTime: timeStr }
            : s
        )
      );

      const newAlert: SafetyAlert = {
        id: `alert-${Date.now()}`,
        title: `Boarding Scanned: ${student.name}`,
        timestamp: timeStr,
        description: `${student.name} scanned badge ${student.rfidTag} and boarded Bus #12 at Gate 2.`,
        type: 'verified',
        read: false,
        studentName: student.name
      };

      setAlerts((prev) => [newAlert, ...prev]);
      showToast(`${student.name} marked as Boarded (${student.rfidTag})!`, 'success');
    }
  };

  // Handle Emergency SOS broadcast
  const handleEmergencyBroadcast = (reason: string) => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, '0');
    const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
    const timeStr = `${h}:${m} ${ampm}`;

    const sosAlert: SafetyAlert = {
      id: `alert-sos-${Date.now()}`,
      title: `EMERGENCY SOS: ${reason}`,
      timestamp: timeStr,
      description: `Immediate distress signal broadcast to School Dispatch & Emergency Services. GPS beacon priority stream enabled.`,
      type: 'emergency',
      read: false
    };

    setAlerts((prev) => [sosAlert, ...prev]);
    showToast(`EMERGENCY BROADCAST TRANSMITTED: ${reason}`, 'alert');
  };

  // Subtitle for header based on role & tab
  const getHeaderSubtitle = () => {
    if (currentRole === 'driver') return 'Driver Turn By Turn';
    if (currentRole === 'admin') return 'Admin Dispatch';
    
    switch (activeTab) {
      case 'child':
        return 'Parent Home';
      case 'map':
        return 'Live Map';
      case 'alerts':
        return 'Departure Alerts';
      case 'history':
        return 'Trip History';
      case 'privacy':
        return 'Privacy & Security';
      default:
        return 'Parent Home';
    }
  };

  const unreadAlertsCount = alerts.filter((a) => !a.read).length;

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#dae2fd]">
      {/* Universal Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'parent') setActiveTab('child');
        }}
        subtitle={getHeaderSubtitle()}
        onOpenSos={() => setIsSosOpen(true)}
        showBackButton={currentRole !== 'parent'}
        onBack={() => setCurrentRole('parent')}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* DRIVER VIEW */}
        {currentRole === 'driver' && (
          <DriverView
            students={students}
            onConfirmDropoff={handleConfirmDropoff}
            onOpenScanner={() => setIsScannerOpen(true)}
            onOpenSos={() => setIsSosOpen(true)}
            onShowToast={(msg) => showToast(msg, 'info')}
          />
        )}

        {/* ADMIN DISPATCH CONSOLE VIEW */}
        {currentRole === 'admin' && (
          <AdminConsoleView
            onNavigateTab={(tab) => {
              setCurrentRole('parent');
              setActiveTab(tab);
            }}
            onShowToast={(msg) => showToast(msg, 'info')}
            onOpenSos={() => setIsSosOpen(true)}
          />
        )}

        {/* PARENT VIEWS */}
        {currentRole === 'parent' && (
          <>
            {activeTab === 'child' && (
              <ParentHomeView
                currentRole={currentRole}
                onRoleChange={(role) => setCurrentRole(role)}
                onNavigateTab={(tab) => setActiveTab(tab)}
                onOpenSos={() => setIsSosOpen(true)}
                onShowToast={(msg) => showToast(msg, 'info')}
              />
            )}

            {activeTab === 'map' && (
              <LiveMapView
                onShowToast={(msg) => showToast(msg, 'info')}
                onOpenSos={() => setIsSosOpen(true)}
              />
            )}

            {activeTab === 'alerts' && (
              <AlertsView
                alerts={alerts}
                onMarkAllRead={() => {
                  setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
                }}
                onShowToast={(msg) => showToast(msg, 'info')}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView onShowToast={(msg) => showToast(msg, 'info')} />
            )}

            {activeTab === 'privacy' && (
              <PrivacyView onShowToast={(msg) => showToast(msg, 'info')} />
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation (Always accessible for Parent mode) */}
      {currentRole === 'parent' && (
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          unreadAlertsCount={unreadAlertsCount}
        />
      )}

      {/* Emergency SOS Modal */}
      <SosModal
        isOpen={isSosOpen}
        onClose={() => setIsSosOpen(false)}
        role={currentRole}
        onEmergencyBroadcast={handleEmergencyBroadcast}
      />

      {/* QR & NFC Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        students={students}
        onStudentScanned={handleStudentScanned}
      />

      {/* Interactive Toast Notification Banner */}
      {toast && (
        <aside
          aria-live="polite"
          className="fixed bottom-20 sm:bottom-6 left-4 right-4 max-w-md mx-auto z-50 bg-[#283044] text-[#eef0ff] p-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-200 border border-white/10"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'alert' ? (
              <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 animate-bounce" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-[#85f8c4] shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-[#dce1ff] shrink-0" />
            )}
            <span className="text-xs font-semibold truncate leading-tight">
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-white/60 hover:text-white shrink-0 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}
    </div>
  );
}
