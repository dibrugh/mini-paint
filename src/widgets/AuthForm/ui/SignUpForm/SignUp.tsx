import { Box, Button, Container, CssBaseline, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { signUp } from '../../../../features';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { auth } from '../../../../shared/config/firebaseConfig';

import { setUser } from '../../../../features/Auth/model/userSlice';
import { useAppDispatch } from '../../../../app/store/redux-hooks';

const signUpSchema = yup.object().shape({
    userName: yup.string().required('Username is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

type Inputs = {
    userName: string;
    email: string;
    password: string;
};

const SignUp = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
        },
        resolver: yupResolver(signUpSchema),
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onSubmit: SubmitHandler<Inputs> = async ({ email, password, userName }) => {
        try {
            const newUser = await signUp(email, password);
            dispatch(
                setUser({
                    email: newUser.user.email,
                    displayName: newUser.user.displayName,
                })
            );
            auth.currentUser &&
                (await updateProfile(auth.currentUser, {
                    displayName: userName,
                }));
            navigate('/sign-in');
        } catch (error) {
            console.log(error);
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
            {/* style normalizing */}
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
                    Sign up
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
                        name="userName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="User Name"
                                autoComplete="username"
                                error={!!errors.userName?.message}
                                helperText={errors.userName?.message}
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
        </Container>
    );
};

export default SignUp;
