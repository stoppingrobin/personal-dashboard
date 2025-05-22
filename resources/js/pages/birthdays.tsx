import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Birthdays',
        href: '/birthdays',
    },
];
export default function Birthdays() {

    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Birthdays" />
        </AppLayout>
    )
}