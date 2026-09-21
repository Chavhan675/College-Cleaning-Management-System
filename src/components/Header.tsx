import React from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  QrCode, 
  PlusCircle, 
  ClipboardCheck, 
  RotateCcw,
  ShieldCheck,
  Building2,
  BellRing
} from "lucide-react";
import { CampusZone, CleaningIncident } from "../types";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  zones: CampusZone[];
  incidents: CleaningIncident[];
  onOpenReportModal: () => void;
  onOpenQRModal: () => void;
  onOpenAuditModal: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  zones,
  incidents,
  onOpenReportModal,
  onOpenQRModal,
  onOpenAuditModal,
  onResetData,
}) => {
  // Calculate average cleanliness score
  const avgCleanliness = Math.round(
    zones.reduce((acc, z) => acc + z.cleanlinessScore, 0) / (zones.length || 1)
  );

  const emergencyCount = incidents.filter(
    (i) => (i.urgency === "Emergency" || i.urgency === "High") && i.status !== "Resolved" && i.status !== "Verified"
  ).length;

  const tabs = [
    { id: "overview", label: "🏠 Campus Overview" },
    { id: "incidents", label: "📋 Live Complaints", badge: incidents.filter(i => i.status !== "Resolved" && i.status !== "Verified").length, badgeColor: "bg-rose-500" },
    { id: "zones", label: "🏫 Classrooms & Depts", badge: zones.length },
    { id: "staff", label: "👥 Cleaning Staff Directory" },
    { id: "ai-advisor", label: "🤖 Cleaning AI Helper", highlight: true },
  ];

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Brand & Campus Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-slate-900">
                  GCOEARA Cleaning Portal
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  College Clean
                </span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate max-w-sm sm:max-w-md">
                <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">Govt. College of Engineering & Research, Avasari Khurd</span>
              </p>
            </div>
          </div>

          {/* Cleanliness Index & Actions */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Campus Cleanliness Meter */}
            <div className="flex items-center gap-2 bg-emerald-50/80 border border-emerald-200/80 px-2.5 py-1 rounded-lg">
              <div className="text-right">
                <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-800">Campus Hygiene</div>
                <div className="text-xs font-extrabold text-emerald-900 leading-none">
                  {avgCleanliness}% Clean
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center">
                ✓
              </div>
            </div>

            {/* QR Scan Button */}
            <button
              id="header-qr-scan-btn"
              onClick={onOpenQRModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              title="Scan classroom or washroom door QR tag"
            >
              <QrCode className="w-3.5 h-3.5 text-slate-600" />
              <span>Door QR</span>
            </button>

            {/* Report Issue Button (Primary) */}
            <button
              id="header-report-btn"
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ Report Dirty Area</span>
            </button>

            {/* Reset Data for convenience */}
            <button
              id="header-reset-btn"
              onClick={onResetData}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Reset college sample data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 pt-2 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-xs font-bold"
                    : tab.highlight
                    ? "text-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 font-semibold border border-emerald-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                {typeof tab.badge === "number" && tab.badge > 0 && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-white/20 text-white"
                        : tab.badgeColor
                        ? "bg-rose-500 text-white"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
