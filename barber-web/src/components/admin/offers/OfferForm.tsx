import { useEffect, useState } from 'react';

import FormInput from '../FormInput';
import FormLabel from '../FormLabel';

interface Props {
    children: React.ReactNode;
    inputData: {
        label: string;
        description?: string;
        price: number;
        duration: number;
    };
    onSubmit: (data: any) => void;
}

export default ({ children, inputData, onSubmit }: Props) => {
    const [label, setLabel] = useState(inputData.label);
    const [description, setDescription] = useState(inputData.description || '');
    const [price, setPrice] = useState(inputData.price);
    const [duration, setDuration] = useState(inputData.duration);

    useEffect(() => {
        setLabel(inputData.label);
        setDescription(inputData.description || '');
        setPrice(inputData.price);
        setDuration(inputData.duration);
    }, [inputData]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        onSubmit({ ...data });
    }

    return (
        <form onSubmit={handleSubmit} className='font-lato flex flex-col'>
            <FormLabel htmlFor='label'>Tytuł:</FormLabel>
            <FormInput id='label' name='label' defaultVal={label} required onChange={(e) => setLabel(e.target.value)} type='text' placeholder='Tytuł'/>
            
            <FormLabel htmlFor='description'>Opis:</FormLabel>
            <FormInput id='description' name='description' defaultVal={description} onChange={(e) => setDescription(e.target.value)} type='text' placeholder='Opis'/>
            
            <FormLabel htmlFor='duration'>Czas trwania:</FormLabel>
            <FormInput id='duration' name='duration' defaultVal={duration} required onChange={(e) => setDuration(Number(e.target.value))} type='number' placeholder='Czas trwania'/>
            
            <FormLabel htmlFor='price'>Cena:</FormLabel>
            <FormInput id='price' name='price' defaultVal={price} required onChange={(e) => setPrice(Number(e.target.value))} type='number' placeholder='Cena'/>
            
            {children}
        </form>
    );
};