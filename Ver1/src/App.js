import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Building from './pages/Building';
import room1 from "./images/room1.svg";
import About from "./pages/About"

function App() {
  return (
      <>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path='' element={<Landing/>}/>
            <Route path='building1' element={<Building img={room1}/>}/>
            <Route path='About' element={<About/>}/>
         </Routes>
        </BrowserRouter>  
        <Footer />
      </>
  );
}

export default App;
