import { useEffect, useState } from 'react';

import FormInput from '../FormInput';
import { formatDate } from '../../../utils/utils';

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
    const [endDate, setEndDate] = useState(inputData.endDate ? inputData.endDate.split('T')[0] : null);
    const [isOpen, setIsOpen] = useState(inputData.isOpen);
    const [openHour, setOpenHour] = useState(inputData.openHour);
    const [closeHour, setCloseHour] = useState(inputData.closeHour);

    useEffect(() => {
        setDate(inputData.date.split('T')[0]);
        setEndDate(inputData.endDate ? inputData.endDate.split('T')[0] : null);
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
            {isNew ? <FormInput name='date' defaultVal={date} required onChange={(e) => setDate(e.target.value)} type='date' placeholder='Date'/> : <h1 className='font-cormorant text-charcoal font-medium text-md text-center'>{formatDate(date)}</h1>}
            
            <FormInput name='endDate' defaultVal={endDate} onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='End Date'/>
            <FormInput name='isOpen' defaultVal={isOpen} onChange={(e) => setIsOpen(e.target.checked)} type='checkbox'/>
            <FormInput name='openHour' defaultVal={openHour} required onChange={(e) => setOpenHour(e.target.value)} type='time' placeholder='Open Hour'/>
            <FormInput name='closeHour' defaultVal={closeHour} required onChange={(e) => setCloseHour(e.target.value)} type='time' placeholder='Close Hour'/>

            {children}
        </form>
    );
};