import { useQuery } from '@tanstack/react-query';
import { fetchOpeningHours } from '../../../utils/http';
import { dayTranslations, WEEK_ORDER } from "../../../utils/utils";
import { motion } from 'motion/react';

interface OpeningHoursModel {
    dayOfWeek: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default () => { 
    const { data = [], error, isLoading } = useQuery<OpeningHoursModel[]>({
        queryKey: ['openinghours'],
        queryFn: fetchOpeningHours
    });
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading offers</div>;

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    const sortedData = data.sort((a, b) => {
        return WEEK_ORDER.indexOf(a.dayOfWeek) - WEEK_ORDER.indexOf(b.dayOfWeek);
    });

    return (
        <motion.ul
        className="w-full h-full mt-8 text-charcoal px-6 py-4 border border-stone-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        >
            {sortedData.map((item, index) => (
                <motion.li
                    key={item.dayOfWeek}
                    className={`${item.dayOfWeek === today ? "text-charcoal" : "text-stone-500"} w-full uppercase font-bold text-xs tracking-wider font-lato flex flex-row justify-between py-1`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                    <span>{dayTranslations[item.dayOfWeek]}</span>
                    {item.isOpen ? <span>{item.openHour} - {item.closeHour}</span> : <span>Zamknięte</span>}
                </motion.li>
            ))}
        </motion.ul>
    );
}