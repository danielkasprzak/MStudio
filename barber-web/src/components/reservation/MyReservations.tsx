import { useQuery } from '@tanstack/react-query';
import { fetchMyReservations, queryClient } from '../../utils/http';

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

    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-white border border-stone-300 px-8 pt-8 pb-4'>
                {data.map((reservation) => (
                    <li key={reservation.reservationId} className="mb-4">
                        <h2 className="text-white font-semibold">{reservation.reservationId}</h2>
                        <p className="text-neutral-300">Usługi: {reservation.reservationDateTime}</p>
                        <p className="text-neutral-300">Cena: {reservation.price}zł</p>
                        <p className="text-neutral-300">Czas: {reservation.duration} minut</p>
                    </li>
                ))}
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