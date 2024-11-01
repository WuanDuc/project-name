import { createBrowserRouter, Navigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import DashboardPage from '../pages/dashboard/dashboard';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
    {
        path: "/dashboard",
        element: 
        <div>
        <Sidebar/>
            <DashboardPage/>
        </div>

    },
]);

export default router;
