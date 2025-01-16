import { dayTranslations } from "../../../utils/utils";
import { OpeningHours as Props } from '../../../interfaces/scheduleInterfaces';

export default ({ dayOfWeek, isOpen, openHour, closeHour } : Props) => {
    return (
        <li className="border border-stone-300 py-4 px-6 m-4 w-full h-auto flex flex-row items-center justify-between">
            <p className="font-bold text-xs pr-2">{ dayTranslations[dayOfWeek] }</p>
            <p className="font-bold text-xs tracking-wider pl-2">{ isOpen ? `${openHour} - ${closeHour}` : 'Zamknięte' }</p>
        </li>
    )
}