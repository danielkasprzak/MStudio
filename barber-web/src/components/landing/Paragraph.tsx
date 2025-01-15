import { motion, MotionValue } from 'motion/react';

interface Props {
    children?: React.ReactNode;
    textColor: string | MotionValue<string>;
}

export default ({ children, textColor } : Props) => {
    return (
        <motion.p className='font-cormorant text-xl font-medium' style={{ color: textColor }}>{children}</motion.p>
    );
}