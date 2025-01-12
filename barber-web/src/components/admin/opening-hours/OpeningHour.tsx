import { dayTranslations } from "../../../util/constants";

interface Props {
    date: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default ({ date, isOpen, openHour, closeHour } : Props) => {
    return (
        <li className="border border-stone-200 p-8 m-4 w-full h-auto flex flex-row items-center justify-between">
            <p className="font-bold text-xs tracking-wider">{ dayTranslations[date] }</p>
            <p className="font-bold text-xs tracking-wider">{ isOpen ? `${openHour} - ${closeHour}` : 'Zamknięte' }</p>
        </li>
    )
}