import { useQuery } from '@tanstack/react-query';
import { fetchOffers, queryClient } from '../../utils/http';

import Offer from "./Offer"

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const { data = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <div>Error loading offers</div>;

    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-white border border-stone-300 px-8 pt-8 pb-4'>
                {data.map((offer) => (
                    <Offer key={offer.id} id={offer.id} label={offer.label} price={offer.price} time={offer.duration} description={offer.description} />
                ))}
            </ul>
        </div>
    )
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });
}