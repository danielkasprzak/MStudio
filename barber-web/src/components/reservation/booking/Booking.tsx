import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchAvailableSlots } from '../../../utils/http';
import store from '../../../store/index';
import { useAppSelector } from '../../../store/hooks';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

import DatesSwiper from './DatesSwiper';
import HoursSwiper from './HoursSwiper';

type AvailabilityModel = string;

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    const totalDuration = useAppSelector((state) => state.cart.totalDuration);
    const [activeDate, setActiveDate] = useState<string | null>(null);
    const [activeSlot, setActiveSlot] = useState<string | null>(null);

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

    const dates = Object.keys(groupedSlots);

    function handleActiveDate(newDate: string) {
        setActiveDate((prevDate) => prevDate === newDate ? null : newDate);
    }

    function handleActiveSlot(newSlot: string) {
        setActiveSlot((prevSlot) => prevSlot === newSlot ? null : newSlot);
    }

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">REZERWACJA WIZYTY</h1>

                <DatesSwiper setActiveDate={handleActiveDate} dates={dates} />

                {activeDate && (
                    <HoursSwiper onSlotSelect={handleActiveSlot} slots={groupedSlots[activeDate]} />
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