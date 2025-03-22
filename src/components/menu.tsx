"use client";

import { useEffect } from "react";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation"; // 🔥 Importa desde 'next/navigation'
import { createTheme } from "@mui/material/styles";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";

import IconAdmin from "../components/icons/iconAdminCash/verde";
import Link from "next/link";

// 📌 Configuración del menú de navegación
const NAVIGATION: Navigation = [
  { kind: "header", title: "Main items" },
  { segment: "presupuestos", title: "Presupuesto", icon: <DashboardIcon /> },
  { segment: "cuentas", title: "Todas las cuentas", icon: <DashboardIcon /> },
  { segment: "reflejo", title: "Reflejo", icon: <ShoppingCartIcon /> },
  { kind: "divider" },
  { kind: "header", title: "Analytics" },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      { segment: "sales", title: "Sales", icon: <DescriptionIcon /> },
      { segment: "traffic", title: "Traffic", icon: <DescriptionIcon /> },
    ],
  },
  { segment: "integrations", title: "Integrations", icon: <LayersIcon /> },
];

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  colorSchemes: {
    light: { palette: { background: { default: "#ffffff", paper: "#f5f5f5" }, text: { primary: "#1D8647" } } },
    dark: { palette: { background: { default: "#1D8647", paper: "#333333" }, text: { primary: "#ffffff" } } },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});



// 📌 Título del Dashboard con Logo
function CustomAppTitle() {
  return (
    <Link href="/">
      <div className="flex items-center">
        <IconAdmin />
        <h1 className="text-3xl font-medium p-2">AdminCash</h1>
      </div>
    </Link>
  );
}

// 📌 Props de Menu
interface DemoProps {
  children: React.ReactNode;
}

// 📌 Componente Principal Menu
const Menu: React.FC<DemoProps> = ({ children }) => {
  const routerr = useDemoRouter("/presupuestos"); // 🔥 Usa 'useDemoRouter' en lugar de 'useRouter'

  const router = useRouter(); // 🔥 Usa 'next/navigation'
  const pathname = usePathname(); // 🔥 Obtiene la ruta actual

  // ✅ Solución: redirigir solo si la ruta es diferente
  useEffect(() => {
    if (pathname !== routerr.pathname) {
      router.push(routerr.pathname);
    }
  }, [pathname, routerr.pathname, router]);

  return (
    <AppProvider navigation={NAVIGATION} router={routerr} theme={demoTheme}>
      <DashboardLayout slots={{ appTitle: CustomAppTitle }}>
        {children}
      </DashboardLayout>
    </AppProvider>
  );
};

export default Menu;
