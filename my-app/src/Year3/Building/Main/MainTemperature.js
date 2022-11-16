import useFetch from "./useFetch";
import useFetch1 from "./useFetch1";
import useFetchTest from "./useFetchTest";
import TemperatureChart from "../Temperature/TemperatureLineChart";
import HumidityChart from "../Humidity/HumidityLineChart";
import { useState } from "react";
import TemperatureBarChart from "../Temperature/TemperatureBarChart";

const MainTemperature = () => 
{
  const [id, setId] = useState(1);
  console.log(id)
  let url = `http://127.0.0.1:8000/api/get/${id}`;
  //Mỗi lần fetch lại data mới thì cái sensros sẽ bị thay đổi state nên là sẽ re-render lại cái SensorsList chứa cái state này nhưng cái  
  const {temperature,humidity,co2,dust,time} = useFetch1(url);    //cái này là object destructor
  const clickHandler = () => {alert("Not that fun but kind of")}; 

  return (
      <div>
         <div className='container px-2 py-2'>
          <div className='row'>
            <div className='col-5'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <TemperatureChart data={temperature} time={time} id={id} fluid/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                  <div className="room">
                    <img src={process.env.PUBLIC_URL + 'image/room.png'} alt="NOT FOUND ROOM" />
                    <button value={1} className="btn-room btn-room-1" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>1</button>
                    <button value={2} className="btn-room btn-room-2" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>2</button>
                    <button value={3} className="btn-room btn-room-3" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>3</button>
                    <button value={4} className="btn-room btn-room-4" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>4</button>
                    <button value={5} className="btn-room btn-room-5" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>5</button>
                  </div>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <span>
                  <button type="button" className="btn btn-primary" onClick={clickHandler}>
                    Click here for st fun!
                  </button>
                </span>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <img src={process.env.PUBLIC_URL + 'image/cat-its-mouth-open.jpg'} alt="NOT FOUND"/> 
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                 consequuntur sequi quasi! Odio, nostrum nisi.</p>
              </div> 
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
            </div>

            <div className='col-7'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <TemperatureChart data={temperature} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <TemperatureBarChart data={temperature} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <TemperatureBarChart data={temperature} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><p>Lorem ipsum dolor sit amet consectetur 
                adipisicing elit. Nostrum repudiandae, qui voluptatum ut provident, 
                fugit voluptate totam at dolore harum, veniam natus obcaecati commodi
                consequuntur sequi quasi! Odio, nostrum nisi.</p>
              </div>
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
              
            </div>
          </div>
        </div>
      </div>
   );
};

export default MainTemperature;
