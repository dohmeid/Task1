import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormPage from './pages/FormPage/FormPage';
import ListPage from './pages/ListPage/ListPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <ListPage />, errorElement: <ErrorPage /> },
  { path: '/list', element: <ListPage />, errorElement: <ErrorPage /> },
  { path: '/form', element: <FormPage />, errorElement: <ErrorPage /> },
  { path: '/*', element: <ErrorPage /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;