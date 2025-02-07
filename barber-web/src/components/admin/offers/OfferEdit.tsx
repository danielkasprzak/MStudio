import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchOffer, updateOffer } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import { Offer as OfferModel } from '../../../interfaces/offersInterfaces';

import Title from '../../Title';
import OfferForm from './OfferForm';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<OfferModel>({
        queryKey: ['offer', params.id],
        queryFn: () => fetchOffer({ id: Number(params.id) }),
        enabled: !!params.id
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-[calc(100%-4rem)] md:w-fit h-full bg-white mb-8 md:m-16 md:ml-8 text-charcoal p-8 border border-stone-300'>
            <Title padding='8'>Edytuj ofertę</Title>

            {data && <OfferForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<Label>Wysyłanie...</Label> 
                ) : (
                    <TextButton type='submit'>Zapisz</TextButton>
                )}
            </OfferForm>}
        </div>
    );
}

export function loader({ params }: LoaderFunctionArgs) {
    return queryClient.fetchQuery({
        queryKey: ['offer', params.id],
        queryFn: () => fetchOffer({ id: Number(params.id) })
    });
}

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    
    const updatedOfferData: OfferModel = {
        id: Number(params.id),
        label: formData.get('label') as string,
        price: Number(formData.get('price')),
        duration: Number(formData.get('duration')),
        description: formData.get('description') as string | undefined
    };

    await updateOffer({ id: Number(params.id), offer: updatedOfferData });  
    await queryClient.invalidateQueries({ queryKey: ['offers'] });

    return redirect('../');
}