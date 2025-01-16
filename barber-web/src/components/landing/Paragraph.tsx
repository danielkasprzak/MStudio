import { motion, MotionValue } from 'motion/react';

interface Props {
    children?: React.ReactNode;
    textColor: string | MotionValue<string>;
}

export default ({ children, textColor } : Props) => {
    return (
        <motion.p className='font-cormorant text-xl font-medium z-20' style={{ color: textColor }}>{children}</motion.p>
    );
}