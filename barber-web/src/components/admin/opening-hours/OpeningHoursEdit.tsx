import Title from '../Title';
import SmallButton from '../SmallButton';
import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchOpeningHour, updateOpeningHour } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';

import OpeningHourForm from './OpeningHourForm';

interface OpeningHourModel {
    dayOfWeek: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<OpeningHourModel>({
        queryKey: ['openingHour', params.day],
        queryFn: () => fetchOpeningHour({ dayOfWeek: params.day || '' }),
        enabled: !!params.day
    });

    if (error) return <div>Error loading offers</div>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>Edytuj godziny</Title>

            {data && <OpeningHourForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<div>Wysyłanie...</div> 
                ) : (
                    <SmallButton type='submit'>Zapisz</SmallButton>
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
    
    const updatedOpeningHourData: OpeningHourModel = {
        dayOfWeek: params.day || '',
        isOpen: formData.get('isOpen') === 'true',
        openHour: formData.get('openHour') as string,
        closeHour: formData.get('closeHour') as string
    };

    await updateOpeningHour({ dayOfWeek: params.day || '', openingHour: updatedOpeningHourData });  
    await queryClient.invalidateQueries({ queryKey: ['openingHours'] });

    return redirect('../');
}