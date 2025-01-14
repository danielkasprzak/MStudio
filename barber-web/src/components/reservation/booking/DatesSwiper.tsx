import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDateOnlyDay, formatDateShortMonth } from '../../../utils/utils';

import 'swiper/swiper-bundle.css';

interface Props {
    setActiveDate: (date: string) => void;
    dates: string[];
}

export default ({ setActiveDate, dates }: Props) => {
    const swiperRef = useRef<SwiperType>();

    return (
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
                            className={`p-4 border-b border-stone-300 flex flex-col items-center justify-center`}
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
    );
}