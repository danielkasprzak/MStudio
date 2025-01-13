import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchAvailableSlots } from '../../utils/http';
import store from '../../store/index';
import { useAppSelector } from '../../store/hooks';

interface AvailabilityModel {
    dateTime: string;
}

export default () => {
    const totalDuration = useAppSelector((state) => state.cart.totalDuration);

    const { data = [], error } = useQuery<AvailabilityModel[]>({
        queryKey: ['availableSlots', totalDuration],
        queryFn: () => fetchAvailableSlots(totalDuration)
    });
    
    if (error) return <div>Error loading offers</div>;

    const groupedSlots = data.reduce((acc, slot) => {
        const date = slot.dateTime.split('T')[0]; // Extract the date part
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot.dateTime);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">REZERWACJA WIZYTY</h1>


                <ul>
                    {Object.entries(groupedSlots).map(([date, slots]) => (
                        <li key={date}>
                            <h2 className="font-bold text-lg">{date}</h2>
                            <ul>
                                {slots.map((slot) => (
                                    <li key={slot}>{new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

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