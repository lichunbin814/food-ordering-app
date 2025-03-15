import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { LazyComponent } from '../LazyComponent';
import { useEffect, useState } from 'react';

const theme = createTheme();

describe('LazyComponent', () => {
  it('renders children directly when isLoaded is true', () => {
    const TestComponent = () => <div>Test Content</div>;
    
    render(
      <LazyComponent isLoaded={true}>
        {() => <TestComponent />}
      </LazyComponent>
    );
    
    expect(screen.getByText('Test Content')).toBeDefined();
  });

  it('renders loading state when isLoaded is false', async () => {
    const TestComponent = () => {
      const [ready, setReady] = useState(false);
      
      if (!ready) {
        throw new Promise(resolve => setTimeout(() => {
          resolve(setReady(true));
        }, 3000));
      }
      return <div>Test Content</div>;
    };
  
    render(
      <ThemeProvider theme={theme}>
        <LazyComponent isLoaded={false}>
          {() => <TestComponent />}
        </LazyComponent>
      </ThemeProvider>
    );
  
    const progressBar = await screen.findByRole('progressbar', { hidden: true });
    expect(progressBar).toBeDefined();
  });

  it('passes provided props to children function', () => {
    interface TestProps {
      message: string;
    }
    
    const TestComponent = ({ message }: TestProps) => <div>{message}</div>;
    
    render(
      <LazyComponent<TestProps> isLoaded={true}>
        {() => <TestComponent message='Hello' />}
      </LazyComponent>
    );
    
    expect(screen.getByText('Hello')).toBeDefined();
  });
});
