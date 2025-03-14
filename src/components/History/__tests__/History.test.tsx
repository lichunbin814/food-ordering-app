import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { History } from '../History';
import historyReducer, { addOrder } from '../../../store/slices/historySlice';

describe('History', () => {
  const store = configureStore({
    reducer: {
      history: historyReducer,
    },
  });

  const renderHistory = () => {
    return render(
      <Provider store={store}>
        <History />
      </Provider>
    );
  };

  beforeEach(() => {
    store.dispatch({ type: 'history/clearHistory' });
  });

  it('should display empty message when no orders', () => {
    renderHistory();
    expect(screen.getByText('No orders yet')).toBeInTheDocument();
  });

  it('should display order details', () => {
    const orderItems = [
      { id: '1', name: 'Test Item', description: 'Test Description', quantity: 2 },
    ];

    store.dispatch(addOrder({
      items: orderItems,
      date: '2024-03-14T10:00:00Z',
    }));

    renderHistory();
    expect(screen.getByText('Order ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item x 2')).toBeInTheDocument();
  });

  it('should clear history when clear button is clicked', () => {
    const orderItems = [
      { id: '1', name: 'Test Item', description: 'Test Description', quantity: 2 },
    ];

    store.dispatch(addOrder({
      items: orderItems,
      date: '2024-03-14T10:00:00Z',
    }));

    renderHistory();
    const clearButton = screen.getByText('Clear History');
    fireEvent.click(clearButton);

    expect(screen.getByText('No orders yet')).toBeInTheDocument();
  });
});
