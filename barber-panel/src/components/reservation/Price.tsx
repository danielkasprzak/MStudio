import { useEffect, useState } from 'react';

interface PriceProps {
    totalPrice: number;
}

export default ({ totalPrice }: PriceProps) => {
    const [displayedPrice, setDisplayedPrice] = useState(0);

    useEffect(() => {
        const controls = setInterval(() => {
            setDisplayedPrice((prev) => {
                if (prev < totalPrice) {
                    return prev + 1;
                } else if (prev > totalPrice) {
                    return prev - 1;
                } else {
                    clearInterval(controls);
                    return prev;
                }
            });
        }, 10);

        return () => clearInterval(controls);
    }, [totalPrice]);

    return (
        <span className='font-medium text-white pl-3'>
            {displayedPrice}zł
        </span>
    );
};