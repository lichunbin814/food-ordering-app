import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import historyReducer from './slices/historySlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
