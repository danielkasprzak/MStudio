const reservations = [
    {
        id: 'CDU223',
        titles: ['Strzyżenie męskie', 'Keratywnowe wygładzanie'],
        totalPrice: 240,
        totalTime: 145,
        date: '2023-10-01 10:00',
    },
    {
        id: 'CDU224',
        titles: ['Koloryzacja'],
        totalPrice: 120,
        totalTime: 90,
        date: '2023-10-02 12:00',
    },
    {
        id: 'CDU225',
        titles: ['Strzyżenie damskie', 'Regeneracja włosów', 'Modelowanie'],
        totalPrice: 200,
        totalTime: 135,
        date: '2023-10-03 14:00',
    },
    {
        id: 'CDU226',
        titles: ['Strzyżenie dziecięce'],
        totalPrice: 35,
        totalTime: 20,
        date: '2023-10-04 09:00',
    },
    {
        id: 'CDU227',
        titles: ['Pielęgnacja brody', 'Farbowanie brody'],
        totalPrice: 70,
        totalTime: 50,
        date: '2023-10-05 11:00',
    },
    {
        id: 'CDU228',
        titles: ['Trwała ondulacja', 'Prostowanie keratynowe'],
        totalPrice: 350,
        totalTime: 220,
        date: '2023-10-06 13:00',
    },
    {
        id: 'CDU229',
        titles: ['Stylizacja brwi'],
        totalPrice: 20,
        totalTime: 15,
        date: '2023-10-07 15:00',
    },
    {
        id: 'CDU230',
        titles: ['Strzyżenie maszynką', 'Regeneracja włosów'],
        totalPrice: 105,
        totalTime: 75,
        date: '2023-10-08 16:00',
    }
];

export default () => {
    return (
        <div className="h-auto w-auto">
            <ul className='w-[46rem] h-fit bg-dark-foreground rounded-2xl px-8 pt-8 pb-4'>
                {reservations.map((reservation) => (
                    <li key={reservation.id} className="mb-4">
                        <h2 className="text-white font-semibold">{reservation.id}</h2>
                        <p className="text-neutral-300">Usługi: {reservation.titles.join(', ')}</p>
                        <p className="text-neutral-300">Cena: {reservation.totalPrice}zł</p>
                        <p className="text-neutral-300">Czas: {reservation.totalTime} minut</p>
                        <p className="text-neutral-300">Data: {reservation.date}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}