import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'motion/react';

import Paragraph from './Paragraph';
import Button from './Button';
import OfferImage from './OfferImage';

import cutImg from '../../assets/offers/cut.jpg';
import keratinImg from '../../assets/offers/keratin.jpg';
import colorationImg from '../../assets/offers/coloration.jpg';
import stylingImg from '../../assets/offers/styling.webp';
import saunaImg from '../../assets/offers/sauna.jpg';
import botoxImg from '../../assets/offers/botox.webp';
import { Link } from 'react-router-dom';

interface Props {
    imgRef: React.RefObject<HTMLElement>;
}

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
        <section ref={sectionRef} id="oferty" className="relative h-[300vh]">
            <div className='h-screen sticky top-0'>
                <div className="absolute inset-0 overflow-hidden z-0">
                    <motion.div className='absolute w-full h-[120%] bg-stone-100' style={{top: y}}>
                        {/* <img src={bgImg} alt='bg' className='w-full h-full object-cover'/> */}
                    </motion.div>
                </div>

                <div className='absolute inset-0 flex flex-row items-center w-full h-full'>
                    <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                        <div className='flex flex-col justify-center'>
                            <h2 className='font-lato text-charcoal font-bold text-xs tracking-wider uppercase z-20'>Oferta</h2>
                            <Paragraph textColor="#353535"></Paragraph>
                            <Link to='/rezerwacja'>
                                <Button>Zarezerwuj wizytę</Button>
                            </Link>                            
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
                            
                            <OfferImage image={stylingImg} isLast alt="keratynowe wygladzanie wlosow" scrollYProgress={offersScroll} scrollFrom={0.9} scrollTo={0.95} />
                            <OfferImage image={saunaImg} isLast={false} alt="keratynowe wygladzanie wlosow" scrollYProgress={offersScroll} scrollFrom={0.8} scrollTo={0.85} />
                            <OfferImage image={botoxImg} isLast={false} alt="keratynowe wygladzanie wlosow" scrollYProgress={offersScroll} scrollFrom={0.7} scrollTo={0.75} />
                            <OfferImage image={keratinImg} isLast={false} alt="keratynowe wygladzanie wlosow" scrollYProgress={offersScroll} scrollFrom={0.6} scrollTo={0.65} />
                            <OfferImage image={colorationImg} isLast={false} alt="koloryzacja wlosow" scrollYProgress={offersScroll} scrollFrom={0.5} scrollTo={0.55} />
                            <OfferImage image={cutImg} isLast={false} alt="strzyzenie wlosow" scrollYProgress={offersScroll} scrollFrom={0.4} scrollTo={0.45} />
                        </motion.div>
                    </div>
                </div>
        </div>
    </section>
    );
};