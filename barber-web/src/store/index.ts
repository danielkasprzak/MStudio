import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./basket-slice";

const store = configureStore({
    reducer: {
        cart: basketSlice.reducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;