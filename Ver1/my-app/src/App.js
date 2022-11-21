import './App.css';
// import MainTemperature from './Year3/Main/MainTemperature';
// import Navbar from './Year3/Main/Navbar';
// import Footer from './Year3/Main/Footer';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import BuildingMain from './Year3/Building/BuildingMain';
import FarmMain from './Year3/Farm/FarmMain';


function App() {
  return (
    // <BrowserRouter>
    //       <section>
    //         <Navbar/>
    //       </section>


    //       {/* <section>
    //         <MainTemperature/>
    //       </section>             */}

    //       <section>
    //         <Footer/>
    //       </section>
    // </BrowserRouter>
    // <BrowserRouter>
    // <h1><Link to='/building'>to building</Link></h1>
    // <h1><Link to='/farm'>to farm</Link></h1>
    // <Routes>
    //   <Route path='/building' element={<BuildingMain/>} />
    //   <Route path='/farm' element={<FarmMain/>} />
    // </Routes>
    // </BrowserRouter>
    <div>
      <FarmMain/>
    </div>
  );
}

export default App;
