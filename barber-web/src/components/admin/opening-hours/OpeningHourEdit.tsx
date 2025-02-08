import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchOpeningHour, updateOpeningHour } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import { OpeningHours as OpeningHoursModel } from '../../../interfaces/scheduleInterfaces';

import OpeningHourForm from './OpeningHourForm';
import Title from '../../Title';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<OpeningHoursModel>({
        queryKey: ['openingHour', params.day],
        queryFn: () => fetchOpeningHour({ dayOfWeek: params.day || '' }),
        enabled: !!params.day
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-[calc(100%-4rem)] md:w-fit h-full bg-white border border-stone-300 mb-8 md:m-16 md:ml-8 text-charcoal p-8'>
            <Title padding='8'>Edytuj godziny</Title>

            {data && <OpeningHourForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<Label>Wysyłanie...</Label> 
                ) : (
                    <TextButton type='submit'>Zapisz</TextButton>
                )}
            </OpeningHourForm>}
        </div>
    );
}

export function loader({ params }: LoaderFunctionArgs) {
    return queryClient.fetchQuery({
        queryKey: ['openingHour', params.day],
        queryFn: () => fetchOpeningHour({ dayOfWeek: params.day || '' })
    });
}

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    
    const updatedOpeningHourData: OpeningHoursModel = {
        dayOfWeek: params.day || '',
        isOpen: formData.get('isOpen') === 'true',
        openHour: formData.get('openHour') as string,
        closeHour: formData.get('closeHour') as string
    };

    await updateOpeningHour({ dayOfWeek: params.day || '', openingHour: updatedOpeningHourData });  
    await queryClient.invalidateQueries({ queryKey: ['openingHours'] });

    return redirect('../');
}