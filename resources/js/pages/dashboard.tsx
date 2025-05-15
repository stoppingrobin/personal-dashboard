import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import WeatherComp from '@/components/weather/weather-comp';
import { useEffect, useState } from 'react';
import moment from 'moment';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboards',
        href: '/dashboard',
    },
];


export default function Dashboard() {
    const [currentDate, setCurrentDate] = useState<string>(moment().format('ddd. DD MMMM'))
    const [currentTime, setCurrentTime] = useState<string>(moment().format('HH:mm'))

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(moment().format('HH:mm'));
            setCurrentDate(moment().format('ddd. DD MMMM'))
        }, 6000);

        return () => clearInterval(timer);
    }, []);


    return (
        <AppLayout breadcrumbs={breadcrumbs} infoPanel={`${currentDate} - ${currentTime}`} >
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                    <div
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern
                            className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div
                        className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border no-scrollbar">
                        <WeatherComp />
                    </div>
                </div>
                <div
                    className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
