import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useEffect, useState } from 'react';

import NavButton from './NavButton';
import MenuButton from './MenuButton';

interface Props {
    heroRef: React.RefObject<HTMLElement>;
}

export default ({ heroRef }: Props) => {
    const { scrollYProgress } = useScroll({
        target: heroRef,
    });

    const navX = useTransform(scrollYProgress, [0.7, 0.85], ['50%', '5%']);
    const isVisible = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);

    const [menuOpen, setMenuOpen] = useState(false);
    const [isMenuClickable, setIsMenuClickable] = useState(true);


    useEffect(() => {
        const unsubscribe = navX.on('change', (latest) => {
            if (parseFloat(latest) > 5) {
                setMenuOpen(false);
                setIsMenuClickable(false);
            } else {
                setIsMenuClickable(true);
            }
        });

        return () => unsubscribe();
    }, [navX]);

    const handleMenuClick = () => {
        if (isMenuClickable) {
            setMenuOpen(prevState => !prevState);
        }
    };

    return (
        <>
            <motion.nav
                className='fixed w-screen h-20 flex flex-row justify-center items-center z-50 transform -translate-y-1/2'
                style={{ top: navX, opacity: isVisible }}
            >
                <NavButton menuOpen={menuOpen} onClick={handleMenuClick}>MENU</NavButton>
                <Link to='/rezerwacja'>
                    <NavButton menuOpen={menuOpen}>REZERWACJA</NavButton>
                </Link>                
            </motion.nav>
            <motion.div
                className='fixed top-0 left-0 w-full h-32 flex flex-row items-end justify-center bg-white z-40'
                initial={{ y: '-100%' }}
                animate={{ y: menuOpen ? '0%' : '-100%' }}
                transition={{ duration: 0.2 }}
            >
                <HashLink smooth to="#wstep">
                    <MenuButton>Wstęp</MenuButton>
                </HashLink>
                <HashLink smooth to="#poznaj-nas">
                    <MenuButton>Poznaj nas</MenuButton>
                </HashLink>
                <HashLink smooth to="#oferty">
                    <MenuButton>Oferta</MenuButton>
                </HashLink>
            </motion.div>
        </>
    );
}