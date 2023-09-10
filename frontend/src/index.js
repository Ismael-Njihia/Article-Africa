import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

import EditArticlePage from './pages/EditArticlePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ArticlePage from './pages/ArticlePage';



const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />} />
    <Route path="/login" element={<Login />} />
    <Route path="/article/create" element={<EditArticlePage />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/article/:id" element={<ArticlePage />} />
    </>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
