import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryClient, fetchAvailableSlots } from '../../../utils/http';
import store from '../../../store/index';
import { useAppSelector } from '../../../store/hooks';
import { formatDateShortMonth, formatDateOnlyDay } from '../../../utils/utils';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { motion } from 'motion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/swiper-bundle.css';

type AvailabilityModel = string;

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    const totalDuration = useAppSelector((state) => state.cart.totalDuration);
    const [activeDate, setActiveDate] = useState<string | null>(null);

    const { data = [], error } = useQuery<AvailabilityModel[]>({
        queryKey: ['availableSlots', totalDuration],
        queryFn: () => fetchAvailableSlots(totalDuration)
    });
    
    if (error) return <div>Error loading offers</div>;

    const groupedSlots = data.reduce((acc, slot) => {
        const date = slot.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(slot);
        return acc;
    }, {} as Record<string, string[]>);

    const swiperRef = useRef<SwiperType>();

    const dates = Object.keys(groupedSlots);

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center items-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase pb-8">REZERWACJA WIZYTY</h1>

                <div className="flex flex-row justify-center">
                    <button onClick={() => swiperRef.current?.slidePrev()} className="z-10 p-2 text-charcoal">
                        <ChevronLeft size={32} strokeWidth={0.5} />
                    </button>

                    <div className="w-[20rem]">
                        <Swiper
                            modules={[Navigation]}
                            onBeforeInit={(swiper) => swiperRef.current = swiper}
                            navigation={{
                                prevEl: '.swiper-button-prev',
                                nextEl: '.swiper-button-next'
                            }}                            
                            slidesPerView={5}
                            spaceBetween={1}
                        >
                            {dates.map((date) => (
                                <SwiperSlide key={date} className="!m-2">
                                    <button 
                                        onClick={() => setActiveDate(date)}
                                        className={`
                                            p-3 border-b border-stone-300
                                            flex flex-col items-center justify-center
                                            `}
                                    >
                                        <div className='uppercase font-bold text-lg tracking-wider font-lato'>
                                            {formatDateOnlyDay(date)}
                                        </div>
                                        <div className='uppercase font-bold text-xs tracking-wider font-lato'>
                                            {formatDateShortMonth(date)}
                                        </div>
                                    </button>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <button onClick={() => swiperRef.current?.slideNext()} className="z-10 p-2 text-charcoal">
                        <ChevronRight size={32} strokeWidth={0.5} />
                    </button>

                </div>


                {activeDate && (
                    <ul className="flex flex-row p-8">
                        {groupedSlots[activeDate].map((slot) => (
                            <motion.li key={slot} whileHover={{ backgroundColor: "#f5f5f4", cursor: "pointer" }} className='m-1 p-2 border border-stone-300 text-charcoal uppercase font-bold text-xs tracking-wider font-lato'>
                                {new Date(slot).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </motion.li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export function loader() {
    const duration = store.getState().cart.totalDuration;

    return queryClient.fetchQuery({
        queryKey: ['availableSlots', duration],
        queryFn: () => fetchAvailableSlots(duration)
    });
}