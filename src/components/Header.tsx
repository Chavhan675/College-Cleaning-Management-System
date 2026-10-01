import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  QrCode, 
  PlusCircle, 
  RotateCcw,
  ShieldCheck,
  Building2,
  Languages,
  Crown,
  Lock,
  Clock
} from "lucide-react";
import { CampusZone, CleaningIncident } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";

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
  onResetData,
}) => {
  const { lang, toggleLang, t } = useLanguage();
  const { isAdmin, toggleAdmin, adminName } = useAdmin();

  // Live real-time clock ticker
  const [liveTime, setLiveTime] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate average cleanliness score
  const avgCleanliness = Math.round(
    zones.reduce((acc, z) => acc + z.cleanlinessScore, 0) / (zones.length || 1)
  );

  const pendingComplaints = incidents.filter(
    (i) => i.status !== "Resolved" && i.status !== "Verified"
  ).length;

  const tabs = [
    { id: "overview", label: t.tabOverview },
    { 
      id: "incidents", 
      label: t.tabIncidents, 
      badge: pendingComplaints, 
      badgeColor: "bg-rose-500" 
    },
    { id: "zones", label: t.tabZones, badge: zones.length },
    { id: "staff", label: t.tabStaff },
    { id: "audits", label: t.tabAudits },
    { id: "inventory", label: t.tabInventory },
    { id: "ai-advisor", label: t.tabAIAdvisor, highlight: true },
  ];

  return (
    <header className="border-b border-emerald-900/10 bg-white/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
      
      {/* Top Admin Live Sub-Bar */}
      <div className={`px-3 sm:px-6 py-1 text-[11px] font-bold transition-colors flex items-center justify-between flex-wrap gap-2 ${
        isAdmin
          ? "bg-gradient-to-r from-amber-600 via-emerald-800 to-teal-900 text-white"
          : "bg-slate-900 text-slate-300"
      }`}>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-white font-extrabold uppercase tracking-wider">
              {lang === "mr" ? "🔴 थेट स्वच्छता नियंत्रण (Live):" : "🔴 Live Portal:"}
            </span>
          </span>
          <span className="font-mono text-emerald-200">{liveTime}</span>
          <span className="hidden md:inline text-white/50">|</span>
          <span className="hidden md:inline text-emerald-100">
            {lang === "mr" ? "शासकीय अभियांत्रिकी व संशोधन महाविद्यालय, अवसरी खुर्द" : "GCOEARA, Avasari Khurd"}
          </span>
        </div>

        {/* Admin Access Switch Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAdmin}
            className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-extrabold transition-all cursor-pointer shadow-xs ${
              isAdmin
                ? "bg-amber-400 hover:bg-amber-300 text-slate-950 border border-amber-300"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
            }`}
            title="Toggle Admin Privileges"
          >
            {isAdmin ? (
              <>
                <Crown className="w-3.5 h-3.5 text-amber-900 fill-amber-500" />
                <span>{lang === "mr" ? "👑 ॲडमिन मोड चालू (Akash Chavhan)" : "👑 Admin Mode: Akash Chavhan"}</span>
              </>
            ) : (
              <>
                <Lock className="w-3 h-3 text-slate-300" />
                <span>{lang === "mr" ? "विद्यार्थी दृश्य (ॲडमिन व्हा)" : "Student View (Tap for Admin)"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Brand & Campus Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 text-white flex items-center justify-center shadow-md shrink-0 border border-emerald-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  {lang === "mr" ? "GCOEARA स्वच्छता पोर्टल" : "GCOEARA Cleaning Portal"}
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 whitespace-nowrap">
                  {lang === "mr" ? "स्वच्छ महाविद्यालय" : "Clean Campus"}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 flex items-center gap-1 truncate max-w-sm sm:max-w-md">
                <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{t.collegeName}</span>
              </p>
            </div>
          </div>

          {/* Action Controls & Language Selector */}
          <div className="flex items-center gap-2 flex-wrap justify-between sm:justify-end">
            
            {/* Language Switcher */}
            <button
              id="header-lang-toggle-btn"
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 text-amber-950 border border-amber-300 rounded-xl text-xs font-black transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              <Languages className="w-4 h-4 text-amber-700" />
              <span>{lang === "mr" ? "मराठी (Active) ⇄ EN" : "English (Active) ⇄ मराठी"}</span>
            </button>

            {/* Campus Hygiene Meter */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-xl shadow-2xs">
              <div className="text-right">
                <div className="text-[9px] font-black uppercase tracking-wider text-emerald-800">
                  {lang === "mr" ? "स्वच्छता" : "Hygiene"}
                </div>
                <div className="text-xs sm:text-sm font-black text-emerald-950 leading-none">
                  {avgCleanliness}% {t.percentClean}
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center">
                ✓
              </div>
            </div>

            {/* Door QR Button */}
            <button
              id="header-qr-scan-btn"
              onClick={onOpenQRModal}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              title={t.doorQrBtn}
            >
              <QrCode className="w-4 h-4 text-slate-700" />
              <span className="hidden xs:inline">{t.doorQrBtn}</span>
              <span className="xs:hidden">QR</span>
            </button>

            {/* Report Issue Button (High Contrast Primary) */}
            <button
              id="header-report-btn"
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-sm transition-transform active:scale-95 cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{t.reportDirtyBtn}</span>
            </button>

            {/* Reset Button */}
            <button
              id="header-reset-btn"
              onClick={onResetData}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title={t.resetBtnTitle}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation - Touch Friendly Scrollable */}
        <nav className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar border-t border-slate-100 pt-2 text-xs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer text-xs sm:text-sm ${
                  isActive
                    ? "bg-emerald-800 text-white shadow-xs font-black"
                    : tab.highlight
                    ? "text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                {typeof tab.badge === "number" && tab.badge > 0 && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-black ${
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
