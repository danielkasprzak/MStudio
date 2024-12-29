import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import HeroVideo from '../../assets/hero_vid.mp4';
import VidBackground from './VidBackground';
import HeadParagraph from './HeadParagraph';

export default () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const opacityH1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const opacityH2 = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const textColor = useTransform(scrollYProgress, [0.9, 1], ['#E5E7EB', '#FFFFFF']);
    const textColor2 = useTransform(scrollYProgress, [0.9, 1], ['#FFFFFF', '#E5E7EB']);

    const controlsHeight = useAnimation();
    const controlsWidth = useAnimation();

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (latest >= 0.4) {
                controlsHeight.start({ height: '20%', transition: { duration: 0.3 } });
                controlsWidth.start({ width: '12%', transition: { duration: 0.3 } });
            } else {
                controlsHeight.start({ height: '0%', transition: { duration: 0.3 } });
                controlsWidth.start({ width: '0%', transition: { duration: 0.3 } });
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, controlsHeight, controlsWidth]);

    return (
        <section ref={ref} className="relative h-[160vh]">
            <div className='h-screen flex flex-col justify-center sticky top-0 overflow-hidden'>
                <motion.div className="absolute inset-0 flex items-center justify-center -z-10 bg-white">
                    <div className="relative w-full h-full bg-white">
                        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop>
                            <source src={HeroVideo} type="video/mp4" />
                        </video>
                    </div>
                </motion.div>

                <motion.div
                    className="w-screen absolute inset-0 z-0 bg-white"
                    initial={{ height: '0%' }}
                    animate={controlsHeight}
                />
                
                <motion.div
                    className="w-screen absolute bottom-0 z-0 bg-white"
                    initial={{ height: '0%' }}
                    animate={controlsHeight}
                />
                
                <motion.div
                    className="h-screen absolute right-0 z-0 bg-white"
                    initial={{ width: '0%' }}
                    animate={controlsWidth}
                />
                
                <motion.div
                    className="h-screen absolute left-0 z-0 bg-white"
                    initial={{ width: '0%' }}
                    animate={controlsWidth}
                />

                <div className="relative flex flex-col items-center justify-center">
                    <motion.h1
                        className='absolute text-9xl text-center font-cormorant font-medium text-white'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        style={{ opacity: opacityH1 }}
                    >
                        MSTUDIO
                    </motion.h1>
                    <motion.div
                        className='absolute text-left max-w-80 mr-20'
                        style={{ opacity: opacityH2 }}
                    >
                        <h2 className='font-lato text-white font-bold text-xs tracking-wider'>WSTĘP</h2>
                        <HeadParagraph textColor={textColor2}>nasze włosy to deklaracja stylu,</HeadParagraph>
                        <HeadParagraph textColor={textColor}>afirmacja piękna i wyraz miłości do siebie</HeadParagraph>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};