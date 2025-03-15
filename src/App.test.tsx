import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders header with correct title', () => {
    expect(screen.getByText('Food Ordering System')).toBeInTheDocument();
  });

  it('renders menu component', () => {
    expect(screen.getByText('Main Dishes')).toBeInTheDocument();
    expect(screen.getByText('Side Dishes')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('displays menu items', () => {
    expect(screen.getByText('Braised Beef Noodle Soup')).toBeInTheDocument();
  });

  it('renders View History button', () => {
    expect(screen.getByText('View History')).toBeInTheDocument();
  });

  it('opens history dialog when View History button is clicked', async () => {
    const viewHistoryButton = screen.getByText('View History');
    fireEvent.click(viewHistoryButton);
    
    await waitFor(() => screen.getByText('Order History'), { timeout: 2000 });
    
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('closes history dialog when close button is clicked', async () => {
    const viewHistoryButton = screen.getByText('View History');
    fireEvent.click(viewHistoryButton);

    const dialog = await screen.findByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    await fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
