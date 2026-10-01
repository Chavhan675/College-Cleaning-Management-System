import React, { useState } from "react";
import { X, Users, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import { StaffMember, StaffRole, StaffStatus } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (newStaff: StaffMember) => void;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  onClose,
  onAddStaff,
}) => {
  if (!isOpen) return null;
  const { lang } = useLanguage();

  const [name, setName] = useState("");
  const [role, setRole] = useState<StaffRole>("Janitor");
  const [phone, setPhone] = useState("+91 ");
  const [shift, setShift] = useState<StaffMember["shift"]>("Morning (06:00 - 14:00)");
  const [assignedBuilding, setAssignedBuilding] = useState("Computer & IT Block");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStaff: StaffMember = {
      id: `staff-${Date.now()}`,
      name: name.trim(),
      role,
      shift,
      assignedBuilding,
      assignedZoneIds: [],
      status: "On Duty",
      phone: phone.trim() || "+91 98000 00000",
      tasksCompletedToday: 0,
      rating: 5.0,
      badgeNumber: `GC-JAN-${Math.floor(10 + Math.random() * 90)}`,
    };

    onAddStaff(newStaff);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-[#0f382c] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {lang === "mr" ? "नवीन सफाई कर्मचारी जोडा" : "Add Cleaning Staff Member"}
              </h3>
              <p className="text-xs text-emerald-200">
                {lang === "mr" ? "ॲडमिन अधिकार: आकाश चव्हाण" : "Admin Roster Management"}
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
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {lang === "mr" ? "कर्मचाऱ्याचे पूर्ण नाव *" : "Cleaner's Full Name *"}
            </label>
            <input
              type="text"
              required
              placeholder={lang === "mr" ? "उदा. रमेश पाटील" : "e.g. Ramesh Patil"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "पद (Role)" : "Role / Designation"}
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
              >
                <option value="Janitor">{lang === "mr" ? "सफाई कामगार (Janitor)" : "Janitor"}</option>
                <option value="Lead Cleaner">{lang === "mr" ? "मुख्य सफाई कामगार (Lead)" : "Lead Cleaner"}</option>
                <option value="Floor Supervisor">{lang === "mr" ? "मजला पर्यवेक्षक (Supervisor)" : "Floor Supervisor"}</option>
                <option value="Hazard Specialist">{lang === "mr" ? "केमिकल / लॅब तज्ज्ञ" : "Hazard Specialist"}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "मोबाईल नंबर (Phone) *" : "Phone Number *"}
              </label>
              <input
                type="text"
                required
                placeholder="+91 98220 12345"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "पाळी (Shift)" : "Shift"}
              </label>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
              >
                <option value="Morning (06:00 - 14:00)">Morning (06:00 - 14:00)</option>
                <option value="Afternoon (14:00 - 22:00)">Afternoon (14:00 - 22:00)</option>
                <option value="Night (22:00 - 06:00)">Night (22:00 - 06:00)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "नेमलेली इमारत" : "Assigned Building"}
              </label>
              <select
                value={assignedBuilding}
                onChange={(e) => setAssignedBuilding(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
              >
                <option value="Computer & IT Block">Computer & IT Block</option>
                <option value="Mechanical Engineering Building">Mechanical Engg. Complex</option>
                <option value="Main Administrative Complex">Main Administrative Complex</option>
                <option value="Electronics & Telecom Complex">E&TC Complex</option>
                <option value="Hostel & Residential Sector">Hostel Sector</option>
              </select>
            </div>
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
              <span>{lang === "mr" ? "+ कर्मचारी नोंदवा" : "Save Staff"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
