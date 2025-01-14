import { useAppSelector } from '../../../store/hooks';
import SelectedOffer from './SelectedOffer';

interface Props {
    isActive: boolean;
}
  
export default ({ isActive }: Props) => {
    const basketItems = useAppSelector((state) => state.cart.items);


    return (
        <ul className="flex flex-col justify-center text-charcoal uppercase font-bold text-xs tracking-wider font-lato">
            {basketItems.length === 0 ? (
                <li>Brak</li>
                ) : isActive ? (
                    basketItems.map((item) => (
                        <SelectedOffer 
                            key={item.id}
                            id={item.id} 
                            label={item.label} 
                            price={item.price} 
                            time={item.time} 
                            quantity={item.quantity}
                        />
                    ))
                ) : (
                    <>
                        <SelectedOffer 
                            key={basketItems[0].id}
                            id={basketItems[0].id} 
                            label={basketItems[0].label} 
                            price={basketItems[0].price} 
                            time={basketItems[0].time} 
                            quantity={basketItems[0].quantity}
                        />
                        {basketItems.length > 1 && <li>...więcej</li>}
                    </>
                )}
        </ul>
    )
}