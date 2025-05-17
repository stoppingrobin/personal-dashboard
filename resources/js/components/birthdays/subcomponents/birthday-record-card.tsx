import moment from 'moment';
import { useEffect, useState } from 'react';

export function BirthdayRecordCard(record: BirthdaysRecord) {


    const [daysLeft, setDaysLeft] = useState('Loading...');


    function timeUntilBirthday(dateStr: string): void {
        // Extraire le jour et le mois, puis mettre l'année actuelle
        const [day, month] = dateStr.split('-');
        const currentYear = moment().year();
        let birthdayThisYear = moment(`${day}-${month}-${currentYear}`, 'DD-MM-YYYY').endOf('day');
        const now = moment();

        if (birthdayThisYear.isBefore(now)) {
            birthdayThisYear = birthdayThisYear.add(1, 'years');
        }

        const duration = moment.duration(birthdayThisYear.diff(now));
        const days = Math.floor(duration.asDays());
        const minutes = Math.floor(duration.asMinutes()) % (24 * 60);

        if (days > 1) {
            setDaysLeft(`${days} days and ${minutes} minutes left.`);
        } else if (days === 1) {
            setDaysLeft(`1 day left.`);
        } else {
            setDaysLeft(`Today is the birthday!`);
        }
    }


    useEffect(() => {
        setInterval(() => {
            timeUntilBirthday(record.date);
        }, 600);
    }, []);


    return (
        <div key={`${record.name}${record.date}`}
             className="w-full flex flex-row gap-2 justify-between items-center bg-white/10 rounded-xl p-3 text-center shadow-sm border border-white/10">
            <div>
                {record.name}
            </div>

            <div>
                {daysLeft}
            </div>
        </div>
    );
}