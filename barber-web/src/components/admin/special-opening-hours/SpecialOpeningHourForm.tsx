import { useEffect, useState } from 'react';

import FormInput from '../FormInput';
import { formatDate } from '../../../utils/utils';
import FormLabel from '../FormLabel';

interface Props {
    children: React.ReactNode;
    isNew?: boolean;
    inputData: {
        date: string;
        endDate: string | null;
        isOpen: boolean;
        openHour: string;
        closeHour: string;
    };
    onSubmit: (data: any) => void;
}

export default ({ children, isNew, inputData, onSubmit }: Props) => {
    const [date, setDate] = useState(inputData.date.split('T')[0]);
    const [endDate, setEndDate] = useState(inputData.endDate ? inputData.endDate.split('T')[0] : '');
    const [isOpen, setIsOpen] = useState(inputData.isOpen);
    const [openHour, setOpenHour] = useState(inputData.openHour);
    const [closeHour, setCloseHour] = useState(inputData.closeHour);

    useEffect(() => {
        setDate(inputData.date.split('T')[0]);
        setEndDate(inputData.endDate ? inputData.endDate.split('T')[0] : '');
        setIsOpen(inputData.isOpen);
        setOpenHour(inputData.openHour);
        setCloseHour(inputData.closeHour);
    }, [inputData]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);

        const isOpen = formData.get('isOpen') === 'on';

        const data = Object.fromEntries(formData);

        data.isOpen = isOpen.toString();

        onSubmit({ ...data });
    }

    return (
        <form onSubmit={handleSubmit} className='font-lato flex flex-col'>
            {isNew ? (
            <>
                <FormLabel htmlFor='date'>Data rozpoczęcia:</FormLabel>
                <FormInput name='date' id='date' defaultVal={date} required onChange={(e) => setDate(e.target.value)} type='date' placeholder='Date'/>
            </>
            ) : (

            <h1 className='font-lato text-charcoal font-bold text-sm text-center py-2 mb-6 border border-stone-300'>{formatDate(date)}</h1>
            )}
            
            <FormLabel htmlFor='endDate'>Data końcowa:</FormLabel>
            <FormInput name='endDate' id='endDate' defaultVal={endDate} onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='End Date'/>
            
            <FormLabel htmlFor='isOpen'>Otwarte?:</FormLabel>
            <FormInput name='isOpen' id='isOpen' defaultVal={isOpen} onChange={(e) => setIsOpen(e.target.checked)} type='checkbox'/>
            
            <FormLabel htmlFor='openHour'>Godzina otwarcia:</FormLabel>
            <FormInput name='openHour' id='openHour' defaultVal={openHour} required onChange={(e) => setOpenHour(e.target.value)} type='time' placeholder='Open Hour'/>
            
            <FormLabel htmlFor='closeHour'>Godzina zamknięcia:</FormLabel>
            <FormInput name='closeHour' id='closeHour' defaultVal={closeHour} required onChange={(e) => setCloseHour(e.target.value)} type='time' placeholder='Close Hour'/>

            {children}
        </form>
    );
};