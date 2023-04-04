import useFetch from "./useFetch";
import useFetch1 from "./useFetch1";
import useFetchTest from "./useFetchTest";
import TemperatureChart from "../Temperature/TemperatureLineChart";
import TemperatureBarChart from "../Temperature/TemperatureBarChart";
import HumidityLineChart from "../Humidity/HumidityLineChart";
import HumidityBarChart from "../Humidity/HumidityBarChart";
import Co2BarChart from "../Co2/Co2BarChart";
import DustBarChart from "../Dust/DustBarChart";
import LightBarChart from "../Light/LightBarChart";
import SoundBarChart from "../Sound/SoundBarChart";
import TemperatureMap from "../../Building2/Temperature/TemperatureMap";
import useFetch2 from "./useFetch2";
import { useState } from "react";
import BarChart from "./BarChart";
import Navbar from "./Navbar"
import Footer from "../../Building2/Main/Footer";


const postLevel = 
      async (url) => {
      const response = await fetch(url,{
      'method':'GET',
      headers: {
        'Content-Type':'application/json',
         }
      });
      console.log("This is response")
      console.log(response)
      const new_data = await response.json()   
      let result = new_data.result
      let level = new_data.level
      return [1111,22222,3333];
      }

const Main2 = () => 
{
  const [id, setId] = useState(1);
  const [level, setLevel] = useState(1);
  console.log(id);
  let url = `http://127.0.0.1:8000/api/get/${id}`
  let url_1 = `http://127.0.0.1:8000/api/set/${level}`
  //Mỗi lần fetch lại data mới thì cái sensor sẽ bị thay đổi state nên là sẽ re-render lại cái SensorsList chứa cái state này nhưng cái  
  const {temperature,humidity,co2,dust,sound,light,time} = useFetch1(url);    //cái này là object destructor
  const clickHandler = () => {alert("Not that fun but kind of")};
  const options = [1,2,3,4,5];

  const OnChangeSetlevel = (e) => {
    setLevel(e.target.value);
    console.log(`The value is ${e.target.value}`)
  };

  // let {post_result, post_level} = useFetch2(url_1);

  return (
      <div>
        <Navbar/>
         <div className='container px-2 py-2'>
          <div className='row'>
            <div className='col-5'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <h1>This is node {id}</h1>
                <h2>Available measuremet</h2>
                <h2>... chỗ này là để hiển thị các thông số có thể đo của node này ...</h2>
                <ul>
                  <li>1: ...</li>
                  <li>2: ...</li>
                  <li>3: ...</li>
                  <li>4: ...</li>
                </ul>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <div className="room">
                  <img src={process.env.PUBLIC_URL + '/image/room.png'} alt="NOT FOUND ROOM" />
                  <button value={1} className="btn-room btn-room-1" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>1</button>
                  <button value={2} className="btn-room btn-room-2" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>2</button>
                  <button value={3} className="btn-room btn-room-3" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>3</button>
                  <button value={4} className="btn-room btn-room-4" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>4</button>
                  <button value={5} className="btn-room btn-room-5" onClick={(event_object) => {setId(event_object.target.value);alert(`${event_object.target.value}`)}}>5</button>
                </div>
              </div>

              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                  <select class="form-select" aria-label="Default select example" name="level" onChange={OnChangeSetlevel}>
                    <option>Choose level</option>
                      {options.map((option)=>{
                        return (
                            <option value={option}>
                              {option}
                            </option>
                        );
                      })}
                  </select>
                  <br/>
                  {/* <button class="btn btn-primary" type="submit" onClick={clickHandlerSet}>Set level</button> */}
                
              </div>

              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <h1>Heat map here</h1>
                <h2>... hiển thị heatmap chỗ này ...</h2>
                <TemperatureMap/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
                <span>
                  <button type="button" class="btn btn-warning" onClick={clickHandler}>
                    Click to set parameter!
                  </button>
                </span>
              </div> 
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
              {/* <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'><MainTest/></div> */}
            </div>

            <div className='col-7'>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Temperature</h2>
                <BarChart/>
              </div>


              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Temperature</h2>
                <TemperatureBarChart data={temperature} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Humidity</h2>
                <HumidityBarChart data={humidity} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Co2</h2>
                <Co2BarChart data={co2} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Dust</h2>
                <DustBarChart data={dust} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Sound</h2>
                <SoundBarChart data={sound} time={time} id={id}/>
              </div>
              <div className='row mx-1 my-1 rounded text-center border bg-light sub-content'>
               <h2>Light</h2>
                <LightBarChart data={light} time={time} id={id}/>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
   );
};

export default Main2;
