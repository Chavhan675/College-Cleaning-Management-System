import { AIProtocol } from "../types";

export function getFallbackAnalysis(
  category: string,
  location: string,
  description: string,
  urgency: string
): AIProtocol {
  const isChemical =
    category?.toLowerCase().includes("chemical") ||
    description?.toLowerCase().includes("acid") ||
    location?.toLowerCase().includes("lab") ||
    description?.toLowerCase().includes("mercury");

  const isRestroom =
    category?.toLowerCase().includes("restroom") ||
    location?.toLowerCase().includes("toilet") ||
    location?.toLowerCase().includes("washroom");

  const isCanteen =
    location?.toLowerCase().includes("canteen") ||
    location?.toLowerCase().includes("mess") ||
    location?.toLowerCase().includes("food") ||
    description?.toLowerCase().includes("grease");

  if (isChemical) {
    return {
      assessedSeverity: "Critical",
      hazardAssessment:
        "Potential toxic vapor, corrosive contact, or slip hazard in academic laboratory area.",
      requiredPPE: [
        "Heavy-duty Nitrile Gloves",
        "Chemical Splash Goggles",
        "Vapor Respirator (N95/Half-mask)",
        "Chemical-resistant Apron",
      ],
      recommendedCleaners: [
        "Acid/Base Neutralizing Powder",
        "Inert Vermiculite Absorbent",
        "Deionized Water Rinse",
      ],
      estimatedTimeMinutes: 30,
      actionSteps: [
        "Cordon off the immediate area with yellow caution tape; prevent student entry.",
        "Ensure laboratory exhaust hoods and cross-ventilation are operating at maximum.",
        "Apply neutralizer powder from periphery towards the center to contain runoff.",
        "Scoop neutralized gel with non-sparking plastic tools into labeled chemical hazardous waste bin.",
        "Wipe surface with mild neutral detergent and dry thoroughly.",
      ],
      disposalInstructions:
        "Seal in double-bagged heavy gauge polyethylene drum labeled 'Hazardous Waste - EHS Chemical Storage'.",
      precautionAlert:
        "Do not use standard paper towels or water without neutralizing first.",
    };
  }

  if (isRestroom) {
    return {
      assessedSeverity:
        urgency === "Emergency" || urgency === "High" ? "High" : "Medium",
      hazardAssessment:
        "Bacterial pathogen transmission, foul odor accumulation, and wet tile slip hazard for campus members.",
      requiredPPE: [
        "Waterproof Rubber Gloves",
        "Fluid-resistant Face Mask",
        "Non-slip Rubber Sole Boots",
      ],
      recommendedCleaners: [
        "Quaternary Disinfectant (Hospital Grade)",
        "Acidic Descaler for Urinals",
        "Odor Counteractant Solution",
      ],
      estimatedTimeMinutes: 20,
      actionSteps: [
        "Place 'Restroom Closed for Cleaning' cone at entrance.",
        "Spray disinfectant on all high-touch surfaces: flush valves, faucets, door handles; allow 5-minute dwell time.",
        "Scrub toilet bowls and urinals with disinfectant brush; mop floor with micro-fiber mop from innermost corner to drain.",
        "Restock hand soap, paper towels, and sanitize hand-dryer nozzles.",
        "Inspect mirrors, empty sanitary bins with gloves, and verify deodorizer.",
      ],
      disposalInstructions:
        "Sanitary bin liners tied and deposited in central sanitary incinerator/waste chute.",
      precautionAlert:
        "Ensure floors are dry before reopening to prevent slip and fall accidents.",
    };
  }

  if (isCanteen) {
    return {
      assessedSeverity: "Medium",
      hazardAssessment:
        "Food hygiene non-compliance, vector attraction (cockroaches/rodents), and organic greasiness.",
      requiredPPE: [
        "Food-safe Poly Gloves",
        "Non-slip Work Shoes",
        "Hairnet",
      ],
      recommendedCleaners: [
        "Food-contact Surface Sanitizer",
        "Heavy-duty Degreaser",
        "Microfiber Cleaning Cloths",
      ],
      estimatedTimeMinutes: 25,
      actionSteps: [
        "Scrape food debris into organic waste bin.",
        "Apply kitchen degreaser to dining tables and service counter; wipe clean with warm water.",
        "Deck-scrub tiled dining floor with anti-grease solution and squeegee toward floor drains.",
        "Replace organic and dry recycling bin liners; disinfect outer bin lids.",
      ],
      disposalInstructions:
        "Segregate food scraps to campus biogas/compost plant; plastics to recycling center.",
      precautionAlert:
        "Do not use toxic industrial chemicals near exposed food preparation or serving stations.",
    };
  }

  return {
    assessedSeverity:
      urgency === "Emergency" ? "High" : ((urgency as any) || "Medium"),
    hazardAssessment:
      "General campus cleanliness disruption, particulate buildup, or public corridor aesthetics issue.",
    requiredPPE: ["Latex/Nitrile Utility Gloves", "Standard Dust Mask"],
    recommendedCleaners: [
      "Neutral Multi-surface Cleaner",
      "Glass Cleaner",
      "Disinfectant Spray",
    ],
    estimatedTimeMinutes: 15,
    actionSteps: [
      "Secure area and notify nearby students/staff.",
      "Clear dry debris using push broom or industrial vacuum.",
      "Apply surface disinfectant and wipe clean with micro-fiber cloth.",
      "Mop damp areas with fresh neutral cleaner solution.",
      "Verify that waste bin is empty and clean.",
    ],
    disposalInstructions:
      "Sort into campus standard Color-coded Waste Bins (Green for Wet, Blue for Dry).",
    precautionAlert:
      "Keep area ventilated until damp surfaces dry completely.",
  };
}

export function getFallbackSOP(
  facilityType: string,
  eventOrScenario: string,
  frequency?: string
) {
  return {
    title: `${facilityType || "Campus Facility"} Standard Cleaning & Sanitation Protocol`,
    frequency: frequency || "Daily Routine & Post-Event Inspection",
    safetyPrecautions: [
      "Wear assigned personal protective equipment at all times.",
      "Place visible safety signage (Caution: Wet Floor) during operations.",
      "Ensure proper ventilation before mixing or applying diluted detergents.",
    ],
    checkpoints: [
      {
        task: "Clear and disinfect all student desks, tables, and high-touch podiums",
        category: "Sanitization",
        recommendedProduct: "1:64 Quat Disinfectant",
      },
      {
        task: "Empty segregated waste baskets and replace biodegradable liners",
        category: "Waste",
        recommendedProduct: "Green & Blue 40L Liners",
      },
      {
        task: "Sweep and damp-mop corridors and entrances with neutral disinfectant",
        category: "Sanitization",
        recommendedProduct: "Pine/Citrus Floor Disinfectant",
      },
      {
        task: "Sanitize switchboards, door handles, and handrails",
        category: "Disinfection",
        recommendedProduct: "70% Isopropyl Alcohol wipes",
      },
      {
        task: "Check lighting, water faucets, and drainage for leaks or blockages",
        category: "Supplies",
        recommendedProduct: "Facility maintenance log",
      },
    ],
    equipmentRequired: [
      "Color-coded dual mop bucket",
      "Microfiber cloths",
      "Upright broom and dustpan",
      "High-reach duster",
      "Caution signs",
    ],
    supervisorSignoffNotes: `Audit standard compliance per University Health & Sanitation Code. Zone: ${
      facilityType || "Campus Zone"
    } - Scenario: ${eventOrScenario || "General Campus Operations"}.`,
  };
}
