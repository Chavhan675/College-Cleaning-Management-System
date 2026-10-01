import React, { useState } from "react";
import { 
  Package, 
  AlertTriangle, 
  Plus, 
  Minus, 
  CheckCircle2, 
  RotateCw, 
  Search, 
  Filter, 
  ShoppingCart,
  Boxes,
  PlusCircle,
  Crown
} from "lucide-react";
import { InventoryItem } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";

interface InventoryTabProps {
  inventory: InventoryItem[];
  onUpdateStock: (itemId: string, newStock: number) => void;
  onReorder: (itemId: string) => void;
  onOpenAddInventoryModal?: () => void;
  onDeleteItem?: (itemId: string) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  inventory,
  onUpdateStock,
  onReorder,
  onOpenAddInventoryModal,
  onDeleteItem,
}) => {
  const { lang } = useLanguage();
  const { isAdmin } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Disinfectants & Chemicals",
    "PPE & Safety Gear",
    "Cleaning Equipment",
    "Waste Bags & Liners",
    "Washroom Consumables",
  ];

  const filtered = inventory.filter((item) => {
    const matchesCat = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.storageLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const lowStockItems = inventory.filter(
    (i) => i.currentStock <= i.minThreshold || i.status.includes("Critical") || i.status.includes("Low")
  );

  return (
    <div className="space-y-4">
      {/* Admin Privilege Banner if Admin Mode is Active */}
      {isAdmin && (
        <div className="p-3 bg-gradient-to-r from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-2xl flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-amber-400 text-slate-950 rounded-xl font-bold shadow-xs">
              <Crown className="w-5 h-5 fill-amber-600" />
            </span>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                {lang === "mr" ? "👑 ॲडमिन साहित्य व्यवस्थापन" : "👑 Admin Sanitation Inventory Management"}
              </h4>
              <p className="text-[11px] text-slate-600 font-medium">
                {lang === "mr" ? "तुम्ही नवीन फिनाइल, ग्लोव्हज, झाडू किंवा जंतुनाशके जोडू शकता आणि साठा बदलू शकता." : "You have permissions to add, reorder, and modify campus cleaning chemical stock."}
              </p>
            </div>
          </div>

          {onOpenAddInventoryModal && (
            <button
              onClick={onOpenAddInventoryModal}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-black shadow-xs flex items-center gap-1.5 shrink-0 transition-transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{lang === "mr" ? "+ नवीन साहित्य जोडा" : "+ Add Item"}</span>
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900">
            {lang === "mr" ? "📦 स्वच्छता साहित्य व साठा (Inventory)" : "📦 Cleaning Consumables & Stock Inventory"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {lang === "mr" ? "फिनाइल, ग्लोव्हज, कचरा पिशव्या व झाडूंचा साठा" : "Track cleaning chemical drums, disinfectants, mops, and hygiene supplies"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={lang === "mr" ? "साहित्य शोधा..." : "Search supply item..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {isAdmin && onOpenAddInventoryModal && (
            <button
              onClick={onOpenAddInventoryModal}
              className="sm:hidden p-2 bg-emerald-700 text-white rounded-xl shadow-xs"
              title="Add Supply Item"
            >
              <PlusCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Low Stock Warning */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950">
            <span className="font-bold">
              {lang === "mr" ? `कमी साठा इशारा (${lowStockItems.length} वस्तूंचा साठा संपत आला आहे):` : `Low Stock Alert (${lowStockItems.length} items below minimum safety threshold):`}
            </span>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {lowStockItems.map((item) => (
                <span key={item.id} className="bg-white/80 border border-amber-300 text-amber-900 px-2 py-0.5 rounded-lg text-[11px] font-bold">
                  {item.name} ({item.currentStock} {item.unit})
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filtered.map((item) => {
          const isLow = item.currentStock <= item.minThreshold;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-2xl border-2 p-4 shadow-xs flex flex-col justify-between ${
                isLow ? "border-amber-300 bg-amber-50/20" : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-black text-slate-900 mt-1 leading-snug">
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      📍 {item.storageLocation}
                    </p>
                  </div>

                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full shrink-0 ${
                    isLow ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                  }`}>
                    {isLow ? (lang === "mr" ? "कमी साठा" : "Low Stock") : (lang === "mr" ? "उपलब्ध" : "Adequate")}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] text-slate-500 block font-bold">
                      {lang === "mr" ? "सध्याचा साठा" : "Current Stock"}
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      {item.currentStock} <span className="text-xs text-slate-600 font-bold">{item.unit}</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">
                      {lang === "mr" ? "किमान मर्यादा" : "Min. Threshold"}
                    </span>
                    <span className="text-xs font-bold text-slate-600">{item.minThreshold} {item.unit}</span>
                  </div>
                </div>
              </div>

              {/* Adjust Stock buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onUpdateStock(item.id, Math.max(0, item.currentStock - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-colors cursor-pointer"
                    title="Decrease stock"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onUpdateStock(item.id, item.currentStock + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center justify-center transition-colors cursor-pointer"
                    title="Increase stock"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => onReorder(item.id)}
                  className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{lang === "mr" ? "मागणी नोंदवा" : "Reorder"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
