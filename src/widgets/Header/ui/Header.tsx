import { AccountCircle } from '@mui/icons-material';
import PaletteIcon from '@mui/icons-material/Palette';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';

import { signOut } from '../../../features';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export default function Header() {
    const navigate = useNavigate();

    const redirectToEditor = () => {
        navigate('/editor');
    };

    const redirectToFeed = () => {
        navigate('/feed');
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    <Box display="flex" alignItems="center" sx={{ marginRight: 'auto' }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={redirectToFeed}
                            color="inherit"
                        >
                            <HomeIcon />
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={redirectToEditor}
                            color="inherit"
                        >
                            <PaletteIcon />
                        </IconButton>
                    </Box>

                    <Box display="flex" alignItems="center">
                        <Typography variant="h5" component={'p'}>
                            {getAuth()?.currentUser?.displayName}
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Button
                        color="inherit"
                        onClick={async () => {
                            try {
                                signOut();
                                navigate('/sign-in');
                            } catch (error) {
                                if (error instanceof Error) {
                                    console.log((error as Error).message);
                                } else {
                                    console.log('An unknown error occurred');
                                }
                            }
                        }}
                    >
                        <LogoutIcon />
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
