export type CleanlinessStatus = "Clean" | "Needs Cleaning" | "In Progress" | "Audit Required";

export interface CampusZone {
  id: string;
  name: string;
  code: string;
  building: string;
  floor: string;
  zoneType: "Classroom / Hall" | "Laboratory" | "Restroom / Sanitation" | "Cafeteria / Dining" | "Hostel / Residential" | "Library & Study" | "Corridor & Public" | "Auditorium & Sports";
  status: CleanlinessStatus;
  cleanlinessScore: number; // 0 to 100%
  lastCleaned: string;
  assignedStaffId?: string;
  assignedStaffName?: string;
  sqFootage: number;
  qrCodeId: string;
  urgentAlert?: string;
  nextScheduledCleaning: string;
  dustbinCount: number;
  restroomStalls?: number;
}

export type StaffStatus = "On Duty" | "Dispatched" | "On Break" | "Off Duty";
export type StaffRole = "Janitor" | "Lead Cleaner" | "Hazard Specialist" | "Floor Supervisor" | "EHS Sanitation Inspector";

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  shift: "Morning (06:00 - 14:00)" | "Afternoon (14:00 - 22:00)" | "Night (22:00 - 06:00)";
  assignedBuilding: string;
  assignedZoneIds: string[];
  status: StaffStatus;
  phone: string;
  tasksCompletedToday: number;
  rating: number;
  badgeNumber: string;
}

export type IncidentCategory = 
  | "Spill / Liquid Stain"
  | "Overflowing Bins"
  | "Restroom Sanitation"
  | "Chemical / Lab Hazard"
  | "Consumable Depletion"
  | "Broken Glass / Debris"
  | "Pest / Biohazard"
  | "Odor & Ventilation";

export type IncidentUrgency = "Low" | "Medium" | "High" | "Emergency";
export type IncidentStatus = "Pending" | "Assigned" | "In Progress" | "Resolved" | "Verified";

export interface AIProtocol {
  assessedSeverity: "Low" | "Medium" | "High" | "Critical";
  hazardAssessment: string;
  requiredPPE: string[];
  recommendedCleaners: string[];
  estimatedTimeMinutes: number;
  actionSteps: string[];
  disposalInstructions: string;
  precautionAlert: string;
}

export interface CleaningIncident {
  id: string;
  ticketNumber: string;
  title: string;
  location: string;
  zoneId?: string;
  building: string;
  category: IncidentCategory;
  urgency: IncidentUrgency;
  description: string;
  reporterName: string;
  reporterRole: "Student" | "Faculty" | "Staff" | "Campus Visitor" | "Sanitation Officer";
  reportedAt: string;
  status: IncidentStatus;
  assignedStaffId?: string;
  assignedStaffName?: string;
  resolvedAt?: string;
  resolutionNotes?: string;
  aiProtocol?: AIProtocol;
  rating?: number;
  ratingComment?: string;
  photoUrl?: string;
}

export interface AuditCheckItem {
  id: string;
  title: string;
  category: "Floors & Surfaces" | "Disinfection & Touchpoints" | "Waste Segregation" | "Consumables & Dispensers" | "Odor & Air Quality";
  passed: boolean;
  score: number; // 0 to 10
  notes: string;
}

export interface InspectionAudit {
  id: string;
  auditNumber: string;
  zoneId: string;
  zoneName: string;
  building: string;
  auditorName: string;
  auditorRole: string;
  timestamp: string;
  overallScore: number; // 0 to 100
  status: "Passed (Grade A)" | "Satisfactory (Grade B)" | "Needs Improvement (Grade C)" | "Failed - Re-clean Required";
  items: AuditCheckItem[];
  supervisorSignOff: string;
  notes: string;
  followUpDeadline?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: "Disinfectants & Chemicals" | "PPE & Safety Gear" | "Cleaning Equipment" | "Waste Bags & Liners" | "Washroom Consumables";
  currentStock: number;
  unit: string;
  minThreshold: number;
  storageLocation: string;
  lastRestocked: string;
  status: "Adequate" | "Low Stock" | "Critical / Order Placed";
}

export interface CampusStats {
  cleanlinessIndex: number; // e.g. 91%
  activeIncidentsCount: number;
  emergencyIncidentsCount: number;
  staffOnDutyCount: number;
  auditsCompletedToday: number;
  wasteDivertedPercent: number;
}
