import React, { useState } from "react";
import { 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Calendar, 
  User, 
  MapPin, 
  PlusCircle, 
  Search, 
  FileCheck,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { InspectionAudit, CampusZone } from "../types";

interface AuditsTabProps {
  audits: InspectionAudit[];
  zones: CampusZone[];
  onOpenNewAuditModal: () => void;
}

export const AuditsTab: React.FC<AuditsTabProps> = ({
  audits,
  zones,
  onOpenNewAuditModal,
}) => {
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(
    audits.length > 0 ? audits[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const selectedAudit = audits.find((a) => a.id === selectedAuditId) || audits[0];

  const avgAuditScore = Math.round(
    audits.reduce((acc, a) => acc + a.overallScore, 0) / (audits.length || 1)
  );

  const gradeCount = {
    A: audits.filter((a) => a.overallScore >= 90).length,
    B: audits.filter((a) => a.overallScore >= 75 && a.overallScore < 90).length,
    C: audits.filter((a) => a.overallScore < 75).length,
  };

  const filteredAudits = audits.filter(
    (a) =>
      a.zoneName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.auditNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.auditorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {/* Top Banner & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Campus Sanitation Audits & Compliance</h2>
          <p className="text-xs text-slate-500">
            Digital supervisory checklists, floor sanitation scoring, and health officer sign-offs
          </p>
        </div>

        <button
          onClick={onOpenNewAuditModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Conduct New Inspection</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Average Audit Score</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{avgAuditScore}%</span>
            <span className="text-xs font-semibold text-emerald-600">Grade {avgAuditScore >= 85 ? "A" : "B"}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across all verified academic & residential zones</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Inspection Grade Breakdown</span>
          <div className="mt-2 flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <strong className="text-slate-800">{gradeCount.A}</strong> Grade A
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <strong className="text-slate-800">{gradeCount.B}</strong> Grade B
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <strong className="text-slate-800">{gradeCount.C}</strong> Needs Reclean
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Standard University Sanitation Rubric</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <span className="text-xs font-medium text-slate-500">Health & Safety Compliance</span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-teal-700">100%</span>
            <span className="text-xs font-semibold text-teal-600">Disinfection Adherence</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Chemical logs & PPE certified</p>
        </div>
      </div>

      {/* Main Content: Left Audit List, Right Detail Inspection Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List: 5 cols */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit number, room, auditor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
            />
          </div>

          <div className="space-y-2.5">
            {filteredAudits.map((audit) => {
              const isSelected = selectedAudit?.id === audit.id;
              const isGradeA = audit.overallScore >= 90;
              const isGradeB = audit.overallScore >= 75 && audit.overallScore < 90;

              return (
                <div
                  key={audit.id}
                  onClick={() => setSelectedAuditId(audit.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-teal-50/50 border-teal-500 shadow-xs ring-1 ring-teal-400/30"
                      : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {audit.auditNumber}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5">{audit.zoneName}</h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {audit.building}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`text-base font-extrabold leading-none ${
                        isGradeA ? "text-emerald-600" : isGradeB ? "text-sky-600" : "text-amber-600"
                      }`}>
                        {audit.overallScore}%
                      </div>
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded mt-1 inline-block ${
                        isGradeA
                          ? "bg-emerald-100 text-emerald-800"
                          : isGradeB
                          ? "bg-sky-100 text-sky-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {audit.status.split(" ")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {audit.timestamp}
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 font-medium">
                      <User className="w-3 h-3 text-slate-400" />
                      {audit.auditorName}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Sheet: 7 cols */}
        <div className="lg:col-span-7">
          {selectedAudit ? (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
              {/* Top Meta */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {selectedAudit.auditNumber}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200">
                      Official Sanitation Certificate
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1.5">{selectedAudit.zoneName}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedAudit.building}</span>
                    <span>•</span>
                    <span>{selectedAudit.timestamp}</span>
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center min-w-28">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Score</div>
                  <div className={`text-3xl font-extrabold ${
                    selectedAudit.overallScore >= 90 ? "text-emerald-600" : selectedAudit.overallScore >= 75 ? "text-sky-600" : "text-amber-600"
                  }`}>
                    {selectedAudit.overallScore}%
                  </div>
                  <span className="text-xs font-bold text-slate-700 block mt-0.5">
                    {selectedAudit.status}
                  </span>
                </div>
              </div>

              {/* Items checklist */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-teal-600" />
                  Detailed Rubric Checkpoints ({selectedAudit.items.length})
                </h4>

                <div className="space-y-2">
                  {selectedAudit.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 border border-slate-100 rounded-lg flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                            {item.category}
                          </span>
                          <span className="font-semibold text-slate-800">{item.title}</span>
                        </div>
                        {item.notes && (
                          <p className="text-slate-500 text-[11px] italic pl-1">Note: {item.notes}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="font-bold text-slate-700 text-xs">
                          {item.score} / 10
                        </span>
                        {item.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Auditor Sign-off and Notes */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Inspector Verification & Sign-off:</span>
                  <span className="text-slate-500 font-medium">
                    {selectedAudit.auditorName} ({selectedAudit.auditorRole})
                  </span>
                </div>
                <p className="text-slate-600 italic bg-white p-2.5 rounded-lg border border-slate-200">
                  "{selectedAudit.supervisorSignOff || selectedAudit.notes}"
                </p>

                {selectedAudit.followUpDeadline && (
                  <div className="p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Follow-up corrective sweep required by: <strong>{selectedAudit.followUpDeadline}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
              No audit selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
