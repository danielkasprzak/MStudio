import { useQuery } from '@tanstack/react-query';
import { fetchOffers } from '../../../util/http';

import Offer from "./Offer"

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const { data = [], error, isLoading } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offers</div>;

    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-dark-foreground rounded-2xl px-8 pt-8 pb-4'>
                {data.map((offer) => (
                    <Offer key={offer.id} id={offer.id} label={offer.label} price={offer.price} time={offer.duration} description={offer.description} />
                ))}
            </ul>
        </div>
    )
}