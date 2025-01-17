import Title from '../../Title';
import { ActionFunction, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { createSpecialOpeningHour, queryClient } from '../../../utils/http';
import { SpecialOpeningHours as SpecialOpeningHoursModel } from '../../../interfaces/scheduleInterfaces';

import SpecialOpeningHourForm from './SpecialOpeningHourForm';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white border border-stone-300 m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>Nowy harmonogram</Title>

            <SpecialOpeningHourForm isNew inputData={{ date: '', endDate: null, isOpen: false, openHour: '', closeHour: '' }} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<Label>Wysyłanie...</Label> 
                ) : (
                    <TextButton type='submit'>Zapisz</TextButton>
                )}
            </SpecialOpeningHourForm>
        </div>
    );
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    
    const newSpecialOpeningHour: SpecialOpeningHoursModel = {
        date: formData.get('date') as string,
        endDate: formData.get('endDate') as string || null,
        isOpen: formData.get('isOpen') === 'true',
        openHour: formData.get('openHour') as string,
        closeHour: formData.get('closeHour') as string
    };

    await createSpecialOpeningHour(newSpecialOpeningHour);  
    await queryClient.invalidateQueries({ queryKey: ['specialOpeningHours'] });

    return redirect('../');
}