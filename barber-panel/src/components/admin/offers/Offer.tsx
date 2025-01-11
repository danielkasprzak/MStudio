interface Props {
    label: string;
    description?: string;
    price: number;
    time: number;
}

export default ({ label, description, price, time } : Props) => {
    return (
        <li className="border border-stone-200 p-8 m-4 w-full h-auto flex flex-row items-center justify-between">
            <div className="flex flex-col justify-center px-8">
                <h1 className="font-cormorant font-medium text-xl">{label}</h1>
                <p className="font-semibold text-xs text-stone-600 tracking-wider">{description}</p>
            </div>
            <div className="flex flex-col justify-center px-8">
                <p className="font-bold text-xs tracking-wider">{price}zł</p>
                <p className="font-bold text-xs tracking-wider">{time}min</p>
            </div>
        </li>
    )
}