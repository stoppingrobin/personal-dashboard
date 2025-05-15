import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    infoPanel?: string
}

export default ({ children, breadcrumbs, infoPanel, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} infoPanel={infoPanel} {...props}>
        {children}
    </AppLayoutTemplate>
);
