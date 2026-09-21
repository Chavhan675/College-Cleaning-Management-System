import { CampusZone, StaffMember, CleaningIncident, InspectionAudit, InventoryItem } from "../types";
import { INITIAL_ZONES, INITIAL_STAFF, INITIAL_INCIDENTS, INITIAL_AUDITS, INITIAL_INVENTORY } from "../data/mockData";

const STORAGE_KEYS = {
  VERSION: "campus_cleaning_version",
  ZONES: "campus_cleaning_zones",
  STAFF: "campus_cleaning_staff",
  INCIDENTS: "campus_cleaning_incidents",
  AUDITS: "campus_cleaning_audits",
  INVENTORY: "campus_cleaning_inventory",
};

const CURRENT_VERSION = "2.0_gcoeara";

export function loadStoredData() {
  let zones: CampusZone[] = INITIAL_ZONES;
  let staff: StaffMember[] = INITIAL_STAFF;
  let incidents: CleaningIncident[] = INITIAL_INCIDENTS;
  let audits: InspectionAudit[] = INITIAL_AUDITS;
  let inventory: InventoryItem[] = INITIAL_INVENTORY;

  try {
    const savedVersion = localStorage.getItem(STORAGE_KEYS.VERSION);
    if (savedVersion !== CURRENT_VERSION) {
      // Clear legacy storage and initialize with new GCOEARA data
      localStorage.setItem(STORAGE_KEYS.VERSION, CURRENT_VERSION);
      localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(INITIAL_ZONES));
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
      localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(INITIAL_INCIDENTS));
      localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(INITIAL_AUDITS));
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(INITIAL_INVENTORY));
      return { zones, staff, incidents, audits, inventory };
    }

    const savedZones = localStorage.getItem(STORAGE_KEYS.ZONES);
    if (savedZones) zones = JSON.parse(savedZones);

    const savedStaff = localStorage.getItem(STORAGE_KEYS.STAFF);
    if (savedStaff) staff = JSON.parse(savedStaff);

    const savedIncidents = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    if (savedIncidents) incidents = JSON.parse(savedIncidents);

    const savedAudits = localStorage.getItem(STORAGE_KEYS.AUDITS);
    if (savedAudits) audits = JSON.parse(savedAudits);

    const savedInventory = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (savedInventory) inventory = JSON.parse(savedInventory);
  } catch (e) {
    console.warn("Could not load from localStorage, using initial state", e);
  }

  return { zones, staff, incidents, audits, inventory };
}

export function saveZones(zones: CampusZone[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.ZONES, JSON.stringify(zones));
  } catch (e) {
    console.error(e);
  }
}

export function saveStaff(staff: StaffMember[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staff));
  } catch (e) {
    console.error(e);
  }
}

export function saveIncidents(incidents: CleaningIncident[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
  } catch (e) {
    console.error(e);
  }
}

export function saveAudits(audits: InspectionAudit[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.AUDITS, JSON.stringify(audits));
  } catch (e) {
    console.error(e);
  }
}

export function saveInventory(inventory: InventoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inventory));
  } catch (e) {
    console.error(e);
  }
}

export function resetAllData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.ZONES);
    localStorage.removeItem(STORAGE_KEYS.STAFF);
    localStorage.removeItem(STORAGE_KEYS.INCIDENTS);
    localStorage.removeItem(STORAGE_KEYS.AUDITS);
    localStorage.removeItem(STORAGE_KEYS.INVENTORY);
  } catch (e) {
    console.error(e);
  }
  return {
    zones: INITIAL_ZONES,
    staff: INITIAL_STAFF,
    incidents: INITIAL_INCIDENTS,
    audits: INITIAL_AUDITS,
    inventory: INITIAL_INVENTORY,
  };
}
