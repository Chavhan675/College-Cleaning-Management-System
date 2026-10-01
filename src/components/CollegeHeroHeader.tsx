import React from "react";
import { 
  UserCheck, 
  Leaf, 
  AlertTriangle, 
  Sparkles, 
  QrCode, 
  PhoneCall, 
  Languages, 
  CheckCircle2,
  Users
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

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
  const { lang, toggleLang, t } = useLanguage();

  const teamMembers = [
    {
      name: "करण गव्हाणे (Karan Gavhane)",
      rollNo: "Roll No: 25111030",
    },
    {
      name: "मयूर घोडे (Mayur Ghode)",
      rollNo: "Roll No: 25111012",
    },
    {
      name: "विनायक देवकर (Vinayak Deokar)",
      rollNo: "Roll No: 25111033",
    },
  ];

  return (
    <section className="pt-5 pb-6 px-3 sm:px-6 lg:px-8 text-center bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-transparent border-b border-emerald-100/70">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-2xs text-[11px] sm:text-xs font-black">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.collegeSubtitle}</span>
          </div>

          <button
            onClick={toggleLang}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === "mr" ? "English Version" : "मराठी आवृत्ती"}</span>
          </button>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f382c]">
          {t.heroHeading}
        </h1>

        {/* College Name & Description */}
        <p className="text-sm sm:text-base md:text-lg font-bold text-[#136149] mt-1.5 max-w-3xl mx-auto">
          {t.collegeName}
        </p>
        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl mx-auto">
          {t.heroSubheading}
        </p>

        {/* 4 BIG FRIENDLY TOUCH CARDS FOR ALL USERS (Educated & Less-Educated Cleaners) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 text-left">
          
          {/* Card 1: Report Dirty Area (Red Accent) */}
          <button
            onClick={onOpenReportModal}
            className="bg-white hover:bg-rose-50/50 border-2 border-rose-200 hover:border-rose-400 p-4 rounded-2xl shadow-xs transition-all flex flex-col justify-between text-left group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-black text-xl shadow-2xs group-hover:scale-105 transition-transform">
                <AlertTriangle className="w-6 h-6 text-rose-600 stroke-[2.5]" />
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
                {lang === "mr" ? "१ क्लिक तक्रार" : "1 Click Report"}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-rose-950 leading-tight">
                {t.cardReportTitle}
              </h3>
              <p className="text-xs text-rose-800/80 font-medium mt-1">
                {t.cardReportDesc}
              </p>
            </div>
          </button>

          {/* Card 2: Mark Cleaned (Green Accent for Cleaners) */}
          <button
            onClick={() => onNavigateToTab && onNavigateToTab("zones")}
            className="bg-white hover:bg-emerald-50/50 border-2 border-emerald-200 hover:border-emerald-400 p-4 rounded-2xl shadow-xs transition-all flex flex-col justify-between text-left group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-xl shadow-2xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-emerald-700 stroke-[2.5]" />
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                {lang === "mr" ? "कर्मचाऱ्यांसाठी" : "For Cleaners"}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-emerald-950 leading-tight">
                {t.cardCleanedTitle}
              </h3>
              <p className="text-xs text-emerald-800/80 font-medium mt-1">
                {t.cardCleanedDesc}
              </p>
            </div>
          </button>

          {/* Card 3: Scan Door QR Tag (Blue Accent) */}
          <button
            onClick={onOpenQRModal}
            className="bg-white hover:bg-blue-50/50 border-2 border-blue-200 hover:border-blue-400 p-4 rounded-2xl shadow-xs transition-all flex flex-col justify-between text-left group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xl shadow-2xs group-hover:scale-105 transition-transform">
                <QrCode className="w-6 h-6 text-blue-700 stroke-[2.5]" />
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {lang === "mr" ? "कॅमेरा स्कॅन" : "Camera QR"}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-blue-950 leading-tight">
                {t.cardScanTitle}
              </h3>
              <p className="text-xs text-blue-800/80 font-medium mt-1">
                {t.cardScanDesc}
              </p>
            </div>
          </button>

          {/* Card 4: Direct Phone Call to Cleaning Staff (Teal Accent) */}
          <button
            onClick={() => onNavigateToTab && onNavigateToTab("staff")}
            className="bg-white hover:bg-amber-50/50 border-2 border-amber-200 hover:border-amber-400 p-4 rounded-2xl shadow-xs transition-all flex flex-col justify-between text-left group cursor-pointer active:scale-98"
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-xl shadow-2xs group-hover:scale-105 transition-transform">
                <PhoneCall className="w-6 h-6 text-amber-700 stroke-[2.5]" />
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                {lang === "mr" ? "थेट संपर्क" : "Direct Phone"}
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-950 leading-tight">
                {t.cardCallTitle}
              </h3>
              <p className="text-xs text-amber-800/80 font-medium mt-1">
                {t.cardCallDesc}
              </p>
            </div>
          </button>

        </div>

        {/* Project Contributors Section */}
        <div className="mt-6 pt-4 border-t border-emerald-100">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-900 mb-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>{lang === "mr" ? "महाविद्यालयीन प्रकल्प कार्यसंघ (Project Team)" : "College Project Team"}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-3xl mx-auto text-left">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs flex items-center gap-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 text-emerald-700 font-bold text-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {member.name}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {member.rollNo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
