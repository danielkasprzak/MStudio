import Title from '../Title';
import SmallButton from '../SmallButton';
import { ActionFunction, LoaderFunctionArgs, useParams, useSubmit, useNavigation, redirect } from 'react-router-dom';
import { queryClient, fetchOffer, updateOffer } from '../../../../util/http';
import { useQuery } from '@tanstack/react-query';
import OfferForm from './OfferForm';

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    const { state } = useNavigation();
    const submit = useSubmit();
    const params = useParams();

    const { data, error } = useQuery<OfferModel>({
        queryKey: ['offer', params.id],
        queryFn: () => fetchOffer({ id: Number(params.id) }),
        enabled: !!params.id
    });

    if (error) return <div>Error loading offers</div>;

    function handleSubmit(formData: FormData) {
        submit(formData, {method: 'PUT' });
    }

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>Edytuj ofertę</Title>

            {data && <OfferForm inputData={data} onSubmit={handleSubmit}>
                {state === 'submitting' ? (<div>Wysyłanie...</div> 
                ) : (
                    <SmallButton type='submit'>Zapisz</SmallButton>
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