import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild
} from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Pencil, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Birthdays',
        href: '/birthdays',
    },
];

const birthdays = [
    { id: 1, name: "Sarah", date: "2025-06-01", note: "" },
    { id: 2, name: "Youssef", date: "2025-05-30", note: "Loves chocolate cake" },
];

function daysLeft(dateStr: string): number {
    const today = new Date();
    const bday = new Date(dateStr);
    bday.setFullYear(today.getFullYear());
    if (bday < today) {
        bday.setFullYear(today.getFullYear() + 1);
    }
    const diffMs = bday.getTime() - today.getTime();
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export default function Birthdays() {
    const [openId, setOpenId] = useState<number | null>(null);
    const [notes, setNotes] = useState<{ [key: number]: string }>({});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Birthdays" />
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-8">Upcoming Birthdays 🎂</h1>
                <div className="space-y-4">
                    {birthdays.map((b) => (
                        <div
                            key={b.id}
                            className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-5 relative"
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar/Initials */}
                                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold shadow">
                                    {b.name[0]}
                                </div>
                                <div>
                                    <div className="text-xl font-semibold">{b.name}</div>
                                    <div className="text-gray-500">
                                        {new Date(b.date).toLocaleDateString(undefined, {
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                        <span className="ml-2 bg-blue-50 px-3 py-1 rounded-xl text-blue-700 font-medium text-xs">
                      {daysLeft(b.date)} days left
                    </span>
                                    </div>
                                </div>
                            </div>
                            {/* Note button */}
                            <button
                                className="ml-4 p-2 bg-gray-100 rounded-full hover:bg-blue-200 transition"
                                onClick={() => setOpenId(b.id)}
                                aria-label="Add note"
                            >
                                <Pencil size={20} />
                            </button>

                            {/* Slide-in Note Field */}
                            <Transition show={openId === b.id} as={Fragment}>
                                <Dialog
                                    as="div"
                                    className="fixed inset-0 z-40 flex"
                                    onClose={() => setOpenId(null)}
                                >
                                    {/* Overlay comes FIRST */}
                                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                                    <TransitionChild
                                        as={Fragment}
                                        enter="transform transition ease-in-out duration-300"
                                        enterFrom="-translate-x-full"
                                        enterTo="translate-x-0"
                                        leave="transform transition ease-in-out duration-300"
                                        leaveFrom="translate-x-0"
                                        leaveTo="-translate-x-full"
                                    >
                                        <DialogPanel className="relative w-full max-w-sm bg-white shadow-2xl p-6 rounded-r-2xl flex flex-col">
                                            <div className="flex items-center justify-between mb-4">
                                                <DialogTitle className="text-lg font-bold">
                                                    Note for {b.name}
                                                </DialogTitle>
                                                <button
                                                    onClick={() => setOpenId(null)}
                                                    className="p-1 rounded hover:bg-gray-200"
                                                    aria-label="Close"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>
                                            <textarea
                                                className="w-full h-32 rounded-lg border p-3 text-base focus:ring-2 focus:ring-blue-400"
                                                value={notes[b.id] ?? b.note ?? ""}
                                                placeholder="Add a note..."
                                                onChange={e =>
                                                    setNotes({ ...notes, [b.id]: e.target.value })
                                                }
                                            />
                                            <button
                                                onClick={() => setOpenId(null)}
                                                className="mt-6 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold"
                                            >
                                                Save
                                            </button>
                                        </DialogPanel>
                                    </TransitionChild>
                                </Dialog>
                            </Transition>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
