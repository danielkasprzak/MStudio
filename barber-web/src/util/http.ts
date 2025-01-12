import axiosInstance from './axiosInstance';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

// AUTH

const checkAuth = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:7190/auth/check');
      return response.data;
    } catch (error) {
      return null;
    }
};

export async function protectedLoader() {
    const auth = await checkAuth();
    if (!auth) {
      throw new Response('Forbidden', { status: 403 });
    }
    return auth;
  }
  
export async function adminLoader() {
    const auth = await checkAuth();
    if (!auth || !auth.roles.includes('admin')) {
      throw new Response('Forbidden', { status: 403 });
    }
    return auth;
}

export async function logout() {
    await axiosInstance.post('https://localhost:7190/auth/logout');
    return true;
}

// OFFERS

export async function fetchOffers() {
    const { data } = await axiosInstance.get('https://localhost:7190/offers');
    return data;
};

export async function fetchOffer({ id }: { id: number }) {
    const { data } = await axiosInstance.get(`https://localhost:7190/offers/${id}`);
    return data;
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
    const { data } = await axiosInstance.put(`https://localhost:7190/offers/${id}`, offer);
    return data;
}
export async function createOffer(offer: NewOffer) {
    const { data } = await axiosInstance.post('https://localhost:7190/offers', offer);
    return data;
}
export async function deleteOffer({ id }: { id: number }) {
    const { data } = await axiosInstance.delete(`https://localhost:7190/offers/${id}`);
    return data;
}

// OPENING HOURS

export async function fetchOpeningHours() {
    const { data } = await axiosInstance.get('https://localhost:7190/openinghours');
    return data.map((item: any) => ({
        dayOfWeek: item.dayOfWeek,
        isOpen: item.isOpen,
        openHour: item.openHour.slice(0, 5),
        closeHour: item.closeHour.slice(0, 5),
    }));
};

export async function fetchOpeningHour({ dayOfWeek }: { dayOfWeek: string }) {
    const { data } = await axiosInstance.get(`https://localhost:7190/openinghours/${dayOfWeek}`);
    return {
        dayOfWeek: data.dayOfWeek,
        isOpen: data.isOpen,
        openHour: data.openHour.slice(0, 5),
        closeHour: data.closeHour.slice(0, 5),
    };
}

interface OpeningHour {
    dayOfWeek: string;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

interface UpdateOpeningHour {
    dayOfWeek: string;
    openingHour: OpeningHour;
}

export async function updateOpeningHour({ dayOfWeek, openingHour }: UpdateOpeningHour) {
    const { data } = await axiosInstance.put(`https://localhost:7190/openinghours/${dayOfWeek}`, openingHour);
    return data;
}