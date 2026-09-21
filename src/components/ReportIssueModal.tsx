import React, { useState } from "react";
import { 
  X, 
  AlertTriangle, 
  Sparkles, 
  MapPin, 
  User, 
  Camera, 
  Upload, 
  CheckCircle2 
} from "lucide-react";
import { CampusZone, IncidentCategory, IncidentUrgency } from "../types";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  zones: CampusZone[];
  preselectedZoneCode?: string;
  onSubmit: (data: {
    title: string;
    location: string;
    zoneId?: string;
    building: string;
    category: IncidentCategory;
    urgency: IncidentUrgency;
    description: string;
    reporterName: string;
    reporterRole: "Student" | "Faculty" | "Staff" | "Campus Visitor" | "Sanitation Officer";
    runAIAnalysis: boolean;
  }) => void;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  zones,
  preselectedZoneCode,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const defaultZone = preselectedZoneCode 
    ? zones.find((z) => z.code === preselectedZoneCode) 
    : undefined;

  const [selectedZoneId, setSelectedZoneId] = useState<string>(defaultZone?.id || "");
  const [customLocation, setCustomLocation] = useState<string>(
    defaultZone ? `${defaultZone.building}, ${defaultZone.name}` : ""
  );
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<IncidentCategory>("Spill / Liquid Stain");
  const [urgency, setUrgency] = useState<IncidentUrgency>("Medium");
  const [description, setDescription] = useState<string>("");
  const [reporterName, setReporterName] = useState<string>("Akash Chavhan");
  const [reporterRole, setReporterRole] = useState<"Student" | "Faculty" | "Staff" | "Campus Visitor" | "Sanitation Officer">("Student");
  const [runAIAnalysis, setRunAIAnalysis] = useState<boolean>(true);

  // Quick College Preset buttons
  const presets = [
    {
      title: "Canteen / Corridor Dustbin Overflowing",
      cat: "Overflowing Bins" as IncidentCategory,
      urg: "High" as IncidentUrgency,
      desc: "Waste bin has filled past capacity; tea cups and food wrappers spilling onto college walkway.",
    },
    {
      title: "Washroom Needs Urgent Cleaning & Soap",
      cat: "Restroom Sanitation" as IncidentCategory,
      urg: "High" as IncidentUrgency,
      desc: "Washroom floor is wet, soap dispenser empty, and requires immediate mopping and sanitation.",
    },
    {
      title: "Classroom Floor & Desks Dirty",
      cat: "Spill / Liquid Stain" as IncidentCategory,
      urg: "Medium" as IncidentUrgency,
      desc: "Chalk dust, paper scraps, and beverage spill on the classroom floor and front rows.",
    },
    {
      title: "Water Cooler Area Wet & Slippery",
      cat: "Spill / Liquid Stain" as IncidentCategory,
      urg: "Medium" as IncidentUrgency,
      desc: "Water overflow from cooler creating a puddle and slip hazard near the entrance.",
    },
    {
      title: "Workshop Bay / Lab Floor Cleaning",
      cat: "Broken Glass / Debris" as IncidentCategory,
      urg: "Medium" as IncidentUrgency,
      desc: "Debris, packaging, and sawdust/metal filings require sweeping and trash clearance.",
    },
  ];

  const handleZoneSelect = (zoneId: string) => {
    setSelectedZoneId(zoneId);
    const z = zones.find((item) => item.id === zoneId);
    if (z) {
      setCustomLocation(`${z.building}, ${z.name} (${z.floor})`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !customLocation) return;

    const matchedZone = zones.find((z) => z.id === selectedZoneId);
    const building = matchedZone?.building || "General Campus";

    onSubmit({
      title,
      location: customLocation,
      zoneId: selectedZoneId || undefined,
      building,
      category,
      urgency,
      description: description || "Reported via campus cleaning portal.",
      reporterName: reporterName || "Anonymous Student",
      reporterRole,
      runAIAnalysis,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#0f382c] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Report College Cleaning Issue</h3>
              <p className="text-[11px] text-emerald-200">GCOEARA Campus Sanitation & Housekeeping Desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="bg-slate-50 border-b border-slate-100 px-5 py-2.5">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
            Quick Fill Templates:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTitle(p.title);
                  setCategory(p.cat);
                  setUrgency(p.urg);
                  setDescription(p.desc);
                }}
                className="text-[11px] bg-white hover:bg-teal-50 hover:border-teal-300 border border-slate-200 text-slate-700 px-2 py-1 rounded-md transition-colors"
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          {/* Location Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Campus Zone (Optional)</label>
              <select
                value={selectedZoneId}
                onChange={(e) => handleZoneSelect(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              >
                <option value="">-- Choose Facility / Room --</option>
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.code} - {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Exact Location / Landmark *</label>
              <input
                type="text"
                required
                placeholder="e.g. Science Block 3rd floor corridor"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Issue Title */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Issue Headline *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sticky beverage spill across stairs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
            />
          </div>

          {/* Category & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Spill / Liquid Stain">Spill / Liquid Stain</option>
                <option value="Overflowing Bins">Overflowing Bins</option>
                <option value="Restroom Sanitation">Restroom Sanitation</option>
                <option value="Chemical / Lab Hazard">Chemical / Lab Hazard</option>
                <option value="Consumable Depletion">Consumable Depletion</option>
                <option value="Broken Glass / Debris">Broken Glass / Debris</option>
                <option value="Pest / Biohazard">Pest / Biohazard</option>
                <option value="Odor & Ventilation">Odor & Ventilation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Urgency Level</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as IncidentUrgency)}
                className={`w-full p-2 border rounded-lg text-xs font-bold ${
                  urgency === "Emergency"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : urgency === "High"
                    ? "bg-amber-50 text-amber-800 border-amber-200"
                    : "bg-slate-50 text-slate-800 border-slate-200"
                }`}
              >
                <option value="Low">Low - Routine cleanup</option>
                <option value="Medium">Medium - Attention needed</option>
                <option value="High">High - Urgent disruption</option>
                <option value="Emergency">Emergency - Hazard / Bio-spill</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Description & Details</label>
            <textarea
              rows={2}
              placeholder="Describe the nature of stain, smell, chemical involved, or broken fixture..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
            />
          </div>

          {/* Reporter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Reporter Name</label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Role on Campus</label>
              <select
                value={reporterRole}
                onChange={(e) => setReporterRole(e.target.value as any)}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty / Professor</option>
                <option value="Staff">Department Staff</option>
                <option value="Sanitation Officer">Sanitation Officer</option>
                <option value="Campus Visitor">Visitor</option>
              </select>
            </div>
          </div>

          {/* AI Checkbox */}
          <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
              <div>
                <span className="font-bold text-teal-900 block">Auto-generate AI Safety Protocol</span>
                <span className="text-[11px] text-teal-700">
                  Evaluates bio/chemical hazard, PPE checklist, and safe disposal guide
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={runAIAnalysis}
              onChange={(e) => setRunAIAnalysis(e.target.checked)}
              className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
            />
          </div>

          {/* Submit Actions */}
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
              <span>Submit Sanitation Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
