import React, { useState } from "react";
import { X, Package, CheckCircle2 } from "lucide-react";
import { InventoryItem } from "../types";
import { useLanguage } from "../context/LanguageContext";

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInventory: (newItem: InventoryItem) => void;
}

export const AddInventoryModal: React.FC<AddInventoryModalProps> = ({
  isOpen,
  onClose,
  onAddInventory,
}) => {
  if (!isOpen) return null;
  const { lang } = useLanguage();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<InventoryItem["category"]>("Washroom Consumables");
  const [currentStock, setCurrentStock] = useState("50");
  const [unit, setUnit] = useState("Bottles");
  const [minThreshold, setMinThreshold] = useState("10");
  const [storageLocation, setStorageLocation] = useState("Central Maintenance Store Room");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: InventoryItem = {
      id: `inv-${Date.now()}`,
      name: name.trim(),
      category,
      currentStock: Number(currentStock) || 1,
      unit,
      minThreshold: Number(minThreshold) || 10,
      storageLocation,
      lastRestocked: "Today",
      status: Number(currentStock) <= Number(minThreshold) ? "Low Stock" : "Adequate",
    };

    onAddInventory(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-6">
        <div className="bg-[#0f382c] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">
                {lang === "mr" ? "नवीन स्वच्छता साहित्य जोडा" : "Add Cleaning Consumable / Supply"}
              </h3>
              <p className="text-xs text-emerald-200">
                {lang === "mr" ? "ॲडमिन अधिकार: आकाश चव्हाण" : "Admin Inventory Control"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              {lang === "mr" ? "साहित्याचे नाव *" : "Supply Item Name *"}
            </label>
            <input
              type="text"
              required
              placeholder={lang === "mr" ? "उदा. फिनाइल / फ्लोर क्लीनर" : "e.g. Pine Disinfectant Floor Cleaner"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "प्रकार (Category)" : "Category"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium cursor-pointer"
              >
                <option value="Washroom Consumables">{lang === "mr" ? "बाथरुम साहित्य" : "Washroom Consumables"}</option>
                <option value="Disinfectants & Chemicals">{lang === "mr" ? "जंतुनाशके व केमिकल्स" : "Disinfectants"}</option>
                <option value="PPE & Safety Gear">{lang === "mr" ? "ग्लोव्हज व मास्क (PPE)" : "PPE & Safety"}</option>
                <option value="Cleaning Equipment">{lang === "mr" ? "झाडू, मॉप, बादल्या" : "Cleaning Tools"}</option>
                <option value="Waste Bags & Liners">{lang === "mr" ? "कचरा पिशव्या" : "Waste Bags"}</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "प्रमाण (Stock) *" : "Stock Amount *"}
              </label>
              <input
                type="number"
                required
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "एकक (Unit)" : "Unit"}
              </label>
              <input
                type="text"
                placeholder="Bottles / Litres / Packets"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">
                {lang === "mr" ? "किमान साठा मर्यादा" : "Min. Threshold"}
              </label>
              <input
                type="number"
                value={minThreshold}
                onChange={(e) => setMinThreshold(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              {lang === "mr" ? "रद्द करा" : "Cancel"}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-black text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{lang === "mr" ? "+ साहित्य जोडा" : "Save Item"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
