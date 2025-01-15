import { useEffect, useState } from 'react';

import FormInput from '../FormInput';
import { generateReservationId } from '../../../utils/utils';
import FormLabel from '../FormLabel';

interface Props {
    children: React.ReactNode;
    inputData: {
        reservationId: string;
        email: string;
        services: string;
        duration: number;
        reservationDateTime: string;
        phone: string;
        price: number;
    };
    onSubmit: (data: any) => void;
}

export default ({ children, inputData, onSubmit }: Props) => {
    const [reservationId, setReservationId] = useState(inputData.reservationId);
    const [email, setEmail] = useState(inputData.email);
    const [services, setServices] = useState(inputData.services);
    const [duration, setDuration] = useState(inputData.duration);
    const [reservationDateTime, setReservationDateTime] = useState(inputData.reservationDateTime);
    const [phone, setPhone] = useState(inputData.phone);
    const [price, setPrice] = useState(inputData.price);

    useEffect(() => {
        setReservationId(inputData.reservationId);
        setEmail(inputData.email);
        setServices(inputData.services);
        setDuration(inputData.duration);
        setReservationDateTime(inputData.reservationDateTime);
        setPhone(inputData.phone);
        setPrice(inputData.price);
    }, [inputData]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (reservationId === '' || reservationId === null)
            data.reservationId = generateReservationId();

        onSubmit({ ...data });
    }

    return (
        <form onSubmit={handleSubmit} className='font-lato flex flex-col'>
            <FormLabel htmlFor='reservationDateTime'>Data i godzina rezerwacji:</FormLabel>
            <FormInput name='reservationDateTime' id="reservationDateTime" defaultVal={reservationDateTime} required onChange={(e) => setReservationDateTime(e.target.value)} type='datetime-local' />
            
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <FormInput name='email' id="email" defaultVal={email} required onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'/>
            
            <FormLabel htmlFor='services'>Services:</FormLabel>
            <FormInput name='services' id="services" defaultVal={services} required onChange={(e) => setServices(e.target.value)} type='text' placeholder='Services'/>
            
            <FormLabel htmlFor='duration'>Całkowity czas trwania:</FormLabel>
            <FormInput name='duration' id="duration" defaultVal={duration} required onChange={(e) => setDuration(e.target.value)} type='number' placeholder='Czas trwania'/>
            
            <FormLabel htmlFor='phone'>Telefon:</FormLabel>
            <FormInput name='phone' id="phone" defaultVal={phone} required onChange={(e) => setPhone(e.target.value)} type='tel' placeholder='Telefon'/>
            
            <FormLabel htmlFor='price'>Cena całkowita:</FormLabel>
            <FormInput name='price' id="price" defaultVal={price} required onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Cena całkowita'/>

            {children}
        </form>
    );
};