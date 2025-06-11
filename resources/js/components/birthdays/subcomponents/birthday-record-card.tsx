import { useEffect, useState } from 'react';
import { BirthdaysRecord } from '@/types/interfaces/birthday-records';

export function BirthdayRecordCard(record: BirthdaysRecord) {

    const [daysLeft, setDaysLeft] = useState('Loading ...');

    const handleTimeLeftReturn = (daysLeft: number): void => {
        daysLeft = Math.floor(daysLeft);
        switch (daysLeft) {
            case 1 :
                setDaysLeft('Tomorrow !');
                break;
            case 0 :
                setDaysLeft('Today');
                break;
            default :
                setDaysLeft(`in ${daysLeft} days`);
                break;
        }
    };

    useEffect(() => {
        setInterval(() => {
            handleTimeLeftReturn(record.days_left);
        }, 6000);
    }, []);

    return (
        <div key={`${record.id}`}
             className="w-full flex flex-row gap-2 justify-between items-center bg-white/10 rounded-xl p-3 text-center shadow-sm border border-white/10">
            <div>
                {record.name}
            </div>

            <div>
                {daysLeft}
                {record.next_occurence}
            </div>
        </div>
    );
}