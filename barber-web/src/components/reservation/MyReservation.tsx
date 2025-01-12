interface OfferProps {
    id: string;
    title: string;
    price: number;
    time: number;
    date: string;
}

export default ({ id, title, price, time, date } : OfferProps) => {
    return (
    <li className="mb-4 w-full font-montserrat border border-neutral-800 rounded-xl text-neutral-300 flex flex-row justify-between py-4 px-6">
        <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row justify-start items-center">
                <h1 className="text-xl font-semibold text-white">{title}</h1>
                <p className="text-xs pl-3">{time}min</p>
            </div>
        </div>
    </li>
    )
}