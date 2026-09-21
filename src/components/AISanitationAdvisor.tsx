import React, { useState } from "react";
import { 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Layers, 
  Printer, 
  Copy, 
  Check, 
  FlaskConical, 
  Droplets, 
  HelpCircle,
  Clock,
  Send
} from "lucide-react";
import { AIProtocol } from "../types";

export const AISanitationAdvisor: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"hazard" | "sop">("hazard");
  
  // Hazard Form State
  const [hazardTitle, setHazardTitle] = useState("Mercury Fluorescent Tube Breakage in Physics Darkroom");
  const [hazardLocation, setHazardLocation] = useState("Physics Block, Room 204");
  const [hazardCategory, setHazardCategory] = useState("Chemical / Lab Hazard");
  const [hazardDescription, setHazardDescription] = useState(
    "A 4-foot fluorescent lamp tube dropped from ceiling fixture. White phosphor powder and broken glass scattered across floor. Room smells metallic."
  );
  const [hazardUrgency, setHazardUrgency] = useState<"High" | "Emergency">("Emergency");
  
  const [analyzingHazard, setAnalyzingHazard] = useState(false);
  const [hazardResult, setHazardResult] = useState<AIProtocol | null>(null);

  // SOP Generator Form State
  const [facilityType, setFacilityType] = useState("Examination Halls & Lecture Theatres");
  const [eventScenario, setEventScenario] = useState("End-Semester Examination Season Sanitization (High Footfall)");
  const [frequency, setFrequency] = useState("Twice Daily (Between 3-hour exam sessions)");
  const [generatingSOP, setGeneratingSOP] = useState(false);
  const [sopResult, setSopResult] = useState<any | null>(null);

  const [copied, setCopied] = useState(false);

  // Preset scenarios for instant testing
  const presets = [
    {
      title: "Mercury Fluorescent Tube Shatter",
      location: "Physics Block, Room 204",
      cat: "Chemical / Lab Hazard",
      urg: "Emergency" as const,
      desc: "Fluorescent tube fell from fixture. White phosphor powder and sharp glass scattered on floor. Slight metallic smell."
    },
    {
      title: "Canteen Grease Trap Overflow & Slip Hazard",
      location: "Central Dining Hall, Dishwashing Bay",
      cat: "Spill / Liquid Stain",
      urg: "High" as const,
      desc: "Greasy wastewater backflowing through floor drain. Extremely slippery ceramic tiles near dish collection window."
    },
    {
      title: "Hostel Washroom Black Mold & Drain Stagnation",
      location: "Girls Hostel B, 2nd Floor Common Restroom",
      cat: "Pest / Biohazard",
      urg: "High" as const,
      desc: "Extensive black mildew spots on shower tiles and ceiling. Strong persistent damp odor, stagnant water pooling."
    },
    {
      title: "Microbiology Agar Culture Plate Dropped",
      location: "Life Sciences Lab 102",
      cat: "Chemical / Lab Hazard",
      urg: "Emergency" as const,
      desc: "Student dropped two bacterial culture plates (E. coli broth). Glass broke on workbench and vinyl floor."
    }
  ];

  const handleAnalyzeHazard = async () => {
    setAnalyzingHazard(true);
    try {
      const res = await fetch("/api/ai/analyze-issue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: hazardTitle,
          location: hazardLocation,
          category: hazardCategory,
          description: hazardDescription,
          urgency: hazardUrgency,
        }),
      });
      const data = await res.json();
      if (data.protocol) {
        setHazardResult(data.protocol);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzingHazard(false);
    }
  };

  const handleGenerateSOP = async () => {
    setGeneratingSOP(true);
    try {
      const res = await fetch("/api/ai/generate-sop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facilityType,
          eventOrScenario: eventScenario,
          frequency,
        }),
      });
      const data = await res.json();
      if (data.sop) {
        setSopResult(data.sop);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingSOP(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Intro Hero */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold">AI Campus Sanitation & EHS Advisor</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/30 text-teal-200 border border-teal-400/30">
                Powered by Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">
              Automated hazard assessment, chemical containment protocols, PPE requirements, and customized university sanitation checklists for routine audits and high-footfall events.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 shrink-0">
            <button
              onClick={() => setActiveMode("hazard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === "hazard"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Hazard & Spill Triage
            </button>
            <button
              onClick={() => setActiveMode("sop")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMode === "sop"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Event SOP Generator
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: HAZARD & SPILL TRIAGE */}
      {activeMode === "hazard" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Simulate or Input Campus Hazard</h3>
              <p className="text-xs text-slate-500 mb-3">
                Select a common college laboratory or facility accident, or describe your incident:
              </p>

              {/* Preset chips */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[11px] font-semibold text-slate-400 block">Quick Scenarios:</span>
                {presets.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setHazardTitle(p.title);
                      setHazardLocation(p.location);
                      setHazardCategory(p.cat);
                      setHazardUrgency(p.urg);
                      setHazardDescription(p.desc);
                    }}
                    className="w-full text-left p-2 rounded-lg border border-slate-100 hover:border-teal-300 hover:bg-teal-50/50 text-xs transition-colors"
                  >
                    <div className="font-semibold text-slate-800">{p.title}</div>
                    <div className="text-[10px] text-slate-400">{p.location}</div>
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Issue Title</label>
                  <input
                    type="text"
                    value={hazardTitle}
                    onChange={(e) => setHazardTitle(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Location</label>
                    <input
                      type="text"
                      value={hazardLocation}
                      onChange={(e) => setHazardLocation(e.target.value)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Severity</label>
                    <select
                      value={hazardUrgency}
                      onChange={(e) => setHazardUrgency(e.target.value as any)}
                      className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                    >
                      <option value="High">High Urgency</option>
                      <option value="Emergency">Emergency / Hazmat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Description of Spill / Issue</label>
                  <textarea
                    rows={3}
                    value={hazardDescription}
                    onChange={(e) => setHazardDescription(e.target.value)}
                    className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white"
                  />
                </div>

                <button
                  onClick={handleAnalyzeHazard}
                  disabled={analyzingHazard}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{analyzingHazard ? "Evaluating Safety Protocol..." : "Generate AI Safety Protocol"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Protocol Display: 7 cols */}
          <div className="lg:col-span-7">
            {hazardResult ? (
              <div className="bg-white border border-teal-200 rounded-xl p-5 shadow-xs space-y-4">
                {/* Result Header */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        hazardResult.assessedSeverity === "Critical" 
                          ? "bg-rose-100 text-rose-800" 
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {hazardResult.assessedSeverity} Severity
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Est. Cleanup Time: ~{hazardResult.estimatedTimeMinutes} mins
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1">EHS Sanitation Protocol</h3>
                    <p className="text-xs text-slate-600 mt-0.5">{hazardResult.hazardAssessment}</p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(JSON.stringify(hazardResult, null, 2))}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                    title="Copy protocol"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Precaution Warning Callout */}
                {hazardResult.precautionAlert && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block">Sanitation Safety Notice:</span>
                      {hazardResult.precautionAlert}
                    </div>
                  </div>
                )}

                {/* Required PPE */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
                    Mandatory Personal Protective Equipment (PPE)
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {hazardResult.requiredPPE.map((ppe, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-medium">
                        🛡️ {ppe}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recommended Cleaning Agents */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    Required Disinfectants & Neutralizers
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {hazardResult.recommendedCleaners.map((cleaner, i) => (
                      <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-100 rounded-md text-xs font-medium">
                        🧪 {cleaner}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step-by-Step Procedure */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Step-by-Step Decontamination Procedure
                  </h4>
                  <ol className="space-y-2 text-xs text-slate-700">
                    {hazardResult.actionSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="mt-0.5 leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Waste Disposal Instructions */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block mb-0.5">Segregated Waste Disposal Instructions:</span>
                  <p className="text-slate-600">{hazardResult.disposalInstructions}</p>
                </div>
              </div>
            ) : (
              <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center text-slate-400">
                <FlaskConical className="w-10 h-10 mb-2 text-slate-300" />
                <h4 className="text-sm font-semibold text-slate-700">No Protocol Generated Yet</h4>
                <p className="text-xs max-w-sm mt-1">
                  Click "Generate AI Safety Protocol" or pick one of the quick scenario presets to evaluate hazards, PPE requirements, and containment steps.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODE 2: EVENT SOP & CHECKLIST GENERATOR */}
      {activeMode === "sop" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: 5 cols */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Custom Campus SOP & Inspection Builder</h3>
              <p className="text-xs text-slate-500">
                Create structured standard operating procedures for college festivals, monsoon sanitization, sports events, or examination season.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Campus Facility Type</label>
                <select
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg"
                >
                  <option value="Examination Halls & Lecture Theatres">Examination Halls & Lecture Theatres</option>
                  <option value="Central Cafeteria & Food Court">Central Cafeteria & Food Court</option>
                  <option value="Student Hostels & Dormitories">Student Hostels & Dormitories</option>
                  <option value="Science & Chemical Research Laboratories">Science & Chemical Research Laboratories</option>
                  <option value="University Auditorium & Convention Center">University Auditorium & Convention Center</option>
                  <option value="Sports Complex & Gymnasium">Sports Complex & Gymnasium</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Event or Operational Scenario</label>
                <input
                  type="text"
                  value={eventScenario}
                  onChange={(e) => setEventScenario(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cleaning Frequency Schedule</label>
                <input
                  type="text"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                onClick={handleGenerateSOP}
                disabled={generatingSOP}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{generatingSOP ? "Generating Campus SOP..." : "Generate SOP & Audit Checklist"}</span>
              </button>
            </div>
          </div>

          {/* Right SOP View: 7 cols */}
          <div className="lg:col-span-7">
            {sopResult ? (
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      University Standard Operating Procedure
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">{sopResult.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Schedule: <span className="font-semibold text-slate-700">{sopResult.frequency}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => copyToClipboard(JSON.stringify(sopResult, null, 2))}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-50 border border-slate-200 rounded"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Safety Precautions */}
                {sopResult.safetyPrecautions && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      Safety Protocols for Housekeeping Crew:
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                      {sopResult.safetyPrecautions.map((prec: string, idx: number) => (
                        <li key={idx}>{prec}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Checkpoints table */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Mandatory Inspection Checkpoints:
                  </h4>
                  <div className="border border-slate-200 rounded-lg overflow-hidden divide-y divide-slate-100 text-xs">
                    {sopResult.checkpoints?.map((chk: any, idx: number) => (
                      <div key={idx} className="p-2.5 flex items-start justify-between gap-3 bg-white hover:bg-slate-50">
                        <div>
                          <div className="font-semibold text-slate-800">{chk.task}</div>
                          <div className="text-[11px] text-teal-700 mt-0.5">Product: {chk.recommendedProduct}</div>
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0">
                          {chk.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Equipment & Signoff */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Equipment Required:</span>
                    <div className="flex flex-wrap gap-1">
                      {sopResult.equipmentRequired?.map((eq: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-700">
                          {eq}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Supervisor Audit Standard:</span>
                    <p className="text-slate-600 text-[11px]">{sopResult.supervisorSignoffNotes}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center text-slate-400">
                <FileText className="w-10 h-10 mb-2 text-slate-300" />
                <h4 className="text-sm font-semibold text-slate-700">No SOP Generated</h4>
                <p className="text-xs max-w-sm mt-1">
                  Choose your target facility, scenario, and frequency on the left, then click "Generate SOP & Audit Checklist".
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
