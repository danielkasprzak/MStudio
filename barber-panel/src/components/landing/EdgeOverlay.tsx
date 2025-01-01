import { motion, AnimationControls } from 'framer-motion';

interface EdgeOverlayProps {
    controlsHeight: AnimationControls;
    controlsWidth: AnimationControls;
}

export default ({ controlsHeight, controlsWidth } : EdgeOverlayProps) => {
    return (
        <>
            <motion.div
                className="w-screen absolute top-0 z-0 bg-white"
                initial={{ height: '0%' }}
                animate={controlsHeight}
            />
            <motion.div
                className="w-screen absolute bottom-0 z-0 bg-white"
                initial={{ height: '0%' }}
                animate={controlsHeight}
            />
            <motion.div
                className="h-screen absolute right-0 z-0 bg-white"
                initial={{ width: '0%' }}
                animate={controlsWidth}
            />
            <motion.div
                className="h-screen absolute left-0 z-0 bg-white"
                initial={{ width: '0%' }}
                animate={controlsWidth}
            />
        </>
    );
}