import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimation, useScroll, useTransform } from 'motion/react';

import Paragraph from './Paragraph';
import Button from './Button';
import OfferImage from './OfferImage';

import cutImg from '../../assets/offers/cut.jpg';
import keratinImg from '../../assets/offers/keratin.jpg';
import colorationImg from '../../assets/offers/coloration.jpg';
import stylingImg from '../../assets/offers/styling.webp';
import saunaImg from '../../assets/offers/sauna.jpg';
import botoxImg from '../../assets/offers/botox.webp';
import { Link } from 'react-router-dom';

interface Props {
    imgRef: React.RefObject<HTMLElement>;
}

const OFFERS = [
    { name: 'stylizacja włosów', description: 'Podkreśl swój styl dzięki profesjonalnej stylizacji włosów. Oferujemy szeroką gamę rozwiązań – od codziennych fryzur, przez upięcia, aż po stylizacje na specjalne okazje, takie jak śluby czy wieczorne wyjścia.', scrollFrom: 0.75, scrollTo: 0.8 },
    { name: 'sauna parowa', description: 'Sauna parowa to luksusowy zabieg, który wzmacnia efekty odżywczych kuracji, otwierając łuski włosów i umożliwiając wniknięcie składników aktywnych w ich głąb.', scrollFrom: 0.65, scrollTo: 0.7 },
    { name: 'botoks na włosy', description: 'Botoks na włosy to prawdziwa terapia młodości. Zabieg intensywnie nawilża, wzmacnia i odbudowuje włosy od nasady aż po końcówki, eliminując oznaki zniszczenia i matowości.', scrollFrom: 0.55, scrollTo: 0.6 },
    { name: 'keratynowe wygładzanie włosów', description: 'Odmień swoje włosy dzięki keratynowemu wygładzaniu, które dogłębnie regeneruje i ujarzmia nawet najbardziej niesforne pasma. To zabieg idealny dla osób pragnących gładkich, lśniących włosów bez codziennej walki z prostowaniem.', scrollFrom: 0.45, scrollTo: 0.5 },
    { name: 'koloryzacja włosów', description: 'Koloryzacja włosów w naszym salonie to połączenie najnowszych trendów i najwyższej jakości produktów. Oferujemy zarówno subtelne odświeżenie koloru, jak i pełne metamorfozy.', scrollFrom: 0.35, scrollTo: 0.4 },
    { name: 'strzyżenie włosów', description: 'Nasze strzyżenie włosów to więcej niż zwykła usługa – to doświadczenie tworzenia fryzury, która podkreśla Twoją osobowość i potrzeby.', scrollFrom: 0.25, scrollTo: 0.3 },
]

export default ({imgRef}:Props) => {
    const sectionRef = useRef(null);
    const [currentOffer, setCurrentOffer] = useState(OFFERS[0]);

    const { scrollYProgress: offersScroll } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });
    
    const { scrollYProgress: globalScroll } = useScroll({
        target: imgRef,
    });

    const imageTranslateY = useTransform(globalScroll, [0.35, 0.5], ["-100vh", "0vh"]);
    const bgColor = useTransform(globalScroll, [0.5, 0.55], ["#FFFFFF", "#dcbca8"]);
    const offersOpacity = useTransform(globalScroll, [0.5, 0.55], [0, 1]);
    const imageControls = useAnimation();
    const bgColorAnim = useAnimation();

    useEffect(() => {
        const unsubscribe = globalScroll.on('change', (latest) => {
            if (latest >= 0.3) {
                imageControls.start({ opacity: 1 });
            } else {
                imageControls.start({ opacity: 0 });
            }

            if (latest >= 0.55) {
                imageControls.start({
                    clipPath: 'inset(0% 0% 0% 0%)',
                    transition: { duration: 0.3 },
                });           }
            else {
                imageControls.start({
                    clipPath: 'inset(20% 30% 20% 30%)',
                    transition: { duration: 0.3 },
                });
            }
        });
    
        return () => unsubscribe();
    }, [globalScroll, imageControls, bgColorAnim]);
    
    useEffect(() => {
        const unsubscribe = offersScroll.on('change', (latest) => {
            const newOffer = OFFERS.find(offer => latest >= offer.scrollFrom && latest < offer.scrollTo);
            if (newOffer) {
                setCurrentOffer(newOffer);
            }
        });
        return () => unsubscribe();
    }, [offersScroll, OFFERS]);

    return (  
        <section ref={sectionRef} id="oferty" className="relative h-[300vh]">
            <motion.div className='h-screen sticky top-0' style={{ backgroundColor: bgColor }}>
                <div className='absolute inset-0 flex flex-row items-center w-full h-full'>
                    <div className='relative w-1/2 h-full flex flex-col justify-center items-center'>
                        <motion.div className='flex flex-col justify-center' style={{ opacity: offersOpacity }}>
                            <h2 className='font-lato text-white font-bold text-xs tracking-wider uppercase z-20'>Oferta</h2>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentOffer.name}
                                    className='flex flex-col justify-center h-32 my-2 max-w-96'
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Paragraph textColor="#ffffff">{currentOffer.name}</Paragraph>
                                    <p className='font-cormorant font-medium text-justify text-stone-100 text-sm'>{currentOffer.description}</p>
                                </motion.div>
                            </AnimatePresence>
                            
                            <Link to='/rezerwacja'>
                                <Button>Zarezerwuj wizytę</Button>
                            </Link>                            
                        </motion.div>
                    </div>
                    <div className='w-1/2 h-full relative'>
                        <motion.div
                            className='sticky top-0 w-full h-screen flex flex-col justify-start items-stretch z-50 overflow-hidden'
                            initial={{ opacity: 0, translateY: '-100vh' }}
                            animate={imageControls}
                            transition={{ duration: 0.3 }}
                            style={{ 
                                translateY: imageTranslateY,
                            }}
                        >
                            
                            <OfferImage image={stylingImg} isLast alt="stylizacja wlosow" scrollYProgress={offersScroll} scrollFrom={0.85} scrollTo={0.9} />
                            <OfferImage image={saunaImg} isLast={false} alt="sauna parowa" scrollYProgress={offersScroll} scrollFrom={0.75} scrollTo={0.8} />
                            <OfferImage image={botoxImg} isLast={false} alt="botoks na wlosy" scrollYProgress={offersScroll} scrollFrom={0.65} scrollTo={0.7} />
                            <OfferImage image={keratinImg} isLast={false} alt="keratynowe wygladzanie wlosow" scrollYProgress={offersScroll} scrollFrom={0.55} scrollTo={0.6} />
                            <OfferImage image={colorationImg} isLast={false} alt="koloryzacja wlosow" scrollYProgress={offersScroll} scrollFrom={0.45} scrollTo={0.5} />
                            <OfferImage image={cutImg} isLast={false} alt="strzyzenie wlosow" scrollYProgress={offersScroll} scrollFrom={0.35} scrollTo={0.4} />
                        </motion.div>
                    </div>
                </div>
        </motion.div>
    </section>
    );
};