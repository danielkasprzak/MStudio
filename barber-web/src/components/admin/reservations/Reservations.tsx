import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, fetchReservations, cancelReservation } from '../../../utils/http';
import { getTodayDate } from '../../../utils/utils';
import { Link, Outlet } from 'react-router-dom';
import { Reservation as ReservationModel } from '../../../interfaces/reservationsInterfaces';

import Title from '../../Title';
import Reservation from './Reservation';
import FormInput from '../FormInput';
import TextButton from '../../TextButton';
import FlatButton from '../../FlatButton';
import SearchBar from '../../SearchBar';
import Label from '../../Label';

export default () => {
    const [startDate, setStartDate] = useState(getTodayDate());
    const [endDate, setEndDate] = useState(getTodayDate());
    const [filter, setFilter] = useState<'active' | 'cancelled' | 'past' | 'all'>('active');
    const [searchTerm, setSearchTerm] = useState('');

    const { data = [], error } = useQuery<ReservationModel[]>({
        queryKey: ['fetchedReservations', { startDate, endDate }],
        queryFn: () => fetchReservations({ startDate, endDate })
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

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
    }).filter(reservation =>
        reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.phone.includes(searchTerm) ||
        reservation.reservationId.toLowerCase().includes(searchTerm)
    );

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
        <div className='w-full relative flex flex-col items-center md:flex-row md:justify-center md:items-start'>
            <div className='relative w-[calc(100%-4rem)] md:w-fit h-full border border-stone-300 bg-white m-8 md:m-16 md:mr-8 text-charcoal font-lato p-4 md:p-8'>
                <div className='flex flex-row'>
                    <Title padding='8'>Rezerwacje</Title>
                    <TextButton>
                        <Link to={`dodaj`}>Dodaj</Link>
                    </TextButton>
                </div>

                <div className='w-full flex flex-row justify-center items-center py-4'>
                    <FlatButton margin='2' disabled={false} onClick={() => setFilter('active')} isActive={filter === 'active'}>Aktywne</FlatButton>
                    <FlatButton margin='2' disabled={false} onClick={() => setFilter('cancelled')} isActive={filter === 'cancelled'}>Odwołane</FlatButton>
                    <FlatButton margin='2' disabled={false} onClick={() => setFilter('past')} isActive={filter === 'past'}>Historia</FlatButton>
                    <FlatButton margin='2' disabled={false} onClick={() => setFilter('all')} isActive={filter === 'all'}>Wszystkie</FlatButton>
                </div>  

                <div className='w-full flex flex-row justify-center items-center py-4'>
                    <FlatButton margin='2' disabled={false} onClick={() => {
                        const today = getTodayDate();
                        setStartDate(today);
                        setEndDate(today);
                    }} isActive={startDate === getTodayDate() && endDate === getTodayDate()}>Dzisiaj</FlatButton>
                    <FlatButton margin='2' disabled={false} onClick={() => {
                        const today = new Date();
                        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
                        const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
                        setStartDate(startOfWeek.toISOString().split('T')[0]);
                        setEndDate(endOfWeek.toISOString().split('T')[0]);
                    }} isActive={startDate === new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).toISOString().split('T')[0] && endDate === new Date(new Date().setDate(new Date().getDate() - new Date().getDay() + 6)).toISOString().split('T')[0]}>Ten Tydzień</FlatButton>
                    <FlatButton margin='2' disabled={false} onClick={() => {
                        const today = new Date();
                        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                        setStartDate(startOfMonth.toISOString().split('T')[0]);
                        setEndDate(endOfMonth.toISOString().split('T')[0]);
                    }} isActive={startDate === new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0] && endDate === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]}>Ten Miesiąc</FlatButton>
                </div>
            
                <div className='flex flex-row items-center justify-center pb-4'>
                    <FormInput name='startDate' id='startDate' defaultVal={startDate} required onChange={(e) => setStartDate(e.target.value)} type='date' placeholder='Data rozpoczęcia'/>
                    <FormInput name='endDate' id='endDate' defaultVal={endDate} required onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='Data zakończenia'/>
                </div>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />


                <ul className='relative w-full p-8 md:p-16 pt-8 h-full text-charcoal font-lato'>
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