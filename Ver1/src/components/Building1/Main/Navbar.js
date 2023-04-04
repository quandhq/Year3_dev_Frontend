import React from "react";


const Navbar = () => {
   // let navigate = useNavigate()
   return(
         <div>
            <nav class="navbar navbar-expand-lg bg-light sticky-top"> 
               <div class="container-fluid">
                  <a class="navbar-brand" href="https://lienminh.garena.vn/">
                     <img src={process.env.PUBLIC_URL + '/image/black.png'} alt="NOT FOUND" class="rounded" width="60" height="48" />
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
                              {/* <li><Link class="dropdown-item" to="temperature">Temp</Link></li>
                              <li><Link class="dropdown-item" to="humidity">Hum</Link></li>
                              <li><Link class="dropdown-item" to="co2">Co2</Link></li>
                              <li><Link class="dropdown-item" to="dust">Dust</Link></li>
                              <li><Link class="dropdown-item" to="about">Something else here</Link></li>
                              <li><button class="btn btn-warning dropdown-item" onClick={()=> navigate("./") }>Go back one</button></li>
                              <li><button class="btn btn-warning dropdown-item" onClick={()=> navigate("../") }>Go back two</button></li> */}
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

            {/* <Outlet/> */}

            {/* <Routes>
              <Route path="/building1" element={<About/>}/>          
              <Route path="/building1/temperature" element={<MainTemperature/>}/>
              <Route path="/building1/humidity" element={<MainHumidity/>}/>
              <Route path="/building1/co2" element={<MainCo2/>}/>
              <Route path="/building1/dust" element={<MainDust/>}/>
              <Route path="/building1/about" element={<About/>}/>
            </Routes> */}
         </div>
   );
};

export default Navbar;