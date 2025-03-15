import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
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

  it('opens history dialog when View History button is clicked', () => {
    const viewHistoryButton = screen.getByText('View History');
    fireEvent.click(viewHistoryButton);
    expect(screen.getByText('Order History')).toBeInTheDocument();
  });

  it('closes history dialog when close button is clicked', async () => {
    const viewHistoryButton = screen.getByText('View History');
    fireEvent.click(viewHistoryButton);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    const closeButton = screen.getByLabelText('close');
    fireEvent.click(closeButton);

    await waitForElementToBeRemoved(dialog);
  });
});
