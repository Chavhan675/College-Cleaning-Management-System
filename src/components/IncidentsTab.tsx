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
  ShieldAlert, 
  PlusCircle, 
  UserPlus, 
  Star,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { CleaningIncident, StaffMember, IncidentCategory, IncidentUrgency, IncidentStatus } from "../types";

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
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resolutionInput, setResolutionInput] = useState<{ [id: string]: string }>({});

  const categories: string[] = [
    "All",
    "Chemical / Lab Hazard",
    "Spill / Liquid Stain",
    "Restroom Sanitation",
    "Overflowing Bins",
    "Consumable Depletion",
    "Broken Glass / Debris",
    "Odor & Ventilation",
  ];

  const filtered = incidents.filter((inc) => {
    const matchesCategory = categoryFilter === "All" || inc.category === categoryFilter;
    const matchesUrgency = urgencyFilter === "All" || inc.urgency === urgencyFilter;
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

    return matchesCategory && matchesUrgency && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Campus Sanitation Ticket Desk</h2>
          <p className="text-xs text-slate-500">
            Real-time tracking of spills, overflowing waste, hygiene hazards, and consumable replenishments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ticket, room, reporter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
            />
          </div>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs shrink-0 transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Report</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-2xs space-y-3">
        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] font-semibold text-slate-400">Status:</span>
          {["All", "Active", "Pending", "Assigned", "In Progress", "Resolved"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                statusFilter === st
                  ? "bg-slate-900 text-white font-semibold"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Categories filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1">Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-0.8 rounded-full whitespace-nowrap text-[11px] transition-all ${
                categoryFilter === cat
                  ? "bg-teal-600 text-white font-semibold shadow-2xs"
                  : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List */}
      <div className="space-y-3.5">
        {filtered.map((inc) => {
          const isUrgent = inc.urgency === "Emergency" || inc.urgency === "High";
          const isResolved = inc.status === "Resolved" || inc.status === "Verified";
          const isExpanded = expandedId === inc.id;
          const isAnalyzing = isAILoading && analyzingId === inc.id;

          return (
            <div
              key={inc.id}
              className={`bg-white border rounded-xl shadow-2xs transition-all ${
                isUrgent && !isResolved
                  ? "border-rose-300 ring-1 ring-rose-100"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Main Card Header */}
              <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  
                  {/* Left info */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {inc.ticketNumber}
                      </span>

                      {/* Urgency Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          inc.urgency === "Emergency"
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : inc.urgency === "High"
                            ? "bg-amber-100 text-amber-800 border border-amber-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {inc.urgency}
                      </span>

                      {/* Category Badge */}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                        {inc.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 mt-1">{inc.title}</h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {inc.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {inc.reportedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {inc.reporterName} ({inc.reporterRole})
                      </span>
                    </div>
                  </div>

                  {/* Right Status badge and actions */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        isResolved
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : inc.status === "In Progress"
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : inc.status === "Assigned"
                          ? "bg-purple-50 text-purple-700 border border-purple-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {inc.status}
                    </span>

                    {inc.assignedStaffName && (
                      <span className="text-[11px] text-slate-600 font-medium bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        Assigned: {inc.assignedStaffName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 mt-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {inc.description}
                </p>

                {/* AI Protocol Snippet or Generator CTA */}
                {inc.aiProtocol ? (
                  <div className="mt-3 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-teal-600" />
                        <span className="text-xs font-bold text-teal-900">
                          AI Safety Protocol Available ({inc.aiProtocol.assessedSeverity} Severity)
                        </span>
                      </div>
                      <button
                        onClick={() => onViewAIProtocol(inc)}
                        className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline underline-offset-2 flex items-center gap-1"
                      >
                        View Full SOP & PPE List <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-[11px] text-teal-800 mt-1 line-clamp-1">
                      {inc.aiProtocol.hazardAssessment}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100 text-xs">
                    <span className="text-slate-500 text-[11px]">
                      Need safety triage, PPE requirements, or chemical neutralizing instructions?
                    </span>
                    <button
                      onClick={() => onAnalyzeWithAI(inc)}
                      disabled={isAnalyzing}
                      className="px-2.5 py-1 bg-white hover:bg-teal-50 border border-teal-200 text-teal-700 rounded text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-teal-600" />
                      <span>{isAnalyzing ? "Analyzing..." : "Generate AI Safety SOP"}</span>
                    </button>
                  </div>
                )}

                {/* Bottom Action Controls */}
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                  {/* Left: Assign Crew */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 text-[11px]">Staff:</span>
                    <select
                      value={inc.assignedStaffId || ""}
                      onChange={(e) => onAssignStaff(inc.id, e.target.value)}
                      className="text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-800 font-medium focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="">-- Assign Cleaner --</option>
                      {staff.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} ({st.role})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Right: Status Flow Buttons */}
                  <div className="flex items-center gap-2">
                    {inc.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(inc.id, "In Progress")}
                          className="px-2.5 py-1 bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 rounded text-xs font-semibold transition-colors"
                        >
                          Start Cleaning
                        </button>
                        <button
                          onClick={() => onUpdateStatus(inc.id, "Resolved", "Cleaned and sanitized promptly by campus staff.")}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark Cleaned</span>
                        </button>
                      </>
                    )}

                    {inc.status === "Assigned" && (
                      <>
                        <button
                          onClick={() => onUpdateStatus(inc.id, "In Progress")}
                          className="px-2.5 py-1 bg-sky-600 text-white hover:bg-sky-700 rounded text-xs font-semibold transition-colors"
                        >
                          Dispatch Crew
                        </button>
                        <button
                          onClick={() => onUpdateStatus(inc.id, "Resolved", "Cleaned and sanitized by assigned staff member.")}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Mark Cleaned</span>
                        </button>
                      </>
                    )}

                    {inc.status === "In Progress" && (
                      <button
                        onClick={() => onUpdateStatus(inc.id, "Resolved", "Cleaning verified and completed.")}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark as Cleaned ✅</span>
                      </button>
                    )}

                    {isResolved && (
                      <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Cleaned & Resolved {inc.resolvedAt ? `(${inc.resolvedAt})` : ""}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expandable Resolution Drawer */}
                {isExpanded && !isResolved && (
                  <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-2">
                    <label className="block text-xs font-bold text-emerald-900">
                      Janitorial Completion Notes:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Area mopped with disinfectant, dry sign removed, refilled soap..."
                      value={resolutionInput[inc.id] || ""}
                      onChange={(e) =>
                        setResolutionInput({ ...resolutionInput, [inc.id]: e.target.value })
                      }
                      className="w-full text-xs p-2 bg-white border border-emerald-200 rounded focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setExpandedId(null)}
                        className="px-2.5 py-1 text-xs text-slate-600 hover:bg-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          onUpdateStatus(
                            inc.id,
                            "Resolved",
                            resolutionInput[inc.id] || "Completed per standard cleaning protocol."
                          );
                          setExpandedId(null);
                        }}
                        className="px-3 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded shadow-xs"
                      >
                        Confirm Resolution
                      </button>
                    </div>
                  </div>
                )}

                {/* Rating feedback if resolved */}
                {isResolved && !inc.rating && (
                  <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">
                      How was the sanitation resolution? (Student/Reporter Rating)
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => onSubmitRating(inc.id, star, "Prompt service")}
                          className="text-slate-300 hover:text-amber-400 transition-colors p-0.5"
                          title={`${star} Stars`}
                        >
                          <Star className="w-4 h-4 fill-current hover:fill-amber-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isResolved && inc.rating && (
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded">
                    <span className="font-semibold text-slate-700">Reporter Feedback:</span>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: inc.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    {inc.ratingComment && (
                      <span className="italic text-slate-600">"{inc.ratingComment}"</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
            <p className="text-slate-500 text-sm">No tickets found for this criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
