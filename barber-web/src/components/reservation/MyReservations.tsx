import { useQuery } from '@tanstack/react-query';
import { fetchMyReservations, queryClient } from '../../utils/http';
import MyReservation from './MyReservation';

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

    if (error) return <div>Error loading offers</div>;

    const now = new Date();

    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-white border border-stone-300 px-8 pt-8 pb-4'>
                {data.map((reservation) => {
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