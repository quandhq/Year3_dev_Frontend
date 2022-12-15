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
import BuildingMain from './Year3/Building1/BuildingMain';
import FarmMain from './Year3/Farm/FarmMain';
import BarChart from './Year3/Building1/Main/BarChart';
import Main1 from './Year3/Building1/Main/Main1';
import Main2 from './Year3/Building2/Main/Main2';

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route path='' element={<FarmMain/>}/>
            <Route path='building2' element={<Main2/>}/>
            <Route path='building1' element={<Main1/>}/>
            {/* <Route path='building1' element={<Main1/>}>
              <Route path="" element={<About/>}/>          
              <Route path="temperature" element={<MainTemperature/>}/>
              <Route path="humidity" element={<MainHumidity/>}/>
              <Route path="co2" element={<MainCo2/>}/>
              <Route path="dust" element={<MainDust/>}/>
              <Route path="about" element={<About/>}/>
            </Route> */}
         </Routes>
      </BrowserRouter>
  );
}

export default App;
