import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { SignUp } from "./pages/SignUp"
import { Profile } from "./pages/Profile"
import { About } from "./pages/About"
import { Header } from "./components/Header"
import SignIn from "./pages/SignIn"
import { PrivateRoute } from "./components/PrivateRoute"
import { CreateListing } from "./pages/CreateListing"
import { UpdateListing } from "./pages/UpdateListing"
import { Listing } from "./pages/Listing"
import { Search } from "./pages/Search"



function App() {


  return (
    <>
   <BrowserRouter >
 <Header/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/search" element={<Search/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/listing/:listingId" element={<Listing/>}/>
    <Route element={<PrivateRoute/>}>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/createlisting" element={<CreateListing/>}/>
    <Route path="/update-listing/:listingId" element={<UpdateListing/>}/>
    </Route>
    
    </Routes> 
   </BrowserRouter>
    </>
  )
}

export default App
