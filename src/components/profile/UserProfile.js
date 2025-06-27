import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import {
  ShoppingBag as OrdersIcon,
  AccountBalanceWallet as WalletIcon,
  LocationOn as AddressIcon,
  Payment as UPIIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

import MyOrders from './MyOrders';
import MyWallet from './MyWallet';
import AddressBook from './AddressBook';
import ManageUPI from './ManageUPI';
import MyProfile from './MyProfile';
import AccountSettings from './AccountSettings';

const drawerWidth = 240;

const menuItems = [
  { text: 'My Orders', icon: <OrdersIcon />, component: MyOrders },
  { text: 'My Wallet', icon: <WalletIcon />, component: MyWallet },
  { text: 'Address Book', icon: <AddressIcon />, component: AddressBook },
  { text: 'Manage UPI', icon: <UPIIcon />, component: ManageUPI },
  { text: 'My Profile', icon: <ProfileIcon />, component: MyProfile },
  { text: 'Account Settings', icon: <SettingsIcon />, component: AccountSettings }
];

const UserProfile = () => {
  const { user } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuItemClick = (index) => {
    setSelectedItem(index);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div">
          {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {user?.email}
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selectedItem === index}
              onClick={() => handleMenuItemClick(index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const SelectedComponent = menuItems[selectedItem].component;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          display: { md: 'none' }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {menuItems[selectedItem].text}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: '64px', md: 0 }
        }}
      >
        <SelectedComponent />
      </Box>
    </Box>
  );
};

export default UserProfile; 