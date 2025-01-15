import { motion, useScroll, useTransform } from 'motion/react';

import Paragraph from './Paragraph';

export default () => {
    const { scrollYProgress } = useScroll();

    const translateY = useTransform(
        scrollYProgress,
        [0.4, 0.6],  // Start animation at 40% scroll
        ["100vh", "0vh"]  // Move from below viewport to final position
    );

    const opacity = useTransform(
        scrollYProgress,
        [0.4, 0.6],
        [0, 1]
    );

    return (
        <div className='absolute inset-0 flex flex-row items-center w-full h-full'>
            <div className='w-full h-full flex flex-col justify-center items-center'>
                <motion.div 
                    className='flex flex-col justify-center'
                    style={{ translateY, opacity }}
                >
                    <h2 className='font-lato text-white font-bold text-xs tracking-wider uppercase z-20'>
                        Poznaj nas
                    </h2>
                    <Paragraph textColor="#FFFFFF">
                        jesteśmy salonem fryzjeskim z ponad dwudziestolenią tradycją,
                    </Paragraph>
                    <Paragraph textColor="#FFFFFF">
                        nasz zespół to profesjonaliści z pasją,
                    </Paragraph>
                    <Paragraph textColor="#FFFFFF">
                        zawsze stawiamy na jakość i zadowolenie klienta.
                    </Paragraph>
                </motion.div>
            </div>
            <div className='w-full h-full relative'>
            </div>
        </div>
    );
};