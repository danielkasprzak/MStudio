import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, fetchOffers, deleteOffer } from '../../../utils/http';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Offer from './Offer';
import Title from '../Title';
import SmallButton from '../SmallButton';

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const navigate = useNavigate();

    const { data = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <div>Error loading offers</div>;

    const { mutate, isPending } = useMutation({
        mutationFn: deleteOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
            navigate('/admin/oferty');
        }
    });
    
    function handleDeleteClick(id: number) {
        mutate({ id });
    }    

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white m-16 mr-8 text-charcoal font-lato p-8 border border-stone-300'>
                <div className='flex flex-row'>
                    <Title padding='8'>Oferta</Title>
                    <SmallButton>
                        <Link to={`dodaj`}>Dodaj</Link>
                    </SmallButton>
                </div>
            
                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((offer) => (
                            <div className='flex flex-row'>
                                <Offer key={offer.id} label={offer.label} price={offer.price} time={offer.duration} description={offer.description} />
                                <div className='flex flex-row'>
                                    <SmallButton>
                                        <Link to={`${offer.id}`}>Edytuj</Link>
                                    </SmallButton>
                                    {isPending ? <div>Usuwanie...</div> : <SmallButton onClick={() => handleDeleteClick(offer.id)}>Usuń</SmallButton>}
                                </div>
                            </div>
                        ))}
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