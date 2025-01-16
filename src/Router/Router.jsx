import { createBrowserRouter } from "react-router-dom";
import Main from "../Pages/Main";
import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Update from "../Pages/Update";
import DashBoard from "../Pages/DashBoard";
import AddItem from "../Pages/Seller/AddItem";

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
        }
      ]
    },
  ]);