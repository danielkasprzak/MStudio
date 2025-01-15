import { motion, useScroll, useTransform } from 'motion/react';

import NavButton from './NavButton';

interface Props {
    heroRef: React.RefObject<HTMLElement>;
}

export default ({ heroRef }: Props) => {
    const { scrollYProgress } = useScroll({
        target: heroRef,
    });

    const navX = useTransform(scrollYProgress, [0.7, 0.85], ['50%', '5%']);
    const isVisible = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);

    return (
        <motion.nav
            className='fixed w-screen h-20 flex flex-row justify-center items-center z-50 transform -translate-y-1/2'
            style={{ top: navX, opacity: isVisible }}
        >
            <NavButton>MENU</NavButton>
            <NavButton>REZERWACJA</NavButton>
        </motion.nav>
    );
}