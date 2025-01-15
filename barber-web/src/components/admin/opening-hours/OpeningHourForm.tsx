import { useEffect, useState } from 'react';

import FormInput from '../FormInput';
import { dayTranslations } from '../../../utils/utils';
import FormLabel from '../FormLabel';

interface Props {
    children: React.ReactNode;
    inputData: {
        dayOfWeek: string;
        isOpen: boolean;
        openHour: string;
        closeHour: string;
    };
    onSubmit: (data: any) => void;
}

export default ({ children, inputData, onSubmit }: Props) => {
    const [isOpen, setIsOpen] = useState(inputData.isOpen);
    const [openHour, setOpenHour] = useState(inputData.openHour);
    const [closeHour, setCloseHour] = useState(inputData.closeHour);

    useEffect(() => {
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
            <h1 className='font-lato text-charcoal font-bold text-sm text-center py-2 mb-6 border border-stone-300'>{dayTranslations[inputData.dayOfWeek]}</h1>

            <FormLabel htmlFor='isOpen'>Otwarte?:</FormLabel>
            <FormInput id='isOpen' name='isOpen' defaultVal={isOpen} onChange={(e) => setIsOpen(e.target.checked)} type='checkbox'/>

            <FormLabel htmlFor='openHour'>Godzina otwarcia:</FormLabel>
            <FormInput id='openHour' name='openHour' defaultVal={openHour} required onChange={(e) => setOpenHour(e.target.value)} type='time' placeholder='Open Hour'/>

            <FormLabel htmlFor='closeHour'>Godzina zamknięcia:</FormLabel>
            <FormInput id='closeHour' name='closeHour' defaultVal={closeHour} required onChange={(e) => setCloseHour(e.target.value)} type='time' placeholder='Close Hour'/>

            {children}
        </form>
    );
};