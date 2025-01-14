import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

import 'swiper/swiper-bundle.css';

interface Props {
    onSlotSelect: (slot: string) => void;
    slots: string[];
}

export default ({ onSlotSelect, slots }: Props) => {
    const swiperRef = useRef<SwiperType>();

    return (
        <div className="flex flex-row justify-center">
            <button onClick={() => swiperRef.current?.slidePrev()} className="z-10 p-2 text-charcoal">
                <ChevronLeft size={32} strokeWidth={0.5} />
            </button>

            <div className="w-[20rem]">
                <Swiper
                    onBeforeInit={(swiper) => swiperRef.current = swiper}                         
                    slidesPerView={5}
                    spaceBetween={1}
                >
                    {slots.map((slot) => (
                        <SwiperSlide key={slot} className="!m-2">
                            <motion.button
                                whileHover={{ backgroundColor: "#f5f5f4" }}
                                onClick={() => onSlotSelect(slot)}
                                className="m-1 p-2 w-full border border-stone-300 text-charcoal uppercase font-bold text-xs tracking-wider font-lato"
                            >
                                {new Date(slot).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                })}
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