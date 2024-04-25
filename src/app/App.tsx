import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';
import { useUser } from '../shared/model/useUser';
import { LinearProgress } from '@mui/material';

function App() {
    const { isLoading } = useUser();
    return isLoading ? <LinearProgress /> : <RouterProvider router={router} />;
}

export default App;
