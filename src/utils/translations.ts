export type AppLanguage = "mr" | "en";

export interface Translations {
  // App branding & header
  appTitle: string;
  collegeName: string;
  collegeSubtitle: string;
  projectTeam: string;
  campusHygieneMeter: string;
  percentClean: string;
  doorQrBtn: string;
  reportDirtyBtn: string;
  resetBtnTitle: string;
  langToggle: string;

  // Tabs
  tabOverview: string;
  tabIncidents: string;
  tabZones: string;
  tabStaff: string;
  tabAudits: string;
  tabInventory: string;
  tabAIAdvisor: string;

  // Hero Quick Cards (for low-literacy & all users)
  heroHeading: string;
  heroSubheading: string;
  cardReportTitle: string;
  cardReportDesc: string;
  cardCleanedTitle: string;
  cardCleanedDesc: string;
  cardScanTitle: string;
  cardScanDesc: string;
  cardCallTitle: string;
  cardCallDesc: string;

  // Statuses
  statusClean: string;
  statusNeedsCleaning: string;
  statusInProgress: string;
  statusAuditRequired: string;
  statusPending: string;
  statusAssigned: string;
  statusResolved: string;
  statusVerified: string;
  statusOnDuty: string;
  statusDispatched: string;
  statusOnBreak: string;
  statusOffDuty: string;

  // Actions
  actionMarkCleaned: string;
  actionReportIssue: string;
  actionScanQR: string;
  actionCallStaff: string;
  actionAssignStaff: string;
  actionViewDetails: string;
  actionSubmit: string;
  actionCancel: string;
  actionClose: string;
  actionSearch: string;
  actionFilter: string;
  actionAll: string;

  // Report Modal
  reportModalTitle: string;
  reportModalSubtitle: string;
  quickIssueHeading: string;
  quickWashroom: string;
  quickDustbin: string;
  quickWaterSpill: string;
  quickClassroom: string;
  issueTitleLabel: string;
  issueTitlePlaceholder: string;
  categoryLabel: string;
  urgencyLabel: string;
  locationLabel: string;
  detailsLabel: string;
  detailsPlaceholder: string;
  yourNameLabel: string;
  yourRoleLabel: string;
  roleStudent: string;
  roleFaculty: string;
  roleStaff: string;
  roleVisitor: string;
  urgencyLow: string;
  urgencyMedium: string;
  urgencyHigh: string;
  urgencyEmergency: string;

  // Quick categories
  catWashroom: string;
  catDustbin: string;
  catSpill: string;
  catChemical: string;
  catBrokenGlass: string;
  catOdor: string;
  catGeneral: string;

  // Zones & Classrooms
  zonesHeading: string;
  zonesSubheading: string;
  filterAllDepts: string;
  filterCleanOnly: string;
  filterNeedsClean: string;
  lastCleanedText: string;
  assignedStaffText: string;

  // Incidents
  incidentsHeading: string;
  incidentsSubheading: string;
  markResolvedQuick: string;
  ticketLabel: string;
  reportedByLabel: string;

  // Staff
  staffHeading: string;
  staffSubheading: string;
  callNowBtn: string;
  tasksCompletedLabel: string;
  shiftLabel: string;
}

export const translations: Record<AppLanguage, Translations> = {
  mr: {
    appTitle: "शासकीय अभियांत्रिकी महाविद्यालय स्वच्छता व्यवस्थापन",
    collegeName: "शासकीय अभियांत्रिकी व संशोधन महाविद्यालय, अवसरी खुर्द",
    collegeSubtitle: "पुणे-नाशिक महामार्ग, आंबेगाव | कॅम्पस स्वच्छता व आरोग्य अभियान",
    projectTeam: "प्रकल्प विद्यार्थी: करण गव्हाणे, मयूर घोडे, विनायक देवकर",
    campusHygieneMeter: "कॅम्पस स्वच्छता प्रमाण",
    percentClean: "स्वच्छ",
    doorQrBtn: "📷 दरवाजा QR स्कॅन",
    reportDirtyBtn: "⚠️ अस्वच्छ जागा सांगा",
    resetBtnTitle: "माहिती पूर्ववत करा",
    langToggle: "English मध्ये बदला",

    tabOverview: "🏠 मुख्य पान",
    tabIncidents: "📋 स्वच्छता तक्रारी",
    tabZones: "🏫 वर्गखोल्या व विभाग",
    tabStaff: "👥 सफाई कर्मचारी",
    tabAudits: "📑 स्वच्छता तपासणी",
    tabInventory: "📦 स्वच्छता साहित्य",
    tabAIAdvisor: "🤖 AI मदतनीस",

    heroHeading: "महाविद्यालय स्वच्छता पोर्टल (GCOEARA)",
    heroSubheading: "विद्यार्थी, प्राध्यापक व सफाई कर्मचाऱ्यांसाठी अतिशय सोपे व जलद स्वच्छता साधन.",
    cardReportTitle: "⚠️ घाण दिसली का? लगेच सांगा",
    cardReportDesc: "वर्ग, टॉयलेट किंवा कॅन्टीन घाण असेल तर १ सेकंदात कळवा",
    cardCleanedTitle: "🧹 स्वच्छ केले? येथे नोंदवा",
    cardCleanedDesc: "सफाई कर्मचाऱ्यांनी झाडू व पुसणे झाल्यावर १ क्लिक करा",
    cardScanTitle: "📷 दरवाजाचा QR स्कॅन करा",
    cardScanDesc: "वर्गखोली किंवा लॅबच्या दारावरील QR कोड स्कॅन करा",
    cardCallTitle: "📞 सफाई कर्मचाऱ्यास फोन करा",
    cardCallDesc: "ड्युटीवर असलेल्या कर्मचाऱ्यांना थेट फोन लावा",

    statusClean: "✅ स्वच्छ आहे",
    statusNeedsCleaning: "⚠️ स्वच्छता आवश्यक",
    statusInProgress: "⏳ काम सुरू आहे",
    statusAuditRequired: "🔍 तपासणी बाकी",
    statusPending: "⏳ नवीन तक्रार",
    statusAssigned: "👤 कर्मचारी नेमला",
    statusResolved: "✅ स्वच्छ झाले",
    statusVerified: "🌟 तपासणी पूर्ण",
    statusOnDuty: "🟢 कामावर हजर",
    statusDispatched: "🏃 कामासाठी रवाना",
    statusOnBreak: "☕ जेवणाची सुट्टी",
    statusOffDuty: "⚪ सुट्टीवर",

    actionMarkCleaned: "🧹 स्वच्छ केले (Done)",
    actionReportIssue: "⚠️ अस्वच्छ जागा नोंदवा",
    actionScanQR: "📷 QR स्कॅन करा",
    actionCallStaff: "📞 फोन लावा",
    actionAssignStaff: "👤 कर्मचारी नेमा",
    actionViewDetails: "माहिती पहा",
    actionSubmit: "पाठवा (जतन करा)",
    actionCancel: "रद्द करा",
    actionClose: "बंद करा",
    actionSearch: "शोधा (उदा. वर्ग क्र. 101, मेकॅनिकल)...",
    actionFilter: "फिल्टर करा",
    actionAll: "सर्व",

    reportModalTitle: "⚠️ अस्वच्छ जागेची तक्रार नोंदवा",
    reportModalSubtitle: "लगेच संबंधित सफाई कर्मचाऱ्यांपर्यंत संदेश पोहोचवला जाईल.",
    quickIssueHeading: "खालीलपैकी एक समस्या निवडा (१-क्लिक):",
    quickWashroom: "🚽 टॉयलेट / बाथरुममध्ये दुर्गंधी व पाणी कमी",
    quickDustbin: "🗑️ कचराकुंडी पूर्ण भरली व कचरा पसरला",
    quickWaterSpill: "💧 पिण्याच्या पाण्याजवळ पाणी साचले / फरशी निसरडी",
    quickClassroom: "🏫 वर्गखोलीत बेंचवर धूळ व कागदाचा कचरा",
    issueTitleLabel: "समस्येचे नाव",
    issueTitlePlaceholder: "उदा. टॉयलेटमध्ये दुर्गंधी आहे",
    categoryLabel: "समस्येचा प्रकार",
    urgencyLabel: "तातडी किती आहे?",
    locationLabel: "जागा (इमारत / मजला / खोली क्र.)",
    detailsLabel: "अधिक माहिती (ऐच्छिक)",
    detailsPlaceholder: "घाणीबद्दल थोडे सांगा...",
    yourNameLabel: "आपले नाव",
    yourRoleLabel: "आपली भूमिका",
    roleStudent: "विद्यार्थी (Student)",
    roleFaculty: "प्राध्यापक (Faculty)",
    roleStaff: "महाविद्यालयीन कर्मचारी",
    roleVisitor: "पाहुणे / पालक",
    urgencyLow: "साधारण (Low)",
    urgencyMedium: "मध्यम (Medium)",
    urgencyHigh: "तातडीचे (High)",
    urgencyEmergency: "अतितातडीचे / धोकादायक (Emergency)",

    catWashroom: "शौचालय / स्वच्छतागृह",
    catDustbin: "कचराकुंडी भरली",
    catSpill: "द्रव सांडले / ओलसर",
    catChemical: "लॅब केमिकल / धोकादायक",
    catBrokenGlass: "फुटलेली काच / अडथळा",
    catOdor: "दुर्गंधी व हवा खेळती नाही",
    catGeneral: "इतर स्वच्छता",

    zonesHeading: "🏫 वर्गखोल्या, लॅब व विभागांची यादी",
    zonesSubheading: "प्रत्येक जागेची स्वच्छता स्थिती व कर्मचाऱ्यांची नोंद",
    filterAllDepts: "सर्व इमारती",
    filterCleanOnly: "फक्त स्वच्छ जागा",
    filterNeedsClean: "फक्त अस्वच्छ जागा",
    lastCleanedText: "शेवटची स्वच्छता",
    assignedStaffText: "नेमलेले कर्मचारी",

    incidentsHeading: "📋 ताज्या स्वच्छता तक्रारी",
    incidentsSubheading: "विद्यार्थी व शिक्षकांनी नोंदवलेल्या तक्रारींचा पाठपुरावा",
    markResolvedQuick: "✅ स्वच्छ झाले (निकाली काढा)",
    ticketLabel: "तक्रार क्र.",
    reportedByLabel: "तक्रारदार",

    staffHeading: "👥 सफाई कर्मचारी व पर्यवेक्षक यादी",
    staffSubheading: "कामावर हजर असलेल्या कर्मचाऱ्यांना १-क्लिकमध्ये फोन करा",
    callNowBtn: "📞 थेट फोन करा",
    tasksCompletedLabel: "आज पूर्ण केलेली कामे",
    shiftLabel: "पाळी (Shift)"
  },
  en: {
    appTitle: "Government College of Engineering Cleaning Portal",
    collegeName: "Government College of Engineering and Research, Avasari Khurd",
    collegeSubtitle: "Pune-Nashik Highway, Ambegaon | Campus Hygiene & Cleanliness Initiative",
    projectTeam: "Project Team: Karan Gavhane, Mayur Ghode, Vinayak Deokar",
    campusHygieneMeter: "Campus Hygiene Meter",
    percentClean: "Clean",
    doorQrBtn: "📷 Door QR Scan",
    reportDirtyBtn: "⚠️ Report Dirty Area",
    resetBtnTitle: "Reset Sample Data",
    langToggle: "मराठी मध्ये बदला",

    tabOverview: "🏠 Campus Overview",
    tabIncidents: "📋 Live Complaints",
    tabZones: "🏫 Classrooms & Depts",
    tabStaff: "👥 Cleaning Staff",
    tabAudits: "📑 Hygiene Audits",
    tabInventory: "📦 Cleaning Supplies",
    tabAIAdvisor: "🤖 Cleaning AI Helper",

    heroHeading: "College Cleaning & Hygiene Portal (GCOEARA)",
    heroSubheading: "Very simple and quick cleaning management tool for students, teachers, and housekeeping staff.",
    cardReportTitle: "⚠️ Found Dirt? Report Here",
    cardReportDesc: "Report dirty classrooms, washrooms, or canteen in 1 second",
    cardCleanedTitle: "🧹 Cleaned Classroom? Mark Done",
    cardCleanedDesc: "Housekeeping staff can mark rooms cleaned with 1 click",
    cardScanTitle: "📷 Scan Door QR Code",
    cardScanDesc: "Scan door sticker QR code on classrooms and laboratories",
    cardCallTitle: "📞 Call Housekeeping Staff",
    cardCallDesc: "Call cleaning staff on duty directly with single tap",

    statusClean: "✅ Clean",
    statusNeedsCleaning: "⚠️ Needs Cleaning",
    statusInProgress: "⏳ In Progress",
    statusAuditRequired: "🔍 Audit Required",
    statusPending: "⏳ New Complaint",
    statusAssigned: "👤 Staff Assigned",
    statusResolved: "✅ Cleaned & Done",
    statusVerified: "🌟 Verified Clean",
    statusOnDuty: "🟢 On Duty",
    statusDispatched: "🏃 Dispatched",
    statusOnBreak: "☕ On Break",
    statusOffDuty: "⚪ Off Duty",

    actionMarkCleaned: "🧹 Mark Cleaned",
    actionReportIssue: "⚠️ Report Dirty Area",
    actionScanQR: "📷 Scan QR Tag",
    actionCallStaff: "📞 Call Staff",
    actionAssignStaff: "👤 Assign Staff",
    actionViewDetails: "View Details",
    actionSubmit: "Submit Report",
    actionCancel: "Cancel",
    actionClose: "Close",
    actionSearch: "Search room or department (e.g. 101, Mech)...",
    actionFilter: "Filter",
    actionAll: "All",

    reportModalTitle: "⚠️ Report a Dirty Area on Campus",
    reportModalSubtitle: "Directly alerts the assigned housekeeping crew and supervisor.",
    quickIssueHeading: "Select a common issue (1-tap fill):",
    quickWashroom: "🚽 Washroom dirty / needs soap & water",
    quickDustbin: "🗑️ Dustbin overflowing with paper/food trash",
    quickWaterSpill: "💧 Water cooler area slippery / leaking",
    quickClassroom: "🏫 Classroom benches & floor need sweeping",
    issueTitleLabel: "Issue Name / Title",
    issueTitlePlaceholder: "e.g. Washroom Floor Wet & Smelling",
    categoryLabel: "Category of Issue",
    urgencyLabel: "How Urgent is this?",
    locationLabel: "Campus Location (Building / Room / Floor)",
    detailsLabel: "Details (Optional)",
    detailsPlaceholder: "Describe the dirty spot briefly...",
    yourNameLabel: "Your Name",
    yourRoleLabel: "Your Role on Campus",
    roleStudent: "Student",
    roleFaculty: "Faculty / Professor",
    roleStaff: "College Staff",
    roleVisitor: "Visitor / Parent",
    urgencyLow: "Low Priority",
    urgencyMedium: "Medium Priority",
    urgencyHigh: "Urgent Priority",
    urgencyEmergency: "Emergency / Hazard",

    catWashroom: "Restroom / Sanitation",
    catDustbin: "Overflowing Bins",
    catSpill: "Spill / Liquid Stain",
    catChemical: "Chemical / Lab Hazard",
    catBrokenGlass: "Broken Glass / Debris",
    catOdor: "Odor & Ventilation",
    catGeneral: "General Cleaning",

    zonesHeading: "🏫 Classrooms, Laboratories & Campus Zones",
    zonesSubheading: "Real-time cleanliness status and staff assignments",
    filterAllDepts: "All Buildings",
    filterCleanOnly: "Clean Rooms Only",
    filterNeedsClean: "Needs Cleaning Only",
    lastCleanedText: "Last Cleaned",
    assignedStaffText: "Assigned Cleaner",

    incidentsHeading: "📋 Live Campus Cleaning Complaints",
    incidentsSubheading: "Student and staff reported hygiene complaints",
    markResolvedQuick: "✅ Mark Cleaned (Resolve)",
    ticketLabel: "Ticket #",
    reportedByLabel: "Reported by",

    staffHeading: "👥 Cleaning Staff & Supervisors",
    staffSubheading: "Duty roster with 1-click direct phone calling",
    callNowBtn: "📞 Call Now",
    tasksCompletedLabel: "Tasks Done Today",
    shiftLabel: "Shift"
  }
};
