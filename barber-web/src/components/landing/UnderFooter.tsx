import Image from '../../assets/bg_img.jpg';
import Button from './Button';

export default () => {

    return (  
        <div className="relative w-full h-auto z-0">
            <img src={Image} className='absolute w-full h-full inset-0 object-cover'></img>
            <div className='w-full h-full flex flex-col items-center justify-center p-60'>
                <h1 className='font-cormorant font-medium text-3xl text-white uppercase p-4 z-20'>Podążaj za trendami</h1>
                <Button>Zarezerwuj wizytę</Button>
            </div>
        </div>
    );
};