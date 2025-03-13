import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Menu } from '../Menu';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../../store/slices/cartSlice';

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

const createMockStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer
    }
  });
};

describe('Menu Component', () => {
  const renderWithProvider = () => {
    const store = createMockStore();
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

  it('should dispatch addToCart action when Add to Cart button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'log');
    renderWithProvider();
    
    const firstAddToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(firstAddToCartButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Adding Test Item 1 to cart');
    consoleSpy.mockRestore();
  });
});
