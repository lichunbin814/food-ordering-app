import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from './cartSlice';

export interface Order {
  id: string;
  items: CartItem[];
  date: string;
}

export interface HistoryState {
  orders: Order[];
  orderCounter: number;
}

const initialState: HistoryState = {
  orders: [],
  orderCounter: 1
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Omit<Order, 'id'>>) => {
      const order = {
        ...action.payload,
        id: state.orderCounter.toString()
      };
      state.orders.unshift(order);
      state.orderCounter += 1;
    },
    clearHistory: (state) => {
      state.orders = [];
      state.orderCounter = 1;
    },
  },
});

export const { addOrder, clearHistory } = historySlice.actions;
export default historySlice.reducer;
