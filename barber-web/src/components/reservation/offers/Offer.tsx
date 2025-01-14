import { basketActions } from "../../../store/basket-slice";
import { useAppDispatch } from "../../../store/hooks";

import TextButton from "../../TextButton";

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
        <li className="mt-4 w-full font-lato border border-stone-300 text-charcoal flex flex-row justify-between py-4 px-6">
            <div className="flex flex-col justify-center leading-4">
                <h1 className="uppercase font-extrabold text-xs">{label}</h1>
                {description && <p className="font-normal text-xs text-stone-500">{description}</p>}
            </div>
            <div className="flex flex-row items-center justify-end pl-4">
                <div className="flex flex-col justify-center leading-4 px-4">
                    <p className="font-extrabold text-xs text-right">{price}.00zł</p>
                    <p className="font-normal text-xs text-right text-stone-500">{time}min</p>
                </div>
                <TextButton onClick={() => addItemHandler(id, label, price, time)}>Umów</TextButton>
            </div>
        </li>
    );
}