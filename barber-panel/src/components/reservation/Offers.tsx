import Offer from "./Offer"

const offers = [
    {
        id: '1',
        label: 'Strzyżenie męskie',
        price: 40,
        time: 25,
    },
    {
        id: '2',
        label: 'Koloryzacja',
        price: 120,
        time: 90,
        description: 'Farbowanie włosów z możliwością konsultacji koloru.',
    }
];

export default () => {
    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-dark-foreground rounded-2xl px-8 pt-8 pb-4'>
                {offers.map((offer) => (
                    <Offer id={offer.id} label={offer.label} price={offer.price} time={offer.time} description={offer.description} />
                ))}
            </ul>
        </div>
    )
}