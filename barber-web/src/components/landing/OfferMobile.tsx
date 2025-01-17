import { motion } from "motion/react"
import Paragraph from "./Paragraph";

interface Props {
    image: string;
    alt: string;
    title: string;
    description: string;
}

export default ({ image, alt, title, description } : Props) => {
    return (
        <div className="relative flex flex-col justify-center">
            <div className="flex flex-col justify-center p-8">
                <Paragraph textColor="#ffffff">{title}</Paragraph>
                <p className='font-cormorant font-medium text-justify text-stone-100 text-sm pt-4'>{description}</p>
            </div>
            <motion.img 
                src={image}
                alt={alt}
                className='object-cover h-full w-full max-w-full align-middle overflow-clip'
            />
        </div>
    );
}