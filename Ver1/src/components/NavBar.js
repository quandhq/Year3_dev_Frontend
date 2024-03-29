import { Link } from "react-router-dom";
import logo from "../images/logo-dai-hoc-bach-khoa.png";
/* To-do: can not use Link for item in navbar */

const NavBar = () => {
   return(
      <nav className="navbar navbar-expand-lg bg-light sticky-top"> 
         <div className="container-fluid">
            <a className="navbar-brand" href="#">
               <img src={logo} alt="NOT FOUND" className="rounded" width="60" height="48" />
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
               <ul className="navbar-nav">
                  <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/About">About</a>
                  {/* <Link to={"/About"}>About</Link> */ }
                  </li>
                  <li className="nav-item dropdown">
                     <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More
                     </a>   
                  </li>
               </ul>
               {/* <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success" type="submit">Search</button>
               </form> */}
            </div>

         </div>
      </nav> 
   );
};

export default NavBar;