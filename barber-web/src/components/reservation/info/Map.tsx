import { motion } from 'motion/react';

export default () => {
    return (
        <motion.iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102975.0253710739!2d22.519581533009713!3d51.32894535835359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722455760b0a1cb%3A0x834e56d597042c11!2sM%20Studio%20Fryzjerstwo%20Ogrodowa%2053!5e0!3m2!1spl!2spl!4v1733770489716!5m2!1spl!2spl" 
            className="border-0 h-fit w-full mt-4" loading="lazy" allowFullScreen={false} referrerPolicy="no-referrer-when-downgrade"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.iframe>
    );
}