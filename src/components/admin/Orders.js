import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as adminService from '../../services/adminService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState('');

  useEffect(() => {
    loadOrders();
    loadAdmins();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await adminService.getAllOrders();
      console.log(data.orders);
      
      setOrders(data.orders);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const loadAdmins = async () => {
    try {
      const data = await adminService.getAllAdmins();
      setAdmins(data.admins || []);
    } catch (err) {
      console.error('Failed to load admins:', err);
    }
  };

  const handleMenuClick = (event, order) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrder(order);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrder(null);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await adminService.updateOrderStatus(selectedOrder._id, newStatus);
      await loadOrders(); // Reload orders after update
      handleMenuClose();
    } catch (err) {
      setError(err.message || 'Failed to update order status');
    }
  };

  const handleAssignOrder = async () => {
    try {
      await adminService.assignOrderToAdmin(selectedOrder._id, selectedAdminId);
      await loadOrders(); // Reload orders after assignment
      setAssignDialogOpen(false);
      setSelectedAdminId('');
      handleMenuClose();
    } catch (err) {
      setError(err.message || 'Failed to assign order');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'success';
      case 'Processing':
        return 'info';
      case 'Shipped':
        return 'primary';
      case 'Cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Assigned Admin</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>#{order.orderId}</TableCell>
                <TableCell>{order.user?.name || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={order.status}
                    color={getStatusColor(order.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={order.paymentStatus}
                    color={order.paymentStatus === 'Completed' ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {order.assignedToAdmin ? (
                    <Chip
                      label={order.assignedToAdmin.name}
                      color="primary"
                      size="small"
                    />
                  ) : (
                    <Chip
                      label="Unassigned"
                      color="default"
                      size="small"
                    />
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, order)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleStatusChange('Processing')}>
          Mark as Processing
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('Shipped')}>
          Mark as Shipped
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('Delivered')}>
          Mark as Delivered
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('Cancelled')}>
          Cancel Order
        </MenuItem>
        <MenuItem onClick={() => setAssignDialogOpen(true)}>
          Assign to Admin
        </MenuItem>
      </Menu>

      {/* Assign Order Dialog */}
      <Dialog open={assignDialogOpen} onClose={() => setAssignDialogOpen(false)}>
        <DialogTitle>Assign Order to Admin</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Admin</InputLabel>
            <Select
              value={selectedAdminId}
              onChange={(e) => setSelectedAdminId(e.target.value)}
              label="Select Admin"
            >
              {admins
                .filter(admin => admin.role === 'admin' && admin.isActive)
                .map((admin) => (
                  <MenuItem key={admin._id} value={admin._id}>
                    {admin.name} ({admin.email})
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAssignOrder} 
            variant="contained"
            disabled={!selectedAdminId}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Orders; 