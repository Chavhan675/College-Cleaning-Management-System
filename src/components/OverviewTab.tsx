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
  ExternalLink
} from "lucide-react";
import { CampusZone, CleaningIncident, StaffMember } from "../types";

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
    <div className="space-y-6">
      {/* Top Banner Alert if any Emergency / Chemical Spill is pending */}
      {urgentIncidents.length > 0 && (
        <div className="bg-rose-50 border-l-4 border-rose-600 p-4 rounded-r-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-100 text-rose-700 rounded-lg shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-rose-900">
                    High Priority Campus Sanitation Alert ({urgentIncidents.length})
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-rose-200 text-rose-900 rounded-full">
                    Immediate Action
                  </span>
                </div>
                <p className="text-xs text-rose-700 mt-0.5">
                  <span className="font-semibold">{urgentIncidents[0].title}</span> at {urgentIncidents[0].location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {urgentIncidents[0].aiProtocol ? (
                <button
                  onClick={() => onViewIncidentProtocol(urgentIncidents[0])}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-rose-200 hover:bg-rose-50 text-rose-800 rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>View AI Safety Protocol</span>
                </button>
              ) : (
                <button
                  onClick={() => onOpenAssignModal(urgentIncidents[0])}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <span>Dispatch Cleaner</span>
                </button>
              )}
              <button
                onClick={() => onNavigateToTab("incidents")}
                className="text-xs font-medium text-rose-700 hover:text-rose-900 underline underline-offset-2 px-2"
              >
                View all alerts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Cleanliness Score */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Campus Hygiene Index</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgCleanliness}%</span>
            <span className="text-xs font-semibold text-emerald-600">+2.4% vs last week</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${avgCleanliness}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px] text-slate-400">
            <span>{zones.length} Zones Tracked</span>
            <span>Target: 95%</span>
          </div>
        </div>

        {/* Card 2: Active Incidents */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Active Cleaning Requests</span>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{activeIncidents.length}</span>
            <span className="text-xs font-medium text-amber-700">
              {urgentIncidents.length} High Priority
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Avg. resolution time: <span className="font-semibold text-slate-700">18 minutes</span>
          </p>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
            <button 
              onClick={() => onNavigateToTab("incidents")}
              className="text-[11px] font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1"
            >
              Open Ticket Desk <ArrowUpRight className="w-3 h-3" />
            </button>
            <span className="text-[11px] text-slate-400">
              {incidents.filter(i => i.status === "Resolved").length} resolved today
            </span>
          </div>
        </div>

        {/* Card 3: Crew On Duty */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Janitorial Staff On Duty</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{onDutyStaff.length}</span>
            <span className="text-xs text-slate-400">/ {staff.length} Total Staff</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Morning Shift active across 7 buildings</span>
          </div>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
            <button 
              onClick={() => onNavigateToTab("staff")}
              className="text-[11px] font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1"
            >
              Roster & Shifts <ArrowUpRight className="w-3 h-3" />
            </button>
            <span className="text-[11px] text-slate-400">Rating: 4.85 ★</span>
          </div>
        </div>

        {/* Card 4: Eco & Waste Segregation */}
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Waste Segregation Rate</span>
            <span className="p-1.5 bg-teal-50 text-teal-600 rounded-lg">
              <Recycle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">86%</span>
            <span className="text-xs font-semibold text-teal-600">Compliant</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Wet vs Dry vs Hazardous sorting audited daily
          </p>
          <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100">
            <button 
              onClick={() => onNavigateToTab("zones")}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
            >
              Classroom & Dept Status <ArrowUpRight className="w-3 h-3" />
            </button>
            <span className="text-[11px] text-slate-400">Green Campus Initiative</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Campus Facilities Live Matrix + Live Incident Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Campus Facilities Status Matrix */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Campus Facilities & Zone Status</h2>
              <p className="text-xs text-slate-500">Live sanitary condition across academic, lab, and residential complexes</p>
            </div>
            <button
              onClick={() => onNavigateToTab("zones")}
              className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1"
            >
              View all zones <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {zones.slice(0, 6).map((zone) => {
              const isClean = zone.status === "Clean";
              const isNeedsCleaning = zone.status === "Needs Cleaning";
              const isInProgress = zone.status === "In Progress";

              return (
                <div 
                  key={zone.id}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {zone.code}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{zone.name}</h4>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{zone.building} • {zone.floor}</span>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                        isClean 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                          : isNeedsCleaning 
                          ? "bg-rose-50 text-rose-700 border border-rose-200" 
                          : isInProgress 
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {zone.status}
                      </span>
                    </div>

                    {zone.urgentAlert && (
                      <div className="mt-2 p-1.5 rounded bg-rose-50 border border-rose-100 text-[11px] text-rose-700 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 shrink-0 text-rose-500" />
                        <span className="line-clamp-1">{zone.urgentAlert}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Cleanliness Score</span>
                      <span className={`font-bold ${
                        zone.cleanlinessScore >= 85 ? "text-emerald-600" : zone.cleanlinessScore >= 70 ? "text-amber-600" : "text-rose-600"
                      }`}>
                        {zone.cleanlinessScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {!isClean && (
                        <button
                          onClick={() => onQuickMarkCleaned(zone.id)}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-[11px] font-medium transition-colors"
                        >
                          Mark Clean
                        </button>
                      )}
                      <button
                        onClick={() => onNavigateToTab("zones")}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Zone Operations Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-teal-600" />
              <span className="font-semibold text-slate-800">
                {zonesNeedingAttention.length} college zones currently flagged for cleaning or audit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenReportModal}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-md font-medium transition-colors"
              >
                + Report Sanitation Need
              </button>
              <button
                onClick={() => onNavigateToTab("ai-advisor")}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-semibold transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Protocol Advisor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Grievance & Incident Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Incident Feed</h2>
              <p className="text-xs text-slate-500">Student & staff sanitation reports</p>
            </div>
            <button
              onClick={() => onNavigateToTab("incidents")}
              className="text-xs font-semibold text-teal-600 hover:text-teal-800 flex items-center gap-1"
            >
              Ticket Desk <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {incidents.slice(0, 4).map((inc) => {
              const isUrgent = inc.urgency === "Emergency" || inc.urgency === "High";
              const isResolved = inc.status === "Resolved" || inc.status === "Verified";

              return (
                <div key={inc.id} className="p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider ${
                          inc.urgency === "Emergency" 
                            ? "bg-rose-100 text-rose-800" 
                            : inc.urgency === "High" 
                            ? "bg-amber-100 text-amber-800" 
                            : "bg-slate-100 text-slate-700"
                        }`}>
                          {inc.urgency}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{inc.ticketNumber}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 leading-snug">{inc.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{inc.location}</p>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                      isResolved
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : inc.status === "In Progress"
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}>
                      {inc.status}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-50 text-[11px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {inc.reportedAt}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {inc.aiProtocol && (
                        <button
                          onClick={() => onViewIncidentProtocol(inc)}
                          className="text-[10px] font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded border border-teal-200 flex items-center gap-1"
                        >
                          <Sparkles className="w-2.5 h-2.5 text-teal-600" />
                          <span>AI SOP</span>
                        </button>
                      )}
                      {!isResolved && !inc.assignedStaffName && (
                        <button
                          onClick={() => onOpenAssignModal(inc)}
                          className="text-[10px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded"
                        >
                          Assign
                        </button>
                      )}
                      {inc.assignedStaffName && !isResolved && (
                        <span className="text-[10px] text-slate-500 font-medium">
                          👤 {inc.assignedStaffName.split(" ")[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Staff Shift Snapshot */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 mb-2">Shift Supervisors & Crew</h4>
            <div className="space-y-2">
              {staff.slice(0, 3).map((st) => (
                <div key={st.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800 leading-tight">{st.name}</div>
                      <div className="text-[10px] text-slate-400">{st.role} • {st.assignedBuilding}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    st.status === "On Duty" 
                      ? "bg-emerald-50 text-emerald-700" 
                      : st.status === "Dispatched" 
                      ? "bg-sky-50 text-sky-700"
                      : "bg-slate-100 text-slate-600"
                  }`}>
                    {st.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
