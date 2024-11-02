import { createBrowserRouter, Navigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import DashboardPage from '../pages/dashboard/dashboard';
import ScorePage from '../pages/score/score';
import './router.css';
import React from 'react';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: "/dashboard",
        element: 
        <div className='app'>
        <Sidebar/>
        <div className='main-content'>
            <DashboardPage/>
            </div>
        </div>

    },
    {
        path: '/score',
        element: (
          <div className="app">
            <Sidebar />
            <div className="main-content">
              <ScorePage />
            </div>
          </div>
        ),
    },
]);

export default router;
