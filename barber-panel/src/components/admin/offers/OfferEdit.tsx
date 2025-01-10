import Title from '../Title';
import SmallButton from '../SmallButton';
import { useEffect, useState } from 'react';

interface Props {
    editType: string;
    offer: OfferModel | null;
}

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default ({editType, offer} : Props) => {
    const [label, setLabel] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        if (offer) {
            setLabel(offer.label);
            setDescription(offer.description || '');
            setPrice(offer.price);
            setDuration(offer.duration);
        }
    }, [offer]);

    return (
        <div className='sticky right-0 top-16 w-fit h-full bg-white m-16 ml-8 text-charcoal p-8'>
            <Title padding='8'>{editType === 'new' ? 'Dodaj ofertę' : 'Edytuj ofertę'}</Title>
            <form className='font-lato flex flex-col'>
                {editType === "new" ?
                <>
                    <input className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Nazwa' />
                    <input className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Opis' />
                    <input className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Cena' />
                    <input className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Czas trwania' />
                    <SmallButton>Dodaj</SmallButton>
                </> : 
                <>
                    <input value={label} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Nazwa'
                    onChange={(e) => setLabel(e.target.value)}/>
                    <input value={description} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='text' placeholder='Opis'
                    onChange={(e) => setDescription(e.target.value)}/>
                    <input value={price} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Cena'
                    onChange={(e) => setPrice(Number(e.target.value))} />
                    <input value={duration} className='py-4 my-4 px-12 outline-none font-bold text-xs tracking-wider border' type='number' placeholder='Czas trwania'
                    onChange={(e) => setDuration(Number(e.target.value))}/>
                    <SmallButton>Zapisz</SmallButton>
                </>}
            </form>
        </div>
    );
}