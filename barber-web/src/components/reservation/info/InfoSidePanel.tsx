import { motion, AnimatePresence  } from 'motion/react';

import Phone from "./Phone"
import Title from '../../Title';
import OpeningSchedule from './OpeningSchedule';
import Map from './Map';

interface Props {
    isActive: boolean;
    onHover: () => void;
    activeHeight: string;
    inactiveHeight: string;
}

interface OpeningHoursModel {
    dayOfWeek: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight }: Props) => {

    return (
        <motion.div 
            className='w-[26rem] h-[66%] bg-white border border-stone-300 text-charcoal flex flex-col items-center p-8'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Title>MSTUDIO</Title>
            <Phone>622 371 764</Phone>
            <Map />

            <AnimatePresence>
                {isActive && <OpeningSchedule /> }
            </AnimatePresence>
        </motion.div>
    )
}