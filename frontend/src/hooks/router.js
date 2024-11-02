import { createBrowserRouter, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/index.tsx';
import DashboardPage from '../pages/dashboard/dashboard';
import ScorePage from '../pages/score/score';
import './router.css';
import React from 'react';
import Header from '../components/Header/index.tsx';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />
    },
    {
        path: "/dashboard",
        element: 
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar/>
          {/* <!-- ===== Sidebar End ===== --> */}
  
          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header />
            {/* <!-- ===== Header End ===== --> */}
  
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              <DashboardPage/>
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
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
