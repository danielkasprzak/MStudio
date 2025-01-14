import { formatDate } from "../../../utils/utils";

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
}

interface Service {
    id: number;
    label: string;
    price: number;
    time: number;
    quantity: number;
}

export default ({ isPast, reservationId, email, services, duration, reservationDateTime, phone, price, isCancelled } : Props) => {
    let parsedServices: Service[] = [];
    
    try {
        const parsed = JSON.parse(services);
        parsedServices = Array.isArray(parsed) ? parsed : [parsed];
    } catch (error) {
        console.error('Failed to parse services:', error);
    }

    return (
        <li className="border-b border-stone-300 py-2 px-4 m-4 w-full h-auto flex flex-col justify-center text-charcoal">
            <h1 className="font-extrabold text-xs font-lato uppercase">Rezerwacja</h1>
            {isCancelled && <p className="font-bold text-xs tracking-wider text-stone-500">ANULOWANA</p>}
            <div className="flex flex-row items-center">
                <p className="font-extrabold text-sm tracking-wider text-stone-400">{ reservationId }</p>
                <p className="px-2 font-bold text-xs tracking-wider text-stone-500"> { email } </p>
                <p className="font-bold text-xs tracking-wider text-stone-500">{ phone }</p>
            </div>
            <div className="flex flex-row items-center py-4">
                <p className={`font-extrabold text-xl tracking-wider pr-2 ${isPast && 'text-stone-500'}`}>{ formatDate(reservationDateTime) }</p>

                <div className="font-bold text-xs tracking-wider px-2">
                    {parsedServices.map(service => (
                        <div key={service.id}>{service.label}</div>
                    ))}
                </div>

                <p className="font-bold text-xs tracking-wider px-2">{ duration }MIN</p>
                <p className="font-extrabold text-sm tracking-wider px-2">{ price }PLN</p>
            </div>
        </li>
    )
}