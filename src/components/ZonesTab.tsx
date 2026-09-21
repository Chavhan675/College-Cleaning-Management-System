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
  Trash2, 
  Droplet,
  UserCheck,
  RefreshCw,
  Plus
} from "lucide-react";
import { CampusZone, StaffMember } from "../types";

interface ZonesTabProps {
  zones: CampusZone[];
  staff: StaffMember[];
  onMarkCleaned: (zoneId: string) => void;
  onAssignStaff: (zoneId: string, staffId: string) => void;
  onRequestCleaning: (zone: CampusZone) => void;
  onScanQR: (zoneCode: string) => void;
}

export const ZonesTab: React.FC<ZonesTabProps> = ({
  zones,
  staff,
  onMarkCleaned,
  onAssignStaff,
  onRequestCleaning,
  onScanQR,
}) => {
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
    <div className="space-y-5">
      {/* Top Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Campus Facilities & Cleaning Zones</h2>
          <p className="text-xs text-slate-500">
            Monitor real-time hygiene, scheduled cleaning intervals, and assigned sanitation staff across university buildings
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search lab, restroom, hall, QR..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Building Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-1">
          <Building2 className="w-3.5 h-3.5" /> Building:
        </span>
        {buildings.map((bldg) => (
          <button
            key={bldg}
            onClick={() => setSelectedBuilding(bldg)}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-all ${
              selectedBuilding === bldg
                ? "bg-slate-900 text-white font-semibold shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {bldg}
          </button>
        ))}
      </div>

      {/* Status Filter */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Status:
        </span>
        {["All", "Clean", "Needs Cleaning", "In Progress", "Audit Required"].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-2.5 py-0.8 rounded-md font-medium text-[11px] transition-colors ${
              selectedStatus === st
                ? "bg-teal-100 text-teal-800 font-semibold"
                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {st}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-slate-400">
          Showing {filteredZones.length} of {zones.length} zones
        </span>
      </div>

      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredZones.map((zone) => {
          const isClean = zone.status === "Clean";
          const isNeedsCleaning = zone.status === "Needs Cleaning";
          const isInProgress = zone.status === "In Progress";
          const isAuditReq = zone.status === "Audit Required";

          return (
            <div
              key={zone.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        {zone.code}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {zone.zoneType}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">{zone.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{zone.building} • {zone.floor}</span>
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                      isClean
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isNeedsCleaning
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : isInProgress
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {zone.status}
                  </span>
                </div>

                {/* Urgent Warning if any */}
                {zone.urgentAlert && (
                  <div className="mt-2.5 p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500 mt-0.5" />
                    <span className="font-medium">{zone.urgentAlert}</span>
                  </div>
                )}

                {/* Cleanliness Meter */}
                <div className="mt-3.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500 font-medium">Cleanliness Compliance</span>
                    <span className={`font-bold ${
                      zone.cleanlinessScore >= 85 ? "text-emerald-600" : zone.cleanlinessScore >= 70 ? "text-amber-600" : "text-rose-600"
                    }`}>
                      {zone.cleanlinessScore}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        zone.cleanlinessScore >= 85 ? "bg-emerald-500" : zone.cleanlinessScore >= 70 ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${zone.cleanlinessScore}%` }}
                    />
                  </div>
                </div>

                {/* Meta details */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
                  <div>
                    <span className="text-slate-400 block">Last Sanitized</span>
                    <span className="font-medium text-slate-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {zone.lastCleaned}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Next Sweep</span>
                    <span className="font-medium text-slate-700 mt-0.5 block">{zone.nextScheduledCleaning}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Waste Bins</span>
                    <span className="font-medium text-slate-700 mt-0.5 block">
                      {zone.dustbinCount} segregated bins
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Floor Area</span>
                    <span className="font-medium text-slate-700 mt-0.5 block">{zone.sqFootage} sq.ft</span>
                  </div>
                </div>

                {/* Assigned Cleaner selector */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-slate-400" /> Assigned Crew:
                    </span>
                    <select
                      value={zone.assignedStaffId || ""}
                      onChange={(e) => onAssignStaff(zone.id, e.target.value)}
                      className="text-[11px] bg-white border border-slate-200 rounded px-2 py-0.5 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
                    >
                      <option value="">-- Unassigned --</option>
                      {staff.map((st) => (
                        <option key={st.id} value={st.id}>
                          {st.name} ({st.role})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                <button
                  onClick={() => onScanQR(zone.code)}
                  className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1 border border-slate-200"
                  title="Door / Room QR Code"
                >
                  <QrCode className="w-3.5 h-3.5 text-slate-500" />
                  <span>Room QR</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onRequestCleaning(zone)}
                    className="px-2.5 py-1 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors"
                  >
                    Report Dirty
                  </button>

                  <button
                    onClick={() => onMarkCleaned(zone.id)}
                    className={`px-3 py-1 text-xs font-semibold rounded-md shadow-2xs transition-colors flex items-center gap-1 ${
                      isClean
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isClean ? "Re-clean" : "Mark Cleaned"}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredZones.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
          <p className="text-slate-500 text-sm">No campus zones match your current filters.</p>
          <button
            onClick={() => { setSelectedBuilding("All"); setSelectedStatus("All"); setSearchQuery(""); }}
            className="mt-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
