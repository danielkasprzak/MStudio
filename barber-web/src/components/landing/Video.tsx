import { motion } from "motion/react";

interface Props {
    source: string;
    zClass: string;
    videoRef: React.RefObject<HTMLVideoElement>;
    
}

export default ({ source, zClass, videoRef, ...props } : Props) => {
    return (
        <motion.video ref={videoRef} className={`absolute inset-0 w-full h-full object-cover ${zClass}`} autoPlay muted loop {...props}>
            <source src={source} type="video/mp4" />
        </motion.video>
    );
}