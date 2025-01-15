import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, fetchSpecialOpeningHours, deleteSpecialOpeningHour } from '../../../utils/http';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Title from '../../Title';
import SpecialOpeningHour from './SpecialOpeningHour';
import TextButton from '../../TextButton';

interface SpecialOpeningHoursModel {
    date: string;
    endDate: string | null;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default () => {
    const navigate = useNavigate();
    
    const { data = [], error } = useQuery<SpecialOpeningHoursModel[]>({
        queryKey: ['specialOpeningHours'],
        queryFn: fetchSpecialOpeningHours
    });

    if (error) return <div>Error loading offers</div>;

    const { mutate, isPending } = useMutation({
        mutationFn: deleteSpecialOpeningHour,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['specialOpeningHours'] });
            navigate('/admin/specjalne-godziny-otwarcia');
        }
    });
    
    function handleDeleteClick(date: string) {
        mutate({ date });
    }    

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white border border-stone-300 m-16 mr-8 text-charcoal font-lato p-8'>
                <div className='flex flex-row items-center'>
                    <Title padding='8'>Specjalny harmonogram otwarcia</Title>
                    <Link to="dodaj">
                        <TextButton>Dodaj</TextButton>
                    </Link>                    
                </div>

                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((date) => (
                            <div className='flex flex-row'>
                                <SpecialOpeningHour key={date.date} date={date.date} endDate={date.endDate} isOpen={date.isOpen} openHour={date.openHour} closeHour={date.closeHour} />
                                
                                <div className='flex flex-row items-center'>
                                    <Link to={`${date.date}`}>
                                        <TextButton>Edytuj</TextButton>
                                    </Link>   
                                    {isPending ? <div>Usuwanie...</div> : <TextButton onClick={() => handleDeleteClick(date.date)}>Usuń</TextButton>}
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        
            <Outlet />
        </div>

    )
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['specialOpeningHours'],
        queryFn: fetchSpecialOpeningHours
    });
}