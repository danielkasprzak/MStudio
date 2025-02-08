import { formatDateNoTime } from "../../../utils/utils";
import { SpecialOpeningHours as Props } from '../../../interfaces/scheduleInterfaces';

export default ({ date, endDate, isOpen, openHour, closeHour } : Props) => {
    return (
        <li className="border border-stone-300 p-4 md:p-8 m-4 w-full h-auto flex flex-col md:flex-row items-center md:justify-between">
            <p className="font-bold text-xs tracking-wider md:pr-4">{endDate ? `${formatDateNoTime(date)} - ${formatDateNoTime(endDate)}` : formatDateNoTime(date) }</p>
            <p className="font-bold text-xs tracking-wider">{ isOpen ? `${openHour} - ${closeHour}` : 'Zamknięte' }</p>
        </li>
    )
}