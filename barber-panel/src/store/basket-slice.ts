import { createSlice } from "@reduxjs/toolkit";

interface Offer {
    id: string;
    label: string;
    price: number;
    time: number;
}

interface Cart {
    items: Offer[];
}

const initialState: Cart = {
    items: [],
}

const basketSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state) {

        },
        removeItem(state) {

        },
        clearItems(state) {

        }
    } 
});

export const basketActions = basketSlice.actions;

export default basketSlice;