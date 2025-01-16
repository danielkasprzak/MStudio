import { motion } from 'motion/react';

interface Props {
    children?: React.ReactNode;
}

export default ({ children } : Props) => {
    return (
        <motion.p className='uppercase font-bold text-xs tracking-wider p-2'>{children}</motion.p>
    );
}