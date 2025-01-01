import { motion, MotionValue } from 'framer-motion';

interface HeadParagraphProps {
    children?: React.ReactNode;
    textColor: MotionValue<string>;
}

export default ({ children, textColor } : HeadParagraphProps) => {
    return (
        <motion.p className='font-cormorant text-xl font-medium' style={{ color: textColor }}>{children}</motion.p>
    );
}