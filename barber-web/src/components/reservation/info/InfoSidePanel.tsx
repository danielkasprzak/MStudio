import { motion, AnimatePresence  } from 'motion/react';
import { Link } from 'react-router-dom';

import Phone from "./Phone"
import Title from '../../Title';
import OpeningSchedule from './OpeningSchedule';
import Map from './Map';
import FlatButton from '../../FlatButton';

interface Props {
    isActive: boolean;
    onHover?: () => void;
    activeHeight: string;
    inactiveHeight: string;
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
            {onHover === undefined && (
                <Link to="/rezerwacja" className='w-full my-4'>
                    <FlatButton isActive={false} disabled={false}>Rezerwacja online</FlatButton>
                </Link>
            )}
            <Map />

            <AnimatePresence>
                {isActive && <OpeningSchedule /> }
            </AnimatePresence>
        </motion.div>
    )
}