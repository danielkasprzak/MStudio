interface SelectedOfferProps {
    id: string;
    label: string;
    price: number;
    time: number;
}

export default ({ id, label, price, time } : SelectedOfferProps) => {
    return (
        <li key={id} className="flex flex-row items-center">
            <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{label}</p>
            <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{price}PLN</p>
            <p>{time}min</p>
        </li>
    )
}