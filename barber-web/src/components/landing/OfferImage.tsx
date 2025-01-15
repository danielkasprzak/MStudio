import { motion, useTransform } from 'motion/react';

interface Props {

    scrollYProgress: any;
    image: string;
    alt: string;
    scrollFrom: number;
    scrollTo: number;

}

export default ({ scrollYProgress, image, alt, scrollFrom, scrollTo } : Props) => {
    return (
        <motion.div
        className='absolute w-full h-full inset-0'
        style={{
            height: useTransform(scrollYProgress, [scrollFrom, scrollTo], ["100%", "0%"])
        }}>
            <motion.img 
                src={image}
                alt={alt}
                className='object-cover h-full w-full max-w-full align-middle overflow-clip'
            />
        </motion.div>
    );
}