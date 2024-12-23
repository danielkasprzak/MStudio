import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react'; 

import HeroVideo from '../../assets/vid8.mp4';

export default () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });
    const opacityH1 = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const opacityH2 = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={ref} className="relative h-[200vh]">
            <div className='h-screen flex flex-col justify-center sticky top-0 overflow-hidden'>
                <div className="absolute inset-0 -z-10">
                    <video className="w-full h-full object-cover" autoPlay muted loop>
                        <source src={HeroVideo} type="video/mp4"/>
                    </video>
                </div>

                <div className="flex flex-col items-center">
                    <motion.h1
                        className='text-9xl text-center font-cormorant font-medium text-white'
                        style={{ opacity: opacityH1 }}
                    >
                        MSTUDIO
                    </motion.h1>
                    <motion.h2
                        className='text-6xl text-center font-cormorant font-medium text-white'
                        style={{ opacity: opacityH2 }}
                    >
                        Welcome to MSTUDIO
                    </motion.h2>
                </div>
            </div>
        </section>
    );
}