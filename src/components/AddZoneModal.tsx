import React, { useState } from "react";
import { X, Building2, Plus, CheckCircle2 } from "lucide-react";
import { CampusZone, StaffMember } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface AddZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  staff: StaffMember[];
  onAddZone: (newZone: CampusZone) => void;
}

export const AddZoneModal: React.FC<AddZoneModalProps> = ({
  isOpen,
  onClose,
  staff,
  onAddZone,
}) => {
  if (!isOpen) return null;
  const { lang } = useLanguage();

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [building, setBuilding] = useState("Mechanical Engineering Building");
  const [floor, setFloor] = useState("1st Floor");
  const [zoneType, setZoneType] = useState<CampusZone["zoneType"]>("Classroom / Hall");
  const [assignedStaffId, setAssignedStaffId] = useState("");
  const [sqFootage, setSqFootage] = useState("1200");
  const [dustbinCount, setDustbinCount] = useState("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) return;

    const matchedStaff = staff.find((s) => s.id === assignedStaffId);

    const newZone: CampusZone = {
      id: `zone-${Date.now()}`,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      building,
      floor,
      zoneType,
      status: "Clean",
      cleanlinessScore: 100,
      lastCleaned: "Just now (" + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + ")",
      nextScheduledCleaning: "Tomorrow at 07:00 AM",
      assignedStaffId: assignedStaffId || undefined,
      assignedStaffName: matchedStaff ? `${matchedStaff.name} (${matchedStaff.role})` : undefined,
      sqFootage: Number(sqFootage) || 1000,
      dustbinCount: Number(dustbinCount) || 2,
      qrCodeId: `QR-${code.trim().toUpperCase()}`,
    };

    onAddZone(newZone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0f382c] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {lang === "mr" ? "नवीन वर्गखोली / लॅब जोडा" : "Add New Campus Classroom / Zone"}
              </h3>
              <p className="text-xs text-emerald-200">
                {lang === "mr" ? "ॲडमिन अधिकार: आकाश चव्हाण" : "Admin Access Only"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "खोली कोड (Code) *" : "Room Code *"}
              </label>
              <input
                type="text"
                required
                placeholder="उदा. COMP-302"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold uppercase"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "प्रकार (Zone Type)" : "Zone Type"}
              </label>
              <select
                value={zoneType}
                onChange={(e) => setZoneType(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
              >
                <option value="Classroom / Hall">{lang === "mr" ? "वर्गखोली (Classroom)" : "Classroom / Hall"}</option>
                <option value="Laboratory">{lang === "mr" ? "प्रयोगशाळा (Laboratory)" : "Laboratory"}</option>
                <option value="Restroom / Sanitation">{lang === "mr" ? "स्वच्छतागृह (Restroom)" : "Restroom / Sanitation"}</option>
                <option value="Cafeteria / Dining">{lang === "mr" ? "कॅन्टीन (Cafeteria)" : "Cafeteria / Dining"}</option>
                <option value="Library & Study">{lang === "mr" ? "ग्रंथालय (Library)" : "Library & Study"}</option>
                <option value="Corridor & Public">{lang === "mr" ? "पायऱ्या व कॉरिडॉर" : "Corridor & Public"}</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {lang === "mr" ? "खोलीचे / लॅबचे संपूर्ण नाव *" : "Full Room / Lab Name *"}
            </label>
            <input
              type="text"
              required
              placeholder={lang === "mr" ? "उदा. AI & Machine Learning Lab" : "e.g. CAD/CAM Design Studio"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "इमारत (Building)" : "Building"}
              </label>
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
              >
                <option value="Mechanical Engineering Building">Mechanical Engg. Building</option>
                <option value="Computer & IT Block">Computer & IT Block</option>
                <option value="Electronics & Telecom Complex">E&TC Complex</option>
                <option value="Instrumentation & Control Wing">Instrumentation Wing</option>
                <option value="Main Administrative Complex">Main Administrative Complex</option>
                <option value="Central Library & Reading Hall">Central Library</option>
                <option value="Boys Hostel & Residential">Boys Hostel</option>
                <option value="Girls Hostel & Residential">Girls Hostel</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "मजला (Floor)" : "Floor"}
              </label>
              <input
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {lang === "mr" ? "सफाई कर्मचारी नेमणूक" : "Assign Cleaning Staff"}
            </label>
            <select
              value={assignedStaffId}
              onChange={(e) => setAssignedStaffId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
            >
              <option value="">{lang === "mr" ? "-- कर्मचारी निवडा (ऐच्छिक) --" : "-- Choose Staff (Optional) --"}</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.role} - {s.shift})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {lang === "mr" ? "रद्द करा" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-black text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === "mr" ? "+ वर्ग जोडा" : "Save Room"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
