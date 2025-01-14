import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMyReservations, queryClient } from '../../../utils/http';

import MyReservation from './MyReservation';
import Title from '../../Title';
import FlatButton from '../../FlatButton';

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
    const { data = [], error } = useQuery<ReservationModel[]>({
        queryKey: ['myReservations'],
        queryFn: fetchMyReservations
    });

    const [filter, setFilter] = useState<'active' | 'cancelled' | 'past' | 'all'>('active');

    if (error) return <div>Error loading offers</div>;

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
        <div className="h-auto w-[46rem] bg-white border border-stone-300 p-8">
            <Title>Moje rezerwacje</Title>

            <div className='w-full flex flex-row justify-center items-center py-8'>
                <FlatButton margin='2' disabled={false} onClick={() => setFilter('active')} isActive={filter === 'active'}>Aktywne</FlatButton>
                <FlatButton margin='2' disabled={false} onClick={() => setFilter('cancelled')} isActive={filter === 'cancelled'}>Odwołane</FlatButton>
                <FlatButton margin='2' disabled={false} onClick={() => setFilter('past')} isActive={filter === 'past'}>Historia</FlatButton>
                <FlatButton margin='2' disabled={false} onClick={() => setFilter('all')} isActive={filter === 'all'}>Wszystkie</FlatButton>
            </div>

            <ul className='w-full h-fit'>
                {sortedData.map((reservation) => {
                    const reservationDate = new Date(reservation.reservationDateTime);
                    const isPast = reservationDate < now;
                    return (
                    <MyReservation
                        key={reservation.reservationId}
                        reservationId={reservation.reservationId}
                        services={reservation.services}
                        duration={reservation.duration}
                        reservationDateTime={reservation.reservationDateTime}
                        price={reservation.price}
                        isCancelled={reservation.isCancelled}
                        isPast={isPast}
                    />
                    );
                })}
            </ul>
        </div>
    )
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['myReservations'],
        queryFn: fetchMyReservations
    });
}