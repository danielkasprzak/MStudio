import { basketActions } from "../../store/basket-slice";
import { useAppDispatch } from "../../store/hooks";

interface Props {
    id: number;
    label: string;
    description?: string;
    price: number;
    time: number;
}

export default ({ id, label, description, price, time } : Props) => {
    const dispatch = useAppDispatch();

    const addItemHandler = (id: number, label: string, price: number, time: number) => {
        dispatch(basketActions.addItem({ id, label, price, time }));
    }

    return (
    <li className="mb-4 w-full font-lato tracking-wider border border-stone-300 text-charcoal flex flex-row justify-between py-4 px-6">
        <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row justify-start items-center">
                <h1 className="uppercase font-bold text-xs">{label}</h1>
                <p className="uppercase font-bold text-xs pl-3">{time}min</p>
            </div>
            {description && <p className="font-normal text-xs text-balance">{description}</p>}
        </div>
        <div className="flex flex-row items-center justify-end pl-4">
            <p className="font-normal text-normal px-3 text-nowrap"><span className="font-semibold">{price}</span>zł</p>
            <button onClick={() => addItemHandler(id, label, price, time)} className="border border-stone-300 uppercase font-bold text-xs py-2 px-4 tracking-wider select-none">Umów</button>
        </div>
    </li>
    )
}