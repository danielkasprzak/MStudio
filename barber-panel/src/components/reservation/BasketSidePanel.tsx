import { motion } from 'framer-motion';
import { useAppSelector } from '../../store/hooks';

import Title from './PanelTitle';
import SelectedOffer from './SelectedOffer';

interface BasketPanelProps {
  isActive: boolean;
  onHover: () => void;
  activeHeight: string;
  inactiveHeight: string;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight }: BasketPanelProps) => {
    const basketItems = useAppSelector((state) => state.cart.items)

    return (
        <motion.div
            className='w-[26rem] h-[33%] bg-dark-foreground rounded-2xl mt-8 p-8 flex flex-col justify-between'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Title>Koszyk</Title>

            <ul className="flex flex-col justify-center text-sm text-neutral-300 font-normal">
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
                        />
                        {basketItems.length > 1 && <li>...więcej</li>}
                    </>
                )}
            </ul>

            <div className="flex flex-col justify-center pt-2">
                <p className="font-montserrat text-neutral-300 text-sm font-normal pb-2">Do zapłaty: <span className="font-medium text-white pl-3">260 PLN</span></p>
                <button className="w-full font-montserrat font-normal border border-neutral-800 px-4 py-2 rounded-xl tracking-wide text-neutral-300 flex flex-row justify-center items-center">Zarezerwuj</button>
            </div>
        </motion.div>
    )
}