import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/utils";
import TextButton from "../../TextButton";
import Label from "../../Label";

interface Props {
    isPast: boolean;
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
    price: number;
    isCancelled: boolean;
    isPending: boolean;
    cancelClick: (id: string) => void;
}

interface Service {
    id: number;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

export default ({ isPast, reservationId, email, services, duration, reservationDateTime, phone, price, isCancelled, isPending, cancelClick } : Props) => {
    const parsedServices: Service[] = JSON.parse(services);

    const firstColor = (isCancelled || isPast) ? "text-stone-500" : "text-charcoal";
    const secondColor = (isCancelled || isPast) ? "text-stone-400" : "text-stone-500";

    return (
        <li className={`mt-4 w-full font-lato border border-stone-300 ${firstColor} flex flex-col py-4 px-6`}>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center leading-4">
                    <div className="flex flex-row items-center">
                        <h1 className="uppercase font-extrabold text-xs">{formatDate(reservationDateTime)}</h1>
                        <p className="uppercase font-medium text-xs text-stone-400 px-2">{reservationId}</p>
                    </div>
                    <div className={`font-normal text-xs ${secondColor}`}>
                        {parsedServices.map((service, index) => (
                            <p key={index}>{service.label} <span className="px-2">{service.quantity} x {service.price}zł</span></p>
                        ))}
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end pl-4">
                    <div className="flex flex-col justify-center leading-4 px-4">
                        <p className="font-extrabold text-xs text-right">{price}.00zł</p>
                        <p className={`font-normal text-xs text-right ${secondColor}`}>{duration}min</p>
                    </div>

                </div>
            </div>
            <div className="flex flex-row items-center pt-2">
                <p className="font-medium text-xs text-stone-400">{email}</p>
                <p className="font-medium text-xs text-stone-400 px-4">{phone}</p>
                
                {!isPast && !isCancelled && (
                    <>
                        <Link to={`${reservationId}`}>
                            <TextButton>Edytuj</TextButton>
                        </Link>

                        {isPending ? (
                            <Label>Anulowanie...</Label>
                        ) : (
                            <TextButton onClick={() => cancelClick(reservationId)}>Anuluj</TextButton>
                        )}
                    </>
                )}
            </div>
        </li>            
    );
}