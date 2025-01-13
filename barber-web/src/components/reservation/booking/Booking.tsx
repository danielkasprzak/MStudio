import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchAvailableSlots } from '../../../utils/http';
import store from '../../../store/index';
import { useAppSelector } from '../../../store/hooks';
import { formatDateShortMonth, formatDateOnlyDay } from '../../../utils/utils';
import { useState } from 'react';

type AvailabilityModel = string;

export default () => {
    const totalDuration = useAppSelector((state) => state.cart.totalDuration);
    const [activeDate, setActiveDate] = useState<string | null>(null);


    const { data = [], error } = useQuery<AvailabilityModel[]>({
        queryKey: ['availableSlots', totalDuration],
        queryFn: () => fetchAvailableSlots(totalDuration)
    });
    
    if (error) return <div>Error loading offers</div>;

    const groupedSlots = data.reduce((acc, slot) => {
        const date = slot.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">REZERWACJA WIZYTY</h1>


                <ul className="flex flex-row">
                    {Object.entries(groupedSlots).map(([date]) => (
                        <li
                            key={date}
                            className="m-2 p-4 border-b border-stone-300 flex flex-col justify-center items-center"
                            onClick={() => setActiveDate(date)}
                        >
                            <div className='text-charcoal uppercase font-bold text-xl tracking-wider font-lato'>{formatDateOnlyDay(date)}</div>
                            <div className='text-charcoal uppercase font-bold text-xs tracking-wider font-lato'>{formatDateShortMonth(date)}</div>
                        </li>
                    ))}
                </ul>

                {activeDate && (
                    <div className="flex flex-row">
                        {groupedSlots[activeDate].map((slot) => (
                            <div key={slot} className='m-2 p-2 border border-stone-300 text-charcoal uppercase font-bold text-xs tracking-wider font-lato'>
                                {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export function loader() {
    const duration = store.getState().cart.totalDuration;

    return queryClient.fetchQuery({
        queryKey: ['availableSlots', duration],
        queryFn: () => fetchAvailableSlots(duration)
    });
}