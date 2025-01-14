import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { generateReservationId } from '../../../utils/utils';
import { queryClient, fetchAvailableSlots, bookNewReservation } from '../../../utils/http';
import store from '../../../store/index';
import { useAppSelector } from '../../../store/hooks';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

import DatesSwiper from './DatesSwiper';
import HoursSwiper from './HoursSwiper';

type AvailabilityModel = string;

interface ReservationModel {
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
    price: number;
}

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    const totalDuration = useAppSelector((state) => state.cart.totalDuration);
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const services = useAppSelector((state) => state.cart.items);
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

    const { mutate, isPending } = useMutation({
        mutationFn: bookNewReservation,
        onSuccess: () => {
            setActiveDate(null);
            setActiveSlot(null);
            queryClient.invalidateQueries({ queryKey: ['availableSlots', totalDuration] });
        }
    });
    
    function handleBooking() {
        if (!activeDate || !activeSlot || 
            !totalDuration || totalDuration <= 0 || 
            !totalPrice || totalPrice <= 0 || 
            !services) return;

        const newReservation: ReservationModel = {
            reservationId: generateReservationId(),
            email: "email@mail.com",
            services: JSON.stringify(services),
            duration: totalDuration,
            reservationDateTime: activeSlot,
            phone: "123456789", // TODO: get from user
            price: totalPrice
        };

        mutate(newReservation);
    }    

    function handleActiveDate(newDate: string) {
        setActiveDate(newDate);
    }

    function handleActiveSlot(newSlot: string) {
        setActiveSlot(newSlot);
    }

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">REZERWACJA WIZYTY</h1>

                <DatesSwiper setActiveDate={handleActiveDate} dates={dates} />

                {activeDate && (
                    <HoursSwiper onSlotSelect={handleActiveSlot} slots={groupedSlots[activeDate]} />
                )}

                {activeDate} {activeSlot}

                {isPending ? <div>Rezerwowanie...</div> : <button onClick={handleBooking} className="w-full uppercase font-bold text-xs tracking-wider font-lato border text-charcoal border-stone-300 px-4 py-2 flex flex-row justify-center items-center">Zarezerwuj</button>}
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