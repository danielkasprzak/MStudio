interface SelectedOfferProps {
    id: string;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

export default ({ id, label, price, time, quantity } : SelectedOfferProps) => {
    return (
        <li key={id} className="flex flex-row items-center">
            <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{label}</p>
            <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{price}zł</p>
            <p className="pr-3">{time}min</p>
            {quantity > 1 && <p className="text-xs font-bold">x {quantity}</p>}
        </li>
    )
}