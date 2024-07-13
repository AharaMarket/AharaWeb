import React from 'react';
import './RestaurantRegistrationForm.css'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { Container, TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function RestaurantRegistrationForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
    const password = watch('password');
    
    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:5050/restaurants/register', data);
            toast.success('Registration successful!');
            setTimeout(() => {
                window.location.href = '/market';  // Redirect to dashboard
            }, 2000);
        } catch (error) {
            toast.error('Error during registration. Please try again.');
        }
    };

    return (
      <Container className="registrationcontainer">
        <Card className="registrationcard">
          <CardContent>
            <Typography variant="h4" component="h2" className="registrationtitle">
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                label="Your Name"
                fullWidth
                margin="normal"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Your Email"
                type="email"
                fullWidth
                margin="normal"
                {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Enter a valid email' } })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Restaurant Name"
                fullWidth
                margin="normal"
                {...register('restaurantName', { required: 'Restaurant Name is required' })}
                error={!!errors.restaurantName}
                helperText={errors.restaurantName?.message}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                margin="normal"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
              <Box className="registrationbutton">
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    );
  };

export default RestaurantRegistrationForm;