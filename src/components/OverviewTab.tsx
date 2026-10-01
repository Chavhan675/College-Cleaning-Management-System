import React from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  Users, 
  Recycle, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Droplets,
  MapPin,
  ExternalLink,
  PhoneCall
} from "lucide-react";
import { CampusZone, CleaningIncident, StaffMember } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface OverviewTabProps {
  zones: CampusZone[];
  incidents: CleaningIncident[];
  staff: StaffMember[];
  onNavigateToTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onOpenAssignModal: (incident: CleaningIncident) => void;
  onViewIncidentProtocol: (incident: CleaningIncident) => void;
  onQuickMarkCleaned: (zoneId: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  zones,
  incidents,
  staff,
  onNavigateToTab,
  onOpenReportModal,
  onOpenAssignModal,
  onViewIncidentProtocol,
  onQuickMarkCleaned,
}) => {
  const { lang, t } = useLanguage();

  const avgCleanliness = Math.round(
    zones.reduce((acc, z) => acc + z.cleanlinessScore, 0) / (zones.length || 1)
  );

  const activeIncidents = incidents.filter(
    (i) => i.status !== "Resolved" && i.status !== "Verified"
  );
  
  const urgentIncidents = activeIncidents.filter(
    (i) => i.urgency === "Emergency" || i.urgency === "High"
  );

  const onDutyStaff = staff.filter((s) => s.status === "On Duty" || s.status === "Dispatched");

  const zonesNeedingAttention = zones.filter(
    (z) => z.status === "Needs Cleaning" || z.status === "Audit Required"
  );

  return (
    <div className="space-y-5">
      {/* Urgent Warning Banner if any dirty spot reported */}
      {urgentIncidents.length > 0 && (
        <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-rose-600 text-white rounded-xl shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:text-base font-black text-rose-950">
                    {lang === "mr" ? `तातडीची स्वच्छता सूचना (${urgentIncidents.length})` : `Urgent Cleaning Notice (${urgentIncidents.length})`}
                  </h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-rose-200 text-rose-900 rounded-full">
                    {lang === "mr" ? "तातडीने लक्ष द्या" : "Action Needed"}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-rose-800 font-medium mt-0.5">
                  <span className="font-bold">{urgentIncidents[0].title}</span> ({urgentIncidents[0].location})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigateToTab("incidents")}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs transition-colors cursor-pointer"
              >
                <span>{lang === "mr" ? "तक्रार पहा" : "View Ticket"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4 Big KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Cleanliness Score */}
        <div className="bg-white border-2 border-emerald-200 p-3.5 sm:p-4 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {lang === "mr" ? "स्वच्छता प्रमाण" : "Hygiene Index"}
            </span>
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{avgCleanliness}%</span>
            <span className="text-xs font-bold text-emerald-700">{t.percentClean}</span>
          </div>
          <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${avgCleanliness}%` }}
            />
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-2">
            {zones.length} {lang === "mr" ? "जागांची तपासणी" : "Zones Monitored"}
          </p>
        </div>

        {/* Card 2: Active Incidents */}
        <div className="bg-white border-2 border-amber-200 p-3.5 sm:p-4 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {lang === "mr" ? "स्वच्छता तक्रारी" : "Complaints"}
            </span>
            <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{activeIncidents.length}</span>
            <span className="text-xs font-bold text-amber-800">
              {lang === "mr" ? "बाकी" : "Pending"}
            </span>
          </div>
          <button 
            onClick={() => onNavigateToTab("incidents")}
            className="text-[11px] font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 mt-3"
          >
            {lang === "mr" ? "तक्रारींची यादी" : "View Tickets"} <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 3: Crew On Duty */}
        <div className="bg-white border-2 border-blue-200 p-3.5 sm:p-4 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {lang === "mr" ? "हजर कर्मचारी" : "Staff On Duty"}
            </span>
            <span className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{onDutyStaff.length}</span>
            <span className="text-xs text-slate-500 font-bold">/ {staff.length}</span>
          </div>
          <button 
            onClick={() => onNavigateToTab("staff")}
            className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 mt-3"
          >
            {lang === "mr" ? "कर्मचाऱ्यांची यादी" : "Staff Roster"} <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Card 4: Eco / Waste Segregation */}
        <div className="bg-white border-2 border-teal-200 p-3.5 sm:p-4 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600">
              {lang === "mr" ? "कचरा वर्गीकरण" : "Waste Sorting"}
            </span>
            <span className="p-1.5 bg-teal-100 text-teal-700 rounded-lg">
              <Recycle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">86%</span>
            <span className="text-xs font-bold text-teal-700">
              {lang === "mr" ? "योग्य" : "Compliant"}
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400 font-semibold mt-3">
            {lang === "mr" ? "ओला व सुका कचरा वेगळा" : "Wet vs Dry Waste Segregated"}
          </p>
        </div>
      </div>

      {/* Facilities Quick View Matrix + Live Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Cols: Classrooms & Zones */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {lang === "mr" ? "🏫 वर्गखोल्या व विभाग स्वच्छता स्थिती" : "🏫 Classrooms & Facilities Status"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {lang === "mr" ? "१-क्लिकमध्ये स्वच्छ केल्याची नोंद करा" : "1-Click verification for cleaning staff"}
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("zones")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>{lang === "mr" ? "सर्व वर्ग पहा" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {zones.slice(0, 6).map((zone) => {
              const isClean = zone.status === "Clean";

              return (
                <div 
                  key={zone.id}
                  className={`bg-white border-2 rounded-2xl p-3.5 shadow-2xs flex flex-col justify-between ${
                    isClean ? "border-emerald-200" : "border-rose-200"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {zone.code}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">{zone.name}</h4>
                        <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{zone.building} • {zone.floor}</span>
                        </p>
                      </div>

                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                        isClean 
                          ? "bg-emerald-100 text-emerald-800" 
                          : "bg-rose-100 text-rose-800"
                      }`}>
                        {isClean ? t.statusClean : t.statusNeedsCleaning}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-black text-slate-800">
                        {zone.cleanlinessScore}% {t.percentClean}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {!isClean && (
                        <button
                          onClick={() => onQuickMarkCleaned(zone.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                        >
                          {t.actionMarkCleaned}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Live Grievances Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {lang === "mr" ? "📋 ताज्या तक्रारी" : "📋 Recent Complaints"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {lang === "mr" ? "विद्यार्थ्यांनी नोंदवलेल्या अडचणी" : "Live grievance feed"}
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab("incidents")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
            >
              <span>{lang === "mr" ? "सर्व पहा" : "View All"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {incidents.slice(0, 4).map((inc) => (
              <div 
                key={inc.id}
                className="bg-white border-2 border-slate-200 rounded-2xl p-3 shadow-2xs hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{inc.ticketNumber}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    inc.status === "Resolved" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {inc.status === "Resolved" ? t.statusResolved : t.statusPending}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                  {inc.title}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 truncate">
                  📍 {inc.location} • {inc.reportedAt}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Report CTA */}
          <button
            onClick={onOpenReportModal}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs sm:text-sm font-black shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer mt-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{t.reportDirtyBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
