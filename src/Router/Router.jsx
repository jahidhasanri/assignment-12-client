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
import SalesReport from "../Pages/Adim/SalesReport";
import PrivateRoute from "./PrivateRoute";




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
            element:<PrivateRoute><Shop></Shop></PrivateRoute>
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
          element:<PrivateRoute><CategoryDetails></CategoryDetails></PrivateRoute>
        },
        {
          path:'/invoice',
          element:<PrivateRoute><Invoice></Invoice></PrivateRoute>
        },
      
        
       
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'cart',
          element:<PrivateRoute><Card></Card></PrivateRoute>
        },
        {
          path:'/dashboard/paymenthistoryfuser',
          element:<PrivateRoute><PaymentHistoryFUser></PaymentHistoryFUser></PrivateRoute>
        },
        {
          path:'/dashboard/checkout',
          element:<PrivateRoute><Payment></Payment></PrivateRoute>
        },
        {
          path:'profile',
          element:<Profile></Profile>
        },
       
        
        // admin routes
        {
          path:'manageusers',
          element:<PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
        },
        {
          path:'adminhome',
          element:<PrivateRoute><AdminRoute><AdminHome></AdminHome></AdminRoute></PrivateRoute>
        },
        {
          path:"managecategory",
          element:<PrivateRoute><AdminRoute><ManageCategory></ManageCategory></AdminRoute></PrivateRoute>
        },
        {
          path:'mangaeBanner',
          element:<PrivateRoute><AdminRoute><ManageBannerAdvertise></ManageBannerAdvertise></AdminRoute></PrivateRoute>
        },

        {
          path:'paymenthistory',
          element:<PrivateRoute><AdminRoute><PaymentHistory></PaymentHistory></AdminRoute></PrivateRoute>
        },
        {
          path:'salesReport',
          element:<PrivateRoute><AdminRoute><SalesReport></SalesReport></AdminRoute></PrivateRoute>
        },
        // seller routes
        {
          path:'manageMedicine',
          element:<PrivateRoute><SellerRoute><ManageMedicine></ManageMedicine></SellerRoute></PrivateRoute>
        },
        {
          path:'advertisement',
          element:<PrivateRoute><SellerRoute><AskForAdvertisement></AskForAdvertisement></SellerRoute></PrivateRoute>
        },
        {
          path:'paymentforseller',
          element:<PrivateRoute><SellerRoute><PaymentManagementFseller></PaymentManagementFseller></SellerRoute></PrivateRoute>
        },
        
      ]
    }
  ]);