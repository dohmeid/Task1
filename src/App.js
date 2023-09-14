import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import FormPage from './pages/FormPage/FormPage';
import ListPage from './pages/ListPage/ListPage';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <ListPage /> },
  { path: '/form', element: <FormPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;