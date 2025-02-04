import { useEffect, useState } from 'react';
import { fetchOffers } from '../../../utils/http';
import { generateReservationId } from '../../../utils/utils';
import { Offer as OfferModel } from '../../../interfaces/offersInterfaces';
import { useQuery } from '@tanstack/react-query';

import FormInput from '../FormInput';
import FormLabel from '../FormLabel';
import Label from '../../Label';

interface Service {
    id: number;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

interface Props {
    children: React.ReactNode;
    inputData: {
        reservationId: string;
        email: string;
        services: Service[];
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
    const [duration, setDuration] = useState(inputData.duration);
    const [reservationDateTime, setReservationDateTime] = useState(inputData.reservationDateTime);
    const [phone, setPhone] = useState(inputData.phone);
    const [price, setPrice] = useState(inputData.price);

    const { data: offers = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <Label>Błąd podczas wczytywania ofert</Label>;

    useEffect(() => {
        setReservationId(inputData.reservationId);
        setEmail(inputData.email);
        setDuration(inputData.duration);
        setReservationDateTime(inputData.reservationDateTime);
        setPhone(inputData.phone);
        setPrice(inputData.price);
    }, [inputData]);

    const [selectedServices, setSelectedServices] = useState<Service[]>(inputData.services || []);

    useEffect(() => {
        const totalDuration = selectedServices.reduce((sum, service) => sum + service.time * service.quantity, 0);
        const totalPrice = selectedServices.reduce((sum, service) => sum + service.price * service.quantity, 0);
        setDuration(totalDuration);
        setPrice(totalPrice);
    }, [selectedServices]);

    const handleAddService = (service: OfferModel) => {
        const existingService = selectedServices.find(s => s.id === service.id);
        if (existingService) {
            setSelectedServices(selectedServices.map(s => 
                s.id === service.id ? { ...s, quantity: s.quantity + 1 } : s
            ));
        } else {
            setSelectedServices([...selectedServices, { id: service.id, label: service.label, price: service.price, time: service.duration, quantity: 1 }]);
        }
    };

    const handleRemoveService = (service: OfferModel) => {
        const existingService = selectedServices.find(s => s.id === service.id);
        if (existingService && existingService.quantity > 1) {
            setSelectedServices(selectedServices.map(s => 
                s.id === service.id ? { ...s, quantity: s.quantity - 1 } : s
            ));
        } else {
            setSelectedServices(selectedServices.filter(s => s.id !== service.id));
        }
    };

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (reservationId === '' || reservationId === null)
            data.reservationId = generateReservationId();

        data.services = JSON.stringify(selectedServices);

        onSubmit({ ...data });
    }

    return (
        <form onSubmit={handleSubmit} className='font-lato flex flex-col'>
            <FormLabel htmlFor='reservationDateTime'>Data i godzina rezerwacji:</FormLabel>
            <FormInput name='reservationDateTime' id="reservationDateTime" defaultVal={reservationDateTime} required onChange={(e) => setReservationDateTime(e.target.value)} type='datetime-local' />
            
            <FormLabel htmlFor='email'>Email:</FormLabel>
            <FormInput name='email' id="email" defaultVal={email} required onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email'/>
            
            <FormLabel htmlFor='services'>Services:</FormLabel>
            <div>
            {offers.map((offer, index) => (
                    <div key={index} className="flex items-center">
                        <span>{offer.label} - {offer.price}zł - {offer.duration}min</span>
                        <button type="button" onClick={() => handleAddService(offer)}>+</button>
                        <button type="button" onClick={() => handleRemoveService(offer)}>-</button>
                        <span>{selectedServices.find(s => s.id === offer.id)?.quantity || 0}</span>
                    </div>
                ))}
            </div>

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