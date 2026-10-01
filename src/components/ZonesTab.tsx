import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  QrCode, 
  Search, 
  Filter, 
  UserCheck,
  Check,
  PlusCircle,
  Trash2,
  Crown
} from "lucide-react";
import { CampusZone, StaffMember } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";

interface ZonesTabProps {
  zones: CampusZone[];
  staff: StaffMember[];
  onMarkCleaned: (zoneId: string) => void;
  onAssignStaff: (zoneId: string, staffId: string) => void;
  onRequestCleaning: (zone: CampusZone) => void;
  onScanQR: (zoneCode: string) => void;
  onOpenAddZoneModal?: () => void;
  onDeleteZone?: (zoneId: string) => void;
}

export const ZonesTab: React.FC<ZonesTabProps> = ({
  zones,
  staff,
  onMarkCleaned,
  onAssignStaff,
  onRequestCleaning,
  onScanQR,
  onOpenAddZoneModal,
  onDeleteZone,
}) => {
  const { lang, t } = useLanguage();
  const { isAdmin } = useAdmin();
  const [selectedBuilding, setSelectedBuilding] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const buildings = ["All", ...Array.from(new Set(zones.map((z) => z.building)))];

  const filteredZones = zones.filter((zone) => {
    const matchesBuilding = selectedBuilding === "All" || zone.building === selectedBuilding;
    const matchesStatus = selectedStatus === "All" || zone.status === selectedStatus;
    const matchesSearch = 
      zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.building.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zone.zoneType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBuilding && matchesStatus && matchesSearch;
  });

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
                {lang === "mr" ? "👑 ॲडमिन नियंत्रण कक्ष (Admin Privilege Active)" : "👑 Admin Campus Zone Manager"}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium">
                {lang === "mr" ? "तुम्हाला नवीन वर्गखोल्या, लॅब किंवा वॉशरुम जोडण्याची व बदलण्याची पूर्ण परवानगी आहे." : "You have full access to add, assign, and manage college facilities."}
              </p>
            </div>
          </div>

          {onOpenAddZoneModal && (
            <button
              onClick={onOpenAddZoneModal}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === "mr" ? "+ नवीन वर्ग जोडा" : "+ Add Classroom"}</span>
            </button>
          )}
        </div>
      )}

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {t.zonesHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {t.zonesSubheading}
          </p>
        </div>

        {/* Search & Admin Quick Add Button */}
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={t.actionSearch}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-400 shadow-2xs font-medium"
            />
          </div>

          {isAdmin && onOpenAddZoneModal && (
            <button
              onClick={onOpenAddZoneModal}
              className="md:hidden p-2.5 bg-emerald-700 text-white rounded-xl shadow-xs"
              title="Add Zone"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Building Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1 shrink-0 mr-1">
          <Building2 className="w-3.5 h-3.5" /> {lang === "mr" ? "इमारत:" : "Building:"}
        </span>
        {buildings.map((bldg) => (
          <button
            key={bldg}
            onClick={() => setSelectedBuilding(bldg)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-bold transition-all cursor-pointer ${
              selectedBuilding === bldg
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {bldg === "All" ? (lang === "mr" ? "सर्व इमारती" : "All Buildings") : bldg}
          </button>
        ))}
      </div>

      {/* Clean vs Dirty Quick Filters */}
      <div className="flex items-center gap-2 text-xs flex-wrap">
        <button
          onClick={() => setSelectedStatus("All")}
          className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
            selectedStatus === "All"
              ? "bg-slate-800 text-white"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          {lang === "mr" ? "सर्व जागा" : "All Zones"} ({zones.length})
        </button>
        <button
          onClick={() => setSelectedStatus("Needs Cleaning")}
          className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1 ${
            selectedStatus === "Needs Cleaning"
              ? "bg-rose-600 text-white"
              : "bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100"
          }`}
        >
          <span>⚠️ {lang === "mr" ? "स्वच्छता हवी" : "Needs Cleaning"}</span>
          <span>({zones.filter((z) => z.status === "Needs Cleaning").length})</span>
        </button>
        <button
          onClick={() => setSelectedStatus("Clean")}
          className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1 ${
            selectedStatus === "Clean"
              ? "bg-emerald-700 text-white"
              : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
          }`}
        >
          <span>✅ {lang === "mr" ? "स्वच्छ जागा" : "Clean"}</span>
          <span>({zones.filter((z) => z.status === "Clean").length})</span>
        </button>
      </div>

      {/* Grid of Classrooms / Zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZones.map((zone) => {
          const isClean = zone.status === "Clean";
          const needsClean = zone.status === "Needs Cleaning";

          return (
            <div
              key={zone.id}
              className={`bg-white rounded-2xl border-2 p-4 shadow-xs transition-all flex flex-col justify-between ${
                needsClean
                  ? "border-rose-300 ring-2 ring-rose-100"
                  : isClean
                  ? "border-emerald-200"
                  : "border-slate-200"
              }`}
            >
              <div>
                {/* Zone Code & Cleanliness Badge */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {zone.code}
                      </span>
                      {isAdmin && onDeleteZone && (
                        <button
                          onClick={() => {
                            if (window.confirm(lang === "mr" ? `हा वर्ग (${zone.code}) काढून टाकायचा आहे का?` : `Delete room ${zone.code}?`)) {
                              onDeleteZone(zone.id);
                            }
                          }}
                          className="p-1 text-slate-300 hover:text-rose-600 rounded transition-colors"
                          title="Delete Zone (Admin Only)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <h3 className="text-base font-black text-slate-900 mt-1 leading-snug">
                      {zone.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{zone.building} • {zone.floor}</span>
                    </p>
                  </div>

                  {/* Cleanliness Meter */}
                  <div className="text-right shrink-0">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${
                      zone.cleanlinessScore >= 80
                        ? "bg-emerald-100 text-emerald-800"
                        : zone.cleanlinessScore >= 60
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {zone.cleanlinessScore}% {t.percentClean}
                    </span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">
                      {isClean ? t.statusClean : t.statusNeedsCleaning}
                    </span>
                  </div>
                </div>

                {/* Urgent Alert Banner if flagged */}
                {zone.urgentAlert && (
                  <div className="mb-3 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span className="truncate">{zone.urgentAlert}</span>
                  </div>
                )}

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold">
                      {t.lastCleanedText}
                    </span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      {zone.lastCleaned}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold">
                      {t.assignedStaffText}
                    </span>
                    <span className="font-semibold text-slate-800 mt-0.5 block truncate">
                      {zone.assignedStaffName || (lang === "mr" ? "नियुक्त नाही" : "Unassigned")}
                    </span>
                  </div>
                </div>

                {/* Staff Assignment (Active if Admin) */}
                {isAdmin && (
                  <div className="mb-3 p-2 bg-amber-50/70 border border-amber-200 rounded-xl text-xs flex items-center justify-between gap-1">
                    <span className="text-[11px] font-bold text-amber-900">
                      {lang === "mr" ? "कर्मचारी बदला:" : "Assign Cleaner:"}
                    </span>
                    <select
                      value={zone.assignedStaffId || ""}
                      onChange={(e) => onAssignStaff(zone.id, e.target.value)}
                      className="text-xs bg-white border border-amber-300 rounded-lg px-2 py-0.5 font-bold text-slate-800 cursor-pointer"
                    >
                      <option value="">{lang === "mr" ? "-- कर्मचारी निवडा --" : "-- Choose Staff --"}</option>
                      {staff.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} ({st.role})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                {/* QR Code */}
                <button
                  onClick={() => onScanQR(zone.code)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors cursor-pointer"
                  title={t.doorQrBtn}
                >
                  <QrCode className="w-4 h-4" />
                </button>

                {/* Report Dirty Button */}
                <button
                  onClick={() => onRequestCleaning(zone)}
                  className="px-3 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
                >
                  {t.actionReportIssue}
                </button>

                {/* Mark as Cleaned Button (Primary) */}
                <button
                  onClick={() => onMarkCleaned(zone.id)}
                  className={`flex-1 py-2 px-3 text-xs sm:text-sm font-black rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer ${
                    isClean
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isClean ? (lang === "mr" ? "पुन्हा स्वच्छ करा" : "Re-clean") : t.actionMarkCleaned}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredZones.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-slate-500 text-sm font-medium">
            {lang === "mr" ? "कोणतीही जागा सापडली नाही." : "No matching rooms or zones found."}
          </p>
          <button
            onClick={() => { setSelectedBuilding("All"); setSelectedStatus("All"); setSearchQuery(""); }}
            className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
          >
            {lang === "mr" ? "सर्व फिल्टर्स काढा" : "Clear Filters"}
          </button>
        </div>
      )}
    </div>
  );
};
