import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Form from './pages/FormPage/Form';
import List from './pages/ListPage/List';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <List /> },
  { path: '/form', element: <Form /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;