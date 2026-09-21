import React, { useState } from "react";
import { 
  X, 
  QrCode, 
  Scan, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  UserCheck, 
  Sparkles 
} from "lucide-react";
import { CampusZone } from "../types";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: CampusZone[];
  preselectedCode?: string;
  onMarkCleaned: (zoneId: string) => void;
  onRequestCleaning: (zone: CampusZone) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  zones,
  preselectedCode,
  onMarkCleaned,
  onRequestCleaning,
}) => {
  if (!isOpen) return null;

  const [activeCode, setActiveCode] = useState<string>(
    preselectedCode || zones[0]?.code || "SCI-CHEM-304"
  );

  const scannedZone = zones.find((z) => z.code === activeCode) || zones[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Campus Door QR Code Scanner</h3>
              <p className="text-[11px] text-slate-300">Simulate scanning facility sanitation tags</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Simulation Room Picker */}
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Door QR Tag to Scan:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveCode(z.code)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    activeCode === z.code
                      ? "bg-teal-50 border-teal-500 ring-1 ring-teal-400/40 text-teal-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-mono text-[10px] text-slate-500">{z.code}</div>
                  <div className="line-clamp-1 text-[11px]">{z.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Scanner Frame */}
          <div className="relative bg-slate-950 text-white rounded-xl p-5 overflow-hidden flex flex-col items-center justify-center border border-slate-800">
            {/* Animated Laser line */}
            <div className="w-32 h-32 border-2 border-teal-400/80 rounded-xl relative flex items-center justify-center bg-teal-950/20">
              <QrCode className="w-20 h-20 text-teal-300/80 animate-pulse" />
              <div className="absolute inset-x-0 h-0.5 bg-teal-400 shadow-[0_0_8px_#2dd4bf] animate-bounce" />
            </div>
            <span className="text-[11px] font-mono text-teal-400 mt-2 font-semibold">
              TAG ID: {scannedZone.qrCodeId}
            </span>
            <span className="text-[10px] text-slate-400">Door Tag Verified via NFC / QR</span>
          </div>

          {/* Scanned Result Details */}
          {scannedZone && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                    {scannedZone.code}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{scannedZone.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{scannedZone.building} • {scannedZone.floor}</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-base font-extrabold text-emerald-600">
                    {scannedZone.cleanlinessScore}%
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    scannedZone.status === "Clean"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {scannedZone.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
                <div>
                  <span className="text-[10px] text-slate-400 block">Last Sanitized:</span>
                  <span className="font-medium text-slate-800">{scannedZone.lastCleaned}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Next Scheduled:</span>
                  <span className="font-medium text-slate-800">{scannedZone.nextScheduledCleaning}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Assigned Janitor:</span>
                  <span className="font-medium text-slate-800">
                    {scannedZone.assignedStaffName || "Rotational Crew"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Restroom / Stalls:</span>
                  <span className="font-medium text-slate-800">
                    {scannedZone.restroomStalls ? `${scannedZone.restroomStalls} Cubicles` : `${scannedZone.dustbinCount} Waste Bins`}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    onMarkCleaned(scannedZone.id);
                    onClose();
                  }}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Log Cleaning (Staff)</span>
                </button>

                <button
                  onClick={() => {
                    onRequestCleaning(scannedZone);
                    onClose();
                  }}
                  className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Report Dirty (Student)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
