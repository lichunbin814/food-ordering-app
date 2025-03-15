import { describe, it, expect } from 'vitest';
import cartReducer, { addToCart, removeFromCart, updateQuantity } from '../cartSlice';
import { MenuItem } from '../../../types/menu';

describe('cart reducer', () => {
  const initialState = {
    items: []
  };

  const sampleItem: MenuItem = {
    id: '1',
    name: 'Test Item',
    description: 'Test Description'
  };

  it('should handle initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addToCart with new item', () => {
    const actual = cartReducer(initialState, addToCart(sampleItem));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({
      ...sampleItem,
      quantity: 1
    });
  });

  it('should handle addToCart with existing item', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 1
      }]
    };
    const actual = cartReducer(stateWithItem, addToCart(sampleItem));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
  });

  it('should handle removeFromCart', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 1
      }]
    };
    const actual = cartReducer(stateWithItem, removeFromCart(sampleItem.id));
    expect(actual.items).toHaveLength(0);
  });

  it('should handle removeFromCart with non-existent item', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 1
      }]
    };
    const actual = cartReducer(stateWithItem, removeFromCart('non-existent-id'));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({
      ...sampleItem,
      quantity: 1
    });
  });

  it('should handle updateQuantity to increase quantity', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 1
      }]
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: sampleItem.id, quantity: 3 }));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(3);
  });

  it('should handle updateQuantity to decrease quantity', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 3
      }]
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: sampleItem.id, quantity: 2 }));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(2);
  });

  it('should allow setting quantity to any value including zero', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 1
      }]
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: sampleItem.id, quantity: 0 }));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0].quantity).toBe(0);
  });

  it('should handle updateQuantity with non-existent item', () => {
    const stateWithItem = {
      items: [{
        ...sampleItem,
        quantity: 1
      }]
    };
    const actual = cartReducer(stateWithItem, updateQuantity({ id: 'non-existent-id', quantity: 5 }));
    expect(actual.items).toHaveLength(1);
    expect(actual.items[0]).toEqual({
      ...sampleItem,
      quantity: 1
    });
  });
});
