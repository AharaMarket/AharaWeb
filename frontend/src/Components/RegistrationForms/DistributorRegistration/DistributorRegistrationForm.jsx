import React, { useEffect, useRef, useState } from 'react';
import './DistributorRegistrationForm.css';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import {
    Container,
    TextField,
    Button,
    Card,
    CardContent,
    Typography,
    Box,
} from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function DistributorRegistrationForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [locationData, setLocationData] = useState(null);
    const addressRef = useRef(null);

    const password = watch('password');

    useEffect(() => {
        const loadGoogleMapsApi = () => {
            if (!window.google) {
                const script = document.createElement('script');
                script.src =
                    `https://maps.googleapis.com/maps/api/js?key=AIzaSyAAlk_wVBFyNX08XBVTyJwaQk25DibxRps&libraries=places`;
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    initializeAutocomplete();
                };
            } else {
                initializeAutocomplete();
            }
        };

        const initializeAutocomplete = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(
                addressRef.current
            );

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                console.log('Place:', place);

                if (place.geometry && place.geometry.location) {
                    const lat = place.geometry.location.lat();
                    const lng = place.geometry.location.lng();

                    console.log('Latitude:', lat);
                    console.log('Longitude:', lng);

                    setLocationData({
                        lat,
                        lng,
                        address: place.formatted_address,
                    });
                } else {
                    console.log('Place has no geometry or location:', place);
                }
            });
        };

        loadGoogleMapsApi();
    }, []);

    const onSubmit = async (data) => {
        console.log('Form submitted', data);

        if (!locationData) {
            toast.error('Please select a valid address.');
            return;
        }

        const registrationData = {
            ...data,
            latitude: locationData.lat,
            longitude: locationData.lng,
            address: locationData.address,
        };

        console.log('Registration Data:', registrationData);

        try {
            await axios.post(
                'http://localhost:5050/distributors/register',
                registrationData
            );
            toast.success('Registration successful!');
            setTimeout(() => {
                window.location.href = '/market';
            }, 2000);
        } catch (error) {
            console.error('Error during registration', error);
            toast.error('Error during registration. Please try again.');
        }
    };

    return (
        <Container className="registrationformcontainer">
            <Card className="registrationformcard">
                <CardContent>
                    <Typography
                        variant="h4"
                        component="h2"
                        className="registrationformtitle"
                    >
                        Distributor Sign Up
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
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Enter a valid email',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            label="Distributor Name"
                            fullWidth
                            margin="normal"
                            {...register('distributorName', {
                                required: 'Distributor Name is required',
                            })}
                            error={!!errors.distributorName}
                            helperText={errors.distributorName?.message}
                        />
                        <TextField
                            label="Distributor Address"
                            fullWidth
                            margin="normal"
                            inputRef={addressRef}
                            {...register('address', {
                                required: 'Distributor Address is required',
                            })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            })}
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
                                validate: (value) =>
                                    value === password || 'Passwords do not match',
                            })}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                        <Box className="registrationformbutton">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Register
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </Container>
    );
}

export default DistributorRegistrationForm;
