import React, { useState } from "react";
import { 
  X, 
  QrCode, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Clock
} from "lucide-react";
import { CampusZone } from "../types";
import { useLanguage } from "../context/LanguageContext";

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
  const { lang, t } = useLanguage();

  const [activeCode, setActiveCode] = useState<string>(
    preselectedCode || zones[0]?.code || "SCI-CHEM-304"
  );

  const scannedZone = zones.find((z) => z.code === activeCode) || zones[0];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {lang === "mr" ? "दरवाजा QR कोड स्कॅनर" : "Campus Door QR Scanner"}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {lang === "mr" ? "वर्ग किंवा लॅबच्या दारावरील QR कोड स्कॅन करा" : "Simulate scanning door sanitation tags"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Simulation Room Picker */}
        <div className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              {lang === "mr" ? "स्कॅन करण्यासाठी खोली निवडा:" : "Select Room / Door QR Tag to Scan:"}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
              {zones.map((z) => (
                <button
                  key={z.id}
                  onClick={() => setActiveCode(z.code)}
                  className={`p-2 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    activeCode === z.code
                      ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/40 text-emerald-950 font-black"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="font-mono text-[10px] text-slate-500">{z.code}</div>
                  <div className="truncate text-xs font-bold">{z.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Scanner Frame */}
          <div className="relative bg-slate-950 text-white rounded-2xl p-6 overflow-hidden flex flex-col items-center justify-center border border-slate-800">
            {/* Animated Laser line */}
            <div className="w-32 h-32 border-2 border-emerald-400/80 rounded-2xl relative flex items-center justify-center bg-emerald-950/30">
              <QrCode className="w-20 h-20 text-emerald-300/80 animate-pulse" />
              <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-bounce" />
            </div>
            <span className="text-xs font-mono text-emerald-400 mt-3 font-black">
              TAG ID: {scannedZone.qrCodeId}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">
              {lang === "mr" ? "दरवाजा QR कोड पडताळला" : "Door Tag Verified via NFC / QR"}
            </span>
          </div>

          {/* Scanned Result Details */}
          {scannedZone && (
            <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-slate-700 border border-slate-200">
                    {scannedZone.code}
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1">{scannedZone.name}</h4>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{scannedZone.building} • {scannedZone.floor}</span>
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-black text-emerald-700">
                    {scannedZone.cleanlinessScore}% {t.percentClean}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    scannedZone.status === "Clean"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {scannedZone.status === "Clean" ? t.statusClean : t.statusNeedsCleaning}
                  </span>
                </div>
              </div>

              {/* Action buttons (Big Touch Targets) */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                <button
                  onClick={() => {
                    onMarkCleaned(scannedZone.id);
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.actionMarkCleaned}</span>
                </button>

                <button
                  onClick={() => {
                    onRequestCleaning(scannedZone);
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-2.5 bg-rose-50 hover:bg-rose-100 active:scale-95 border border-rose-300 text-rose-800 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{t.actionReportIssue}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
