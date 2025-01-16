import { motion } from "motion/react";

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    margin?: string;
    isActive: boolean;
    disabled: boolean;
}

export default ({ children, onClick, type, margin, isActive, disabled } : Props) => {
    
    const bgColor = isActive ? "#f5f5f4" : "#ffffff";
    const textColor = disabled ? "text-stone-400" : "text-charcoal";
    
    if (!margin) {
        margin = '0';
    }

    return (
        <motion.button type={type} disabled={disabled} onClick={onClick} 
            className={`mx-${margin} ${textColor} w-full font-lato font-bold uppercase text-xs tracking-wider outline-none border border-stone-300 px-4 py-2`}
            whileHover={{  backgroundColor: "#f5f5f4" }}
            style={{ backgroundColor: bgColor }}
        >
        
            {children}
        </motion.button>
    );
}