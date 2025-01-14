import { formatDate } from "../../utils/utils";

interface Props {
    reservationId: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    price: number;
    isCancelled: boolean;
    isPast: boolean;
}

interface Service {
    label: string;
    price: number;
    quantity: number;
}

export default ({ reservationId, services, duration, reservationDateTime, price, isCancelled, isPast } : Props) => {
    const parsedServices: Service[] = JSON.parse(services);

    const firstColor = (isCancelled || isPast) ? "text-stone-500" : "text-charcoal";
    const secondColor = (isCancelled || isPast) ? "text-stone-400" : "text-stone-500";

    return (
        <li className={`${firstColor} mb-4 w-full font-lato border border-stone-300 flex flex-row justify-between py-4 px-6`}>
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
        </li>
    );
}