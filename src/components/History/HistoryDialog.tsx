import { Dialog, DialogTitle, DialogContent, Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clearHistory, Order } from '../../store/slices/historySlice';
import { CartItem } from '../../store/slices/cartSlice';
import CloseIcon from '@mui/icons-material/Close';

interface HistoryDialogProps {
  open: boolean;
  onClose: () => void;
}

export const HistoryDialog = ({ open, onClose }: HistoryDialogProps) => {
  const orders = useSelector((state: RootState) => state.history.orders);
  const dispatch = useDispatch();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Order History</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {orders.length === 0 ? (
          <Card>
            <CardContent>
              <Typography>No orders yet</Typography>
            </CardContent>
          </Card>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
        )}
      </DialogContent>
    </Dialog>
  );
};
