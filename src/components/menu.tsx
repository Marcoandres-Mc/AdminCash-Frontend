"use client";
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';

import IconAdmin from '../components/icons/iconAdminCash/verde'
import Link from 'next/link';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'presupuesto',
        title: 'Presupuesto',
        icon: <DashboardIcon />,
    },
    {
        segment: 'todasLasCuentas',
        title: 'Todas las cuentas',
        icon: <DashboardIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: {
        light: {
            palette: {
                background: {
                    default: '#ffffff',
                    paper: '#f5f5f5', // Color for header and nav
                },
                text: {
                    primary: '#1D8647',
                },
            },
        },
        dark: {
            palette: {
                background: {
                    default: '#1D8647',
                    paper: '#333333', // Color for header and nav
                },
                text: {
                    primary: '#ffffff',
                },
            },
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});


function CustomAppTitle() {
    return (
        <Link href="/">
            <div className='flex items-center'>
                <IconAdmin/>
                
                <h1 className='text-3xl font-medium p-2'>AdminCash</h1>
            </div>
        </Link>
    );
  }


interface DemoProps {
    children: React.ReactNode;
}

const Menu: React.FC<DemoProps> = ({ children }) => {
    const router = useDemoRouter('/dashboard');

    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            
        >          
            <DashboardLayout
                slots={{
                    appTitle: CustomAppTitle,
            }}>
                {children}
            </DashboardLayout>
        </AppProvider>
    );
};

export default Menu;
