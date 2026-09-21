import React from "react";
import { UserCheck, Leaf } from "lucide-react";

interface CollegeHeroHeaderProps {
  onOpenReportModal?: () => void;
  onOpenQRModal?: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const CollegeHeroHeader: React.FC<CollegeHeroHeaderProps> = ({
  onOpenReportModal,
  onOpenQRModal,
  onNavigateToTab,
}) => {
  const teamMembers = [
    {
      name: "Karan Gavhane",
      rollNo: "Roll No: 25111030",
    },
    {
      name: "Mayur Ghode",
      rollNo: "Roll No: 25111012",
    },
    {
      name: "Vinayak Deokar",
      rollNo: "Roll No: 25111033",
    },
  ];

  return (
    <section className="pt-7 pb-5 px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-emerald-50/70 via-teal-50/30 to-transparent border-b border-emerald-100/60">
      <div className="max-w-5xl mx-auto">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 shadow-2xs mb-3">
          <Leaf className="w-4 h-4 text-emerald-800 fill-emerald-600/30" />
          <span className="text-[11px] sm:text-xs font-black tracking-wider text-emerald-950 uppercase">
            Campus Hygiene & Sanitation Initiative
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0f382c]">
          Cleaning Management System
        </h1>

        {/* Subtitle / College Name */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#136149] mt-2 max-w-3xl mx-auto">
          Government College of Engineering and Research, Avasari Khurd
        </p>

        {/* Project Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl mx-auto mt-5 text-left">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-center gap-3.5"
            >
              {/* User Avatar with Verification Checkmark */}
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-700 shadow-2xs">
                <UserCheck className="w-6 h-6 stroke-[2.2]" />
              </div>

              {/* Member Details */}
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug truncate">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {member.rollNo}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Action Buttons for Students & Cleaners */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>📢 Report Dirty Area / Issue</span>
          </button>

          <button
            onClick={onOpenQRModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <span>📱 Scan Room QR Code</span>
          </button>

          <button
            onClick={() => onNavigateToTab && onNavigateToTab("incidents")}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>📋 Track Live Complaints</span>
          </button>

          <button
            onClick={() => onNavigateToTab && onNavigateToTab("zones")}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            <span>🏫 Departments & Classrooms</span>
          </button>
        </div>
      </div>
    </section>
  );
};
