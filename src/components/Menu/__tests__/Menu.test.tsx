import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest';
import { Menu } from '../Menu';
import { Provider } from 'react-redux';
import { configureStore, Store, UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import cartReducer from '../../../store/slices/cartSlice';
import historyReducer from '../../../store/slices/historySlice';

const mockCategories = [
  {
    id: 'test-category',
    name: 'Test Category',
    items: [
      {
        id: 'test-item-1',
        name: 'Test Item 1',
        description: 'Test description 1'
      },
      {
        id: 'test-item-2',
        name: 'Test Item 2',
        description: 'Test description 2'
      }
    ]
  }
];

describe('Menu Component', () => {
  let store: Store<RootState>;
  let dispatchSpy: MockInstance<[action: UnknownAction, ...extraArgs: any[]], UnknownAction>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
        history: historyReducer
      },
      middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
          serializableCheck: false
        })
    });
    dispatchSpy = vi.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  const renderWithProvider = () => {
    return {
      ...render(
        <Provider store={store}>
          <Menu categories={mockCategories} />
        </Provider>
      ),
      store
    };
  };

  it('renders category name correctly', () => {
    renderWithProvider();
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    renderWithProvider();
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  it('shows item descriptions', () => {
    renderWithProvider();
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    renderWithProvider();
    const items = screen.getAllByRole('heading', { level: 3 });
    expect(items).toHaveLength(2);
  });

  it('should show "Add to Cart" buttons for each item', () => {
    renderWithProvider();
    const addToCartButtons = screen.getAllByText('Add to Cart');
    expect(addToCartButtons).toHaveLength(mockCategories[0].items.length);
  });

  it('should dispatch addToCart action when Add to Cart button is clicked', async () => {
    renderWithProvider();
    
    await act(async () => {
      const firstAddToCartButton = screen.getAllByText('Add to Cart')[0];
      fireEvent.click(firstAddToCartButton);
    });
    
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: mockCategories[0].items[0]
    });
  });
});
