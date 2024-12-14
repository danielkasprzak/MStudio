import { basketActions } from "../../store/basket-slice";
import { useAppDispatch } from "../../store/hooks";

export default () => {
    const dispatch = useAppDispatch();

    const addItemHandler = () => {
        dispatch(basketActions.addItem());
    }

    return (
    <li className="mb-4 w-full font-montserrat border border-neutral-800 rounded-xl text-neutral-300 flex flex-row justify-between py-4 px-6">
        <div className="flex flex-col justify-center items-start">
            <div className="flex flex-row justify-start items-center">
                <h1 className="text-xl font-semibold text-white">Strzyżenie męskie</h1>
                <p className="text-xs pl-3">40min</p>
            </div>
            <p className="text-xs font-normal text-balance">Profesjonalna stylizacja i strzyżenie męskie.</p>
        </div>
        <div className="flex flex-row items-center justify-end pl-4">
            <p className="text-white font-normal text-normal px-3 text-nowrap">$ <span className="font-semibold">45</span>PLN</p>
            <button onClick={addItemHandler} className="border border-neutral-800 rounded-xl py-2 px-4 tracking-wide text-sm">Umów</button>
        </div>
    </li>
    )
}