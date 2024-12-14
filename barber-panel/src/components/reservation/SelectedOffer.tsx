interface SelectedOfferProps {
    label: string;
    price: string;
    time: string;
}

export default ({ label, price, time } : SelectedOfferProps) => {
    return (
        <li className="flex flex-row items-center">
            <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{label}</p>
            <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{price}PLN</p>
            <p>{time}min</p>
        </li>
    )
}