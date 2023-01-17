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
        children: [
            {
                path: 'login',
                element: <div></div>
            }, {
                path: 'dashboard',
                element: <div></div>,
                children: [
                    {
                        path: 'inventory',
                        element: <div></div>
                    }
                ]
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
