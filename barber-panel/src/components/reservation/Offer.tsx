import { basketActions } from "../../store/basket-slice";
import { useAppDispatch } from "../../store/hooks";

interface OfferProps {
    id: string;
    label: string;
    description?: string;
    price: number;
    time: number;
}

export default ({ id, label, description, price, time } : OfferProps) => {
    const dispatch = useAppDispatch();

    const addItemHandler = (id: string, label: string, price: number, time: number) => {
        dispatch(basketActions.addItem({ id, label, price, time }));
    }

    return (
    <li className="mb-4 w-full font-montserrat border border-neutral-800 rounded-xl text-neutral-300 flex flex-row justify-between py-4 px-6">
        <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row justify-start items-center">
                <h1 className="text-xl font-semibold text-white">{label}</h1>
                <p className="text-xs pl-3">{time}min</p>
            </div>
            {description && <p className="text-xs font-normal text-balance">{description}</p>}
        </div>
        <div className="flex flex-row items-center justify-end pl-4">
            <p className="text-white font-normal text-normal px-3 text-nowrap">$ <span className="font-semibold">{price}</span>PLN</p>
            <button onClick={() => addItemHandler(id, label, price, time)} className="border border-neutral-800 rounded-xl py-2 px-4 tracking-wide text-sm">Umów</button>
        </div>
    </li>
    )
}