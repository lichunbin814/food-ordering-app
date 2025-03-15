import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HistoryDialog } from '../HistoryDialog';
import historyReducer, { addOrder } from '../../../store/slices/historySlice';

describe('HistoryDialog', () => {
  const store = configureStore({
    reducer: {
      history: historyReducer,
    },
  });

  const renderHistoryDialog = (props: { open: boolean; onClose: () => void }) => {
    return render(
      <Provider store={store}>
        <HistoryDialog {...props} />
      </Provider>
    );
  };

  beforeEach(() => {
    store.dispatch({ type: 'history/clearHistory' });
  });

  it('should not display dialog when closed', () => {
    renderHistoryDialog({ open: false, onClose: () => {} });
    expect(screen.queryByText('Order History')).not.toBeInTheDocument();
  });

  it('should display dialog when open', () => {
    renderHistoryDialog({ open: true, onClose: () => {} });
    expect(screen.getByText('Order History')).toBeInTheDocument();
  });

  it('should display empty message when no orders', () => {
    renderHistoryDialog({ open: true, onClose: () => {} });
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

    renderHistoryDialog({ open: true, onClose: () => {} });
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

    renderHistoryDialog({ open: true, onClose: () => {} });
    const clearButton = screen.getByText('Clear History');
    fireEvent.click(clearButton);

    expect(screen.getByText('No orders yet')).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();
    renderHistoryDialog({ open: true, onClose });
    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
