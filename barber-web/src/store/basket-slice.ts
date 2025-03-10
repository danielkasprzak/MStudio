import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Offer {
    id: number;
    label: string;
    description?: string;
    price: number;
    time: number;
    quantity: number;
}

interface Cart {
    items: Offer[];
    totalPrice: number;
    totalDuration: number;
    reservationDateTime: string | null;
    isVisible: boolean;
}

const initialState: Cart = {
    items: [],
    totalPrice: 0,
    totalDuration: 0,
    reservationDateTime: null,
    isVisible: false
}

const basketSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Omit<Offer, 'quantity'>>) {
            const { id, label, price, time } = action.payload; 
            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ id, label, price, time, quantity: 1 });
            }

            state.totalDuration += time;
            state.totalPrice += price;
        },
        removeItem(state, action: PayloadAction<number>) {
            const existingItem = state.items.find((item) => item.id === action.payload);

            if (existingItem) {
              if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
              } else {
                state.items = state.items.filter((item) => item.id !== action.payload);
              }

              state.totalDuration -= existingItem.time;
              state.totalPrice -= existingItem.price;
            }
        },
        setReservationDateTime: (state, action) => {
            state.reservationDateTime = action.payload;
        },
        clearItems(state) {
            state.items = [];
            state.totalDuration = 0;
            state.totalPrice = 0;
        },
        clearReservation: (state) => {
            state.items = [];
            state.totalDuration = 0;
            state.totalPrice = 0;
            state.reservationDateTime = null;
        },
        showPanel: (state) => {
            state.isVisible = true;
        },
        hidePanel: (state) => {
            state.isVisible = false;
        }
    } 
});

export const basketActions = basketSlice.actions;

export default basketSlice;