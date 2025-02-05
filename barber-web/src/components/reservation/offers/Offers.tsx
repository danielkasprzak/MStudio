import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOffers, queryClient } from '../../../utils/http';
import { Offer as OfferModel } from '../../../interfaces/offersInterfaces';

import Offer from "./Offer"
import Title from '../../Title';
import SearchBar from '../../SearchBar';
import Label from '../../Label';

interface Props {
    isTraditional: boolean;
}

export default ({ isTraditional } : Props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <Label>Błąd wczytywania ofert</Label>;

    const filteredOffers = data.filter(offer =>
        offer.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.label.localeCompare(b.label));

    return (
        <div className="h-auto w-fit md:w-[46rem] bg-white border border-stone-300 p-8 md:p-8 mb-8 md:mb-0 z-30">
            <div className='flex flex-row items-center'>
                <Title>Oferta</Title>
                <SearchBar forOffers searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
            <ul className='w-full h-fit'>
                {filteredOffers.map((offer) => (
                    <Offer 
                        key={offer.id} 
                        id={offer.id} 
                        label={offer.label} 
                        price={offer.price} 
                        time={offer.duration} 
                        description={offer.description} 
                        isTraditional={isTraditional} 
                    />
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