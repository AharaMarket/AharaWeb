import React from 'react';
import './RestaurantRegistrationForm.css'
import { useForm } from 'react-hook-form';
import { Container, TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

function RestaurantRegistrationForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    const password = watch('password');
    
    // const fetchProduct = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5050/ingredients/${id}`);
    //         setProduct(response.data);
    //         if (response.data.images && response.data.images.length > 0) {
    //             setMainImage(response.data.images[0]);
    //         } else {
    //             setMainImage('https://t4.ftcdn.net/jpg/02/32/98/31/360_F_232983161_9lmUyHKnWbLW0vQPvWCrp5R5DSpexhbx.jpg');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching product:', error);
    //     }
    // };

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