import Title from '../Title';
import SmallButton from '../SmallButton';
import { useEffect, useState } from 'react';
import { Form, ActionFunction, LoaderFunctionArgs, useParams } from 'react-router-dom';
import { queryClient, fetchOffer } from '../../../../util/http';
import { useQuery } from '@tanstack/react-query';

interface Props {
    editType: string;
}

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default ({ editType } : Props) => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);

    const params = useParams();

    const { data, error } = useQuery<OfferModel>({
        queryKey: ['offer', params.id],
        queryFn: () => fetchOffer({ id: Number(params.id) }),
        enabled: !!params.id
    });
        
    useEffect(() => {
        if (data) {
            setLabel(data.label);
            setDescription(data.description || '');
            setPrice(data.price);
            setDuration(data.duration);
        }
    }, [data]);

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>{editType === 'new' ? 'Dodaj ofertę' : 'Edytuj ofertę'}</Title>
            <Form className='font-lato flex flex-col'>
                <input value={label} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Nazwa'
                onChange={(e) => setLabel(e.target.value)}/>
                <input value={description} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Opis'
                onChange={(e) => setDescription(e.target.value)}/>
                <input value={price} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Cena'
                onChange={(e) => setPrice(Number(e.target.value))} />
                <input value={duration} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Czas trwania'
                onChange={(e) => setDuration(Number(e.target.value))}/>
                <SmallButton type='submit'>{editType === 'new' ? 'Dodaj' : 'Zapisz'}</SmallButton>
            </Form>
        </div>
    );
}

export function loader({ params }: LoaderFunctionArgs) {
    return queryClient.fetchQuery({
        queryKey: ['offer', params.id],
        queryFn: () => fetchOffer({ id: Number(params.id) })
    });
}

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    const updatedOfferData = Object.fromEntries(formData);

    
}