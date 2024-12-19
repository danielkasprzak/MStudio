import { motion } from "framer-motion"

interface NavButtonProps {
    children: React.ReactNode;
    isActive: boolean;
}

export default ({ children, isActive } : NavButtonProps) => {
    return (
        <motion.button
            className={`py-3 m-4 text-normal font-montserrat tracking-wider font-semibold z-10 relative ${isActive ? "text-white" : "text-neutral-700"}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ color: isActive ? "#FFFFFF" : "#4A4A4A" }}
            transition={{ duration: 0.3 }}
        >
            {children}
        </motion.button>
    )
}