import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateOnlyDay, formatDateShortMonth, formatDateWeekday } from '../../../utils/utils';
import { motion } from 'motion/react';

import 'swiper/swiper-bundle.css';

interface Props {
    setActiveDate: (date: string) => void;
    activeDate: string | null;
    dates: string[];
}

export default ({ setActiveDate, activeDate, dates }: Props) => {
    const swiperRef = useRef<SwiperType>();
    return (
        <div className="pt-4 pb-8 flex flex-row items-center">
            <button onClick={() => swiperRef.current?.slidePrev()} className="z-10 p-2 text-charcoal">
                <ChevronLeft size={32} strokeWidth={0.5} />
            </button>

            <div className="w-[20rem]">
                <Swiper
                    onBeforeInit={(swiper) => swiperRef.current = swiper}                  
                    slidesPerView={4}
                    spaceBetween={4}
                >
                    {dates.map((date) => (
                        <SwiperSlide key={date}>
                            <motion.button 
                                onClick={() => setActiveDate(date)}
                                whileHover={{ backgroundColor: "#f5f5f4" }}
                                className={`${activeDate === date ? 'bg-stone-100' : ''} m-1 py-2 px-3 h-min select-none border border-stone-300 flex flex-col outline-none items-center justify-center}`}
                            >
                                <div className='uppercase font-black text-xs tracking-wider font-lato text-charcoal'>
                                    {formatDateWeekday(date)}
                                </div>
                                <div className='uppercase font-bold text-xs tracking-wider font-lato text-charcoal flex flex-row justify-between items-center'>
                                    <p className='pr-1'>{formatDateOnlyDay(date)}</p><p className='pl-1'>{formatDateShortMonth(date)}</p>
                                </div>
                            </motion.button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <button onClick={() => swiperRef.current?.slideNext()} className="z-10 p-2 text-charcoal">
                <ChevronRight size={32} strokeWidth={0.5} />
            </button>
        </div>
    );
}