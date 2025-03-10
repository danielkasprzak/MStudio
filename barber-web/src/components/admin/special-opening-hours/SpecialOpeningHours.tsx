import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient, fetchSpecialOpeningHours, deleteSpecialOpeningHour } from '../../../utils/http';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { SpecialOpeningHours as SpecialOpeningHoursModel } from '../../../interfaces/scheduleInterfaces';

import Title from '../../Title';
import SpecialOpeningHour from './SpecialOpeningHour';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const navigate = useNavigate();
    
    const { data = [], error } = useQuery<SpecialOpeningHoursModel[]>({
        queryKey: ['specialOpeningHours'],
        queryFn: fetchSpecialOpeningHours
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

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
        <div className='w-full relative flex flex-col items-center md:flex-row md:justify-center md:items-start'>
            <div className='relative w-[calc(100%-4rem)] md:w-fit h-full bg-white border border-stone-300 m-8 md:m-16 md:mr-8 text-charcoal font-lato p-8'>
                <div className='flex flex-row items-center'>
                    <Title padding='8'>Specjalny harmonogram otwarcia</Title>
                    <Link to="dodaj">
                        <TextButton>Dodaj</TextButton>
                    </Link>                    
                </div>

                <div className='relative w-auto p-8 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-full flex flex-col justify-center'>
                        {data.map((date) => (
                            <div key={date.date} className='flex flex-col md:flex-row items-center'>
                                <SpecialOpeningHour date={date.date} endDate={date.endDate} isOpen={date.isOpen} openHour={date.openHour} closeHour={date.closeHour} />
                                
                                <div className='flex flex-row items-center pb-4 md:pb-0'>
                                    <Link className="flex flex-row items-center" to={`${date.date}`}>
                                        <TextButton>Edytuj</TextButton>
                                    </Link>   
                                    {isPending ? <Label>Usuwanie...</Label> : <TextButton onClick={() => handleDeleteClick(date.date)}>Usuń</TextButton>}
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