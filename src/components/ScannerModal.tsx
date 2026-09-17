import React, { useState } from 'react';
import { QrCode, X, Camera, Check, RefreshCw, Smartphone } from 'lucide-react';
import { Student } from '../types';

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onStudentScanned: (studentId: string, action: 'board' | 'dropoff') => void;
}

export const ScannerModal: React.FC<ScannerModalProps> = ({
  isOpen,
  onClose,
  students,
  onStudentScanned
}) => {
  const [activeScanType, setActiveScanType] = useState<'qr' | 'nfc'>('qr');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(students[0]?.id || '');
  const [isScanning, setIsScanning] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (action: 'board' | 'dropoff') => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      const student = students.find((s) => s.id === selectedStudentId);
      if (student) {
        onStudentScanned(student.id, action);
        setSuccessMsg(
          `${student.name} (${student.rfidTag}) verified for ${
            action === 'board' ? 'BOARDING' : 'DROP-OFF'
          }!`
        );
        setTimeout(() => {
          setSuccessMsg(null);
          onClose();
        }, 1600);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 bg-[#283044]/70 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-sm">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#131b2e] leading-tight font-display">
                Optical QR & NFC Scanner
              </h3>
              <p className="text-xs text-[#434655]">
                Attendant Gate / Vehicle Terminal Verification
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] hover:bg-[#eaedff]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scan Mode Toggle */}
        <div className="flex bg-[#f2f3ff] p-1 rounded-xl gap-1 my-3">
          <button
            onClick={() => setActiveScanType('qr')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeScanType === 'qr'
                ? 'bg-[#0037b0] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera QR Scan</span>
          </button>
          <button
            onClick={() => setActiveScanType('nfc')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              activeScanType === 'nfc'
                ? 'bg-[#0037b0] text-white shadow-sm'
                : 'text-[#434655] hover:text-[#131b2e]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>NFC Badge Tap</span>
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative w-full h-44 bg-[#131b2e] rounded-xl overflow-hidden flex items-center justify-center border border-[#747686]/30">
          {isScanning ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <RefreshCw className="w-8 h-8 text-[#85f8c4] animate-spin" />
              <span className="text-xs font-semibold text-[#85f8c4] tracking-wide">
                Reading encrypted school chip...
              </span>
            </div>
          ) : successMsg ? (
            <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
              <div className="w-10 h-10 rounded-full bg-[#004f35] text-white flex items-center justify-center animate-bounce">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-white leading-snug">
                {successMsg}
              </span>
            </div>
          ) : (
            <>
              {/* Corner reticles */}
              <div className="absolute inset-6 border-2 border-dashed border-[#85f8c4]/60 rounded-lg pointer-events-none flex items-center justify-center">
                <div className="w-full h-0.5 bg-[#85f8c4] shadow-[0_0_12px_#85f8c4] animate-pulse"></div>
              </div>
              <div className="absolute bottom-2 text-[11px] text-white/70 bg-black/40 px-2 py-0.5 rounded">
                Align Student ID Card inside target area
              </div>
            </>
          )}
        </div>

        {/* Select Student to simulate scan on */}
        <div className="mt-3.5">
          <label className="text-xs font-bold text-[#434655] uppercase tracking-wider block mb-1">
            Simulate Student Badge:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-[#f2f3ff] border border-[#c4c5d7] text-sm text-[#131b2e] font-medium focus:outline-none focus:ring-2 focus:ring-[#0037b0]"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.grade}) • {s.status} • {s.rfidTag}
              </option>
            ))}
          </select>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => handleSimulateScan('board')}
            disabled={isScanning}
            className="py-2.5 px-3 rounded-xl bg-[#0037b0] hover:bg-[#1d4ed8] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Scan for Boarding</span>
          </button>
          <button
            onClick={() => handleSimulateScan('dropoff')}
            disabled={isScanning}
            className="py-2.5 px-3 rounded-xl bg-[#004f35] hover:bg-[#006948] text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Verify Drop-off Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
