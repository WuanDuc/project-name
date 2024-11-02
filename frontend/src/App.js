import logo from './logo.svg';
import './App.css';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import router from './hooks/router';

function App() {

  return (
    <div>
      <RouterProvider router={router}>
      </RouterProvider>
    </div>
    
  );
}

export default App;
