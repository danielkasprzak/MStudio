import { ReactLenis, LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import { useEffect, useRef } from 'react';

import Hero from './Hero';

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
        <ReactLenis options={{ autoRaf: false }} ref={lenisRef} root>
            <div className='h-min-screen'>
                <Hero/>
            </div>
        </ReactLenis>
    )
}