import { AppBar, Toolbar, Typography } from '@mui/material';
import { Menu } from './components/Menu/Menu';
import { menuData } from './data/menuData';

function App() {
  return (
    <>
      <AppBar position="static" sx={{ mb: 4, bgcolor: 'var(--color-primary)' }}>
        <Toolbar>
          <Typography variant="h6">
            Food Ordering System
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <Menu categories={menuData} />
      </div>
    </>
  )
}

export default App
