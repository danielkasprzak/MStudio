import { motion, useScroll, useTransform } from 'motion/react';
import Image from '../../assets/underfooter.webp';
import Button from './Button';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

    return (  
        <div ref={ref} className="relative w-full h-auto z-0">
            <motion.div className='absolute w-full h-[120%]' style={{top: y}}>
                <img src={Image} className='absolute w-full h-full inset-0 object-cover'></img>
            </motion.div>
            <div className='relative w-full h-full flex flex-col items-center justify-center py-36 px-24 md:p-48'>
                <h2 className='font-lato text-white font-bold text-xs tracking-wider uppercase z-20'>Nie zwlekaj</h2>
                <h1 className='font-cormorant font-medium text-2xl sm:text-3xl text-white uppercase p-4 z-20'>Podążaj za trendami</h1>
                <Link to='/rezerwacja' className='z-20'>
                    <Button>Zarezerwuj wizytę</Button>
                </Link>
            </div>
        </div>
    );
};