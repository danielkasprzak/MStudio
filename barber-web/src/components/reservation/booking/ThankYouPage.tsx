import { Link } from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { useAppSelector } from "../../../store/hooks";

export default () => {
    useDocumentTitle("MStudio - rezerwacja");

    const totalPrice = useAppSelector((state) => state.cart.totalPrice);
    const services = useAppSelector((state) => state.cart.items);

    return (
        <div className='w-screen h-screen bg-stone-100 flex justify-center items-center'>
            <div className='p-16 bg-white border border-stone-300 text-charcoal flex flex-col justify-center'>
                <h1 className="font-cormorant text-xl font-medium uppercase">Dziękujemy za rezerwacje!</h1>

                <p className="font-lato text-sm font-medium max-w-80 text-justify py-8">Serdecznie dziękujemy, za dokonanie rezerwacji w naszym salonie.
                    Mamy nadzieję, że wizyta przebiegnie pomyślnie.</p>

                

                {(totalPrice > 0) && 
                    <>
                        <p className="font-lato text-xs font-medium uppercase py-2 text-center">Twoja rezerwacja</p>
                        {/* <p className="font-lato text-xs font-medium py-2">Zarezerwowane usługi</p> */}
                        <ul className="font-lato text-xs font-bold border border-stone-200 p-4">
                            {services.map((service) => (
                                <li className="font-medium" key={service.id}>{service.label} {service.quantity} x <span className="font-bold">{service.price}zł</span></li>
                            ))}
                        </ul>
                        
                        <p className="font-lato text-xs font-medium py-2">Cena: <span className="font-bold">{totalPrice}zł</span></p>
                    </>
                }

                <p className="font-lato text-sm font-medium py-8">Do zobaczenia wkrótce!</p>

                <button className="w-full uppercase font-bold text-xs tracking-wider font-lato border text-charcoal border-stone-300 px-4 py-2 flex flex-row justify-center items-center"><Link to={`/rezerwacja`}>Do rezerwacji</Link></button>
            </div>
        </div>        
    );
}