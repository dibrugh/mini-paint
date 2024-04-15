import { createBrowserRouter } from 'react-router-dom';
import { Error, Main, SignIn, SignUp } from '../../pages';
import { Protected } from './Protected';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Protected>
                <Main />
            </Protected>
        ),
        errorElement: <Error />,
    },
    {
        path: '/feed',
        element: (
            <Protected>
                <Main />
            </Protected>
        ),
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
