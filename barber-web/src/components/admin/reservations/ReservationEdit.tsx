import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchReservation, updateReservation } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import { Reservation as ReservationModel } from '../../../interfaces/reservationsInterfaces';

import ReservationForm from './ReservationForm';
import Title from '../../Title';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<ReservationModel>({
        queryKey: ['reservation', params.id],
        queryFn: () => fetchReservation({ reservationId: params.id || '' }),
        enabled: !!params.day
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    if (data) {
        const parsedData = {
            ...data,
            services: JSON.parse(data.services)
        };

        return (
            <div className='sticky right-0 top-16 w-fit h-full bg-white border border-stone-300 m-16 ml-8 text-charcoal p-8'>
                <Title padding='8'>Edytuj godziny</Title>
    
                {data && <ReservationForm inputData={parsedData} onSubmit={handleSubmit}>
                    {state === 'submitting' ? (<Label>Wysyłanie...</Label> 
                    ) : (
                        <TextButton type='submit'>Zapisz</TextButton>
                    )}
                </ReservationForm>}
            </div>
        );
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white border border-stone-300 m-16 ml-8 text-charcoal p-8'>
            <Label>Wystąpił problem z wczytywaniem zawartości rezerwacji</Label>
        </div>
    );
}

export function loader({ params }: LoaderFunctionArgs) {
    return queryClient.fetchQuery({
        queryKey: ['reservation', params.id],
        queryFn: () => fetchReservation({ reservationId: params.id || '' }),
    });
}

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    
    const updatedReservationData: ReservationModel = {
        reservationId: params.id || '',
        email: formData.get('email') as string,
        services: formData.get('services') as string,
        duration: Number(formData.get('duration')),
        reservationDateTime: formData.get('reservationDateTime') as string,
        phone: formData.get('phone') as string,
        price: Number(formData.get('price')),
        isCancelled: false
    };

    await updateReservation({ reservationId: params.id || '', reservation: updatedReservationData });  
    await queryClient.invalidateQueries({ queryKey: ['fetchedReservations'] });

    return redirect('../');
}