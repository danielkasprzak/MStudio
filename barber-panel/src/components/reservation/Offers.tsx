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
    },
    {
        id: '3',
        label: 'Strzyżenie damskie',
        price: 60,
        time: 45,
    },
    {
        id: '4',
        label: 'Modelowanie',
        price: 50,
        time: 30,
    },
    {
        id: '5',
        label: 'Pielęgnacja brody',
        price: 30,
        time: 20,
    },
    {
        id: '6',
        label: 'Prostowanie keratynowe',
        price: 200,
        time: 120,
        description: 'Zabieg prostowania włosów z użyciem keratyny.',
    },
    {
        id: '7',
        label: 'Strzyżenie dziecięce',
        price: 35,
        time: 20,
    },
    {
        id: '8',
        label: 'Trwała ondulacja',
        price: 150,
        time: 100,
        description: 'Zabieg trwałej ondulacji włosów.',
    },
    {
        id: '9',
        label: 'Regeneracja włosów',
        price: 80,
        time: 60,
        description: 'Zabieg regenerujący włosy.',
    },
    {
        id: '10',
        label: 'Strzyżenie maszynką',
        price: 25,
        time: 15,
    },
    {
        id: '11',
        label: 'Farbowanie brody',
        price: 40,
        time: 30,
    },
    {
        id: '12',
        label: 'Stylizacja brwi',
        price: 20,
        time: 15,
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