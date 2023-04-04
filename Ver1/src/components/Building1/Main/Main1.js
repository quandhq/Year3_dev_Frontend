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
import useFetch2 from "./useFetch2";
import React, { useState } from "react";
import BarChart from "./BarChart";
import Navbar from "./Navbar";
import Footer from "../../Building1/Main/Footer";
import TemperatureMap from "../Temperature/TemperatureMap";
import useFetch3 from "./useFetch3";

/*
 * brief: TESTING function for sending set point to sensor - NOT USING
 */
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

const Main1 = () => 
{
  const [id, setId] = useState(1);
  const [level, setLevel] = useState(1);
  console.log(id);
  let url = `http://127.0.0.1:8000/api/get/${id}`
  let url_1 = `http://127.0.0.1:8000/api/set/${level}`
  let url_2 = 'http://127.0.0.1:8000/api/get/kriging'
  //Mỗi lần fetch lại data mới thì cái sensor sẽ bị thay đổi state nên là sẽ re-render lại cái SensorsList chứa cái state này nhưng cái  
  const {temperature,humidity,co2,dust,sound,light,time} = useFetch1(url);    //cái này là object destructor, fetch data for chart 
  const {data, resolutionX, resolutionY} = useFetch3(url_2);
  /*
   * brief: fucntion for calling to API being in charge of sending set point to sensor  
   */
  const clickHandler = () => 
  {
    alert("TEST SETUP");
  };

  const options = [1,2,3,4,5];

  const OnChangeSetlevel = (e) => {
    setLevel(e.target.value);
    console.log(`The value is ${e.target.value}`);
  };

  // let {post_result, post_level} = useFetch2(url_1);

  return (
    <React.Fragment>
      <Navbar />

      <div>
        <div class="row">
          <div class="col-4">
            
            <div class="row">
              <div className="room">
                <img
                  src={process.env.PUBLIC_URL + "/image/room_1.png"}
                  alt="NOT FOUND ROOM"
                />
                <button
                  value={1}
                  className="btn-room btn-room-1"
                  onClick={(event_object) => {
                    setId(event_object.target.value);
                    alert(`${event_object.target.value}`);
                  }}
                >
                  1
                </button>
                <button
                  value={2}
                  className="btn-room btn-room-2"
                  onClick={(event_object) => {
                    setId(event_object.target.value);
                    alert(`${event_object.target.value}`);
                  }}
                >
                  2
                </button>
                <button
                  value={3}
                  className="btn-room btn-room-3"
                  onClick={(event_object) => {
                    setId(event_object.target.value);
                    alert(`${event_object.target.value}`);
                  }}
                >
                  3
                </button>
                <button
                  value={4}
                  className="btn-room btn-room-4"
                  onClick={(event_object) => {
                    setId(event_object.target.value);
                    alert(`${event_object.target.value}`);
                  }}
                >
                  4
                </button>
                <button
                  value={5}
                  className="btn-room btn-room-5"
                  onClick={(event_object) => {
                    setId(event_object.target.value);
                    alert(`${event_object.target.value}`);
                  }}
                >
                  5
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div className="row mx-1 my-1 rounded text-center border bg-light sub-content">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    name="level"
                    onChange={OnChangeSetlevel}
                  >
                    <option>Choose level</option>
                    {options.map((option) => {
                      return <option value={option}>{option}</option>;
                    })}
                  </select>
                  <br />
                  {/* <button class="btn btn-primary" type="submit" onClick={clickHandlerSet}>Set level</button> */}
                </div>
                <div className="row mx-1 my-1 rounded text-center border bg-light sub-content">
                  <span>
                    <button
                      type="button"
                      class="btn btn-warning"
                      onClick={clickHandler}
                    >
                      Click to set parameter!
                    </button>
                  </span>
                </div>
              </div>
              <div class="col">AQI</div>
            </div>
          </div>

          <div class="col">
            <div class="row">
              <div class="col">
                <div className="mx-1 my-1 rounded text-center border bg-light sub-content">
                  <h2>Temperature and humidity</h2>
                  <TemperatureBarChart data={temperature} time={time} id={id} />
                </div>
              </div>
              <div class="col">
                <div className="row mx-1 my-1 rounded text-center border bg-light sub-content">
                  <h2>Co2</h2>
                  <Co2BarChart data={co2} time={time} id={id} />
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div className="row mx-1 my-1 rounded text-center border bg-light sub-content">
                  <h2>Sound</h2>
                  <SoundBarChart data={sound} time={time} id={id} />
                </div>
              </div>
              <div class="col">
                <div className="row mx-1 my-1 rounded text-center border bg-light sub-content">
                  <h2>Light</h2>
                  <LightBarChart data={light} time={time} id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Main1;