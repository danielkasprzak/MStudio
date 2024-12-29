import { ReactLenis, LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import { useEffect, useRef } from 'react';

import Hero from './Hero';
import About from './About';

export default () => {
    const lenisRef = useRef<LenisRef | null>(null);

    useEffect(() => {
        function update(data: { timestamp: number }) {
          lenisRef.current?.lenis?.raf(data.timestamp)
        }
    
        frame.update(update, true)
    
        return () => cancelFrame(update)
      }, []);
    
    return (
        <ReactLenis options={{ autoRaf: false, smoothWheel: true }} ref={lenisRef} root>
            <div className='min-h-screen bg-white'>
                <Hero/>
                <About/>

            </div>
        </ReactLenis>
    )
}