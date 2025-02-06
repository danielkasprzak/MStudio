import useDocumentTitle from "../../hooks/useDocumentTitle";
import SidePanel from "./SidePanel";
import Offers from "../reservation/offers/Offers";

export default () => {
    useDocumentTitle("MStudio - rezerwacja tradycyjna");

    return (
        <div className='bg-stone-100 w-full h-full flex flex-col items-center md:flex-row md:justify-center md:items-start'>
            <SidePanel isTraditional />
            <div className='w-full flex justify-center items-center mb-8 md:mb-0 md:py-8 md:ml-4 z-10'>
                <Offers isTraditional />
            </div>
        </div>
    );
}