import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchOffers } from '../../../../util/http';

import Offer from './Offer';
import Title from '../Title';
import SmallButton from '../SmallButton';
import OfferEdit from './OfferEdit';

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const [editType, setEditType] = useState('new');
    const [selectedOffer, setSelectedOffer] = useState<OfferModel | null>(null);

    const { data = [], error, isLoading } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offers</div>;

    const handleEditClick = (offer: OfferModel) => {
        setEditType('edit');
        setSelectedOffer(offer);
    };

    const handleNewClick = () => {
        setEditType('new');
        setSelectedOffer(null);
    };

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
                                    <SmallButton onClick={() => handleEditClick(offer)}>Edytuj</SmallButton>
                                    <SmallButton>Usuń</SmallButton>
                                </div>
                            </div>
                        ))}
                        <SmallButton onClick={handleNewClick}>Dodaj</SmallButton>
                    </ul>
                </div>
            </div>
        
            <OfferEdit editType={editType} offer={selectedOffer} />
        </div>

    )
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });
}