import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchOpeningHours } from '../../../utils/http';
import { Link, Outlet } from 'react-router-dom';
import { WEEK_ORDER } from '../../../utils/utils';
import { OpeningHours as OpeningHoursModel } from '../../../interfaces/scheduleInterfaces';

import Title from '../../Title';
import OpeningHour from './OpeningHour';
import TextButton from '../../TextButton';
import Label from '../../Label';

export default () => {
    const { data = [], error } = useQuery<OpeningHoursModel[]>({
        queryKey: ['openingHours'],
        queryFn: fetchOpeningHours
    });

    if (error) return <Label>Błąd podczas wczytywania</Label>;

    const sortedData = data.sort((a, b) => {
        return WEEK_ORDER.indexOf(a.dayOfWeek) - WEEK_ORDER.indexOf(b.dayOfWeek);
    });

    return (
        <div className='w-full relative flex flex-col items-center md:flex-row md:justify-center md:items-start'>
            <div className='relative w-[calc(100%-4rem)] md:w-fit h-full bg-white border border-stone-300 m-8 md:m-16 md:mr-8 text-charcoal font-lato p-8'>
                <Title padding='8'>Harmonogram otwarcia</Title>
            
                <div className='relative w-auto p-8 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-full flex flex-col justify-center'>
                        {sortedData.map((date) => (
                            <div key={date.dayOfWeek} className='flex flex-col md:flex-row items-center'>
                                <OpeningHour dayOfWeek={date.dayOfWeek} isOpen={date.isOpen} openHour={date.openHour} closeHour={date.closeHour} />

                                <Link className='pb-4 md:py-0' to={`${date.dayOfWeek}`}>
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