import React, { useState } from "react";
import { X, UserPlus, CheckCircle2, User, Phone, Star } from "lucide-react";
import { StaffMember, CleaningIncident } from "../types";

interface AssignStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: CleaningIncident | null;
  staff: StaffMember[];
  onConfirmAssign: (incidentId: string, staffId: string) => void;
}

export const AssignStaffModal: React.FC<AssignStaffModalProps> = ({
  isOpen,
  onClose,
  incident,
  staff,
  onConfirmAssign,
}) => {
  if (!isOpen || !incident) return null;

  const [selectedStaffId, setSelectedStaffId] = useState<string>(
    incident.assignedStaffId || staff[0]?.id || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStaffId) {
      onConfirmAssign(incident.id, selectedStaffId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Dispatch Housekeeping Staff</h3>
              <p className="text-[11px] text-slate-300">Ticket: {incident.ticketNumber}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="font-bold text-slate-800 block text-xs">{incident.title}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">{incident.location}</span>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Select On-Duty Staff Member:</label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {staff.map((st) => {
                const isSelected = selectedStaffId === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStaffId(st.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "bg-teal-50 border-teal-500 ring-1 ring-teal-400/30"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-800 text-xs">
                        {st.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{st.name}</div>
                        <div className="text-[11px] text-slate-500">{st.role} • {st.shift.split(" ")[0]}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        st.status === "On Duty"
                          ? "bg-emerald-100 text-emerald-800"
                          : st.status === "Dispatched"
                          ? "bg-sky-100 text-sky-800"
                          : "bg-slate-100 text-slate-600"
                      }`}>
                        {st.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Dispatch</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
