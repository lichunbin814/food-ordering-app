import { Suspense } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LazyComponentProps {
  isLoaded: boolean;
  children: () => React.ReactElement;
}

export function LazyComponent<T>({ isLoaded, children }: LazyComponentProps) {
  return isLoaded ? (
    children()
  ) : (
    <Suspense 
      fallback={
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      }
    >
      {children()}
    </Suspense>
  );
}
