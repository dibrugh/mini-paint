import { AccountCircle } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { signOut } from '../../../features';
import { useNavigate } from 'react-router-dom';

const mockOptions = [
    { label: 'User1', value: 'User1' },
    { label: 'User2', value: 'User2' },
    { label: 'User3', value: 'User3' },
    { label: 'User4', value: 'User4' },
];

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const customStyles: StylesConfig = {
        container: (styles) => ({
            ...styles,
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '50px',
        }),
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '700px',
            minWidth: '300px',
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '700px',
            minWidth: '300px',
        }),
        option: (styles) => ({ ...styles }),
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ justifyContent: 'flex-end' }}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h5" component={'p'}>
                            UserName
                        </Typography>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
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
            <Select
                isMulti
                name="users"
                options={mockOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={customStyles}
            />
            ;
        </Box>
    );
}
