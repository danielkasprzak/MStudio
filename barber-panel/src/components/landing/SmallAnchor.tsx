import { motion } from 'framer-motion';

interface Props {
    children?: React.ReactNode;
}

export default ({ children } : Props) => {
    return (
        <motion.a className='uppercase font-bold text-xs tracking-wider p-2'>{children}</motion.a>
    );
}