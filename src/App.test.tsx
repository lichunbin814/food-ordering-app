import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders header with correct title', () => {
    render(<App />);
    expect(screen.getByText('Food Ordering System')).toBeInTheDocument();
  });

  it('renders menu component', () => {
    render(<App />);
    expect(screen.getByText('Main Dishes')).toBeInTheDocument();
    expect(screen.getByText('Side Dishes')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('displays menu items', () => {
    render(<App />);
    expect(screen.getByText('Braised Beef Noodle Soup')).toBeInTheDocument();
  });
});
