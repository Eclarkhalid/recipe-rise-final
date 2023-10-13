import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import GlobalApi from './pages/globalApi.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Profile from './pages/profile.jsx'

import { UserContextProvider } from './userContext.jsx'

import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Write from './pages/write.jsx'
import PostPage from './pages/postPage.jsx'
import EditPost from './pages/editPost.jsx'
import Banner from './pages/banner.jsx'
import Home from './pages/home/home.jsx'

const Layout = () => {
  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/globalApi",
        element: <GlobalApi />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/write",
        element: <Write />,
      },
      {
        path: "/home/:id",
        element: <PostPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPost />,
      },
      {
        path: "/banner",
        element: <Banner />,
      },{
        path: "/home",
        element: <Home />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className=" ">
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  </React.StrictMode>,
)
