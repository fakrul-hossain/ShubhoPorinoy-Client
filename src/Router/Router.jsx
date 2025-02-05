import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import MainLayout from "../layout/MainLayout/MainLayout";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import SignUp from "../Pages/SignUp/SignUp";
import LogIn from "../Pages/Login/Login";
import Biodatas from "../Pages/Biodatas";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import Dashboard from "../Pages/Dashboard";
import BoidataDetails from "../Pages/BoidataDetails/BoidataDetails";
import EditBiodata from "../layout/CustomerLayout/EditBiodata";
import ViewBiodata from "../layout/CustomerLayout/ViewBiodata";
import MyContactRequest from "../layout/CustomerLayout/MyContactRequest";
import FavouritesBiodata from "../layout/CustomerLayout/FavouritesBiodata";
import ManageUsers from "../layout/AdminLayout/ManageUsers";
import AdminDashboard from "../layout/AdminLayout/AdminDashboard";
import ApprovedPremium from "../layout/AdminLayout/ApprovedPremium";
import ApprovedContactRequests from "../layout/AdminLayout/ApprovedContactRequests";
import Checkout from "../Pages/Checkout/Checkout";
import Payment from "../Pages/PrivatePage/Payment/Payment";
// import EditBiodata from "../layout/AdminLayout/EditBiodata";

const myCreateRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/biodatas",
        element: <Biodatas></Biodatas> // Page to show all biodatas
      },
      {
        path: "/about-us",
        element: <AboutUs></AboutUs>, // About Us page
      },
      {
        path: "/checkout/:id",
        element: <Payment></Payment>, // Contact Us page
      },
      {
        path: "/biodataDetails/:id",
        element:<PrivateRoute>
        <BoidataDetails></BoidataDetails>
      </PrivateRoute>, // Contact Us page
      },
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/register",
        element: <SignUp></SignUp>,
      },
      
    ],
    
  },
  {
    path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        errorElement: <Error></Error>,
    children: [
      {
        path: 'editBiodata',
        element: <EditBiodata></EditBiodata>
      },
      {
        path: 'view-biodata',
        element: <ViewBiodata></ViewBiodata>
      },
      {
        path: 'my-contact-request',
        element: <MyContactRequest></MyContactRequest>
      },
      {
        path: 'favourites-biodata',
        element: <FavouritesBiodata></FavouritesBiodata>
      },
      {
        path: 'adminDashboard',
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'approved-premium',
        element: <ApprovedPremium></ApprovedPremium>
      },
      {
        path: 'approved-contact-requests',
        element: <ApprovedContactRequests></ApprovedContactRequests>
      }
    ]
  }
  // EditBiodata
]);

export default myCreateRoute;
