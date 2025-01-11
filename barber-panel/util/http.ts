import axios from "axios";
import { QueryClient } from '@tanstack/react-query';

import { dayTranslations } from "./constants";

export const queryClient = new QueryClient();

export async function fetchOffers() {
    const { data } = await axios.get('https://localhost:7190/offers');
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