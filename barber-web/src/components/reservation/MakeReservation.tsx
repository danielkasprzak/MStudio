import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchAvailableSlots } from '../../utils/http';
import store from '../../store/index';

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {    
    // const { data = [], error } = useQuery<OfferModel[]>({
    //     queryKey: ['availableSlots'],
    //     queryFn: fetchAvailableSlots
    // });
    
    // if (error) return <div>Error loading offers</div>;

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">REZERWACJA WIZYTY</h1>


            </div>
        </div>
    )
}

// export function loader() {
//     const duration = store.getState().cart

//     return queryClient.fetchQuery({
//         queryKey: ['availableSlots'],
//         queryFn: fetchAvailableSlots
//     });
// }