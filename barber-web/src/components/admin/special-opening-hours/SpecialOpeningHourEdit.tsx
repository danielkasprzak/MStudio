import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchSpecialOpeningHour, updateSpecialOpeningHour } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import { SpecialOpeningHours as SpecialOpeningHoursModel } from '../../../interfaces/scheduleInterfaces';

import Title from '../../Title';
import SpecialOpeningHourForm from './SpecialOpeningHourForm';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<SpecialOpeningHoursModel>({
        queryKey: ['specialOpeningHour', params.date],
        queryFn: () => fetchSpecialOpeningHour({ date: params.date || '' }),
        enabled: !!params.date
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-[calc(100%-4rem)] md:w-fit h-full bg-white border border-stone-300 mb-8 md:m-16 md:ml-8 text-charcoal p-8'>
            <Title padding='8'>Edytuj godziny</Title>

            {data && <SpecialOpeningHourForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<Label>Wysyłanie...</Label> 
                ) : (
                    <TextButton type='submit'>Zapisz</TextButton>
                )}
            </SpecialOpeningHourForm>}
        </div>
    );
}

export function loader({ params }: LoaderFunctionArgs) {
    return queryClient.fetchQuery({
        queryKey: ['specialOpeningHour', params.date],
        queryFn: () => fetchSpecialOpeningHour({ date: params.date || '' })
    });
}

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    
    const updatedSpecialOpeningHour: SpecialOpeningHoursModel = {
        date: params.date || '',
        endDate: formData.get('endDate') as string || null,
        isOpen: formData.get('isOpen') === 'true',
        openHour: formData.get('openHour') as string,
        closeHour: formData.get('closeHour') as string
    };

    await updateSpecialOpeningHour({ date: params.date || '', updatedSpecialHour: updatedSpecialOpeningHour });  
    await queryClient.invalidateQueries({ queryKey: ['specialOpeningHours'] });

    return redirect('../');
}