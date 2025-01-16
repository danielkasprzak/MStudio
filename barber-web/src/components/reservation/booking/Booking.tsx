import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { formatDate, generateReservationId } from '../../../utils/utils';
import { queryClient, fetchAvailableSlots, bookNewReservation } from '../../../utils/http';
import store from '../../../store/index';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Reservation as ReservationModel } from '../../../interfaces/reservationsInterfaces';
import { useNavigate } from 'react-router-dom';

import DatesSwiper from './DatesSwiper';
import HoursSwiper from './HoursSwiper';
import Label from '../../Label';
import { basketActions } from '../../../store/basket-slice';

type AvailabilityModel = string;

export default () => {
    useDocumentTitle("MStudio - rezerwacja");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const totalDuration = useAppSelector((state) => state.cart.totalDuration);
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const services = useAppSelector((state) => state.cart.items);
    const [activeDate, setActiveDate] = useState<string | null>(null);
    const [activeSlot, setActiveSlot] = useState<string | null>(null);

    useEffect(() => {
        if (!totalDuration || totalDuration <= 0) {
            navigate('/rezerwacja');
        }
    }, [totalDuration, navigate]);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setActiveDate(today);
    }, []);

    const { data = [], error } = useQuery<AvailabilityModel[]>({
        queryKey: ['availableSlots', totalDuration],
        queryFn: () => fetchAvailableSlots(totalDuration)
    });
    
    if (error) return <Label>Ups.. wystąpił błąd</Label>;

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
            navigate('/dziekujemy');
        }
    });
    
    function handleBooking() {
        if (!activeDate || !activeSlot || 
            !totalDuration || totalDuration <= 0 || 
            !totalPrice || totalPrice <= 0 || 
            !services) return;

        const newReservation: ReservationModel = {
            reservationId: generateReservationId(),
            email: "BRAK ADRESU EMAIL",
            services: JSON.stringify(services),
            duration: totalDuration,
            reservationDateTime: activeSlot,
            phone: "123456789", // TODO: get from user
            price: totalPrice,
            isCancelled: false
        };

        dispatch(basketActions.setReservationDateTime(activeSlot));
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

                <Label>Wybierz datę wizyty</Label>
                <DatesSwiper setActiveDate={handleActiveDate} activeDate={activeDate} dates={dates} />

                {activeDate && (
                    <>
                        <Label>Wybierz godzinę wizyty</Label>
                        <HoursSwiper onSlotSelect={handleActiveSlot} activeSlot={activeSlot} slots={groupedSlots[activeDate]} />
                    </>
                )}

                <Label>Podsumowanie rezerwacji</Label>
                <ul className="w-full font-lato text-xs font-bold border border-stone-300 p-4 mt-4">
                    {services.map((service) => (
                        <li className="font-medium" key={service.id}>{service.label} {service.quantity} x <span className="font-bold">{service.price}zł</span></li>
                    ))}
                </ul>
                <div className='w-full flex flex-col justify-center'>
                    <p className="font-lato text-xs font-medium text-left pt-4 pb-2">Całkowity koszt rezerwacji: <span className="font-bold">{totalPrice}zł</span></p>
                    <p className="font-lato text-xs font-medium text-left pb-8">Planowana data rezerwacji: <span className="font-bold">{activeSlot ? formatDate(activeSlot) : '-'}</span></p>
                </div>

                {isPending ? <Label>Rezerwowanie...</Label> : <button onClick={handleBooking} className="w-full uppercase font-bold text-xs tracking-wider font-lato border text-charcoal border-stone-300 px-4 py-2 flex flex-row justify-center items-center">Zarezerwuj</button>}
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