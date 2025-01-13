import { formatDate } from "../../../utils/utils";

interface Props {
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
}

export default ({ reservationId, email, services, duration, reservationDateTime, phone } : Props) => {
    return (
        <li className="border border-stone-200 p-8 m-4 w-full h-auto flex flex-row items-center justify-between">
            <p className="font-bold text-xs tracking-wider">{ reservationId }<span > { email } </span></p>
            <p className="font-bold text-xs tracking-wider">{ formatDate(reservationDateTime) }</p>
            <p className="font-bold text-xs tracking-wider">{ services }</p>
            <p className="font-bold text-xs tracking-wider">{ duration }</p>
            <p className="font-bold text-xs tracking-wider">{ phone }</p>
        </li>
    )
}