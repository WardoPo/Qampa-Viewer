import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LoginPage from './pages/login.tsx';
import GalleryPage from './pages/gallery.tsx';
import AlbumPage from './pages/album.tsx';

import './index.css'
import './assets/styles/qampa.css'

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>
  },
  {
    path: "/gallery",
    element: <GalleryPage/>
  },
  {
    path: "/album/:id",
    element: <AlbumPage/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={Router}></RouterProvider>
  </React.StrictMode>
);