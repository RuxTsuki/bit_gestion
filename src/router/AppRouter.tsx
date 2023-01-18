import { AuthPage } from '@/pages/auth/AuthPage';
import { Home } from '@/pages/home/Home';
import { Dashboard, Inventory } from '@/pages/dashboard';
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
        element: <Dashboard />,
        children: [
            {
                path: 'inventory',
                element: <Inventory />
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
