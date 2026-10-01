import React, { useState } from "react";
import { 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  User, 
  MapPin, 
  Filter, 
  Search, 
  PlusCircle, 
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Check
} from "lucide-react";
import { CleaningIncident, StaffMember, IncidentCategory, IncidentUrgency, IncidentStatus } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface IncidentsTabProps {
  incidents: CleaningIncident[];
  staff: StaffMember[];
  onOpenReportModal: () => void;
  onUpdateStatus: (incidentId: string, newStatus: IncidentStatus, notes?: string) => void;
  onAssignStaff: (incidentId: string, staffId: string) => void;
  onAnalyzeWithAI: (incident: CleaningIncident) => void;
  onViewAIProtocol: (incident: CleaningIncident) => void;
  onSubmitRating: (incidentId: string, rating: number, comment?: string) => void;
  isAILoading: boolean;
  analyzingId?: string;
}

export const IncidentsTab: React.FC<IncidentsTabProps> = ({
  incidents,
  staff,
  onOpenReportModal,
  onUpdateStatus,
  onAssignStaff,
  onAnalyzeWithAI,
  onViewAIProtocol,
  onSubmitRating,
  isAILoading,
  analyzingId,
}) => {
  const { lang, t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = incidents.filter((inc) => {
    const matchesStatus = 
      statusFilter === "All" 
        ? true 
        : statusFilter === "Active" 
        ? inc.status !== "Resolved" && inc.status !== "Verified"
        : inc.status === statusFilter;

    const matchesSearch = 
      inc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inc.reporterName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case "Pending":
        return <span className="px-2.5 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800">{t.statusPending}</span>;
      case "Assigned":
        return <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800">{t.statusAssigned}</span>;
      case "In Progress":
        return <span className="px-2.5 py-1 rounded-full text-xs font-black bg-sky-100 text-sky-800">{t.statusInProgress}</span>;
      case "Resolved":
      case "Verified":
        return <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">{t.statusResolved}</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {t.incidentsHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {t.incidentsSubheading}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={t.actionSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* New Report Button */}
          <button
            onClick={onOpenReportModal}
            className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden xs:inline">{t.reportDirtyBtn}</span>
            <span className="xs:hidden">+</span>
          </button>
        </div>
      </div>

      {/* Status Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setStatusFilter("All")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
            statusFilter === "All"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-700 border border-slate-200"
          }`}
        >
          {lang === "mr" ? "सर्व तक्रारी" : "All Tickets"} ({incidents.length})
        </button>
        <button
          onClick={() => setStatusFilter("Active")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1 ${
            statusFilter === "Active"
              ? "bg-rose-600 text-white"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>⏳ {lang === "mr" ? "सफाई बाकी" : "Active / Pending"}</span>
          <span>({incidents.filter(i => i.status !== "Resolved" && i.status !== "Verified").length})</span>
        </button>
        <button
          onClick={() => setStatusFilter("Resolved")}
          className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1 ${
            statusFilter === "Resolved"
              ? "bg-emerald-700 text-white"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
          }`}
        >
          <span>✅ {lang === "mr" ? "पूर्ण झालेल्या" : "Resolved"}</span>
          <span>({incidents.filter(i => i.status === "Resolved" || i.status === "Verified").length})</span>
        </button>
      </div>

      {/* Incident List Cards */}
      <div className="space-y-3">
        {filtered.map((inc) => {
          const isResolved = inc.status === "Resolved" || inc.status === "Verified";
          const isAnalyzing = isAILoading && analyzingId === inc.id;

          return (
            <div
              key={inc.id}
              className={`bg-white rounded-2xl border-2 p-4 shadow-xs transition-all ${
                isResolved
                  ? "border-emerald-200 bg-emerald-50/20"
                  : inc.urgency === "Emergency" || inc.urgency === "High"
                  ? "border-rose-300 ring-2 ring-rose-100"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {inc.ticketNumber}
                    </span>
                    {getStatusBadge(inc.status)}
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      inc.urgency === "Emergency" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-700"
                    }`}>
                      {inc.urgency}
                    </span>
                  </div>

                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    {inc.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mt-1 flex-wrap">
                    <span className="flex items-center gap-1 text-slate-700 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      {inc.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {inc.reportedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {inc.reporterName} ({inc.reporterRole})
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                    {inc.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons for Cleaning Staff & Students */}
              <div className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
                {/* Staff Assignment Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-bold text-[11px]">
                    {lang === "mr" ? "कर्मचारी:" : "Staff:"}
                  </span>
                  <select
                    value={inc.assignedStaffId || ""}
                    onChange={(e) => onAssignStaff(inc.id, e.target.value)}
                    className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1 text-slate-800 font-bold cursor-pointer"
                  >
                    <option value="">{lang === "mr" ? "-- कर्मचारी नेमा --" : "-- Assign Cleaner --"}</option>
                    {staff.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Status Trigger Action Buttons */}
                <div className="flex items-center gap-2">
                  {!isResolved ? (
                    <button
                      onClick={() => onUpdateStatus(inc.id, "Resolved", "Cleaned thoroughly by campus housekeeping crew.")}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t.markResolvedQuick}</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1 bg-emerald-100 px-3 py-1.5 rounded-xl">
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>{lang === "mr" ? "स्वच्छता यशस्वीरित्या पूर्ण झाली" : "Cleaning Completed"}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            {lang === "mr" ? "कोणतीही तक्रार आढळली नाही." : "No cleaning tickets match your search."}
          </p>
        </div>
      )}
    </div>
  );
};
