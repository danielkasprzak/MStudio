import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, fetchOffers, deleteOffer } from '../../../utils/http';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Offer as OfferModel } from '../../../interfaces/offersInterfaces';

import Offer from './Offer';
import Title from '../../Title';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const navigate = useNavigate();

    const { data = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

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
        <div className='w-full relative flex flex-col items-center md:flex-row md:justify-center md:items-start'>
            <div className='relative w-[calc(100%-4rem)] md:w-fit h-full bg-white m-8 md:m-16 md:mr-8 text-charcoal font-lato p-4 md:p-8 border border-stone-300'>
                <div className='flex flex-row items-center'>
                    <Title padding='8'>Oferta</Title>
                    <Link to='dodaj'>
                        <TextButton>Dodaj</TextButton>
                    </Link>     
                </div>
            
                <div className='relative w-auto p-4 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((offer) => (
                            <li key={offer.id} className='flex flex-col md:flex-row items-center mt-4'>
                                <Offer id={offer.id} label={offer.label} price={offer.price} duration={offer.duration} description={offer.description} />
                                <div className='flex flex-row items-center py-4 md:py-0'>
                                    <Link className="flex flex-row items-center" to={`${offer.id}`}>
                                        <TextButton>Edytuj</TextButton>
                                    </Link>
                                    {isPending ? <Label>Usuwanie...</Label> : 
                                    <TextButton onClick={() => handleDeleteClick(offer.id)}>Usuń</TextButton>}
                                </div>
                            </li>
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