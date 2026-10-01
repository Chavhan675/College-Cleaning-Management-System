import React, { useState } from "react";
import { 
  Users, 
  UserCheck, 
  Clock, 
  Phone, 
  Star, 
  MapPin, 
  Search,
  CheckCircle2,
  PhoneCall,
  PlusCircle,
  Trash2,
  Crown
} from "lucide-react";
import { StaffMember, CampusZone, StaffStatus } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";

interface StaffTabProps {
  staff: StaffMember[];
  zones: CampusZone[];
  onUpdateStaffStatus: (staffId: string, status: StaffStatus) => void;
  onDispatchStaff: (staffId: string) => void;
  onOpenAddStaffModal?: () => void;
  onDeleteStaff?: (staffId: string) => void;
}

export const StaffTab: React.FC<StaffTabProps> = ({
  staff,
  zones,
  onUpdateStaffStatus,
  onDispatchStaff,
  onOpenAddStaffModal,
  onDeleteStaff,
}) => {
  const { lang, t } = useLanguage();
  const { isAdmin } = useAdmin();
  const [shiftFilter, setShiftFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = staff.filter((s) => {
    const matchesShift = shiftFilter === "All" || s.shift.includes(shiftFilter);
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.assignedBuilding.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesShift && matchesStatus && matchesSearch;
  });

  const onDutyCount = staff.filter((s) => s.status === "On Duty" || s.status === "Dispatched").length;

  return (
    <div className="space-y-4">
      {/* Admin Privilege Banner if Admin Mode is Active */}
      {isAdmin && (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold shadow-xs">
              <Crown className="w-5 h-5 fill-amber-600" />
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                {lang === "mr" ? "👑 ॲडमिन कर्मचारी व्यवस्थापन" : "👑 Admin Housekeeping Roster Management"}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium">
                {lang === "mr" ? "तुम्ही नवीन सफाई कर्मचारी नोंदवू शकता, पाळी बदलू शकता आणि संपर्क व्यवस्थापित करू शकता." : "You have permissions to hire, edit shifts, and dispatch campus cleaning crews."}
              </p>
            </div>
          </div>

          {onOpenAddStaffModal && (
            <button
              onClick={onOpenAddStaffModal}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === "mr" ? "+ नवीन कर्मचारी जोडा" : "+ Add Staff"}</span>
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {t.staffHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {t.staffSubheading}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={lang === "mr" ? "कर्मचाऱ्याचे नाव किंवा इमारत शोधा..." : "Search cleaner name, building..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {isAdmin && onOpenAddStaffModal && (
            <button
              onClick={onOpenAddStaffModal}
              className="sm:hidden p-2 bg-emerald-700 text-white rounded-xl shadow-xs"
              title="Add Staff"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Roster Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border-2 border-emerald-100 p-3.5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">
              {lang === "mr" ? "सध्याची पाळी (Shift)" : "Current Shift"}
            </span>
            <span className="text-sm font-black text-slate-900">
              {lang === "mr" ? "सकाळची पाळी (06:00 - 14:00)" : "Morning Shift (06:00 - 14:00)"}
            </span>
            <span className="text-xs text-emerald-600 font-bold block mt-0.5">
              ● {lang === "mr" ? "६ कर्मचारी कार्यरत" : "6 on duty now"}
            </span>
          </div>
          <Clock className="w-6 h-6 text-emerald-600 shrink-0" />
        </div>

        <div className="bg-white border-2 border-amber-100 p-3.5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">
              {lang === "mr" ? "हजर कर्मचारी" : "Active Staff"}
            </span>
            <span className="text-sm font-black text-slate-900">
              {onDutyCount} {lang === "mr" ? "कर्मचारी हजर" : "Staff Available"}
            </span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              {lang === "mr" ? "सर्व ७ विभागांमध्ये उपलब्ध" : "Covering all college sectors"}
            </span>
          </div>
          <Users className="w-6 h-6 text-amber-600 shrink-0" />
        </div>

        <div className="bg-white border-2 border-blue-100 p-3.5 rounded-2xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black text-blue-800 uppercase tracking-wider block">
              {lang === "mr" ? "थेट कॉलिंग सुविधा" : "Direct Calling"}
            </span>
            <span className="text-sm font-black text-slate-900">
              {lang === "mr" ? "मोबाईलवर १-क्लिक कॉल" : "1-Tap Direct Call"}
            </span>
            <span className="text-xs text-slate-500 font-medium block mt-0.5">
              {lang === "mr" ? "कोणत्याही फोनवरून काम करते" : "Works on any smartphone"}
            </span>
          </div>
          <PhoneCall className="w-6 h-6 text-blue-600 shrink-0" />
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredStaff.map((person) => {
          const isOnDuty = person.status === "On Duty";
          const isDispatched = person.status === "Dispatched";
          const isOffDuty = person.status === "Off Duty";

          return (
            <div
              key={person.id}
              className={`bg-white rounded-2xl border-2 p-4 shadow-xs flex flex-col justify-between ${
                isOnDuty ? "border-emerald-200" : isDispatched ? "border-sky-200" : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-900 font-black text-lg flex items-center justify-center shrink-0">
                      {person.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                          {person.name}
                        </h4>
                        {isAdmin && onDeleteStaff && (
                          <button
                            onClick={() => {
                              if (window.confirm(lang === "mr" ? `कर्मचारी ${person.name} काढून टाकायचा आहे का?` : `Remove cleaner ${person.name}?`)) {
                                onDeleteStaff(person.id);
                              }
                            }}
                            className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors"
                            title="Remove Staff"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <span className="text-xs font-bold text-emerald-800 block">
                        {person.role} • {person.badgeNumber}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={person.status}
                    onChange={(e) => onUpdateStaffStatus(person.id, e.target.value as StaffStatus)}
                    className="text-xs font-black px-2.5 py-1 rounded-lg border-2 border-slate-200 bg-slate-50 text-slate-800 cursor-pointer"
                  >
                    <option value="On Duty">🟢 {t.statusOnDuty}</option>
                    <option value="Dispatched">🏃 {t.statusDispatched}</option>
                    <option value="On Break">☕ {t.statusOnBreak}</option>
                    <option value="Off Duty">⚪ {t.statusOffDuty}</option>
                  </select>
                </div>

                {/* Details box */}
                <div className="mt-3.5 space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">
                      {lang === "mr" ? "नेमलेली इमारत:" : "Assigned Building:"}
                    </span>
                    <span className="font-bold text-slate-900">{person.assignedBuilding}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">{t.shiftLabel}:</span>
                    <span className="font-semibold text-slate-800">{person.shift}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">{t.tasksCompletedLabel}:</span>
                    <span className="font-black text-emerald-700">
                      {person.tasksCompletedToday} {lang === "mr" ? "कामे पूर्ण" : "done"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Call Now Button (Large Touch Target for Low-Literacy / Mobile) */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <a
                  href={`tel:${person.phone}`}
                  className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callNowBtn} ({person.phone})</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
