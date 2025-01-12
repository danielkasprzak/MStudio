import { AnimationControls, motion } from 'framer-motion';

interface Props { 
    sloganAnimation: AnimationControls;
}

export default ({ sloganAnimation }: Props) => {
    const texts = ["PIĘKNO", "STYL", "SIEBIE"];

    return (
        <motion.div className='pt-[6%] flex flex-col justify-center items-center w-full h-auto -z-10 text-10xl font-cormorant font-medium text-white'>
            <h1>ODKRYJ</h1>
            <motion.div className='overflow-hidden flex flex-col h-96'>
                {texts.map((text, index) => (
                    <motion.span key={index} className='italic pb-16 text-center' animate={sloganAnimation} transition={{ duration: 0.05 }}>
                        {text}
                    </motion.span>
                ))}
            </motion.div>
        </motion.div>
    );
}