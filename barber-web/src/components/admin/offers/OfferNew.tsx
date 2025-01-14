import Title from '../../Title';
import SmallButton from '../SmallButton';
import { ActionFunction, redirect, useNavigation, useSubmit } from 'react-router-dom';
import { queryClient, createOffer } from '../../../utils/http';
import OfferForm from './OfferForm';

interface NewOffer {
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'POST' });
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8 border border-stone-300'>
            <Title padding='8'>Dodaj ofertę</Title>

            <OfferForm inputData={{ label: '', price: 0, duration: 0, description: '' }} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<div>Wysyłanie...</div> 
                ) : (
                    <SmallButton type='submit'>Dodaj</SmallButton>
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