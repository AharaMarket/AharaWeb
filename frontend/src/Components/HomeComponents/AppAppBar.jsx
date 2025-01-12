import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import { Link } from 'react-router-dom';
// import { SpaceBar } from '@material-ui/icons';

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          width: '100%', // Ensures the AppBar fills the full width
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.75)'
                  : 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: 'divider',
            })}
          >
          <Box
                sx={{
                  width: '50%', // Middle 60% width
                  mx: 'auto', // Centers the box horizontally
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
            <Box 
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                flexGrow: 1, 
                justifyContent: 'flex-start', 
                alignItems: 'center', // Centers items vertically
                gap: '20px',
                
              }}
            >
              <Typography
                component="span"
                variant="h1"
                sx={{
                  fontSize: 'clamp(3rem, 10vw, 4rem)',
                  color: theme => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
                  marginRight: '20px' // Adds space after the typography
                }}
              >
                Ahara
              </Typography>
              <Box 
                sx={{
                  display: 'flex',
                  marginLeft: '20px', // Adds consistent spacing between menu items
                }}
              >
              <MenuItem 
                component={Link} 
                to="/features" 
                sx={{ color: theme => theme.palette.mode === 'light' ? 'black' : 'white' }}
              >
                Who We Serve
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/testimonials" 
                sx={{ color: theme => theme.palette.mode === 'light' ? 'black' : 'white' }}
              >
                Resources
              </MenuItem>
              <MenuItem 
                component={Link} 
                to="/highlights" 
                sx={{ color: theme => theme.palette.mode === 'light' ? 'black' : 'white' }}
              >
                Company
              </MenuItem>
              </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Button component={Link} to="/market/login" variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
                Log In
              </Button>
              <Button component={Link} to="/market/register" variant="contained" color="primary" sx={{ borderRadius: '20px' }}>
                Register
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
            </Box>
            </Box>
          </Toolbar>
        </Container>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ minWidth: '60vw', p: 2, backgroundColor: 'background.paper' }}>
            <MenuItem component={Link} to="/features" sx={{ color: theme => theme.palette.mode === 'light' ? 'black' : 'white' }}>Who We Serve</MenuItem>
            <MenuItem component={Link} to="/testimonials" sx={{ color: theme => theme.palette.mode === 'light' ? 'black' : 'white' }}>Resources</MenuItem>
            <MenuItem component={Link} to="/highlights" sx={{ color: theme => theme.palette.mode === 'light' ? 'black' : 'white' }}>Company</MenuItem>
          </Box>
        </Drawer>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
