import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'motion/react';
import HeadParagraph from './Paragraph';

import bgImg from '../../assets/bg_img.jpg';
import Paragraph from './Paragraph';
import Button from './Button';

import tempImg from '../../assets/about_img.jpg';

interface Props {
    imgRef: React.RefObject<HTMLElement>;
}

export default ({imgRef}:Props) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    
    const { scrollYProgress: globalScroll } = useScroll({
        target: imgRef,
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

    const imageTranslateY = useTransform(
        globalScroll,
        [0.45, 0.5],  // Sync with SecondVideo (0.6) and NavBar end (0.85)
        [ "-100vh", "0vh"]  // Start offscreen, move to final position
    );

    const imageControls = useAnimation();

    useEffect(() => {
        const unsubscribe = globalScroll.on('change', (latest) => {
            if (latest >= 0.3) {
                imageControls.start({ opacity: 1 });
            } else {
                imageControls.start({ opacity: 0 });
            }

            if (latest >= 0.55) {
                imageControls.start({
                    clipPath: 'inset(0% 0% 0% 0%)',
                    transition: { duration: 0.3 },
                });
            }
            else {
                imageControls.start({
                    clipPath: 'inset(20% 30% 20% 30%)',
                    transition: { duration: 0.3 },
                });
            }
        });
    
        return () => unsubscribe();
    }, [globalScroll, imageControls]);
    

    return (  
        <section ref={sectionRef} className="relative h-[300vh]">
            <div className='h-screen sticky top-0'>
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div className='absolute w-full h-[120%]' style={{top: y}}>
                        <img src={bgImg} alt='bg' className='w-full h-full object-cover'/>
                    </motion.div>
                </div>

                <div className='absolute inset-0 flex flex-row items-center w-full h-full'>
                    <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                        <div className='flex flex-col justify-center'>
                            <h2 className='font-lato text-white font-bold text-xs tracking-wider uppercase z-20'>Oferta</h2>
                            <Paragraph textColor="#FFFFFF">strzyżenie męskie</Paragraph>
                            <Button>Zarezerwuj wizytę</Button>
                        </div>
                    </div>
                    <div className='w-1/2 h-full relative'>
                        <motion.img
                            src={tempImg}
                            alt='temp'
                            className='sticky top-0 w-full h-screen object-cover z-50'
                            initial={{ opacity: 0 }}
                            animate={imageControls}
                            transition={{ duration: 0.3 }}
                            style={{ 
                                translateY: imageTranslateY,
                                clipPath: 'inset(20% 30% 20% 30%)',
                                transform: 'translateY(-100vh)'
                            }}
                        />
                    </div>
                </div>
        </div>
    </section>
    );
};