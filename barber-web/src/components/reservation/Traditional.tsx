import useDocumentTitle from "../../hooks/useDocumentTitle";
import { fetchOffers, queryClient } from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import { Offer as OfferModel } from "../../interfaces/offersInterfaces";

import SidePanel from "./SidePanel";
import Title from "../Title";
import Offer from "./offers/Offer";

export default () => {
    useDocumentTitle("MStudio - rezerwacja tradycyjna");

    const { data = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='bg-stone-100 w-full h-full flex flex-col items-center md:flex-row md:justify-center md:items-start'>
            <SidePanel isTraditional />
            <div className='flex flex-col justify-start md:py-8 mx-8 md:ml-4 z-10'>
                <div className="h-auto w-fit md:w-[46rem] bg-white border border-stone-300 p-8 md:p-8 mb-8 md:mb-0 z-30">
                    <Title>Oferta</Title>

                    <ul className='w-full h-fit'>
                        {data.map((offer) => (
                            <Offer key={offer.id} isTraditional id={offer.id} label={offer.label} price={offer.price} time={offer.duration} description={offer.description} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export function loader() {
    return queryClient.fetchQuery({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });
}