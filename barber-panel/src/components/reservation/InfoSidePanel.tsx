import { motion, AnimatePresence  } from 'framer-motion';

import Phone from "./Phone"
import Title from './PanelTitle';

interface InfoPanelProps {
    isActive: boolean;
    onHover: () => void;
    activeHeight: string;
    inactiveHeight: string;
}

export default ({ isActive, onHover, activeHeight, inactiveHeight }: InfoPanelProps) => {
    return (
        <motion.div 
            className='w-[26rem] h-[66%] bg-dark-foreground text-white rounded-2xl flex flex-col items-center p-8'
            onMouseEnter={onHover}
            animate={{ height: isActive ? activeHeight : inactiveHeight }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
            <Title>MSTUDIO</Title>
            <Phone>622 371 764</Phone>
            <motion.iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102975.0253710739!2d22.519581533009713!3d51.32894535835359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722455760b0a1cb%3A0x834e56d597042c11!2sM%20Studio%20Fryzjerstwo%20Ogrodowa%2053!5e0!3m2!1spl!2spl!4v1733770489716!5m2!1spl!2spl" 
                className="border-0 h-fit w-full rounded-xl mt-8 invert grayscale-[100%]" loading="lazy" allowFullScreen={false} referrerPolicy="no-referrer-when-downgrade"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            ></motion.iframe>

            <AnimatePresence>
            {isActive && <motion.ul
                className="w-full h-full mt-8 font-montserrat text-sm text-neutral-300 tracking-wide px-12 py-4 border leading-6 rounded-xl border-neutral-800"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                {[
                    { day: "Poniedziałek", hours: "08:00 - 16:00" },
                    { day: "Wtorek", hours: "08:00 - 16:00" },
                    { day: "Środa", hours: "08:00 - 16:00" },
                    { day: "Czwartek", hours: "08:00 - 16:00" },
                    { day: "Piątek", hours: "08:00 - 16:00" },
                    { day: "Sobota", hours: "08:00 - 14:00" },
                    { day: "Niedziela", hours: "Nieczynne" },
                ].map((entry, index) => (
                    <motion.li
                        key={entry.day}
                        className="w-full flex flex-row justify-between"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                        <span>{entry.day}</span>
                        <span>{entry.hours}</span>
                    </motion.li>
                ))}
                </motion.ul>}
            </AnimatePresence>
        </motion.div>
    )
}