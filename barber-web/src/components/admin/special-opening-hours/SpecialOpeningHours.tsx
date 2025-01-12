import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchSpecialOpeningHours } from '../../../utils/http';
import { Link, Outlet } from 'react-router-dom';

import Title from '../Title';
import SmallButton from '../SmallButton';
import SpecialOpeningHour from './SpecialOpeningHour';

interface SpecialOpeningHoursModel {
    date: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default () => {
    const { data = [], error } = useQuery<SpecialOpeningHoursModel[]>({
        queryKey: ['specialOpeningHours'],
        queryFn: fetchSpecialOpeningHours
    });

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white m-16 mr-8 text-charcoal font-lato p-8'>
                <div className='flex flex-row'>
                    <Title padding='8'>Specjalny harmonogram otwarcia</Title>
                    <SmallButton>
                        <Link to={`dodaj`}>Dodaj</Link>
                    </SmallButton>
                </div>

                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((date) => (
                            <div className='flex flex-row'>
                                <SpecialOpeningHour key={date.date} date={date.date} isOpen={date.isOpen} openHour={date.openHour} closeHour={date.closeHour} />

                                <div className='flex flex-row'>
                                    <SmallButton>
                                        <Link to={`${date.date}`}>Edytuj</Link>
                                    </SmallButton>
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