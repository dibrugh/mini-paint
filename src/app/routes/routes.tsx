import { createBrowserRouter } from 'react-router-dom';
import { Editor, Error, Main, SignIn, SignUp } from '../../pages';
import { PrivateRoute } from '../../shared/router/PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <Main />
            </PrivateRoute>
        ),
        errorElement: <Error />,
    },
    {
        path: '/feed',
        element: (
            <PrivateRoute>
                <Main />
            </PrivateRoute>
        ),
        errorElement: <Error />,
    },
    {
        path: '/editor/*',
        element: (
            <PrivateRoute>
                <Editor />
            </PrivateRoute>
        ),
        errorElement: <Error />,
        children: [
            {
                path: ':imageId',
                element: <Editor />,
            },
        ],
    },
    {
        path: '/sign-in',
        element: (
            <PrivateRoute>
                <SignIn />
            </PrivateRoute>
        ),
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
]);
