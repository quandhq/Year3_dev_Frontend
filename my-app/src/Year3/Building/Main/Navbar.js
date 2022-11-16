import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import MainHumidity from "./MainHumidity";
import MainTemperature from "./MainTemperature";
import MainCo2 from "./MainCo2";
import MainDust from "./MainDust";
import About from "./About";

const Navbar = () => {
   return(
         <div>
            <nav class="navbar navbar-expand-lg bg-light sticky-top"> 
               <div class="container-fluid">
                  <a class="navbar-brand" href="https://lienminh.garena.vn/">
                     <img src={process.env.PUBLIC_URL + '/image/yasuo_55.jpg'} alt="NOT FOUND" class="rounded" width="60" height="48" />
                  </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNavDropdown">
                     <ul class="navbar-nav">
                        {/* <li class="nav-item">
                           <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="#">Pricing</a>
                        </li> */}
                        <li class="nav-item dropdown">
                           <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Down for more
                           </a>
                           <ul class="dropdown-menu">
                              <li><Link class="dropdown-item" to="/temperature">Temp</Link></li>
                              <li><Link class="dropdown-item" to="/humidity">Hum</Link></li>
                              <li><Link class="dropdown-item" to="/co2">Co2</Link></li>
                              <li><Link class="dropdown-item" to="/dust">Dust</Link></li>
                              <li><Link class="dropdown-item" to="/about">Something else here</Link></li>
                           </ul>
                        </li>
                     </ul>
                     <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                     </form>
                  </div>
               </div>
            </nav> 

            <Routes>
              <Route path="/temperature" element={<MainTemperature/>}/>
              <Route path="/humidity" element={<MainHumidity/>}/>
              <Route path="/co2" element={<MainCo2/>}/>
              <Route path="/dust" element={<MainDust/>}/>
              <Route path="/about" element={<About/>}/>
            </Routes>
         </div>
   );
};

export default Navbar;