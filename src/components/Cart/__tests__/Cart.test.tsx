/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '../Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartState, CartItem } from '../../../store/slices/cartSlice';

const testItem: CartItem = {
  id: '1',
  name: 'Test Item',
  description: 'Test Description',
  quantity: 1
};

const createMockStore = (initialState: CartState = { items: [] }) => {
  return configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: initialState
    }
  });
};

const renderWithProvider = (ui: React.ReactElement, store = createMockStore()) => {
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

describe('Cart', () => {
  it('should show empty cart message when cart is empty', () => {
    renderWithProvider(<Cart />);
    expect(screen.getByText('Cart is empty')).toBeInTheDocument();
  });

  it('should display cart items with correct quantities', () => {
    const store = createMockStore({
      items: [{ ...testItem, quantity: 2 }]
    });

    renderWithProvider(<Cart />, store);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should handle remove button click', () => {
    const store = createMockStore({
      items: [testItem]
    });

    renderWithProvider(<Cart />, store);
    fireEvent.click(screen.getByText('Remove'));
    
    const state = store.getState();
    expect(state.cart.items).toHaveLength(0);
  });

  it('should handle quantity increase', () => {
    const store = createMockStore({
      items: [testItem]
    });

    renderWithProvider(<Cart />, store);
    fireEvent.click(screen.getByText('+'));
    
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(2);
  });

  it('should handle quantity decrease', () => {
    const store = createMockStore({
      items: [{ ...testItem, quantity: 2 }]
    });

    renderWithProvider(<Cart />, store);
    fireEvent.click(screen.getByText('-'));
    
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(1);
  });

  it('should not decrease quantity below 1', () => {
    const store = createMockStore({
      items: [testItem]
    });

    renderWithProvider(<Cart />, store);
    fireEvent.click(screen.getByText('-'));
    
    const state = store.getState();
    expect(state.cart.items[0].quantity).toBe(1);
  });

  it('should handle order submission', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const store = createMockStore({
      items: [testItem]
    });

    renderWithProvider(<Cart />, store);
    fireEvent.click(screen.getByText('Submit Order'));
    
    expect(consoleSpy).toHaveBeenCalledWith('Order submitted');
    consoleSpy.mockRestore();
  });
});
