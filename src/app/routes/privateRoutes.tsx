import { Editor, Main, SignIn } from '../../pages';

export const privateRoutes = [
    {
        path: '/',
        element: <Main />,
    },
    {
        path: '/feed',
        element: <Main />,
    },
    {
        path: '/sign-in',
        element: <SignIn />,
    },
    {
        path: '/editor/*',
        element: <Editor />,
        children: [
            {
                path: ':imageId',
                element: <Editor />,
            },
        ],
    },
];
