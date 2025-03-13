import { Typography, Card, CardContent, Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { type MenuCategory } from '../../types/menu';

interface MenuProps {
  categories: MenuCategory[];
}

export const Menu = ({ categories }: MenuProps) => {
  return (
    <div style={{ background: 'var(--color-white)' }}>
      {categories.map((category) => (
        <Box key={category.id} sx={{ my: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: 'var(--color-primary)' }}>
            {category.name}
          </Typography>
          <Grid container spacing={3} sx={{ p: 1.5 }}>
            {category.items.map((item) => (
              <Grid component="div" key={item.id} {...{
                size: {
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3
                }
              }}>
                <Card sx={{ 
                  border: '1px solid var(--color-primary-light)',
                  height: '100%',
                  '&:hover': {
                    boxShadow: '0 3px 6px rgba(0,0,0,0.16)'
                  }
                }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--color-secondary)', mb: 2 }} >
                      {item.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: '1rem' }}
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </div>
  );
};
