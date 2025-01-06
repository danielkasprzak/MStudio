import { useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import HeroVideo from '../../assets/hero_vid.mp4';
import SecondVideo from '../../assets/second_vid.mp4';
import Video from './Video';
import Introduction from './Introduction';

interface Props {
    heroRef: React.RefObject<HTMLElement>;
}

export default ({ heroRef }: Props) => {
    const { scrollYProgress } = useScroll({
        target: heroRef,
    });

    const opacityTitle = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const opacityParagraph = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
    const textColorFirst = useTransform(scrollYProgress, [0.15, 0.25], ['#E5E7EB', '#FFFFFF']);
    const textColorSecond = useTransform(scrollYProgress, [0.15, 0.25], ['#FFFFFF', '#E5E7EB']);

    const videoOverlay = useAnimation();
    const controls = useAnimation();

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest >= 0.4 && latest < 0.75) {
                controls.start({
                    clipPath: 'inset(20% 10% 20% 10%)',
                    transition: { duration: 0.3 },
                });
            } else {
                controls.start({
                    clipPath: 'inset(0% 0% 0% 0%)',
                    transition: { duration: 0.3 },
                });
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, controls]);


    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (latest >= 0.6) {
                videoOverlay.start({ y: '-100%', transition: { duration: 0.3 } });
            } else {
                videoOverlay.start({ y: '0%', transition: { duration: 0.3 } });
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, videoOverlay]);

    return (  
        <section ref={heroRef} className="relative h-[460vh]">
            <motion.div className='h-screen sticky top-0' animate={controls}>
                <div className="absolute h-[200vh] inset-0 flex flex-col" >
                    <div className="relative w-screen h-screen flex items-center justify-center">
                        <Introduction textColorFirst={textColorFirst} textColorSecond={textColorSecond} opacityTitle={opacityTitle} opacityParagraph={opacityParagraph} />
                        <Video source={HeroVideo} zClass='-z-40' />
                    </div>
                    <motion.div className="relative w-screen h-screen" animate={videoOverlay}>
                        <Video source={SecondVideo} zClass='-z-20' />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};