import BarChart_Apex from "../components/Charts/BarChart_Apex";
import LineChart from "../components/Charts/LineChart";
import MultipleYAxis from "../components/Charts/MultipleYAxis";
import Control from "../components/Control";
import AirQualityIndex from "../components/AirQualityIndex";
import useFetch1 from "../components/Building1/Main/useFetch1.js"
import { useState } from "react";

// Bug: How to change card-img size if replacing img file

const Building = ({ img }) => {
    const [id, setId] = useState(1); 
    let chart_data_api = `http://127.0.0.1:8000/api/get/${id}`   
    const {temperature,humidity,co2,dust,sound,light,time} = useFetch1(chart_data_api);    //cái này là object destructor, fetch data for chart 

    return (
        <section className="d-flex justify-content-center align-items-center m-2 ">
            <div className="container-fluid h-100 w-100">
                <div className="row">
                    <div className="col-md-6 col-lg-4 d-flex align-items-center">
                        <div className="container-fluid">
                            {/* Monitored Area */}
                            <div className="row">
                                <img className="img-fluid mb-4 justify-content-center align-items-center room_image" src={img} alt="Not found"/>
                            </div>
                            <div className="row">
                                <div className="col-md-6 bg-secondary">
                                    {/* Control Panel */}
                                    <Control />
                                </div>
                                <div className="col-md-6">
                                    {/* AQI */}
                                    <AirQualityIndex aqi={267}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-8 bg-primary d-flex align-items-center">
                        <div className="container-fluid p-2">
                            <div className="row">
                                <div className="col-lg-6 bg-danger">
                                    {/* Temperature and Humidity chart */}
                                    <LineChart nameChart={'Temperature level'} id={id} time={time} value={temperature}/>
                                </div>
                                <div className="col-lg-6 bg-warning">
                                    {/* CO2 Level chart */}
                                    <LineChart nameChart={'Humidity Level'} id={id} time={time} value={humidity}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 bg-info">
                                    {/* Sound Level chart */}
                                    <LineChart nameChart={'Co2 Level'} id={id} time={time} value={co2}/>
                                </div>
                                <div className="col-lg-6 bg-light">
                                    {/* Light Level chart */}
                                    <LineChart nameChart={'Light Level'} id={id} time={time} value={light}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Building;