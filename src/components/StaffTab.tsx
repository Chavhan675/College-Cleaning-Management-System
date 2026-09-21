import React, { useState } from "react";
import { 
  Users, 
  UserCheck, 
  Clock, 
  Phone, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Plus, 
  Filter, 
  Search,
  CheckCircle2,
  CalendarDays
} from "lucide-react";
import { StaffMember, CampusZone, StaffStatus } from "../types";

interface StaffTabProps {
  staff: StaffMember[];
  zones: CampusZone[];
  onUpdateStaffStatus: (staffId: string, status: StaffStatus) => void;
  onDispatchStaff: (staffId: string) => void;
}

export const StaffTab: React.FC<StaffTabProps> = ({
  staff,
  zones,
  onUpdateStaffStatus,
  onDispatchStaff,
}) => {
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
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Janitorial Staff & Shift Rosters</h2>
          <p className="text-xs text-slate-500">
            Real-time crew deployment, shift monitoring, direct dispatching, and housekeeping attendance
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search staff, role, building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
          />
        </div>
      </div>

      {/* Shifts Summary Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Active Shift
            </span>
            <span className="text-sm font-bold text-slate-900">Morning Shift (06:00 - 14:00)</span>
            <span className="text-[11px] text-emerald-600 font-medium block mt-0.5">
              ● In Progress • 6 on duty
            </span>
          </div>
          <Clock className="w-6 h-6 text-slate-400" />
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Total Active Crew
            </span>
            <span className="text-sm font-bold text-slate-900">{onDutyCount} Cleaners Active</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Covering all 7 campus sectors
            </span>
          </div>
          <Users className="w-6 h-6 text-teal-600" />
        </div>

        <div className="bg-white border border-slate-200 p-3.5 rounded-xl shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Shift Supervisors
            </span>
            <span className="text-sm font-bold text-slate-900">Anita Roy & Dr. A. Joshi</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              EHS & Housekeeping Desk
            </span>
          </div>
          <ShieldCheck className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[11px] font-semibold text-slate-400">Shift:</span>
        {["All", "Morning", "Afternoon", "Night"].map((shift) => (
          <button
            key={shift}
            onClick={() => setShiftFilter(shift)}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              shiftFilter === shift
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {shift}
          </button>
        ))}

        <span className="text-[11px] font-semibold text-slate-400 ml-2">Status:</span>
        {["All", "On Duty", "Dispatched", "On Break", "Off Duty"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              statusFilter === st
                ? "bg-teal-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((person) => {
          const isOnDuty = person.status === "On Duty";
          const isDispatched = person.status === "Dispatched";
          const isOffDuty = person.status === "Off Duty";

          // Find zones assigned to this staff
          const assignedZonesList = zones.filter((z) => z.assignedStaffId === person.id);

          return (
            <div
              key={person.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-800 text-sm">
                      {person.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{person.name}</h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {person.badgeNumber}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-teal-700 block">
                        {person.role}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={person.status}
                    onChange={(e) => onUpdateStaffStatus(person.id, e.target.value as StaffStatus)}
                    className={`text-[10px] font-bold px-2 py-0.8 rounded-full border focus:outline-none ${
                      isOnDuty
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : isDispatched
                        ? "bg-sky-50 text-sky-700 border-sky-200"
                        : isOffDuty
                        ? "bg-slate-100 text-slate-600 border-slate-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    <option value="On Duty">On Duty</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="On Break">On Break</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>

                {/* Details */}
                <div className="mt-3.5 space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Assigned Building:</span>
                    <span className="font-semibold text-slate-800">{person.assignedBuilding}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Shift:</span>
                    <span className="font-medium text-slate-700">{person.shift}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Tasks Today:</span>
                    <span className="font-semibold text-emerald-700">
                      {person.tasksCompletedToday} completed
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-[11px]">Rating:</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {person.rating} / 5.0
                    </span>
                  </div>
                </div>

                {/* Assigned Zones tags */}
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Direct Zone Coverage ({assignedZonesList.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {assignedZonesList.length > 0 ? (
                      assignedZonesList.map((z) => (
                        <span
                          key={z.id}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] text-slate-700"
                        >
                          {z.code}
                        </span>
                      ))
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No specific zone locked (floating/campus wide)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${person.phone}`}
                  className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{person.phone}</span>
                </a>

                <button
                  onClick={() => onDispatchStaff(person.id)}
                  disabled={isOffDuty}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    isOffDuty
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white shadow-2xs"
                  }`}
                >
                  Dispatch
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
