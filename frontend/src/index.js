import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './assets/style.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store';

import EditArticlePage from './pages/EditArticlePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ArticlePage from './pages/ArticlePage';
import PrivateRoute from './components/PrivateRoute';
import Homepage from './pages/Homepage';
import AdminRoute from './components/AdminRoute';
import UsersListPage from './pages/UsersListPage';
import CategoryPage from './pages/CategoryPage';
import CreateArticlePage from './pages/CreateArticlePage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';



const routes = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path="/" element={<App />}>
      <Route index={true} path='/' element={<Homepage />} />
      <Route path="/article/:id" element={<ArticlePage />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
    <Route path='/' element={<PrivateRoute />}>
      <Route path="/article/create" element={<CreateArticlePage />} />
      <Route path="/article/edit/:id" element={<EditArticlePage />} />
      
    </Route>

      <Route path='/' element={<AdminRoute />}>
      <Route path='/admin/userslist' element={<UsersListPage />} />
    </Route>

    </Route>
    
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
