import { motion, useScroll, useTransform } from 'motion/react';

import Paragraph from './Paragraph';

export default () => {
    const { scrollYProgress } = useScroll();

    const translateY = useTransform(
        scrollYProgress,
        [0.27, 0.32],
        ["100vh", "0vh"]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0.29, 0.32],
        [0, 1]
    );

    return (
        <div className='absolute inset-0 flex flex-row items-center w-full h-full'>
            <div className='w-full h-full relative flex flex-col justify-center items-center'>
                <motion.div 
                    className='flex flex-col justify-center max-w-96'
                    style={{ translateY, opacity }}
                >
                    <h2 className='font-lato text-white font-bold text-xs tracking-wider uppercase z-20'>
                        Poznaj nas
                    </h2>
                    <Paragraph textColor="#FFFFFF">
                        jesteśmy renonowanym salonem fryzjerskim,
                    </Paragraph>
                    <Paragraph textColor="#FFFFFF">
                        od ponad dwudziestu lat specjalizujemy się w,
                    </Paragraph>
                    <Paragraph textColor="#FFFFFF">
                        stylizacji i pielęgnacji włosów.
                    </Paragraph>
                </motion.div>
            </div>
            <div className='w-full h-full relative hidden sm:block'></div>
        </div>
    );
};