import { useMemo } from "react";
import { formatDate } from "../../../utils/utils";

interface Props {
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
    price: number;
}

interface Service {
    id: number;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

export default ({ reservationId, email, services, duration, reservationDateTime, phone, price } : Props) => {
    let parsedServices: Service[] = [];
    
    try {
        const parsed = JSON.parse(services);
        parsedServices = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
        console.error('Failed to parse services:', error);
    }

    return (
        <li className="border-b border-stone-300 p-8 m-4 w-full h-auto flex flex-col justify-center text-charcoal">
            <p className="font-black text-xs tracking-wider text-stone-400">{ reservationId }<span className="font-bold"> { email } </span></p>
            <div className="flex flex-row">
                <p className="font-bold text-xs tracking-wider p-4">{ formatDate(reservationDateTime) }</p>

                <div className="font-bold text-xs tracking-wider p-4">
                    {parsedServices.map(service => (
                        <div key={service.id}>{service.label}</div>
                    ))}
                </div>

                <p className="font-bold text-xs tracking-wider p-4">{ duration }MIN</p>
                <p className="font-bold text-xs tracking-wider p-4">{ price }PLN</p>
                <p className="font-bold text-xs tracking-wider p-4">{ phone }</p>

            </div>
            

        </li>
    )
}