import { createBrowserRouter } from 'react-router-dom';
import { Error, SignIn, SignUp } from '../../pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Base Page</div>,
        errorElement: <Error />,
    },
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
]);
