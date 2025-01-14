import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchReservations } from '../../../utils/http';
import { getTodayDate } from '../../../utils/utils';
import { Link, Outlet } from 'react-router-dom';

import Title from '../Title';
import SmallButton from '../SmallButton';
import Reservation from './Reservation';
import FormInput from '../FormInput';
import { useState } from 'react';

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
    const [startDate, setStartDate] = useState(getTodayDate());
    const [endDate, setEndDate] = useState(getTodayDate());



    const { data = [], error } = useQuery<ReservationModel[]>({
        queryKey: ['fetchedReservations', { startDate, endDate }],
        queryFn: () => fetchReservations({ startDate, endDate })
    });

    if (error) return <div>Error loading offers</div>;

    const now = new Date();

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full border border-stone-300 bg-white m-16 mr-8 text-charcoal font-lato p-8'>
                <div className='flex flex-row'>
                    <Title padding='8'>Rezerwacje</Title>
                    <SmallButton>
                        <Link to={`dodaj`}>Dodaj</Link>
                    </SmallButton>
                </div>
            
                <FormInput name='startDate' defaultVal={startDate} required onChange={(e) => setStartDate(e.target.value)} type='date' placeholder='Data rozpoczęcia'/>
                <FormInput name='endDate' defaultVal={endDate} required onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='Data zakończenia'/>

                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((reservation) => {
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
                                    />
                                    <div className='flex flex-row'>
                                        <SmallButton>
                                            <Link to={`${reservation.reservationId}`}>Edytuj</Link>
                                        </SmallButton>
                                        <SmallButton>
                                            <Link to={`${reservation.reservationId}`}>Anuluj</Link>
                                        </SmallButton>
                                    </div>
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