import Navbar from "./Main/Navbar";
import Footer from "./Main/Footer"
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

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
                  <Link to={'/building1'}><img src={process.env.PUBLIC_URL + '/image/room1.svg'} alt="NOT FOUND ROOM" /></Link>
                </div>
              </div> 
            </div>

            <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <Link to={'/building2'}><img src={process.env.PUBLIC_URL + '/image/room2.svg'} alt="NOT FOUND ROOM" /></Link>
                </div>
              </div> 
            </div>

            {/* <div className='col-4'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" />
                </div>
              </div> 
            </div> */}
          </div>
        </div>

        {/* <div className='container px-2 py-2'>
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
        </div> */}

      </div >


        
         <section>
            <Footer/>
         </section>
      </div>
   );
}

export default FarmMain;