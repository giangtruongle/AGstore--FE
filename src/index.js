import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.scss';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Welcome from './components/Welcome/welcome';
import Users from './pages/Users';
import ProductCategory from './pages/ProductCategory';
import Product from './pages/Products';
import HomeClient from './pages/HomeClient';
import ShoppingCarts from './pages/ShoppingCarts';
import ShopDetail from './components/ShopDetail.js';
import CheckOutPage from './pages/CheckOut';
import AdminRoute from './routes/AdminRoute';
import ViewCategory from './components/Collections/ViewCategory.js';
import CollectionRoute from './routes/CollectionRoute/index.js';
import ViewProducts from './components/Collections/ViewProducts.js';


const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoute component={<Welcome />} />,
  },
  {
    path: "/collections",
    element: <CollectionRoute component={<ViewCategory />} />,
  },
  {
    path: "/collections/:category_slug",
    element: <CollectionRoute component={<ViewProducts />} />,
  },
  {
    path: "/admin/users",
    element: <AdminRoute component={<Users />} />,
  },
  {
    path: "/admin/product-category",
    element: <AdminRoute component={<ProductCategory />} />,
  },
  {
    path: "/admin/product",
    element: <AdminRoute component={<Product />} />,
  },
  {
    path: "/home",
    element: <PrivateRoute component={< HomeClient />} />,
  },
  {
    path: "/shopping-cart",
    element: <PrivateRoute component={<ShoppingCarts />} />
  },
  {
    path: "/check-out",
    element: <PrivateRoute component={<CheckOutPage />} />
  },

  {
    path: "/detail/product/:arrivalId",
    element: <PrivateRoute component={<ShopDetail />} />,
  },


]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
