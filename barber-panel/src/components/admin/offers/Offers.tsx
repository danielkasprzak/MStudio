import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchOffers } from '../../../../util/http';

import Offer from './Offer';
import Title from '../Title';
import SmallButton from '../SmallButton';
import { Link, Outlet } from 'react-router-dom';

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
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white m-16 mr-8 text-charcoal font-lato p-8'>
                <Title padding='8'>Oferta</Title>
            
                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((offer) => (
                            <div className='flex flex-row'>
                                <Offer key={offer.id} id={offer.id} label={offer.label} price={offer.price} time={offer.duration} description={offer.description} />
                                <div className='flex flex-row'>
                                    <SmallButton>
                                        <Link to={`${offer.id}`}>Edytuj</Link>
                                    </SmallButton>
                                    <SmallButton>Usuń</SmallButton>
                                </div>
                            </div>
                        ))}
                        <SmallButton>Dodaj</SmallButton>
                    </ul>
                </div>
            </div>
        
            <Outlet />
        </div>

    )
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });
}