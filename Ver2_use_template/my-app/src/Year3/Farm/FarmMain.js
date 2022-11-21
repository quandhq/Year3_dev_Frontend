import Navbar from "./Main/Navbar";
import Footer from "./Main/Footer"
import Main from "./Main/Main";
import Test from "./Main/Test";
import BuildingMain from "../Building/BuildingMain";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Test1 from "../Building/Test1";
import Test2 from "../Building/Test2";
import MainHumidity from "../Building/Main/MainHumidity";
import MainTemperature from "../Building/Main/MainTemperature";
import MainCo2 from "../Building/Main/MainCo2";
import MainDust from "../Building/Main/MainDust";
import About from "../Building/Main/About";

const FarmMain = () => 
{
   return(
      // <BrowserRouter>
      //    {/* <h1><Link to={'/farm'}>To test</Link></h1>
      //    <h1><Link to={'/building'}>To building</Link></h1> */}
      //    <Routes>
      //       <Route path='farm' element={<Test/>}/>
      //       <Route path='building1' element={<BuildingMain/>}>
      //         <Route path="" element={<About/>}/>          
      //         <Route path="temperature" element={<MainTemperature/>}/>
      //         <Route path="humidity" element={<MainHumidity/>}/>
      //         <Route path="co2" element={<MainCo2/>}/>
      //         <Route path="dust" element={<MainDust/>}/>
      //         <Route path="about" element={<About/>}/>
      //       </Route>
      //    </Routes>
      //    <section>
      //       <Footer/>
      //    </section>
      // </BrowserRouter>

      <div>
         <Main/>
      </div>
   );
}

export default FarmMain;