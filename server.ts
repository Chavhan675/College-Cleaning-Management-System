import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy Gemini Client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({});
  }
  return geminiClient;
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    time: new Date().toISOString(),
  });
});

// AI Sanitation Analysis endpoint
app.post("/api/ai/analyze-issue", async (req, res) => {
  try {
    const { title, location, category, description, urgency } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // High-quality fallback rule-based analyzer when API key isn't provided
      return res.json({
        success: true,
        source: "local-rules",
        protocol: getFallbackAnalysis(category, location, description, urgency),
      });
    }

    const prompt = `You are a Senior Environmental Health & Safety (EHS) and College Facilities Sanitation Officer.
Analyze the following cleaning/sanitation issue reported on a university campus:
- Issue: "${title}"
- Location: "${location}"
- Category: "${category}"
- Reported Urgency: "${urgency}"
- Description: "${description}"

Provide a structured, professional sanitation advisory in strict JSON format matching this schema:
{
  "assessedSeverity": "Low" | "Medium" | "High" | "Critical",
  "hazardAssessment": "string explaining biological/chemical/slip hazard and campus impact",
  "requiredPPE": ["string array of PPE e.g. Nitrile Gloves, Safety Goggles, Respirator Mask, Slip-resistant boots"],
  "recommendedCleaners": ["string array of cleaning agents e.g. Quaternary Ammonium disinfectant, Bio-enzymatic spray, Absorbent spill powder"],
  "estimatedTimeMinutes": number,
  "actionSteps": ["step 1", "step 2", "step 3", "step 4"],
  "disposalInstructions": "specific waste segregation instructions e.g. Biohazard Yellow bag, hazardous chemical waste container, or dry recyclables",
  "precautionAlert": "warning or special notice for students/faculty nearby"
}
Output only valid JSON with no markdown wrapping.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    res.json({
      success: true,
      source: "gemini-ai",
      protocol: parsed,
    });
  } catch (error: any) {
    console.error("AI Analysis error:", error);
    // Fallback if AI call failed or timed out
    const { category, location, description, urgency } = req.body;
    res.json({
      success: true,
      source: "fallback-recovery",
      protocol: getFallbackAnalysis(category, location, description, urgency),
    });
  }
});

// AI Custom SOP & Checklist Generator endpoint
app.post("/api/ai/generate-sop", async (req, res) => {
  try {
    const { facilityType, eventOrScenario, frequency } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        source: "local-templates",
        sop: getFallbackSOP(facilityType, eventOrScenario),
      });
    }

    const prompt = `You are a Campus Sanitation Director for a university.
Generate a comprehensive Standard Operating Procedure (SOP) and inspection checklist for:
- Facility/Zone Type: "${facilityType}"
- Scenario or Event: "${eventOrScenario}"
- Routine Frequency: "${frequency}"

Respond with strict JSON with no markdown wrapping:
{
  "title": "string SOP title",
  "frequency": "Daily / Twice Daily / Shift-based / Special",
  "safetyPrecautions": ["bullet 1", "bullet 2", "bullet 3"],
  "checkpoints": [
    { "task": "Task description", "category": "Sanitization" | "Disinfection" | "Waste" | "Supplies", "recommendedProduct": "e.g. Floor cleaner ratio 1:50" }
  ],
  "equipmentRequired": ["mop", "industrial scrubber", etc.],
  "supervisorSignoffNotes": "Brief compliance guidelines for sanitation audit"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    const text = response.text || "";
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanedText);

    res.json({
      success: true,
      source: "gemini-ai",
      sop: parsed,
    });
  } catch (error: any) {
    console.error("AI SOP error:", error);
    const { facilityType, eventOrScenario } = req.body;
    res.json({
      success: true,
      source: "fallback-recovery",
      sop: getFallbackSOP(facilityType, eventOrScenario),
    });
  }
});

function getFallbackAnalysis(category: string, location: string, description: string, urgency: string) {
  const isChemical = category?.toLowerCase().includes("chemical") || description?.toLowerCase().includes("acid") || location?.toLowerCase().includes("lab");
  const isRestroom = category?.toLowerCase().includes("restroom") || location?.toLowerCase().includes("toilet") || location?.toLowerCase().includes("washroom");
  const isCanteen = location?.toLowerCase().includes("canteen") || location?.toLowerCase().includes("mess") || location?.toLowerCase().includes("food");
  
  if (isChemical) {
    return {
      assessedSeverity: "Critical",
      hazardAssessment: "Potential toxic vapor, corrosive contact, or slip hazard in academic laboratory area.",
      requiredPPE: ["Heavy-duty Nitrile Gloves", "Chemical Splash Goggles", "Vapor Respirator (N95/Half-mask)", "Chemical-resistant Apron"],
      recommendedCleaners: ["Acid/Base Neutralizing Powder", "Inert Vermiculite Absorbent", "Deionized Water Rinse"],
      estimatedTimeMinutes: 30,
      actionSteps: [
        "Cordon off the immediate area with yellow caution tape; prevent student entry.",
        "Ensure laboratory exhaust hoods and cross-ventilation are operating at maximum.",
        "Apply neutralizer powder from periphery towards the center to contain runoff.",
        "Scoop neutralized gel with non-sparking plastic tools into labeled chemical hazardous waste bin.",
        "Wipe surface with mild neutral detergent and dry thoroughly."
      ],
      disposalInstructions: "Seal in double-bagged heavy gauge polyethylene drum labeled 'Hazardous Waste - EHS Chemical Storage'.",
      precautionAlert: "Do not use standard paper towels or water without neutralizing first."
    };
  }

  if (isRestroom) {
    return {
      assessedSeverity: urgency === "Emergency" || urgency === "High" ? "High" : "Medium",
      hazardAssessment: "Bacterial pathogen transmission, foul odor accumulation, and wet tile slip hazard for campus members.",
      requiredPPE: ["Waterproof Rubber Gloves", "Fluid-resistant Face Mask", "Non-slip Rubber Sole Boots"],
      recommendedCleaners: ["Quaternary Disinfectant (Hospital Grade)", "Acidic Descaler for Urinals", "Odor Counteractant Solution"],
      estimatedTimeMinutes: 20,
      actionSteps: [
        "Place 'Restroom Closed for Cleaning' cone at entrance.",
        "Spray disinfectant on all high-touch surfaces: flush valves, faucets, door handles; allow 5-minute dwell time.",
        "Scrub toilet bowls and urinals with disinfectant brush; mop floor with micro-fiber mop from innermost corner to drain.",
        "Restock hand soap, paper towels, and sanitize hand-dryer nozzles.",
        "Inspect mirrors, empty sanitary bins with gloves, and verify deodorizer."
      ],
      disposalInstructions: "Sanitary bin liners tied and deposited in central sanitary incinerator/waste chute.",
      precautionAlert: "Ensure floors are dry before reopening to prevent slip and fall accidents."
    };
  }

  if (isCanteen) {
    return {
      assessedSeverity: "Medium",
      hazardAssessment: "Food hygiene non-compliance, vector attraction (cockroaches/rodents), and organic greasiness.",
      requiredPPE: ["Food-safe Poly Gloves", "Non-slip Work Shoes", "Hairnet"],
      recommendedCleaners: ["Food-contact Surface Sanitizer", "Heavy-duty Degreaser", "Microfiber Cleaning Cloths"],
      estimatedTimeMinutes: 25,
      actionSteps: [
        "Scrape food debris into organic waste bin.",
        "Apply kitchen degreaser to dining tables and service counter; wipe clean with warm water.",
        "Deck-scrub tiled dining floor with anti-grease solution and squeegee toward floor drains.",
        "Replace organic and dry recycling bin liners; disinfect outer bin lids."
      ],
      disposalInstructions: "Segregate food scraps to campus biogas/compost plant; plastics to recycling center.",
      precautionAlert: "Do not use toxic industrial chemicals near exposed food preparation or serving stations."
    };
  }

  return {
    assessedSeverity: urgency === "Emergency" ? "High" : (urgency || "Medium"),
    hazardAssessment: "General campus cleanliness disruption, particulate buildup, or public corridor aesthetics issue.",
    requiredPPE: ["Latex/Nitrile Utility Gloves", "Standard Dust Mask"],
    recommendedCleaners: ["Neutral Multi-surface Cleaner", "Glass Cleaner", "Disinfectant Spray"],
    estimatedTimeMinutes: 15,
    actionSteps: [
      "Secure area and notify nearby students/staff.",
      "Clear dry debris using push broom or industrial vacuum.",
      "Apply surface disinfectant and wipe clean with micro-fiber cloth.",
      "Mop damp areas with fresh neutral cleaner solution.",
      "Verify that waste bin is empty and clean."
    ],
    disposalInstructions: "Sort into campus standard Color-coded Waste Bins (Green for Wet, Blue for Dry).",
    precautionAlert: "Keep area ventilated until damp surfaces dry completely."
  };
}

function getFallbackSOP(facilityType: string, eventOrScenario: string) {
  return {
    title: `${facilityType || "Campus Facility"} Standard Cleaning & Sanitation Protocol`,
    frequency: "Daily Routine & Post-Event Inspection",
    safetyPrecautions: [
      "Wear assigned personal protective equipment at all times.",
      "Place visible safety signage (Caution: Wet Floor) during operations.",
      "Ensure proper ventilation before mixing or applying diluted detergents."
    ],
    checkpoints: [
      { task: "Clear and disinfect all student desks, tables, and high-touch podiums", category: "Sanitization", recommendedProduct: "1:64 Quat Disinfectant" },
      { task: "Empty segregated waste baskets and replace biodegradable liners", category: "Waste", recommendedProduct: "Green & Blue 40L Liners" },
      { task: "Sweep and damp-mop corridors and entrances with neutral disinfectant", category: "Sanitization", recommendedProduct: "Pine/Citrus Floor Disinfectant" },
      { task: "Sanitize switchboards, door handles, and handrails", category: "Disinfection", recommendedProduct: "70% Isopropyl Alcohol wipes" },
      { task: "Check lighting, water faucets, and drainage for leaks or blockages", category: "Supplies", recommendedProduct: "Facility maintenance log" }
    ],
    equipmentRequired: ["Color-coded dual mop bucket", "Microfiber cloths", "Upright broom and dustpan", "High-reach duster", "Caution signs"],
    supervisorSignoffNotes: `Audit standard compliance per University Health & Sanitation Code. Zone: ${facilityType} - Scenario: ${eventOrScenario || "General Campus Operations"}.`
  };
}

// Development Vite middleware or Production Static
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`College Cleaning Management Server running on http://0.0.0.0:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start server:", err);
});
