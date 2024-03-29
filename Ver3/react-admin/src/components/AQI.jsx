import { React, useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { host } from "../App";

const AQI = ({room_id}) =>
{
    const [aqi, setAqi] = useState({"level": ""})
    const url = `http://${host}/api/room/AQIdustpm2_5?room_id=${room_id}`
    console.log(url)

    const rating_index = {
        1 : {"level": "Good" , "colour": "green"},
        2 : {"level": "Moderate", "colour": "yellow"},
        3 : {"level": "Unhealthy for Sensitive Groups", "colour": "orange"},
        4 : {"level": "Unhealthy", "colour": "red"},
        5 : {"level": "Very Unhealthy", "colour": "purple"},
        6 : {"level": "Hazardous", "colour": "maroon"},
    };
    
    const rating_dust = [
        {key: 1 , min: 0, max: 50},
        {key: 2 ,min: 51, max: 100},
        {key: 3, min: 101, max: 150},
        {key: 4, min: 151, max: 200},
        {key: 5, min: 201, max: 300},
        {key: 6, min: 301, max: 500},
    ];

    function setDial(aqi, level_val) {
        let angle = getAQIDialAngle(aqi);
        let [bg, white] = getAQIColor(aqi);
    
        let meter = document.querySelector(".gauge > div[role=meter]");
        let dial = meter.querySelector(".dial");
        meter.setAttribute("aria-valuenow", aqi);
        meter.setAttribute("aria-valuetext", aqi);
        dial.querySelector(".aqi-num").textContent = aqi;
        // dial.querySelector(".level-value").textContent = level_val;
        dial.querySelector(".arrow").style.transform = `rotate(${angle - 90}deg)`;
        dial.style.backgroundColor = bg;
        dial.classList.toggle("white", white);
      }
    
    
    function getAQIDialAngle(aqi) {
      if (aqi >= 301) {
        return Math.min((aqi - 301) / 200 * 30 + 150, 180);
      } else if (aqi >= 201) {
        return (aqi - 201) / 100 * 30 + 120;
      } else if (aqi >= 151) {
        return (aqi - 151) / 50 * 30 + 90;
      } else if (aqi >= 101) {
        return (aqi - 101) / 50 * 30 + 60;
      } else if (aqi >= 51) {
        return (aqi - 51) / 50 * 30 + 30;
      } else if (aqi >= 0) {
        return aqi / 50 * 30;
      } else {
        return 0;
      }
    }
    
    function getAQIColor(aqi) {
      function combineColors(c1, c2, bias) {
        return c1.map((c, i) => ((c * (1 - bias)) + (c2[i] * bias)));
      }
    
      function stringifyColor(c) {
        return `rgb(${c})`;
      }
    
      function calculateColors(c1, c2, bias) {
        let bg = combineColors(c1, c2, bias);
        let white = ((bg[0] * 299) + (bg[1] * 587) + (bg[2] * 114)) / 1000 < 128;
        return [stringifyColor(bg), white];
      }
    
      const aqiColorMap = [
        [0, [0, 255, 0]],
        [50, [255, 255, 0]],
        [100, [255, 126, 0]],
        [150, [255, 0, 0]],
        [200, [143, 63, 151]],
        [300, [126, 0, 35]]
      ];
    
      for (let i in aqiColorMap) {
        let [target, color] = aqiColorMap[i];
        if (target > aqi) {
          if (i == 0) {
            return calculateColors(color, color, 1);
          }
    
          let [prevTarget, prevColor] = aqiColorMap[i - 1];
          return calculateColors(prevColor, color, (aqi - prevTarget) / (target - prevTarget));
        }
      }
    
      let [, color] = aqiColorMap[aqiColorMap.length - 1];
      return calculateColors(color, color, 1);
    }

    const fetch_data_function = async (api) =>
    {

        const headers = 
        {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${access_token}`,
        }
        const option_fetch = 
        {
            "method": "GET",
            "headers": headers,
            "body": null,
        }
        const response = await fetch(api, option_fetch);
        if(response.status == 200)
        {
            const data = await response.json();
            const new_data = {}
            for(let i = 0; i< rating_dust.length; ++i)
            {
                if(data["hourly"] > 500)
                {
                    new_data["level"] = rating_index[6].level
                    break;
                }
                else if(data["hourly"] > rating_dust[i]["min"] && data["hourly"] < rating_dust[i]["max"])
                {
                    new_data["level"] = rating_index[rating_dust[i]["key"]].level
                    break;
                }
            }
            
            new_data["hourly"] = data.hourly
            setAqi(new_data);
            // alert(aqi["level"])
            setDial(data["hourly"], new_data["level"]);
            // alert(data["hourly"])
        }
    }
    
    useEffect(()=>{
        fetch_data_function(url)
    }, []);

    return (
        <>
        

        <div class="AQI"
        style={{"margin-top": "2rem",}}
        >
            {/* <div style={{"margin-bottom": "2rem",}}>
            <label for="set-aqi">Set AQI:</label>
                <input type="range" id="set-aqi" min="0" max="500" value="10"
                    onChange={evt => {
                        setDial(evt.target.value);}}
                />
            </div> */}
            <div class="gauge">
            
            
                <div role="meter" aria-valuemin="0" aria-valuemax="500" aria-labelledby="meter-label">
                    <div class="dial">
                        <Button onClick={() => {
                            window.open( "https://www.airnow.gov/aqi/aqi-calculator/", "_blank")
                                }}>
                        <span
                        style={{
                            "text-align": "center",
                            "fontSize": "30px",
                            "fontWeight": "600",
                        }}>AQI</span>
                        </Button>
                        <span class="aqi-num"
                        style={{
                            "text-align": "center",
                            "fontSize": "25px",
                        }}></span>
                        <div class="arrow"></div>
                    </div>
                </div>
                <div
                class="level"
                style={{
                    "background-color": "black",
                    "text-align": "center",
                    "fontSize": "18px",
                    "fontWeight": "600",
                }}
                >
                    <label class="label" id="meter-label"

                    >{aqi["level"]}</label>
                </div>

                <div class="aqi-legend">
                    <div class="aqi-bar" style={{"background-color": "#00e400"}}>
                    <span class="range">0</span>
                    </div>
                    <div class="aqi-bar" style={{"background-color": "#ffff00"}}>
                    <span class="range">50</span>
                    </div>
                    <div class="aqi-bar" style={{"background-color": "#ff7e00"}}>
                        <span class="range">100</span>
                    </div>
                    <div class="aqi-bar" style={{"background-color": "red"}}>
                    <span class="range">150</span>
                    </div>
                    <div class="aqi-bar" style={{"background-color": "#8f3f97"}}>
                    <span class="range">200</span>
                    </div>
                    <div class="aqi-bar" style={{"background-color": "#7e0023"}}>
                        <span class="range">300</span>
                    </div>
                    </div>

            </div>
        </div>
        </>
    );
}

export default AQI;