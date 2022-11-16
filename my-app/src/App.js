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
    <div>
      <BuildingMain/>
    </div>
  );
}

export default App;
