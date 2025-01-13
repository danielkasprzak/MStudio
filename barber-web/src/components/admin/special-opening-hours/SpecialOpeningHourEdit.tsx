import Title from '../Title';
import SmallButton from '../SmallButton';
import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchSpecialOpeningHour, updateSpecialOpeningHour } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';

import SpecialOpeningHourForm from './SpecialOpeningHourForm';

interface SpecialOpeningHourModel {
    date: string;
    endDate: string | null;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<SpecialOpeningHourModel>({
        queryKey: ['specialOpeningHour', params.date],
        queryFn: () => fetchSpecialOpeningHour({ date: params.date || '' }),
        enabled: !!params.date
    });

    if (error) return <div>Error loading offers</div>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>Edytuj godziny</Title>

            {data && <SpecialOpeningHourForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<div>Wysyłanie...</div> 
                ) : (
                    <SmallButton type='submit'>Zapisz</SmallButton>
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
    
    const updatedSpecialOpeningHour: SpecialOpeningHourModel = {
        date: formData.get('date') as string,
        endDate: formData.get('endDate') as string || null,
        isOpen: formData.get('isOpen') === 'true',
        openHour: formData.get('openHour') as string,
        closeHour: formData.get('closeHour') as string
    };

    await updateSpecialOpeningHour({ date: params.date || '', updatedSpecialHour: updatedSpecialOpeningHour });  
    await queryClient.invalidateQueries({ queryKey: ['specialOpeningHours'] });

    return redirect('../');
}