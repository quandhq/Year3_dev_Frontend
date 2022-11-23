import Navbar from "./Main/Navbar";
import Footer from "./Main/Footer"
import { BrowserRouter, Link, Routes, Route, Outlet } from "react-router-dom";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Main from "./Main/Main";

const BuildingMain = () => 
{
   return(
      // <BrowserRouter>         {/*can not load page if you do not wrap every thing in BrowerRouter*/}
         // <div>   
         // <section>
         //    <Navbar/>         
         // </section>
         // <section>
         //    <Footer/>
         // </section>
         // </div>
      // </BrowserRouter>

      <div>   
         <section>
            <Navbar/>         
         </section>
         <section>
            <Main/>
         </section>
         <section>
            <Footer/>
         </section>
      </div>

      // <div>
      //    <h1><Link to='/building/1'>to 1</Link></h1>
      //    <h1><Link to='/building/2'>to 2</Link></h1>
      //    <Outlet/>
      //    {/* <Route>
      //       <Route path='/building/1' element={<Test1/>}/>
      //       <Route path='/building/2' element={<Test2/>}/>
      //    </Route> */}
      // </div>
   );
}

export default BuildingMain;