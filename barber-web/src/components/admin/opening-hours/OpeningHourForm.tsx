import { useEffect, useState } from 'react';

import FormInput from '../FormInput';
import { dayTranslations } from '../../../utils/utils';

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
            <h1 className='font-cormorant text-charcoal font-medium text-md text-center'>{dayTranslations[inputData.dayOfWeek]}</h1>

            <FormInput name='isOpen' defaultVal={isOpen} onChange={(e) => setIsOpen(e.target.checked)} type='checkbox'/>
            <FormInput name='openHour' defaultVal={openHour} required onChange={(e) => setOpenHour(e.target.value)} type='time' placeholder='Open Hour'/>
            <FormInput name='closeHour' defaultVal={closeHour} required onChange={(e) => setCloseHour(e.target.value)} type='time' placeholder='Close Hour'/>

            {children}
        </form>
    );
};