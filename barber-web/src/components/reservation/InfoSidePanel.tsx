import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence  } from 'framer-motion';
import { fetchOpeningHours } from '../../utils/http';
import { dayTranslations } from "../../utils/utils";

import Phone from "./Phone"
import Title from './PanelTitle';

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
    const { data = [], error, isLoading } = useQuery<OpeningHoursModel[]>({
        queryKey: ['openinghours'],
        queryFn: fetchOpeningHours
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offers</div>;

    return (
        <motion.div 
            className='w-[26rem] h-[66%] bg-white border border-stone-300 text-charcoal flex flex-col items-center p-8'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Title>MSTUDIO</Title>
            <Phone>622 371 764</Phone>
            <motion.iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102975.0253710739!2d22.519581533009713!3d51.32894535835359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722455760b0a1cb%3A0x834e56d597042c11!2sM%20Studio%20Fryzjerstwo%20Ogrodowa%2053!5e0!3m2!1spl!2spl!4v1733770489716!5m2!1spl!2spl" 
                className="border-0 h-fit w-full mt-8" loading="lazy" allowFullScreen={false} referrerPolicy="no-referrer-when-downgrade"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.iframe>

            <AnimatePresence>
            {isActive && <motion.ul
                className="w-full h-full mt-8 text-charcoal px-12 py-4 uppercase font-bold text-xs tracking-wider font-lato border border-stone-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {data.map((item, index) => (
                        <motion.li
                            key={item.dayOfWeek}
                            className="w-full flex flex-row justify-between"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                            <span>{dayTranslations[item.dayOfWeek]}</span>
                            {item.isOpen ? <span>{item.openHour} - {item.closeHour}</span> : <span>Zamknięte</span>}
                        </motion.li>
                    ))}
                </motion.ul>}
            </AnimatePresence>
        </motion.div>
    )
}