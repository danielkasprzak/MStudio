import { AnimationControls, motion, MotionValue, useTransform } from 'framer-motion';

interface Props { 
    sloganAnimation: AnimationControls;
}

export default ({ sloganAnimation }: Props) => {
    const texts = ["STYL", "PIĘKNO", "SIEBIE"];

    return (
        <motion.div className='pt-[14%] flex flex-row justify-center items-center w-full h-auto -z-10 text-10xl font-cormorant font-medium text-white'>
            <h1 className='p-4'>ODKRYJ</h1>
            <motion.div className='h-60 p-4 overflow-y-hidden flex flex-col'>
                {texts.map((text, index) => (
                    <motion.span key={index} className='italic pb-16' animate={sloganAnimation} transition={{ duration: 0.2 }}>
                        {text}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}