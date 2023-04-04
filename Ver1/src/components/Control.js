import React from "react";
import GaugeChart from "react-gauge-chart";
import { useState } from "react";

const Control = React.memo(() => {
  const [speed, setSpeed] = useState(0);

  const Increase = () => {
    setSpeed(speed < 100 ? (speed + 1) : 100);
  };

  const Decrease = () => {
    setSpeed(speed > 0 ? (speed - 1) : 0);
  };

  return (
    <div className="container">
      <GaugeChart id="gauge control" nrOfLevels={20} percent={speed/100} formatTextValue={value => value + "%"}/>
      <div className="row">
        <button className="col" onClick={Increase}>
          +
        </button>
        <button className="col" onClick={Decrease}>
          -
        </button>
      </div>
      <div className="row"> 
       <button className="col" onClick={
                                      async(e) => {
                                        const url_sending_set_point = `http://127.0.0.1:8000/api/set/${speed}`;
                                        const response = await fetch(url_sending_set_point,{
                                          'method':'GET',
                                          headers: {
                                            'Content-Type':'application/json',
                                             }
                                          });
                                          const new_data = await response.json();
                                          alert(new_data['data']);
                                      }
                                    }> 
              SEND 
          </button>
       </div>
    </div>
  );
}
)

export default Control;
