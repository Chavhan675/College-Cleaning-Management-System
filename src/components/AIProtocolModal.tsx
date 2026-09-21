import React, { useState } from "react";
import { 
  X, 
  Sparkles, 
  ShieldAlert, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Copy, 
  Check 
} from "lucide-react";
import { CleaningIncident } from "../types";

interface AIProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  incident: CleaningIncident | null;
}

export const AIProtocolModal: React.FC<AIProtocolModalProps> = ({
  isOpen,
  onClose,
  incident,
}) => {
  if (!isOpen || !incident || !incident.aiProtocol) return null;

  const protocol = incident.aiProtocol;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(protocol, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold">AI Hazard Triage & Decontamination Protocol</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-teal-800 text-teal-200 rounded">
                  {incident.ticketNumber}
                </span>
              </div>
              <p className="text-[11px] text-slate-300">{incident.title} ({incident.location})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          {/* Top Severity & Time Bar */}
          <div className="flex items-center justify-between p-3 bg-teal-50 border border-teal-200 rounded-xl">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 block">
                Evaluated Severity
              </span>
              <span className={`text-base font-extrabold ${
                protocol.assessedSeverity === "Critical" ? "text-rose-700" : "text-amber-700"
              }`}>
                {protocol.assessedSeverity} Hazard Level
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 block">
                Estimated Cleanup Time
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                ~{protocol.estimatedTimeMinutes} minutes
              </span>
            </div>
          </div>

          {/* Hazard Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-1">Campus EHS Hazard Assessment:</h4>
            <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 leading-relaxed">
              {protocol.hazardAssessment}
            </p>
          </div>

          {/* Warning notice */}
          {protocol.precautionAlert && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block">Safety Precaution Notice:</span>
                {protocol.precautionAlert}
              </div>
            </div>
          )}

          {/* Required PPE */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-teal-600" />
              Mandatory Personal Protective Equipment (PPE)
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {protocol.requiredPPE.map((ppe, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md font-medium">
                  🛡️ {ppe}
                </span>
              ))}
            </div>
          </div>

          {/* Recommended Cleaners */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
              Required Disinfectants / Neutralizers
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {protocol.recommendedCleaners.map((c, i) => (
                <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-md font-medium">
                  🧪 {c}
                </span>
              ))}
            </div>
          </div>

          {/* Action steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Step-by-Step Decontamination Procedure
            </h4>
            <ol className="space-y-1.5">
              {protocol.actionSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                    {idx + 1}
                  </span>
                  <span className="mt-0.5 text-slate-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Disposal */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-800 block mb-0.5">Disposal Guidelines:</span>
            <p className="text-slate-600">{protocol.disposalInstructions}</p>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied JSON" : "Copy SOP"}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors"
            >
              Close Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
