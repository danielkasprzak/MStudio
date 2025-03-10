import { motion, MotionValue } from 'motion/react';

import Paragraph from './Paragraph';

interface Props {
    opacityTitle: MotionValue<number>;
    opacityParagraph: MotionValue<number>;
    textColorFirst: MotionValue<string>;
    textColorSecond: MotionValue<string>;
}

export default ({ opacityTitle, opacityParagraph, textColorFirst, textColorSecond } : Props) => {
    return (
        <>
            <motion.h1
                className='absolute text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center font-cormorant font-medium text-white -z-30'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ opacity: opacityTitle }}
            >
                MSTUDIO
            </motion.h1>
            <motion.div
                className='absolute text-left max-w-80 -z-30'
                style={{ opacity: opacityParagraph }}
            >
                <h2 className='font-lato text-white font-bold text-xs tracking-wider'>WSTĘP</h2>
                <Paragraph textColor={textColorSecond}>nasze włosy to deklaracja stylu,</Paragraph>
                <Paragraph textColor={textColorFirst}>afirmacja piękna i wyraz miłości do siebie</Paragraph>
            </motion.div>
        </>
    );
}