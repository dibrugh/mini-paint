import { Box, CssBaseline } from '@mui/material';
import { Paint, Header } from '../../../widgets';

const Editor = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <Paint />
            <CssBaseline />
        </Box>
    );
};

export default Editor;
