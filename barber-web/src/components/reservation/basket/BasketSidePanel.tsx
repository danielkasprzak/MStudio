import { motion } from 'framer-motion';
import { useAppSelector } from '../../../store/hooks';
import { basketActions } from "../../../store/basket-slice";
import { useAppDispatch } from "../../../store/hooks";
import { Link, NavLink } from 'react-router-dom';

import Title from '../../Title';
import Price from './Price';
import Cart from './Cart';
import FlatButton from '../../FlatButton';

interface Props {
  isActive: boolean;
  onHover: () => void;
  activeHeight: string;
  inactiveHeight: string;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight }: Props) => {
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const dispatch = useAppDispatch();

    const clearItemsHandler = () => {
        dispatch(basketActions.clearItems());
    }

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
                <p className="uppercase font-bold text-xs tracking-wider font-lato text-charcoal pb-2">Koszt rezerwacji: 
                    <Price totalPrice={totalPrice} />zł
                </p>

                <Link to="/rezerwuj">
                    <FlatButton disabled={totalPrice === 0} isActive={false}>Zarezerwuj</FlatButton>
                </Link>
            </div>
        </motion.div>
    )
}