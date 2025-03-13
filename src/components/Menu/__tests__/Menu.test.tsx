import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Menu } from '../Menu';

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
  it('renders category name correctly', () => {
    render(<Menu categories={mockCategories} />);
    expect(screen.getByText('Test Category')).toBeInTheDocument();
  });

  it('renders all menu items', () => {
    render(<Menu categories={mockCategories} />);
    expect(screen.getByText('Test Item 1')).toBeInTheDocument();
    expect(screen.getByText('Test Item 2')).toBeInTheDocument();
  });

  it('shows item descriptions', () => {
    render(<Menu categories={mockCategories} />);
    expect(screen.getByText('Test description 1')).toBeInTheDocument();
    expect(screen.getByText('Test description 2')).toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    render(<Menu categories={mockCategories} />);
    const items = screen.getAllByRole('heading', { level: 3 });
    expect(items).toHaveLength(2);
  });
});
