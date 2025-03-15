import { AppBar, Toolbar, Typography, Container, Button, CircularProgress, Backdrop } from '@mui/material';
import { useState, Suspense, lazy, useEffect } from 'react';
import { Menu } from './components/Menu/Menu';
import { menuData } from './data/menuData';
import { Cart } from './components/Cart/Cart';
import { Provider } from 'react-redux';
import { store } from './store';
import { PreloadPriority, preloadService } from './app/services/preload.service';

const preloadHistoryDialog = () => import('./components/History/HistoryDialog');

const HistoryDialog = lazy(() => preloadHistoryDialog().then(module => ({
  default: module.HistoryDialog
})));

function App() {
  const [openHistory, setOpenHistory] = useState(false);

  useEffect(() => {
    preloadService.addTask(preloadHistoryDialog, PreloadPriority.LOW);
    preloadService.startPreloading();
  }, []);

  return (
    <Provider store={store}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: 'var(--color-primary)' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">
            Food Ordering System
          </Typography>
          <Button
            color="inherit"
            onClick={() => setOpenHistory(true)}
          >
            View History
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Menu categories={menuData} />
        <Cart />
      </Container>
      <Suspense fallback={
        <Backdrop open={true}>
          <CircularProgress />
        </Backdrop>
      }>
        {openHistory && (
          <HistoryDialog 
            open={openHistory}
            onClose={() => setOpenHistory(false)}
          />
        )}
      </Suspense>
    </Provider>
  )
}

export default App
