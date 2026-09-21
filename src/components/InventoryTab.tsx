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
  Boxes
} from "lucide-react";
import { InventoryItem } from "../types";

interface InventoryTabProps {
  inventory: InventoryItem[];
  onUpdateStock: (itemId: string, newStock: number) => void;
  onReorder: (itemId: string) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({
  inventory,
  onUpdateStock,
  onReorder,
}) => {
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
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Janitorial Consumables & Stock Inventory</h2>
          <p className="text-xs text-slate-500">
            Track cleaning chemical drums, hospital-grade disinfectants, color-coded mops, and hygiene supplies
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search disinfectant, glove, mop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800"
          />
        </div>
      </div>

      {/* Low Stock Alert if any */}
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900">
            <span className="font-bold">
              Low Stock Alert ({lowStockItems.length} items below minimum safety threshold):
            </span>{" "}
            {lowStockItems.map((item) => `${item.name} (${item.currentStock} ${item.unit})`).join(", ")}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0 mr-1">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full whitespace-nowrap text-xs transition-all ${
              selectedCategory === cat
                ? "bg-slate-900 text-white font-semibold shadow-xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isCritical = item.currentStock <= item.minThreshold;

          return (
            <div
              key={item.id}
              className={`bg-white border rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between ${
                isCritical ? "border-amber-300 ring-1 ring-amber-100" : "border-slate-200"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">{item.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Location: {item.storageLocation}</p>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full shrink-0 ${
                      isCritical
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}
                  >
                    {isCritical ? "Low Stock" : "Adequate"}
                  </span>
                </div>

                {/* Stock Gauge */}
                <div className="mt-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Current Stock</span>
                      <div className="text-2xl font-extrabold text-slate-900 mt-0.5">
                        {item.currentStock}{" "}
                        <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                      </div>
                    </div>
                    <div className="text-right text-[11px] text-slate-500">
                      <span>Threshold:</span>{" "}
                      <strong className="text-slate-700">{item.minThreshold}</strong>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-2 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isCritical ? "bg-amber-500" : "bg-teal-600"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.round((item.currentStock / (item.minThreshold * 2.5)) * 100))}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-400">
                  Last restocked: <span className="text-slate-600">{item.lastRestocked}</span>
                </div>
              </div>

              {/* Adjust buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onUpdateStock(item.id, Math.max(0, item.currentStock - 1))}
                    className="w-7 h-7 rounded border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 font-bold"
                    title="Deduct 1"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onUpdateStock(item.id, item.currentStock + 5)}
                    className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 text-xs text-slate-700 font-medium"
                    title="Add 5"
                  >
                    +5
                  </button>
                  <button
                    onClick={() => onUpdateStock(item.id, item.currentStock + 10)}
                    className="px-2 py-1 rounded border border-slate-200 hover:bg-slate-100 text-xs text-slate-700 font-medium"
                    title="Add 10"
                  >
                    +10
                  </button>
                </div>

                <button
                  onClick={() => onReorder(item.id)}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors"
                >
                  <ShoppingCart className="w-3 h-3 text-teal-600" />
                  <span>Requisition</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
