"use client";

import { useAuth } from "@/contexts/AuthContext";

// Navigasi yang tersedia per role (TSK-S1-06: Navigasi Dinamis)
export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: "🏠",
    roles: ["owner", "manager", "front_office", "tim_design", "kepala_produksi", "quality_control", "staf_gudang"],
    permission: null,
  },
  {
    id: "inventory",
    label: "Inventori",
    href: "/dashboard/inventory",
    icon: "📦",
    roles: ["owner", "manager", "staf_gudang"],
    permission: "inventory.view",
  },
  {
    id: "orders",
    label: "Order Pelanggan",
    href: "/dashboard/orders",
    icon: "📋",
    roles: ["owner", "manager", "front_office"],
    permission: "order.view",
  },
  {
    id: "bom",
    label: "BOM Calculator",
    href: "/dashboard/bom",
    icon: "⚙️",
    roles: ["owner", "manager", "tim_design"],
    permission: "bom.view",
  },
  {
    id: "spk",
    label: "SPK Digital",
    href: "/dashboard/spk",
    icon: "📄",
    roles: ["owner", "manager", "tim_design", "kepala_produksi"],
    permission: "spk.view",
  },
  {
    id: "production",
    label: "Kanban Produksi",
    href: "/dashboard/production",
    icon: "🏭",
    roles: ["owner", "manager", "kepala_produksi", "quality_control"],
    permission: "production.view",
  },
  {
    id: "qc",
    label: "Quality Control",
    href: "/dashboard/qc",
    icon: "✅",
    roles: ["owner", "manager", "kepala_produksi", "quality_control"],
    permission: "qc.inspect",
  },
  {
    id: "usd-analytics",
    label: "Kurs USD & Harga",
    href: "/dashboard/usd-analytics",
    icon: "📈",
    roles: ["owner", "manager"],
    permission: "usd.view",
  },
  {
    id: "invoices",
    label: "Invoice",
    href: "/dashboard/invoices",
    icon: "🧾",
    roles: ["owner", "manager"],
    permission: "invoice.view",
  },
  {
    id: "reports",
    label: "Laporan",
    href: "/dashboard/reports",
    icon: "📊",
    roles: ["owner", "manager"],
    permission: "report.view",
  },
  {
    id: "audit",
    label: "Audit Trail",
    href: "/dashboard/audit",
    icon: "🔍",
    roles: ["owner", "manager"],
    permission: "audit.view",
  },
  {
    id: "users",
    label: "Manajemen User",
    href: "/dashboard/users",
    icon: "👥",
    roles: ["owner", "manager"],
    permission: "user.view",
  },
];

export function useNavItems() {
  const { user, hasPermission } = useAuth();

  if (!user) return [];

  return NAV_ITEMS.filter((item) => {
    // Filter berdasarkan role
    if (!item.roles.includes(user.role)) return false;
    // Filter berdasarkan permission (jika ada)
    if (item.permission && !hasPermission(item.permission)) return false;
    return true;
  });
}
