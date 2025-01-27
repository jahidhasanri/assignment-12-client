import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Update from "../Pages/Update";
import Card from "../Pages/Card";
import Dashboard from "../Layoout/Dashboard";
import ManageUsers from "../Pages/Adim/ManageUsers";
import ManageCategory from "../Pages/Adim/ManageCategory";
import AdminRoute from "./AdminRoute";
import CategoryDetails from "../Pages/CategoryDetails";
import Payment from "../users/CheckOut";
import SellerRoute from "./SellerRoute";
import ManageMedicine from "../Pages/Seller/ManageMedicine";
import Profile from "../Pages/Profile";
import Error from "../Pages/Error";
import AskForAdvertisement from "../Pages/Seller/AskForAdvertisement";
import ManageBannerAdvertise from "../Pages/Adim/ManageBannerAdvertise";
import PaymentHistory from "../Pages/Seller/PaymentManagement";
import AdminHome from "../Pages/Adim/AdminHome";
import Invoice from "../Invoice";
import PaymentHistoryFUser from "../PaymentHistoryFUser";
import PaymentManagementFseller from "../Pages/Seller/PaymentManagementFseller";




export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/shop',
            element:<Shop></Shop>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
          path:'/update',
          element:<Update></Update>
        },
        {
          path:'/categorydetails/:category',
          element:<CategoryDetails></CategoryDetails>
        },
        {
          path:'/invoice',
          element:<Invoice></Invoice>
        },
        {
          path:'/dashboard/paymenthistoryfuser',
          element:<PaymentHistoryFUser></PaymentHistoryFUser>
        },
        
       
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'cart',
          element:<Card></Card>
        },
        {
          path:'/dashboard/checkout',
          element:<Payment></Payment>
        },
        {
          path:'profile',
          element:<Profile></Profile>
        },
       
        
        // admin routes
        {
          path:'manageusers',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'adminhome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path:"managecategory",
          element:<AdminRoute><ManageCategory></ManageCategory></AdminRoute>
        },
        {
          path:'mangaeBanner',
          element:<AdminRoute><ManageBannerAdvertise></ManageBannerAdvertise></AdminRoute>
        },

        {
          path:'paymenthistory',
          element:<AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
        },
        // seller routes
        {
          path:'manageMedicine',
          element:<SellerRoute><ManageMedicine></ManageMedicine></SellerRoute>
        },
        {
          path:'advertisement',
          element:<SellerRoute><AskForAdvertisement></AskForAdvertisement></SellerRoute>
        },
        {
          path:'paymentforseller',
          element:<SellerRoute><PaymentManagementFseller></PaymentManagementFseller></SellerRoute>
        },
        
      ]
    }
  ]);