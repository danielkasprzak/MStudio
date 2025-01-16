import { motion, useTransform } from 'motion/react';

interface Props {
    scrollYProgress: any;
    image: string;
    alt: string;
    scrollFrom: number;
    scrollTo: number;
    isLast: boolean;
}

export default ({ scrollYProgress, image, alt, scrollFrom, scrollTo, isLast } : Props) => {
    return (
        <motion.div
        className='absolute w-full h-full inset-0'
        style={!isLast ? {
            height: useTransform(scrollYProgress, [scrollFrom, scrollTo], ["100%", "0%"])
        } : undefined}>
            <motion.img 
                src={image}
                alt={alt}
                className='object-cover h-full w-full max-w-full align-middle overflow-clip'
            />
        </motion.div>
    );
}