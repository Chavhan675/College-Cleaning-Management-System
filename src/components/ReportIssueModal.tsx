import React, { useState } from "react";
import { 
  X, 
  AlertTriangle, 
  Sparkles, 
  MapPin, 
  User, 
  CheckCircle2,
  Trash2,
  Droplets,
  Building,
  FlaskConical
} from "lucide-react";
import { CampusZone, IncidentCategory, IncidentUrgency } from "../types";
import { useLanguage } from "../context/LanguageContext";

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
  const { lang, t } = useLanguage();

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
  const [reporterName, setReporterName] = useState<string>(lang === "mr" ? "महाविद्यालयीन विद्यार्थी" : "College Student");
  const [reporterRole, setReporterRole] = useState<"Student" | "Faculty" | "Staff" | "Campus Visitor" | "Sanitation Officer">("Student");
  const [runAIAnalysis, setRunAIAnalysis] = useState<boolean>(true);

  // Big, Visual 1-Click Quick Presets for all education levels
  const visualPresets = [
    {
      icon: "🚽",
      label: lang === "mr" ? "टॉयलेट / बाथरुम घाण" : "Washroom Dirty",
      sub: lang === "mr" ? "दुर्गंधी / पाणी नाही" : "Smell / No water",
      title: lang === "mr" ? "शौचालयाची तातडीची स्वच्छता व पाणी पुरवठा" : "Urgent Washroom Cleaning & Sanitation",
      cat: "Restroom Sanitation" as IncidentCategory,
      urg: "High" as IncidentUrgency,
      desc: lang === "mr" ? "शौचालयात पाणी कमी आहे, वास येत आहे व फरशी ओली आहे." : "Washroom is wet, odor is strong and soap/water is depleted.",
      border: "border-rose-300 hover:bg-rose-50"
    },
    {
      icon: "🗑️",
      label: lang === "mr" ? "कचराकुंडी भरली" : "Dustbin Overflow",
      sub: lang === "mr" ? "कचरा पसरला आहे" : "Spilling onto floor",
      title: lang === "mr" ? "कचराकुंडी भरून कचरा बाहेर पडला आहे" : "Canteen / Corridor Dustbin Overflowing",
      cat: "Overflowing Bins" as IncidentCategory,
      urg: "High" as IncidentUrgency,
      desc: lang === "mr" ? "कचराकुंडी तुडुंब भरली असून चहाचे कप व कागद जमिनीवर पसरले आहेत." : "Waste bin filled past capacity with trash spilling on walkway.",
      border: "border-amber-300 hover:bg-amber-50"
    },
    {
      icon: "🏫",
      label: lang === "mr" ? "वर्गखोली घाण" : "Classroom Dirty",
      sub: lang === "mr" ? "बेंच व फरशीवर कचरा" : "Dust & paper scraps",
      title: lang === "mr" ? "वर्गखोलीत बेंचवर धूळ व कागदाचा कचरा" : "Classroom Floor & Desks Need Sweeping",
      cat: "Spill / Liquid Stain" as IncidentCategory,
      urg: "Medium" as IncidentUrgency,
      desc: lang === "mr" ? "फळ्याचा खडू, कागदाचे तुकडे व बेंचवर धूळ आहे. झाडू मारणे आवश्यक." : "Chalk dust and paper scraps on floor. Sweeping required.",
      border: "border-emerald-300 hover:bg-emerald-50"
    },
    {
      icon: "💧",
      label: lang === "mr" ? "पाणी साचले / निसरडे" : "Water Spill / Wet",
      sub: lang === "mr" ? "पाण्याजवळ निसरडे" : "Slippery floor hazard",
      title: lang === "mr" ? "वॉटर कूलर जवळ पाणी साचले असून फरशी निसरडी" : "Water Cooler Area Wet & Slippery",
      cat: "Spill / Liquid Stain" as IncidentCategory,
      urg: "Medium" as IncidentUrgency,
      desc: lang === "mr" ? "पिण्याच्या पाण्याजवळ गळतीमुळे पाणी साचले आहे, विद्यार्थी घसरण्याची शक्यता आहे." : "Water spill creating slip hazard near water cooler entrance.",
      border: "border-blue-300 hover:bg-blue-50"
    },
    {
      icon: "🧪",
      label: lang === "mr" ? "लॅब केमिकल / धोका" : "Lab Spill / Hazard",
      sub: lang === "mr" ? "तातडीने लक्ष द्या" : "Emergency containment",
      title: lang === "mr" ? "प्रयोगशाळेत केमिकल किंवा द्रव सांडले" : "Chemical / Lab Liquid Spill Incident",
      cat: "Chemical / Lab Hazard" as IncidentCategory,
      urg: "Emergency" as IncidentUrgency,
      desc: lang === "mr" ? "लॅबमध्ये काच किंवा केमिकल सांडले आहे, तातडीने सफाई हवी." : "Lab chemical spill requiring gloves and neutralizing powder.",
      border: "border-purple-300 hover:bg-purple-50"
    }
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
      description: description || (lang === "mr" ? "पोर्टलद्वारे नोंदवलेली स्वच्छता तक्रार." : "Reported via campus cleaning portal."),
      reporterName: reporterName || (lang === "mr" ? "महाविद्यालयीन विद्यार्थी" : "Campus Member"),
      reporterRole,
      runAIAnalysis,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0f382c] to-emerald-950 text-white px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {t.reportModalTitle}
              </h3>
              <p className="text-xs text-emerald-200 font-medium">
                {t.reportModalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-xl bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1-Tap Visual Issue Selector (Made for all education levels) */}
        <div className="bg-slate-50 border-b border-slate-200 p-3 sm:p-4">
          <span className="text-xs font-black text-slate-700 block mb-2">
            👉 {t.quickIssueHeading}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {visualPresets.map((vp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setTitle(vp.title);
                  setCategory(vp.cat);
                  setUrgency(vp.urg);
                  setDescription(vp.desc);
                }}
                className={`p-2.5 rounded-xl border-2 bg-white text-left transition-all cursor-pointer active:scale-95 shadow-2xs ${vp.border}`}
              >
                <div className="text-2xl mb-1">{vp.icon}</div>
                <div className="font-bold text-xs text-slate-900 leading-tight">
                  {vp.label}
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {vp.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 text-xs sm:text-sm">
          
          {/* Location Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "वर्ग / जागा निवडा" : "Select Room / Zone"}
              </label>
              <select
                value={selectedZoneId}
                onChange={(e) => handleZoneSelect(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 cursor-pointer"
              >
                <option value="">{lang === "mr" ? "-- खोली किंवा विभाग निवडा --" : "-- Choose Room or Lab --"}</option>
                {zones.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.code} - {z.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t.locationLabel} *
              </label>
              <input
                type="text"
                required
                placeholder={lang === "mr" ? "उदा. कॉम्प्युटर लॅब 2, पहिला मजला" : "e.g. Mech Workshop or Room 101"}
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>
          </div>

          {/* Issue Title */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {t.issueTitleLabel} *
            </label>
            <input
              type="text"
              required
              placeholder={t.issueTitlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-bold text-slate-900"
            />
          </div>

          {/* Category & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as IncidentCategory)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
              >
                <option value="Restroom Sanitation">🚽 {t.catWashroom}</option>
                <option value="Overflowing Bins">🗑️ {t.catDustbin}</option>
                <option value="Spill / Liquid Stain">💧 {t.catSpill}</option>
                <option value="Chemical / Lab Hazard">🧪 {t.catChemical}</option>
                <option value="Broken Glass / Debris">⚠️ {t.catBrokenGlass}</option>
                <option value="Odor & Ventilation">💨 {t.catOdor}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t.urgencyLabel}
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as IncidentUrgency)}
                className={`w-full p-2.5 border-2 rounded-xl text-xs font-black cursor-pointer ${
                  urgency === "Emergency"
                    ? "bg-rose-50 text-rose-800 border-rose-400"
                    : urgency === "High"
                    ? "bg-amber-50 text-amber-800 border-amber-400"
                    : "bg-slate-50 text-slate-800 border-slate-300"
                }`}
              >
                <option value="Low">🟢 {t.urgencyLow}</option>
                <option value="Medium">🟡 {t.urgencyMedium}</option>
                <option value="High">🟠 {t.urgencyHigh}</option>
                <option value="Emergency">🔴 {t.urgencyEmergency}</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {t.detailsLabel}
            </label>
            <textarea
              rows={2}
              placeholder={t.detailsPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
            />
          </div>

          {/* Reporter Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t.yourNameLabel}
              </label>
              <input
                type="text"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {t.yourRoleLabel}
              </label>
              <select
                value={reporterRole}
                onChange={(e) => setReporterRole(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                <option value="Student">{t.roleStudent}</option>
                <option value="Faculty">{t.roleFaculty}</option>
                <option value="Staff">{t.roleStaff}</option>
                <option value="Campus Visitor">{t.roleVisitor}</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {t.actionCancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-black text-white bg-rose-600 hover:bg-rose-700 active:scale-95 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.actionSubmit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
