import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchReservations } from '../../../utils/http';
import { Link, Outlet } from 'react-router-dom';

import Title from '../Title';
import SmallButton from '../SmallButton';
import Reservation from './Reservation';

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
    const { data = [], error } = useQuery<ReservationModel[]>({
        queryKey: ['fetchedReservations'],
        queryFn: fetchReservations
    });

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white m-16 mr-8 text-charcoal font-lato p-8'>
                <Title padding='8'>Harmonogram otwarcia</Title>
            
                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((reservation) => (
                            <div className='flex flex-row'>
                                <Reservation reservationId={reservation.reservationId}
                                email={reservation.email}
                                services={reservation.services}
                                duration={reservation.duration}
                                reservationDateTime={reservation.reservationDateTime}
                                phone={reservation.phone}
                                price={reservation.price} />

                                <div className='flex flex-row'>
                                    <SmallButton>
                                        <Link to={`${reservation.reservationId}`}>Edytuj</Link>
                                    </SmallButton>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        
            <Outlet />
        </div>

    )
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['fetchedReservations'],
        queryFn: fetchReservations
    });
}