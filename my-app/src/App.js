import './App.css';
import MainTemperature from './Year3/Main/MainTemperature';
import Navbar from './Year3/Main/Navbar';
import Footer from './Year3/Main/Footer';



function App() {
  return (
    <div>
        <section>
          <Navbar/>
        </section>

        <section>
          <MainTemperature/>
        </section>

        <section>
          <Footer/>
        </section>
    </div>
  );
}

export default App;
