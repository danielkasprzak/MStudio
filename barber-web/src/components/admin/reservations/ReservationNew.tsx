import Title from '../../Title';
import SmallButton from '../SmallButton';
import { ActionFunction, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { bookNewReservationAsAdmin, queryClient } from '../../../utils/http';

import ReservationForm from './ReservationForm';

interface NewReservation {
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
    price: number;
    isCancelled: boolean;
}

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'POST' });
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>Nowa rezerwacja</Title>

            <ReservationForm 
                inputData={{ 
                    reservationId: '', 
                    email: '', 
                    services: '', 
                    duration: 0, 
                    reservationDateTime: '', 
                    phone: '', 
                    price: 0 
                }} 
                onSubmit={handleSubmit}
            >
                {state === 'submitting' ? (
                    <div>Wysyłanie...</div> 
                ) : (
                    <SmallButton type='submit'>Zapisz</SmallButton>
                )}
            </ReservationForm>
        </div>
    );
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    
    const newReservation: NewReservation = {
        reservationId: formData.get('reservationId') as string,
        email: formData.get('email') as string,
        services: formData.get('services') as string,
        duration: Number(formData.get('duration')),
        reservationDateTime: formData.get('reservationDateTime') as string,
        phone: formData.get('phone') as string,
        price: Number(formData.get('price')),
        isCancelled: false
    };

    await bookNewReservationAsAdmin(newReservation);  
    await queryClient.invalidateQueries({ queryKey: ['fetchedReservations'] });

    return redirect('../');
}