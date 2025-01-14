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

// SPECIAL OPENING HOURS

export async function fetchSpecialOpeningHours() {
    const { data } = await axiosInstance.get('https://localhost:7190/specialopeninghours');
    return data.map((item: any) => ({
        date: item.date,
        endDate: item.endDate || null,
        isOpen: item.isOpen,
        openHour: item.openHour.slice(0, 5),
        closeHour: item.closeHour.slice(0, 5),
    }));
};

export async function fetchSpecialOpeningHour({ date }: { date: string }) {
    const { data } = await axiosInstance.get(`https://localhost:7190/specialopeninghours/${date}`);
    return {
        date: data.date,
        endDate: data.endDate || null,
        isOpen: data.isOpen,
        openHour: data.openHour.slice(0, 5),
        closeHour: data.closeHour.slice(0, 5),
    };
}

interface SpecialOpeningHour {
    date: string;
    endDate: string | null;
    isOpen: boolean;
    openHour: string;
    closeHour: string;
}

interface UpdateSpecialOpeningHour {
    date: string;
    updatedSpecialHour: SpecialOpeningHour;
}

export async function createSpecialOpeningHour(specialDate: SpecialOpeningHour) {
    const { data } = await axiosInstance.post('https://localhost:7190/specialopeninghours', specialDate);
    return data;
}

export async function updateSpecialOpeningHour({ date, updatedSpecialHour }: UpdateSpecialOpeningHour) {
    const { data } = await axiosInstance.put(`https://localhost:7190/specialopeninghours/${date}`, updatedSpecialHour);
    return data;
}

export async function deleteSpecialOpeningHour({ date }: { date: string }) {
    const { data } = await axiosInstance.delete(`https://localhost:7190/specialopeninghours/${date}`);
    return data;
}

// RESERVATION

export async function fetchAvailableSlots(duration: number) {
    const { data } = await axiosInstance.get(`https://localhost:7190/reservation/available?duration=${duration}`);
    return data;
};

interface ReservationsFetch {
    startDate: string;
    endDate: string;
}

export async function fetchReservations({ startDate, endDate }: ReservationsFetch) {
    const startDateTime = `${startDate}T00:00:00`;
    const endDateTime = `${endDate}T23:59:59`;
    const { data } = await axiosInstance.get(`https://localhost:7190/reservation?startDate=${startDateTime}&endDate=${endDateTime}`);
    
    data.sort((a: Reservation, b: Reservation) => new Date(a.reservationDateTime).getTime() - new Date(b.reservationDateTime).getTime());
    
    return data;
};

export async function fetchMyReservations() {
    const { data } = await axiosInstance.get('https://localhost:7190/reservation/my');
    return data;
};

interface Reservation {
    reservationId: string;
    email: string;
    services: string;
    duration: number;
    reservationDateTime: string;
    phone: string;
    price: number;
    isCancelled: boolean;
}

export async function bookNewReservation(newReservation: Reservation) {
    const { data } = await axiosInstance.post('https://localhost:7190/reservation', newReservation);
    return data;
}

export async function bookNewReservationAsAdmin(newReservation: Reservation) {
    const { data } = await axiosInstance.post('https://localhost:7190/reservation/admin', newReservation);
    return data;
}

export async function cancelReservation({ id }: { id: string }) {
    const { data } = await axiosInstance.put(`https://localhost:7190/reservation/cancel/${id}`);
    return data;
}