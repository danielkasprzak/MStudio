import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchOpeningHours } from '../../../utils/http';
import { Link, Outlet } from 'react-router-dom';
import { WEEK_ORDER } from '../../../utils/utils';
import { OpeningHours as OpeningHoursModel } from '../../../interfaces/scheduleInterfaces';

import Title from '../../Title';
import OpeningHour from './OpeningHour';
import TextButton from '../../TextButton';

export default () => {
    const { data = [], error } = useQuery<OpeningHoursModel[]>({
        queryKey: ['openingHours'],
        queryFn: fetchOpeningHours
    });

    if (error) return <div>Error loading offers</div>;

    const sortedData = data.sort((a, b) => {
        return WEEK_ORDER.indexOf(a.dayOfWeek) - WEEK_ORDER.indexOf(b.dayOfWeek);
    });

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white border border-stone-300 m-16 mr-8 text-charcoal font-lato p-8'>
                <Title padding='8'>Harmonogram otwarcia</Title>
            
                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {sortedData.map((date) => (
                            <div className='flex flex-row items-center'>
                                <OpeningHour key={date.dayOfWeek} dayOfWeek={date.dayOfWeek} isOpen={date.isOpen} openHour={date.openHour} closeHour={date.closeHour} />

                                <Link to={`${date.dayOfWeek}`}>
                                    <TextButton>Edytuj</TextButton>
                                </Link>                                     
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
        queryKey: ['openingHours'],
        queryFn: fetchOpeningHours
    });
}