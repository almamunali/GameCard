import {Routes}  from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import Dashbord from "../components/Dashbord";
import CheckOut from "../components/CheckOut"


const AppRoute = () => {





  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Dashbord/>}></Route>
    <Route path="/Checkout" element={<CheckOut/>}></Route>
   </Routes>
   </BrowserRouter>
   
   
   </>
  )
}

export default AppRoute;
