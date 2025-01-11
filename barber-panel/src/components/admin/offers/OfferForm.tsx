import { useEffect, useState } from 'react';

interface Props {
    children: React.ReactNode;
    inputData: {
        label: string;
        description?: string;
        price: number;
        duration: number;
    };
    onSubmit: (data: any) => void;
}

export default ({ children, inputData, onSubmit }: Props) => {
    const [label, setLabel] = useState(inputData.label);
    const [description, setDescription] = useState(inputData.description || '');
    const [price, setPrice] = useState(inputData.price);
    const [duration, setDuration] = useState(inputData.duration);

    useEffect(() => {
        setLabel(inputData.label);
        setDescription(inputData.description || '');
        setPrice(inputData.price);
        setDuration(inputData.duration);
    }, [inputData]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        onSubmit({ ...data });
    }

    return (
        <form onSubmit={handleSubmit} className='font-lato flex flex-col'>
            <input
                name='label'
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border'
                type='text'
                placeholder='Tytuł'
            />

            <input
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border'
                type='text'
                placeholder='Opis'
            />

            <input
                name='price'
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border'
                type='number'
                placeholder='Cena'
            />

            <input
                name='duration'
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border'
                type='number'
                placeholder='Czas trwania'
            />

            {children}
        </form>
    );
};