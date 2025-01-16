export interface Offer {
    id: number;
    label: string;
    price: number;
    duration: number;
    description?: string;
}

export interface NewOffer {
    label: string;
    description?: string;
    duration: number;
    price: number;
}

export interface UpdateOffer {
    id: number,
    offer: Offer
}