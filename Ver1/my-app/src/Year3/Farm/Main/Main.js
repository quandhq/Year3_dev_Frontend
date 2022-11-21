import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import BuildingMain from '../../Building/BuildingMain'

import MainHumidity from "../../Building/Main/MainHumidity";
import MainTemperature from "../../Building/Main/MainTemperature";
import MainCo2 from "../../Building/Main/MainCo2";
import MainDust from "../../Building/Main/MainDust";
import About from "../../Building/Main/About";
import Footer from "./Footer";
import Test from "./Test";
import { useState } from "react";

const Main = () =>
{
  let a = 10;
  // const []
   return (
    <>
    <BrowserRouter>

      
    <div>
      <div>
        {(a<3) ? <>
         <div className='container px-2 py-2'>
          <div className='row'>
            <div className='col-6'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                    <img src={process.env.PUBLIC_URL + 'image/room.png'} alt="NOT FOUND ROOM" />
                </div>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <span>
                  <button type="button" class="btn btn-warning" onClick={()=>{alert("This is main from farm main")}}>
                    <Link to='building1'>Go to building1</Link>
                  </button>
                </span>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                 consequuntur sequi quasi! Odio, nostrum nisi.</p>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                 consequuntur sequi quasi! Odio, nostrum nisi.</p>
              </div> 
              
            </div>

            <div className='col-6'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                consequuntur sequi quasi! Odio, nostrum nisi.</p>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                consequuntur sequi quasi! Odio, nostrum nisi.</p>
              </div>
            </div>
          </div>
        </div></> : <></> 
        }</div>

      
         {/* <h1><Link to={'/farm'}>To test</Link></h1>
         <h1><Link to={'/building'}>To building</Link></h1> */}
         <Routes>
            <Route path='farm' element={<Test/>}/>
            <Route path='building1' element={<BuildingMain/>}>
              <Route path="" element={<About/>}/>          
              <Route path="temperature" element={<MainTemperature/>}/>
              <Route path="humidity" element={<MainHumidity/>}/>
              <Route path="co2" element={<MainCo2/>}/>
              <Route path="dust" element={<MainDust/>}/>
              <Route path="about" element={<About/>}/>
            </Route>
         </Routes>
         <section>
            <Footer/>
         </section>
      
    </div>
    </BrowserRouter>
   </> 
   );
}

export default Main;