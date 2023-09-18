import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Form from './components/Form/Form';
import List from './components/List/List';
import ErrorPage from './components/ErrorPage/ErrorPage';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/list" replace={true} />, errorElement: <ErrorPage /> },
  { path: '/list', element: <List />, errorElement: <ErrorPage /> },
  { path: '/form', element: <Form />, errorElement: <ErrorPage /> },
  { path: '/*', element: <ErrorPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;