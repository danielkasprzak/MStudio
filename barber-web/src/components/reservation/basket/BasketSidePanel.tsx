import { motion } from 'framer-motion';
import { useAppSelector } from '../../../store/hooks';
import { basketActions } from "../../../store/basket-slice";
import { useAppDispatch } from "../../../store/hooks";

import Title from '../PanelTitle';
import SelectedOffer from '../SelectedOffer';
import Price from '../Price';
import Cart from './Cart';

interface BasketPanelProps {
  isActive: boolean;
  onHover: () => void;
  activeHeight: string;
  inactiveHeight: string;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight }: BasketPanelProps) => {
    const basketItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const clearItemsHandler = () => {
        dispatch(basketActions.clearItems());
    }

    const totalPrice = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <motion.div
            className='w-[26rem] h-[33%] bg-white border border-stone-300 mt-8 p-8 flex flex-col justify-between'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className="flex flex-row items-center">
                <Title>Koszyk</Title>
                <button onClick={clearItemsHandler} className='text-white pl-3'>U</button>
            </div>

            <Cart isActive={isActive} />

            <div className="flex flex-col justify-center pt-2">
                <p className="uppercase font-bold text-xs tracking-wider font-lato text-charcoal pb-2">Do zapłaty: 
                    <Price totalPrice={totalPrice} />zł
                </p>
                <button className="w-full uppercase font-bold text-xs tracking-wider font-lato border text-charcoal border-stone-300 px-4 py-2 flex flex-row justify-center items-center">Zarezerwuj</button>
            </div>
        </motion.div>
    )
}