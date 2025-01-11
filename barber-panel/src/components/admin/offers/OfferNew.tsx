import Title from '../Title';
import SmallButton from '../SmallButton';
import { useState } from 'react';
import { Form, ActionFunction } from 'react-router-dom';
import { queryClient, updateOffer } from '../../../../util/http';
import { useMutation } from '@tanstack/react-query';

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);

    const { mutate } = useMutation({
        mutationFn: updateOffer,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['offers'] });
        }
    });

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>Dodaj ofertę</Title>
            <Form className='font-lato flex flex-col'>
                <input value={label} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Nazwa'
                onChange={(e) => setLabel(e.target.value)}/>
                <input value={description} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Opis'
                onChange={(e) => setDescription(e.target.value)}/>
                <input value={price} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Cena'
                onChange={(e) => setPrice(Number(e.target.value))} />
                <input value={duration} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Czas trwania'
                onChange={(e) => setDuration(Number(e.target.value))}/>
                <SmallButton type='submit'>Dodaj</SmallButton>
            </Form>
        </div>
    );
}

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    const updatedOfferData = Object.fromEntries(formData);

    
}