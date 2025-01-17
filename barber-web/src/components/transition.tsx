import { motion } from "motion/react";
import { ComponentType } from "react";

export default (SingleComponent : ComponentType) => {
    return (props: any) => (
        <>
            <SingleComponent />
            <motion.div
                className="fixed top-0 left-0 w-full h-screen origin-right bg-charcoal z-[60]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 1 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
                className="fixed top-0 left-0 w-full h-screen origin-left bg-charcoal z-[60]"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            />
        </>
    );
}