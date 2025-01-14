import { motion } from "motion/react";

interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    margin: string;
    isActive: boolean;
}

export default ({ children, onClick, type, margin, isActive } : Props) => {
    
    const bgColor = isActive ? "#f5f5f4" : "#ffffff";
    
    return (
        <motion.button type={type} onClick={onClick} 
            className={`mx-${margin} font-lato font-bold uppercase text-xs tracking-wider text-charcoal border border-stone-300 px-4 py-2`}
            whileHover={{  backgroundColor: "#f5f5f4" }}
            style={{ backgroundColor: bgColor }}
        >
        
            {children}
        </motion.button>
    );
}