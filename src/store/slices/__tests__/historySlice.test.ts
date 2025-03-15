import { describe, it, expect, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import historyReducer, { addOrder, clearHistory } from '../historySlice';
import { CartItem } from '../cartSlice';

describe('historySlice', () => {
  const store = configureStore({
    reducer: {
      history: historyReducer,
    },
  });

  beforeEach(() => {
    store.dispatch(clearHistory());
  });

  it('should handle adding an order with incremental ID', () => {
    const orderItems: CartItem[] = [
      { id: '1', name: 'Item 1', description: 'Description 1', quantity: 2 },
      { id: '2', name: 'Item 2', description: 'Description 2', quantity: 1 },
    ];

    store.dispatch(addOrder({
      items: orderItems,
      date: '2024-03-14T10:00:00Z',
    }));

    const state = store.getState().history;
    expect(state.orders).toHaveLength(1);
    expect(state.orders[0].id).toBe('1');
    expect(state.orders[0].items).toEqual(orderItems);
    expect(state.orderCounter).toBe(2);

    store.dispatch(addOrder({
      items: orderItems,
      date: '2024-03-14T11:00:00Z',
    }));

    const updatedState = store.getState().history;
    expect(updatedState.orders).toHaveLength(2);
    expect(updatedState.orders[0].id).toBe('2');
    expect(updatedState.orderCounter).toBe(3);
  });

  it('should handle clearing history', () => {
    const orderItems: CartItem[] = [
      { id: '1', name: 'Item 1', description: 'Description 1', quantity: 2 },
    ];

    store.dispatch(addOrder({
      items: orderItems,
      date: '2024-03-14T10:00:00Z',
    }));

    store.dispatch(clearHistory());

    const state = store.getState().history;
    expect(state.orders).toHaveLength(0);
    expect(state.orderCounter).toBe(1);
  });
});
