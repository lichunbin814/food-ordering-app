import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearHistory, Order } from '../../store/slices/historySlice';
import { CartItem } from '../../store/slices/cartSlice';

export const History = () => {
  const orders = useSelector((state: RootState) => state.history.orders);
  const dispatch = useDispatch();

  if (orders.length === 0) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Order History
        </Typography>
        <Card>
          <CardContent>
            <Typography>No orders yet</Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h2">
          Order History
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={() => dispatch(clearHistory())}
        >
          Clear History
        </Button>
      </Box>
      {orders.map((order: Order) => (
        <Card key={order.id} sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" color="text.secondary">
                Order ID: {order.id}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {new Date(order.date).toLocaleString()}
              </Typography>
            </Box>
            {order.items.map((item: CartItem) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
