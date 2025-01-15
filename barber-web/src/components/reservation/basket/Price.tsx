import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface Props {
    totalPrice: number;
}

export default ({ totalPrice }: Props) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        const animation = animate(count, totalPrice, {
            duration: 1,
        });

        return animation.stop;
    }, [totalPrice]);

    return (
        <motion.span className='uppercase font-bold text-xs tracking-wider font-lato text-charcoal pl-3'>
            {rounded}
        </motion.span>
    );
};