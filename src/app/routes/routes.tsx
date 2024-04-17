import { createBrowserRouter } from 'react-router-dom';
import { Editor, Error, Main, SignIn, SignUp } from '../../pages';
import { VerifyAuthorization } from './VerifyAuthorization';

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <VerifyAuthorization>
                <Main />
            </VerifyAuthorization>
        ),
        errorElement: <Error />,
    },
    {
        path: '/feed',
        element: (
            <VerifyAuthorization>
                <Main />
            </VerifyAuthorization>
        ),
        errorElement: <Error />,
    },
    {
        path: '/editor',
        element: (
            <VerifyAuthorization>
                <Editor />
            </VerifyAuthorization>
        ),
        errorElement: <Error />,
    },
    {
        path: '/sign-in',
        element: (
            <VerifyAuthorization>
                <SignIn />
            </VerifyAuthorization>
        ),
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
]);
