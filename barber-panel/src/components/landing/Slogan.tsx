import { motion, MotionValue, useTransform } from 'framer-motion';

interface Props { 
    sloganIndex: MotionValue<number>;
}

export default ({ sloganIndex }: Props) => {
    const texts = ["STYL", "PIĘKNO", "SIEBIE"];
    const sloganText = useTransform(sloganIndex, index => texts[Math.round(index)]);

    return (
        <motion.div className='pt-[14%] flex flex-row justify-center items-center w-full h-auto -z-10 text-10xl font-cormorant font-medium text-white'>
            <h1 className='w-full text-right'>ODKRYJ</h1>
            <div className='h-auto w-full'>
                <motion.span className='italic pl-8 text-center' layout style={{ y: sloganText }}>{sloganText}</motion.span>
            </div>
        </motion.div>
    );
}