// src/Pages/Login/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import  Alert  from '../../Components/Alerts/Alert';
import { UserContext } from '../../Context/User/UserContext';
// import 'bootstrap/dist/css/bootstrap.min.css';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);
  const [alert, setAlert] = useState({ show: false, message: '', variant: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      console.log(credentials)
      const response = await axios.post('http://localhost:5050/restaurants/login', credentials);
      console.log(response)
      if (response.data.success) {
        console.log("hello")
        console.log(response.data.user)
        setUser(response.data.user); // Set the logged-in user
        setAlert({ show: true, message: 'Login successful!', variant: 'success' });
        setTimeout(() => {
          const { from } = location.state || { from: { pathname: '/market' } };
          navigate(from);
        }, 2000);
      } else {
        setAlert({ show: true, message: 'Invalid credentials', variant: 'danger' });
      }
    } catch (error) {
      setAlert({ show: true, message: 'Error during login. Please try again.', variant: 'danger' });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ show: false, message: '', variant: '' })} dismissible>
              {alert.message}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/market/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <br></br>
      </Container>
    </ThemeProvider>
  );
}
