import { Plus, Trash2 } from "lucide-react";
import { basketActions } from "../../../store/basket-slice";
import { useAppDispatch } from "../../../store/hooks";

interface Props {
    id: number;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

export default ({ id, label, price, time, quantity } : Props) => {
    const dispatch = useAppDispatch();

    const removeItemHandler = (id: number) => {
        dispatch(basketActions.removeItem(id));
    }

    const addItemHandler = (id: number, label: string, price: number, time: number) => {
        dispatch(basketActions.addItem({ id, label, price, time }));
    }

    return (
        <li className="mt-2 w-full font-lato border border-stone-300 flex flex-row justify-between py-4 px-6">
            <div className="flex flex-row items-center">
                <button onClick={() => removeItemHandler(id)} ><Trash2 color="#353535" size={20} strokeWidth={1.25} /></button>
                <div className="flex flex-col justify-center px-4">
                    <h1 className="uppercase font-bold text-xs text-charcoal">{label}</h1>
                    <p className="font-normal text-xs text-stone-500">{quantity > 1 && <span>{quantity} x</span>} {price}zł</p>
                </div>
            </div>

            <button onClick={() => addItemHandler(id, label, price, time)}><Plus color="#353535" size={24} strokeWidth={1.25} /></button>
        </li>
    )
}