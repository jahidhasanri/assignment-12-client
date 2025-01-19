import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Update from "../Pages/Update";
import DashBoard from "../Pages/DashBoard";
import AddItem from "../Pages/Seller/AddItem";
import AddCategorty from "../Pages/AddCategorty";
import CategoryDetails from "../Pages/CategoryDetails";
import Card from "../Pages/Card";
import Dashboard from "../Layoout/Dashboard";

export const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
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
          path:'/dashboard',
          element:<DashBoard></DashBoard>
        },
        {
          path:'/additem',
          element:<AddItem></AddItem>
        },
        {
          path:'/category',
          element:<AddCategorty></AddCategorty>
        },
        {
          path:'/categorydetails/:category',
          element:<CategoryDetails></CategoryDetails>
        }
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children:[
        {
          path:'cart',
          element:<Card></Card>
        }
      ]
    }
  ]);