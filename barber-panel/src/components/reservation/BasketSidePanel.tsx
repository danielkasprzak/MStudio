import { motion } from 'framer-motion';

import Title from './PanelTitle';
import SelectedOffer from './SelectedOffer';

interface BasketPanelProps {
  isActive: boolean;
  onHover: () => void;
  activeHeight: string;
  inactiveHeight: string;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight }: BasketPanelProps) => {
    return (
        <motion.div
            className='w-[26rem] h-[33%] bg-dark-foreground rounded-2xl mt-8 p-8 flex flex-col justify-between'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Title>Koszyk</Title>

            <ul className="flex flex-col justify-center text-sm text-neutral-300 font-normal">
                <SelectedOffer label='Strzyżenie męskie' price='40' time='25' />
                <li>...więcej</li>
            </ul>

            <div className="flex flex-col justify-center pt-2">
                <p className="font-montserrat text-neutral-300 text-sm font-normal pb-2">Do zapłaty: <span className="font-medium text-white pl-3">260 PLN</span></p>
                <button className="w-full font-montserrat font-normal border border-neutral-800 px-4 py-2 rounded-xl tracking-wide text-neutral-300 flex flex-row justify-center items-center">Zarezerwuj</button>
            </div>
        </motion.div>
    )
}