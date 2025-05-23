import { useEffect, useState } from 'react';
import { ApiClient } from '@/lib/api-client';
import { BirthdayRecordCard } from '@/components/birthdays/subcomponents/birthday-record-card';
import { ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { BirthdaysRecord } from '@/types/interfaces/birthday-records';

export default function BirthdayWidget() {


    const apiClient = new ApiClient();
    const [birthdayRecords, setBirthdayRecords] = useState<BirthdaysRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        void apiClient.get<BirthdaysRecord[]>('api/birthdays/upcoming').then((res) => {
            setIsLoading(true);
            setBirthdayRecords(res);
        })
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);


    return (
        <div className="w-full h-full flex flex-col p-4">
            {isLoading ?
                (<div>Loading...</div>)
                :
                <div className="w-full h-full flex flex-col justify-between">
                    <div className="w-full flex flex-row items-center justify-between gap-2 ">
                        <h2 className="text-xl font-semibold">Birthdays</h2>
                        <Link href="/birthdays">
                            <ArrowUpRight className="w-6" />

                        </Link>
                    </div>

                    <div className="flex flex-col gap-3 ">
                        {birthdayRecords.map((birthdayRecord) => (
                            <BirthdayRecordCard
                                key={birthdayRecord.name}
                                name={birthdayRecord.name}
                                next_occurence={birthdayRecord.next_occurence}
                                days_left={birthdayRecord.days_left}
                                date={birthdayRecord.date}
                            />
                        ))}
                    </div>
                </div>

            }


        </div>

    );
}