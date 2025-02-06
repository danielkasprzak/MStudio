import { motion } from 'motion/react';
import { useAppSelector } from '../../../store/hooks';
import { basketActions } from "../../../store/basket-slice";
import { useAppDispatch } from "../../../store/hooks";
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

import Title from '../../Title';
import Price from './Price';
import Cart from './Cart';
import FlatButton from '../../FlatButton';

interface Props {
  isActive: boolean;
  onHover?: () => void;
  activeHeight: string;
  inactiveHeight: string;
  isMobile?: boolean;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight, isMobile }: Props) => {
    const isVisible = useAppSelector((state) => state.cart.isVisible);
    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const dispatch = useAppDispatch();

    const clearItemsHandler = () => {
        dispatch(basketActions.clearItems());
    }

    const closePanel = () => {
        dispatch(basketActions.hidePanel());
    };

    return (
        <motion.div
            className='fixed top-0 left-0 md:relative w-3/4 md:w-[26rem] h-full md:h-[33%] bg-white border-r md:border border-stone-300 md:mt-8 p-8 flex flex-col justify-between z-40'
            onMouseEnter={onHover}
            initial={isMobile && { x: '-100%' }}
            animate={isMobile ? { x: isVisible ? 0 : '-100%' } : { height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <div className="flex flex-row items-center justify-between">
                <Title>Koszyk</Title>
                <button onClick={closePanel} className="relative md:hidden outline-none">
                    <X color="#353535" size={24} strokeWidth={1.25} />
                </button>
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