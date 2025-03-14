import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Menu } from './components/Menu/Menu';
import { menuData } from './data/menuData';
import { Cart } from './components/Cart/Cart';
import { History } from './components/History/History';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <AppBar position="static" sx={{ mb: 4, bgcolor: 'var(--color-primary)' }}>
        <Toolbar>
          <Typography variant="h6">
            Food Ordering System
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Menu categories={menuData} />
        <Cart />
        <History />
      </Container>
    </Provider>
  )
}

export default App
