'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    Typography,
    CssBaseline,
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    Link,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    Card as MuiCard,
    Divider,
    SelectChangeEvent 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AppTheme from '../../shared-theme/AppTheme';
import ColorModeSelect from '../../shared-theme/ColorModeSelect';
import { SitemarkIcon, GoogleIcon, FacebookIcon } from '../../components/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
        backgroundImage:
            'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/auth/me')
        .then(res => {
            const user = res.data;
            if (user?.role === 'admin') router.push('/admin');
            else if (user?.role === 'user') router.push('/dashboard');
        })
        .catch(() => {});
    }, [router]);

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        age: '',
        birthday: '',
        phoneNumber: '',
        role: 'user',
        createdAt: '',
    });

    // Separate handler for input fields
    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'birthday') {
            const birthDate = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            setForm(prev => ({
                ...prev,
                birthday: value,
                age: age.toString(),
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/auth/register', {
      ...form,
      createdAt: new Date().toISOString()
    })
    .then(() => {
      alert('Registration successful');
      router.push('/auth/login');
    })
    .catch((error) => {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      alert(errorMsg);
    });
  };

  return (
    <AppTheme>
        <CssBaseline enableColorScheme />
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <SignUpContainer direction="column" justifyContent="center">
            <Card variant="outlined">
            <Typography component="h1" variant="h4" sx={{ textAlign: 'center' }}>
                Sign up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                        <TextField
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={handleTextFieldChange}
                            placeholder="Your name"
                            required
                            fullWidth
                        />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleTextFieldChange}
                        placeholder="your@email.com"
                        required
                        fullWidth
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleTextFieldChange}
                        placeholder="••••••"
                        required
                        fullWidth
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                    <TextField
                        id="phoneNumber"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleTextFieldChange}
                        placeholder="e.g. +1234567890"
                        fullWidth
                    />
                </FormControl>
                    <Stack direction="row" spacing={2}>
                        <FormControl fullWidth>
                            <FormLabel htmlFor="birthday">Birthday</FormLabel>
                            <TextField
                                id="birthday"
                                name="birthday"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                onChange={handleTextFieldChange}
                                fullWidth
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <FormLabel htmlFor="role">Role</FormLabel>
                            <Select
                                id="role"
                                name="role"
                                value={form.role}
                                onChange={handleSelectChange}
                                fullWidth
                            >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    {/* <FormControlLabel
                    control={<Checkbox defaultChecked color="primary" />}
                    label="Receive updates via email"
                    /> */}
                    <Button type="submit" fullWidth variant="contained">
                    Register
                    </Button>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
                    Sign up with Google
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<FacebookIcon />}>
                    Sign up with Facebook
                    </Button>
                    <Typography sx={{ textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link href="/auth/login" variant="body2">Sign in</Link>
                    </Typography>
                </Box>
            </Card>
        </SignUpContainer>
    </AppTheme>
  );
}
