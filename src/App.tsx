import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { useState } from 'react';
import { Menu } from './components/Menu/Menu';
import { menuData } from './data/menuData';
import { Cart } from './components/Cart/Cart';
import { HistoryDialog } from './components/History/HistoryDialog';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  const [openHistory, setOpenHistory] = useState(false);

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
      <HistoryDialog 
        open={openHistory}
        onClose={() => setOpenHistory(false)}
      />
    </Provider>
  )
}

export default App
