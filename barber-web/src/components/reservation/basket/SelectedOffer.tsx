import { basketActions } from "../../../store/basket-slice";
import { useAppDispatch } from "../../../store/hooks";

interface SelectedOfferProps {
    id: number;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

export default ({ id, label, price, time, quantity } : SelectedOfferProps) => {
    const dispatch = useAppDispatch();

    const removeItemHandler = (id: number) => {
        dispatch(basketActions.removeItem(id));
    }

    const addItemHandler = (id: number, label: string, price: number, time: number) => {
        dispatch(basketActions.addItem({ id, label, price, time }));
    }

    return (
        <li key={id} className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
                <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{label}</p>
                <p className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3">{price}zł</p>
                <p className="pr-3">{time}min</p>
                {quantity > 1 && <p className="text-xs font-bold">x {quantity}</p>}
            </div>
            <div className="flex flex-row items-center">
                <button onClick={() => removeItemHandler(id)} className="border-r border-neutral-800 w-auto h-3 mr-3 flex justify-center items-center pr-3 font-bold">-</button>
                <button onClick={() => addItemHandler(id, label, price, time)} className="pr-3 font-bold">+</button>
            </div>
        </li>
    )
}