import { AuthPage } from '@/pages/auth/AuthPage';
import { Home } from '@/pages/home/Home';
import { PageNotFound } from '@/pages/pageNotFound';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <PageNotFound />,
    }, {
        path: 'login',
        element: <AuthPage />
    }, {
        path: 'dashboard',
        element: <div>a</div>,
        children: [
            {
                path: 'inventory',
                element: <div></div>
            }
        ]
    }
]);

export const AppRouter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}
