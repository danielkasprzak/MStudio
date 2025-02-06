import { motion } from "motion/react";

interface NavButtonProps {
    children: React.ReactNode;
    isActive: boolean;
}

export default ({ children, isActive } : NavButtonProps) => {
    return (
        <motion.button
            className={`py-3 m-4 font-medium font-cormorant text-normal md:text-xl z-10 relative ${isActive ? "text-charcoal" : "text-stone-300"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ color: isActive ? "#353535" : "#d6d3d1" }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.button>
    )
}