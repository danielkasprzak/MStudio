import useDocumentTitle from "../../hooks/useDocumentTitle";
import { fetchOffers, queryClient } from "../../utils/http";
import { useQuery } from "@tanstack/react-query";

import SidePanel from "./SidePanel";
import Title from "../Title";
import Offer from "./offers/Offer";

interface OfferModel {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export default () => {
    useDocumentTitle("MStudio - rezerwacja tradycyjna");

    const { data = [], error } = useQuery<OfferModel[]>({
        queryKey: ['offers'],
        queryFn: fetchOffers
    });

    if (error) return <div>Error loading offers</div>;

    return (
        <div className='bg-stone-100 w-full h-full flex flex-row justify-center'>
            <SidePanel isTraditional />
            <div className='flex flex-col justify-start py-8 ml-4 z-10'>
                <div className="h-auto w-[46rem] bg-white border border-stone-300 p-8 z-30">
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