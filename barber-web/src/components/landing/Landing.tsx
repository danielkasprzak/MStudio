import { ReactLenis, LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import { useEffect, useRef } from 'react';

import Hero from './Hero';
import Section from './Section';
import Footer from './Footer';
import NavBar from './NavBar';
import UnderFooter from './UnderFooter';

export default () => {
    const lenisRef = useRef<LenisRef | null>(null);
    const heroRef = useRef(null);

    useEffect(() => {
        function update(data: { timestamp: number }) {
          lenisRef.current?.lenis?.raf(data.timestamp)
        }
    
        frame.update(update, true)
    
        return () => cancelFrame(update)
    }, []);

    useEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const handleLoad = () => {
            window.scrollTo(0, 0);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);
    
    return (
        <ReactLenis options={{ autoRaf: false, smoothWheel: true }} ref={lenisRef} root>
            <div className='bg-white'>
                <Hero heroRef={heroRef}/>
                <Section/>
                <Section/>
                
                <Footer/>
                <UnderFooter/>

                <NavBar heroRef={heroRef} />
            </div>
        </ReactLenis>
    )
}