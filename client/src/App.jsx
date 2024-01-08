import { createBrowserRouter, RouterProvider} from "react-router-dom"
import { Home } from "./pages/Home"
import { SignUp } from "./pages/SignUp"
import { Profile } from "./pages/Profile"
import { About } from "./pages/About"
import {SignIn} from "./pages/SignIn"
import { PrivateRoute } from "./components/PrivateRoute"
import { CreateListing } from "./pages/CreateListing"
import { UpdateListing } from "./pages/UpdateListing"
import { Listing } from "./pages/Listing"
import { Search } from "./pages/Search"
import { Layout } from "../Layout"



const router=createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/about',
        element:<About/>
      },
      { 
        //path:'/signin',
        element:<PrivateRoute/>,
       },
      {
        path:'/signin',
        element:<SignIn/>
      },
      {
        path:'/search',
        element:<Search/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      },
      {
        path:'/listing/:listingId',
        element:<Listing/>
      },
    
       {
        path:'/profile',
        element:<Profile/>
       },
       {
        path:'/createlisting',
        element:<CreateListing/>
       },
       {
        path:'/update-listing/:listingId',
        element:<UpdateListing/>
       },
    ]
  }
])


function App() {


  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
