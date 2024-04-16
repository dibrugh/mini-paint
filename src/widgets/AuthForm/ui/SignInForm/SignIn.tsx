import { Box, Button, Container, CssBaseline, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../../../../features';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginError } from '../../../../shared/api';

const signInSchema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

type Inputs = {
    email: string;
    password: string;
};

const SignIn = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(signInSchema),
    });

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
        try {
            await signIn(email, password);
            navigate('/feed');
        } catch (error) {
            console.log(error);
            loginError();
        }
    };

    // Можно вынести в InputAdornments
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Container maxWidth="sm" component="main" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <CssBaseline />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '16px',
                    boxShadow: 3,
                    p: 2,
                }}
            >
                <Typography component="h1" variant="h4">
                    Sign in
                </Typography>
                <Typography component="h2" variant="subtitle1">
                    Don’t have an account? <Link to="/sign-up">SIGN UP</Link>
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                error={!!errors.email?.message}
                                helperText={errors.email?.message}
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={!!errors.password?.message}
                                helperText={errors.password?.message}
                                {...field}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                </form>
            </Box>
            <ToastContainer />
        </Container>
    );
};

export default SignIn;
