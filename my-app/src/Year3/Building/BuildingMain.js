import Navbar from "./Main/Navbar";
import Footer from "./Main/Footer"
import { BrowserRouter } from "react-router-dom";
const BuildingMain = () => 
{
   return(
      <BrowserRouter>         {/*can not load page if you do not wrap every thing in BrowerRouter*/}
         <section>
            <Navbar/>         
         </section>
         <section>
            <Footer/>
         </section>
      </BrowserRouter>
   );
}

export default BuildingMain;