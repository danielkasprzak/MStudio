import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroVideo from '../../assets/hero_vid.mp4';
import VidBackground from './VidBackground';

export default () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const opacityH1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const opacityH2 = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const scaleVideo = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.8]);
    const textColor = useTransform(scrollYProgress, [0.9, 1], ['#E5E7EB', '#FFFFFF']);
    const textColor2 = useTransform(scrollYProgress, [0.9, 1], ['#FFFFFF', '#E5E7EB']);

    return (
        <section ref={ref} className="relative h-[160vh]">
            <div className='h-screen flex flex-col justify-center sticky top-0 overflow-hidden'>
                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{ scale: scaleVideo }}
                >
                    <VidBackground vid={HeroVideo} />
                </motion.div>

                <div className="relative flex flex-col items-center justify-center">
                    <motion.h1
                        className='absolute text-9xl text-center font-cormorant font-medium text-white'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        style={{ opacity: opacityH1 }}
                    >
                        MSTUDIO
                    </motion.h1>
                    <motion.div
                        className='absolute text-left max-w-80 mr-20'
                        style={{ opacity: opacityH2 }}
                    >
                        <h2 className='font-lato text-white font-bold text-xs tracking-wider'>WSTĘP</h2>
                        <motion.p className='font-cormorant text-xl font-medium' style={{ color: textColor2 }}>nasze włosy to deklaracja stylu,</motion.p>
                        <motion.p className='font-cormorant text-xl font-medium' style={{ color: textColor }}>afirmacja piękna i wyraz miłości do siebie</motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};