import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, fetchReservations, cancelReservation } from '../../../utils/http';
import { getTodayDate } from '../../../utils/utils';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Title from '../../Title';
import Reservation from './Reservation';
import FormInput from '../FormInput';
import { useState } from 'react';
import TextButton from '../../TextButton';

interface ReservationModel {
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
    price: number;
    isCancelled: boolean;
}

export default () => {
    const [startDate, setStartDate] = useState(getTodayDate());
    const [endDate, setEndDate] = useState(getTodayDate());
    const [filter, setFilter] = useState<'active' | 'cancelled' | 'past' | 'all'>('active');

    const { data = [], error } = useQuery<ReservationModel[]>({
        queryKey: ['fetchedReservations', { startDate, endDate }],
        queryFn: () => fetchReservations({ startDate, endDate })
    });

    if (error) return <div>Error loading offers</div>;

    const { mutate, isPending } = useMutation({
        mutationFn: cancelReservation,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fetchedReservations'] });
        }
    });
    
    function handleCancelClick(id: string) {
        mutate({ id });
    }    

    const now = new Date();

    const filteredData = data.filter((reservation) => {
        const reservationDate = new Date(reservation.reservationDateTime);
        const isPast = reservationDate < now;

        if (filter === 'active') {
            return !reservation.isCancelled && !isPast;
        } else if (filter === 'cancelled') {
            return reservation.isCancelled;
        } else if (filter === 'past') {
            return isPast && !reservation.isCancelled;
        } else {
            return true;
        }
    });

    const sortedData = filteredData.sort((a, b) => {
        const dateA = new Date(a.reservationDateTime).getTime();
        const dateB = new Date(b.reservationDateTime).getTime();
        const isPastA = new Date(a.reservationDateTime) < now;
        const isPastB = new Date(b.reservationDateTime) < now;

        if (!a.isCancelled && !isPastA && (b.isCancelled || isPastB)) return -1;
        if ((a.isCancelled || isPastA) && !b.isCancelled && !isPastB) return 1;
        return dateA - dateB;
    });

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full border border-stone-300 bg-white m-16 mr-8 text-charcoal font-lato p-8'>
                <div className='flex flex-row'>
                    <Title padding='8'>Rezerwacje</Title>
                    <TextButton>
                        <Link to={`dodaj`}>Dodaj</Link>
                    </TextButton>
                </div>
            
                <div className='flex flex-row items-center justify-center'>
                    <FormInput name='startDate' defaultVal={startDate} required onChange={(e) => setStartDate(e.target.value)} type='date' placeholder='Data rozpoczęcia'/>
                    <FormInput name='endDate' defaultVal={endDate} required onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='Data zakończenia'/>
                </div>

                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {sortedData.map((reservation) => {
                            const reservationDate = new Date(reservation.reservationDateTime);
                            const isPast = reservationDate < now;
                            return (
                                <div className="flex flex-row" key={reservation.reservationId}>
                                    <Reservation
                                        isPast={isPast}
                                        reservationId={reservation.reservationId}
                                        email={reservation.email}
                                        services={reservation.services}
                                        duration={reservation.duration}
                                        reservationDateTime={reservation.reservationDateTime}
                                        phone={reservation.phone}
                                        price={reservation.price}
                                        isCancelled={reservation.isCancelled}
                                        isPending={isPending}
                                        cancelClick={handleCancelClick}
                                    />
                                </div>
                            );
                        })}
                    </ul>
                </div>
            </div>
        
            <Outlet />
        </div>

    )
}

export function loader() {
    const today = getTodayDate();
    return queryClient.fetchQuery({
        queryKey: ['fetchedReservations', { startDate: today, endDate: today }],
        queryFn: () => fetchReservations({ startDate: today, endDate: today })
    });
}