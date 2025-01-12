import { formatDate } from "../../../utils/utils";

interface Props {
    date: string;
    endDate: string | null;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

export default ({ date, endDate, isOpen, openHour, closeHour } : Props) => {
    

    return (
        <li className="border border-stone-200 p-8 m-4 w-full h-auto flex flex-row items-center justify-between">
            <p className="font-bold text-xs tracking-wider pr-4">{endDate ? `${formatDate(date)} - ${formatDate(endDate)}` : formatDate(date) }</p>
            <p className="font-bold text-xs tracking-wider">{ isOpen ? `${openHour} - ${closeHour}` : 'Zamknięte' }</p>
        </li>
    )
}