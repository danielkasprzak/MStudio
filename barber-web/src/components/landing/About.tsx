import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

import AboutImg from '../../assets/about_img.jpg';

export default () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });

    const opacityH1 = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const opacityH2 = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const scaleVideo = useTransform(scrollYProgress, [0.4, 0.7], [1, 0.8]);

    return (
        <section ref={ref} className="relative h-[160vh]">
            <div className='h-fit p-60 flex flex-col justify-center sticky top-0 overflow-hidden'>
                <motion.div
                    className="absolute inset-0 -z-10"
                    style={{ scale: scaleVideo }}
                >
                    <img src={AboutImg} alt="About" className="w-1/6 h-full object-cover" />
                </motion.div>

                <div className="relative flex flex-col items-center justify-center">
                    <motion.h1
                        className='absolute text-9xl text-center font-cormorant font-medium text-charcoal'
                        style={{ opacity: opacityH1 }}
                    >
                        O NAS
                    </motion.h1>
                    <motion.p className='absolute text-left max-w-80 mr-20 text-charcoal' style={{ opacity: opacityH2 }}>
                        Tak to my
                    </motion.p>
                </div>
            </div>
        </section>
    );
};