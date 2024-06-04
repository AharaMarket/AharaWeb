import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar'; // Make sure your Searchbar component is compatible with MUI styling

function MarketNavbar() {
    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Ahara
                    </Link>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/market/dashboard">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/market/importorder">Marketplace</Button>
                    <Button color="inherit" component={Link} to="/market/orders">Orders</Button>
                    <Button color="inherit" component={Link} to="/market/login" target="_blank" rel="noopener noreferrer">Login</Button>
                    <IconButton
                        component={Link}
                        to="/market/vendorselection"
                        color="inherit"
                    >
                        <Badge badgeContent={0} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default MarketNavbar;
