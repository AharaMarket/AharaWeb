import React, {useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../Context/User/UserContext';

function MarketNavbar() {
    const { user, setUser } = useContext(UserContext);
    
    const logout = () => {
        setUser(null); // Call the logout function from context
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#5667FF', color: 'white', boxShadow: 'none' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                > 
                    <Link to="/market/ingredientmarketplace" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Ahara
                    </Link>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/market">Dashboard</Button>
                    <Button color="inherit" component={Link} to="/market/ingredientmarketplace">Marketplace</Button>
                    <Button color="inherit" component={Link} to="/market/orders">Orders</Button>
                    {
                        user ? (
                            <>
                            <Button color="inherit" component={Link} to="/market/account">
                                    Account
                            </Button>

                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                            </>
                            
                        ) : (
                            <Button color="inherit" component={Link} to="/market/login" target="_blank" rel="noopener noreferrer">
                                Login
                            </Button>
                        )
                    }
                    <IconButton
                        component={Link}
                        to="/market/cart"
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
