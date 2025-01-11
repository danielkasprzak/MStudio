import axios from "axios";
import { QueryClient } from '@tanstack/react-query';

import { dayTranslations } from "./constants";

export const queryClient = new QueryClient();

export async function fetchOffers() {
    const { data } = await axios.get('https://localhost:7190/offers');
    return data;
};

export async function fetchOffer({ id }: { id: number }) {
    const { data } = await axios.get(`https://localhost:7190/offers/${id}`);
    return data;
};

export async function fetchOpeningHours() {
    const { data } = await axios.get('https://localhost:7190/openinghours');
    return data.map((item: any) => ({
        dayOfWeek: dayTranslations[item.dayOfWeek] || item.dayOfWeek,
        isOpen: item.isOpen,
        openHour: item.openHour.slice(0, 5),
        closeHour: item.closeHour.slice(0, 5),
    }));
};

interface Offer {
    id: number;
    label: string;
    description?: string;
    duration: number;
    price: number;
}

interface NewOffer {
    label: string;
    description?: string;
    duration: number;
    price: number;
}

interface UpdateOffer {
    id: number,
    offer: Offer
}

export async function updateOffer({ id, offer }: UpdateOffer) { 
    const { data } = await axios.put(`https://localhost:7190/offers/${id}`, offer);
    return data;
}
export async function createOffer(offer: NewOffer) {
    const { data } = await axios.post('https://localhost:7190/offers', offer);
    return data;
}
