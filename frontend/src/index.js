import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import EditArticlePage from './pages/EditArticlePage';


const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />} />
    <Route path='/articles/edit' element={<EditArticlePage />} />
    </>
   
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);


reportWebVitals();
