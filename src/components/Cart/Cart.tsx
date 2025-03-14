import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { addOrder } from '../../store/slices/historySlice';
import { RootState } from '../../store';

export const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  if (cartItems.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Cart
        </Typography>
        <Card>
          <CardContent>
            <Typography>Cart is empty</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Cart
      </Typography>
      {cartItems.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h6" component="h3">
                {item.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    if (item.quantity === 1) {
                      return;
                    }

                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      })
                    );
                  }}
                >
                  -
                </Button>
                <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                >
                  +
                </Button>
              </Box>
            </Box>
            <Button
              onClick={() => handleRemoveFromCart(item.id)}
              color="error"
              variant="outlined"
              size="small"
            >
              Remove
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 2 }}
        onClick={() => {
          dispatch(addOrder({
            items: cartItems,
            date: new Date().toISOString(),
          }));
          dispatch(clearCart());
        }}
      >
        Submit Order
      </Button>
    </Box>
  );
};
