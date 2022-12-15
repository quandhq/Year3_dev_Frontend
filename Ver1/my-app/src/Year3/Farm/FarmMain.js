import Navbar from "./Main/Navbar";
import Footer from "./Main/Footer"
import Main from "./Main/Main";
import Test from "./Main/Test";
import BuildingMain from "../Building1/BuildingMain";
import Main1 from "../Building1/Main/Main1";
import Main2 from "../Building2/Main/Main2";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Test1 from "../Building1/Test1";
import Test2 from "../Building1/Test2";
import MainHumidity from "../Building1/Main/MainHumidity";
import MainTemperature from "../Building1/Main/MainTemperature";
import MainCo2 from "../Building1/Main/MainCo2";
import MainDust from "../Building1/Main/MainDust";
import About from "../Building1/Main/About";

const FarmMain = () => 
{
   return(
      <div>
         <Navbar/>

      <div>
         <div className='container px-2 py-2'>
          <div className='row'>
            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <Link to={'/building1'}><img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" /></Link>
                </div>
              </div> 
            </div>

            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <Link to={'/building2'}><img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" /></Link>
                </div>
              </div> 
            </div>

            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" />
                </div>
              </div> 
            </div>
          </div>
        </div>

        <div className='container px-2 py-2'>
          <div className='row'>
            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" />
                </div>
              </div> 
            </div>

            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" />
                </div>
              </div> 
            </div>

            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" />
                </div>
              </div> 
            </div>
          </div>
        </div>

      </div>


                      
         {/* <h1><Link to={'/farm'}>To test</Link></h1>
         <h1><Link to={'/building'}>To building</Link></h1> */}
         {/* <Routes>
            <Route path='building2' element={<Main2/>}/>
            <Route path='building1' element={<Main1/>}/>
            <Route path='building1' element={<Main1/>}>
              <Route path="" element={<About/>}/>          
              <Route path="temperature" element={<MainTemperature/>}/>
              <Route path="humidity" element={<MainHumidity/>}/>
              <Route path="co2" element={<MainCo2/>}/>
              <Route path="dust" element={<MainDust/>}/>
              <Route path="about" element={<About/>}/>
            </Route>
         </Routes> */}
         <section>
            <Footer/>
         </section>
      </div>
   );
}

export default FarmMain;