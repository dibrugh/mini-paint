import { Box, CssBaseline } from '@mui/material';
import { Paint, Header } from '../../../widgets';
import { useParams } from 'react-router-dom';

const Editor = () => {
    const { imageId } = useParams();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <Paint imageId={imageId} />
            <CssBaseline />
        </Box>
    );
};

export default Editor;
