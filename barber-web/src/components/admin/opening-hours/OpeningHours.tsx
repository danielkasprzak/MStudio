import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchOpeningHours } from '../../../util/http';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import Title from '../Title';
import SmallButton from '../SmallButton';
import OpeningHour from './OpeningHour';

interface OpeningHoursModel {
    dayOfWeek: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default () => {
    const navigate = useNavigate();

    const { data = [], error } = useQuery<OpeningHoursModel[]>({
        queryKey: ['openingHours'],
        queryFn: fetchOpeningHours
    });

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='flex flex-row justify-center'>
            <div className='relative w-fit h-full bg-white m-16 mr-8 text-charcoal font-lato p-8'>
                <Title padding='8'>Harmonogram otwarcia</Title>
            
                <div className='relative w-auto p-16 pt-8 h-full text-charcoal font-lato'>
                    <ul className='h-fit w-fit'>
                        {data.map((date) => (
                            <div className='flex flex-row'>
                                <OpeningHour key={date.dayOfWeek} date={date.dayOfWeek} isOpen={date.isOpen} openHour={date.openHour} closeHour={date.closeHour} />

                                <div className='flex flex-row'>
                                    <SmallButton>
                                        <Link to={`${date.dayOfWeek}`}>Edytuj</Link>
                                    </SmallButton>
                                </div>
                            </div>
                        ))}
                        {/* <SmallButton><Link to={`nowa`}>Dodaj</Link></SmallButton> */}
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