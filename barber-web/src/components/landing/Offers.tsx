import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'motion/react';

import bgImg from '../../assets/bg_img.jpg';
import Paragraph from './Paragraph';
import Button from './Button';

import tempImg from '../../assets/about_img.jpg';
import tempImg2 from '../../assets/bg_img.jpg';
import OfferImage from './OfferImage';

interface Props {
    imgRef: React.RefObject<HTMLElement>;
}

const services = [
    { image: tempImg, title: "strzyżenie męskie" },
    { image: tempImg2, title: "strzyżenie damskie" },
];

export default ({imgRef}:Props) => {
    const sectionRef = useRef(null);




    const { scrollYProgress: offersScroll } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    const { scrollYProgress: globalScroll } = useScroll({
        target: imgRef,
    });

    const y = useTransform(offersScroll, [0, 1], ["-20%", "10%"]);
    const imageTranslateY = useTransform(globalScroll, [0.35, 0.5], ["-100vh", "0vh"]);

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
                            <Paragraph textColor="#FFFFFF"></Paragraph>
                            <Button>Zarezerwuj wizytę</Button>
                        </div>
                    </div>
                    <div className='w-1/2 h-full relative'>
                        <motion.div
                            className='sticky top-0 w-full h-screen flex flex-col justify-start items-stretch z-50 overflow-hidden'
                            initial={{ opacity: 0, translateY: '-100vh' }}
                            animate={imageControls}
                            transition={{ duration: 0.3 }}
                            style={{ 
                                translateY: imageTranslateY,
                                clipPath: 'inset(20% 30% 20% 30%)'
                            }}
                        >
                            
                            <OfferImage image={tempImg2} alt="Oferta 2" scrollYProgress={offersScroll} scrollFrom={0.5} scrollTo={0.55} />
                            <OfferImage image={tempImg} alt="Oferta 1" scrollYProgress={offersScroll} scrollFrom={0.4} scrollTo={0.45} />
                        
                        
                        </motion.div>
                    </div>
                </div>
        </div>
    </section>
    );
};