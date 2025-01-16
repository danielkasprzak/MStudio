import { Offer as Props } from '../../../interfaces/offersInterfaces';

export default ({ label, description, price, duration } : Props) => {
    return (
        <li className="border border-stone-300 py-4 px-6 mt-4 w-full h-auto flex flex-row items-center justify-between">
            <div className="flex flex-col justify-center leading-4 px-4">
                <h1 className="uppercase font-extrabold text-xs">{label}</h1>
                <p className="font-normal text-xs text-stone-500">{description}</p>
            </div>
            <div className="flex flex-col justify-center leading-4 px-4">
                <p className="font-extrabold text-xs">{price}zł</p>
                <p className="font-normal text-xs text-stone-500">{duration}min</p>
            </div>
        </li>
    )
}                