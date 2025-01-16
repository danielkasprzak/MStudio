import { motion } from "motion/react";
import { ComponentType } from "react";

export default (SingleComponent : ComponentType) => {
    return (props: any) => (
        <>
            <SingleComponent />
            <motion.div className="fixed top-0 left-0 w-full h-screen origin-bottom bg-white z-[60]" initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }} exit={{ scaleY: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
            <motion.div className="fixed top-0 left-0 w-full h-screen origin-top bg-charcoal z-[70]" initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }} exit={{ scaleY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
        </>
    );
}