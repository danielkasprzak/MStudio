import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import HeroVideo from '../../assets/hero_vid.mp4';
import SecondVideo from '../../assets/second_vid.mp4';
import Video from './Video';
import Introduction from './Introduction';

export default () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
    });

    const opacityTitle = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacityParagraph = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
    const textColorFirst = useTransform(scrollYProgress, [0.5, 0.6], ['#E5E7EB', '#FFFFFF']);
    const textColorSecond = useTransform(scrollYProgress, [0.5, 0.6], ['#FFFFFF', '#E5E7EB']);
    const videoX = useAnimation();
    const controls = useAnimation();

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (latest >= 0.3 && latest < 0.9) {
                controls.start({
                    clipPath: 'inset(20% 10% 20% 10%)',
                    transition: { duration: 0.3 },
                });
            } else {
                controls.start({
                    clipPath: 'inset(0 0 0 0)',
                    transition: { duration: 0.3 },
                });
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, controls]);


    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange((latest) => {
            if (latest >= 0.8) {
                videoX.start({ x: '-100%', transition: { duration: 0.3 } });
            } else {
                videoX.start({ x: '0%', transition: { duration: 0.3 } });
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, videoX]);

    return (  
        <section ref={heroRef} className="relative h-[360vh]">
            <motion.div className='h-screen flex justify-center sticky top-0 overflow-hidden' animate={controls}>
                <div className="absolute w-[200vw] inset-0 flex" >
                    <div className="relative w-screen h-screen flex items-center justify-center">
                        <Introduction textColorFirst={textColorFirst} textColorSecond={textColorSecond} opacityTitle={opacityTitle} opacityParagraph={opacityParagraph} />
                        <Video source={HeroVideo} zClass='-z-40' />
                    </div>
                    <motion.div className="relative w-screen h-screen" animate={videoX}>
                        <Video source={SecondVideo} zClass='-z-20' />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};