import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import HeadParagraph from './Paragraph';

import bgImg from '../../assets/bg_img.jpg';

export default () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

    return (  
        <section ref={sectionRef} className="relative h-screen overflow-hidden">
            <motion.div className='absolute w-full h-[120%]' style={{top: y}}>
                <img src={bgImg} alt='bg' className='w-full h-full object-cover'/>
            </motion.div>
            <div className='flex flex-col'>
                <h2 className='font-lato text-white font-bold text-xs tracking-wider'>WSTĘP</h2>
                <HeadParagraph textColor="#FFFFFF">nasze włosy to deklaracja stylu,</HeadParagraph>
                <HeadParagraph textColor="#E5E7EB">afirmacja piękna i wyraz miłości do siebie</HeadParagraph>
            </div>
        </section>
    );
};