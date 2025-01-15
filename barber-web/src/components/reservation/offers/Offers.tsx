import { useQuery } from '@tanstack/react-query';
import { fetchOffers, queryClient } from '../../../utils/http';

import Offer from "./Offer"
import Title from '../../Title';

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
        <div className="h-auto w-[46rem] bg-white border border-stone-300 p-8 z-30">
            <Title>Oferta</Title>

            <ul className='w-full h-fit'>
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