import { motion } from 'framer-motion';

interface Props { 
    text: string;
}

export default ({ text }: Props) => {
    return (
        <motion.h1 className='pt-[14%] text-10xl text-center font-cormorant font-medium text-white -z-10'>
            ODKRYJ <motion.span className='italic'>{text}</motion.span>
        </motion.h1>
    );
}