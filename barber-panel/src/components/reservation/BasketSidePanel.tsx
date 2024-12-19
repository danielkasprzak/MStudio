import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';
import { basketActions } from "../../store/basket-slice";
import { useAppDispatch } from "../../store/hooks";

import Title from './PanelTitle';
import SelectedOffer from './SelectedOffer';
import Price from './Price';

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
            className='w-[26rem] h-[33%] bg-dark-foreground rounded-2xl mt-8 p-8 flex flex-col justify-between'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className="flex flex-row items-center">
                <Title>Koszyk</Title>
                <button onClick={clearItemsHandler} className='text-white pl-3'>U</button>
            </div>

            <ul className="flex flex-col justify-center text-sm text-neutral-300 font-normal font-montserrat">
            {basketItems.length === 0 ? (
                <li>Brak</li>
                ) : isActive ? (
                    basketItems.map((item) => (
                        <SelectedOffer 
                            key={item.id}
                            id={item.id} 
                            label={item.label} 
                            price={item.price} 
                            time={item.time} 
                            quantity={item.quantity}
                        />
                    ))
                ) : (
                    <>
                        <SelectedOffer 
                            key={basketItems[0].id}
                            id={basketItems[0].id} 
                            label={basketItems[0].label} 
                            price={basketItems[0].price} 
                            time={basketItems[0].time} 
                            quantity={basketItems[0].quantity}
                        />
                        {basketItems.length > 1 && <li>...więcej</li>}
                    </>
                )}
            </ul>

            <div className="flex flex-col justify-center pt-2">
                <p className="font-montserrat text-neutral-300 text-sm font-normal pb-2">Do zapłaty: 
                    <Price totalPrice={totalPrice} />
                </p>
                <button className="w-full font-montserrat font-normal border border-neutral-800 px-4 py-2 rounded-xl tracking-wide text-neutral-300 flex flex-row justify-center items-center">Zarezerwuj</button>
            </div>
        </motion.div>
    )
}