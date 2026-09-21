import React, { useState } from "react";
import { 
  X, 
  ClipboardCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sliders, 
  User 
} from "lucide-react";
import { CampusZone, InspectionAudit, AuditCheckItem } from "../types";

interface NewAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: CampusZone[];
  onSubmitAudit: (audit: InspectionAudit) => void;
}

export const NewAuditModal: React.FC<NewAuditModalProps> = ({
  isOpen,
  onClose,
  zones,
  onSubmitAudit,
}) => {
  if (!isOpen) return null;

  const [selectedZoneId, setSelectedZoneId] = useState<string>(zones[0]?.id || "");
  const [auditorName, setAuditorName] = useState("Anita Roy");
  const [auditorRole, setAuditorRole] = useState("Floor Supervisor");
  const [supervisorSignOff, setSupervisorSignOff] = useState("Conducted per University Sanitation Code 2026.");

  // Criteria scores (0-10)
  const [scores, setScores] = useState<{ [key: string]: number }>({
    c1: 9,
    c2: 9,
    c3: 8,
    c4: 9,
    c5: 8,
  });

  const criteria = [
    { id: "c1", title: "Floors mopped with hospital disinfectant & skid-free", category: "Floors & Surfaces" as const },
    { id: "c2", title: "High-touch surfaces (handles, switches, podiums) wiped", category: "Disinfection & Touchpoints" as const },
    { id: "c3", title: "Waste bins emptied & color-coded liners installed", category: "Waste Segregation" as const },
    { id: "c4", title: "Soap, sanitizer, and paper towel dispensers filled", category: "Consumables & Dispensers" as const },
    { id: "c5", title: "Odor neutralization, moisture control, and ventilation active", category: "Odor & Air Quality" as const },
  ];

  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxPoints = criteria.length * 10;
  const overallPercentage = Math.round((totalPoints / maxPoints) * 100);

  let statusText: "Passed (Grade A)" | "Satisfactory (Grade B)" | "Needs Improvement (Grade C)" | "Failed - Re-clean Required" = "Passed (Grade A)";
  if (overallPercentage >= 90) statusText = "Passed (Grade A)";
  else if (overallPercentage >= 75) statusText = "Satisfactory (Grade B)";
  else if (overallPercentage >= 60) statusText = "Needs Improvement (Grade C)";
  else statusText = "Failed - Re-clean Required";

  const handleScoreChange = (id: string, val: number) => {
    setScores((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zone = zones.find((z) => z.id === selectedZoneId) || zones[0];

    const items: AuditCheckItem[] = criteria.map((c) => ({
      id: `item-${Date.now()}-${c.id}`,
      title: c.title,
      category: c.category,
      passed: (scores[c.id] || 0) >= 6,
      score: scores[c.id] || 0,
      notes: (scores[c.id] || 0) >= 8 ? "Meets compliance" : "Minor correction needed",
    }));

    const newAudit: InspectionAudit = {
      id: `audit-${Date.now()}`,
      auditNumber: `AUD-2026-${Math.floor(100 + Math.random() * 900)}`,
      zoneId: zone.id,
      zoneName: zone.name,
      building: zone.building,
      auditorName,
      auditorRole,
      timestamp: "Today at " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      overallScore: overallPercentage,
      status: statusText,
      items,
      supervisorSignOff,
      notes: `Audited by ${auditorName}. Result: ${overallPercentage}% - ${statusText}.`,
    };

    onSubmitAudit(newAudit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Conduct Campus Sanitation Audit</h3>
              <p className="text-[11px] text-slate-300">Digital rubric scoring & official compliance certification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {/* Target Zone & Inspector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Facility / Zone *</label>
              <select
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
              >
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.name} ({z.building})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Auditor Name & Role *</label>
              <input
                type="text"
                required
                value={auditorName}
                onChange={(e) => setAuditorName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Live Score Preview Header */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 block">
                Calculated Hygiene Score
              </span>
              <div className="text-2xl font-extrabold text-teal-900 mt-0.5">
                {overallPercentage}%{" "}
                <span className="text-xs font-bold text-teal-700">({statusText})</span>
              </div>
            </div>
            <div className="text-right text-[11px] text-teal-800">
              <span>Points: </span>
              <strong>{totalPoints}</strong> / {maxPoints}
            </div>
          </div>

          {/* Interactive Criteria Sliders */}
          <div className="space-y-3">
            <span className="font-bold text-slate-800 block text-xs">
              Inspection Rubric Criteria (0 to 10 pts each):
            </span>

            {criteria.map((c) => (
              <div key={c.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-slate-800">{c.title}</div>
                  <span className="font-extrabold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {scores[c.id]} / 10
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={scores[c.id]}
                  onChange={(e) => handleScoreChange(c.id, parseInt(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Supervisor Notes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Supervisor Sign-off Remarks</label>
            <input
              type="text"
              value={supervisorSignOff}
              onChange={(e) => setSupervisorSignOff(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Official Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
