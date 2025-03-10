import { ActionFunction, redirect, useNavigation, useSubmit } from 'react-router-dom';
import { queryClient, createOffer } from '../../../utils/http';
import { NewOffer } from '../../../interfaces/offersInterfaces';

import Title from '../../Title';
import OfferForm from './OfferForm';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'POST' });
    }

    return (
        <div className='sticky right-0 top-16 w-[calc(100%-4rem)] md:w-fit h-full bg-white mb-8 md:m-16 md:ml-8 text-charcoal p-8 border border-stone-300'>
            <Title padding='8'>Dodaj ofertę</Title>

            <OfferForm inputData={{ label: '', price: 0, duration: 0, description: '' }} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<Label>Wysyłanie...</Label> 
                ) : (
                    <TextButton type='submit'>Dodaj</TextButton>
                )}
            </OfferForm>

        </div>
    );
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    
    const updatedOfferData: NewOffer = {
        label: formData.get('label') as string,
        price: Number(formData.get('price')),
        duration: Number(formData.get('duration')),
        description: formData.get('description') as string | undefined
    };

    await createOffer(updatedOfferData);  
    await queryClient.invalidateQueries({ queryKey: ['offers'] });

    return redirect('../');
}