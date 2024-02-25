import { React, useEffect, useState } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { host } from "../../App";


export default function AqiRef({callbackSetSignIn, time_delay})
{
    const url = `http://${host}/api/aqi_ref`;

    const [isLoading, setIsLoading] = useState(true);

    const [data, setData] = useState(null);

    const rating_index = {
        1 : {"level": "Good" , "colour": "green"},
        2 : {"level": "Moderate", "colour": "yellow"},
        3 : {"level": "Unhealthy for Sensitive Groups", "colour": "orange"},
        4 : {"level": "Unhealthy", "colour": "red"},
        5 : {"level": "Very Unhealthy", "colour": "purple"},
        6 : {"level": "Hazardous", "colour": "maroon"},
    };
    
    const rating_array = [
        {"key": 1 , "min": 0, "max": 50},
        {"key": 2 ,"min": 51, "max": 100},
        {"key": 3, "min": 101, "max": 150},
        {"key": 4, "min": 151, "max": 200},
        {"key": 5, "min": 201, "max": 300},
        {"key": 6, "min": 301, "max": 500},
    ];
    


    const fetch_data_function = async (api, access_token) =>
    {

        const headers = 
        {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
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
            const new_data = data["Response"]  
            let index = 0;
            for(let i=0; i<rating_array.length; ++i)
            {
                if(rating_array[i]["min"] <= new_data["aqi"] && new_data["aqi"] <= rating_array[i]["max"])
                {
                    index = rating_array[i]["key"];
                    break;
                }
            }
            if(rating_index.hasOwnProperty(index))
            {
                new_data["rating"] = 
                {
                    "color": rating_index[index]["colour"],
                    "rate": rating_index[index]["level"],
                }
            }
            else
            {
                new_data["rating"] = 
                {
                    "color": "white",
                    "rate": "No data",
                }
            }
            setData(new_data);
        }
        else
        {
            let new_data;
            new_data["rating"] = 
                {
                    "color": "white",
                    "rate": "No data",
                }
            setData(new_data);
        }
        setIsLoading(false);
    }

    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, url) => 
    {

        const token = {access_token: null, refresh_token: null}
        // const backend_host = host;
        if(localStorage.getItem("access") !== null && localStorage.getItem("refresh") !== null)
        {
            token.access_token = localStorage.getItem("access"); 
            token.refresh_token = localStorage.getItem("refresh");
        }
        else
        {
            throw new Error("There is no access token and refresh token ....");
        }

        const verifyAccessToken  = async () =>
        {
            //call the API to verify access-token
            const verify_access_token_API_endpoint = `http://${backend_host}/api/token/verify`
            const verify_access_token_API_data = 
            {
                "token": token.access_token,
            }
            const verify_access_token_API_option = 
            {
                "method": "POST",
                "headers": 
                {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(verify_access_token_API_data),

            }
            const verify_access_token_API_response = await fetch(verify_access_token_API_endpoint, 
                                                                verify_access_token_API_option,);
            if(verify_access_token_API_response.status !== 200)
            {
                return false;
            }
            return true;
        }

        /*
        *brief: this function is to verify the refresh-token and refresh the access-token if the refresh-token is still valid
        */
        const verifyRefreshToken  = async () =>
        {
            //call the API to verify access-token
            const verify_refresh_token_API_endpoint = `http://${backend_host}/api/token/refresh`
            const verify_refresh_token_API_data = 
            {
                "refresh": token.refresh_token,
            }
            const verify_refresh_token_API_option = 
            {
                "method": "POST",
                "headers": 
                {
                    "Content-Type": "application/json",
                },
                "body": JSON.stringify(verify_refresh_token_API_data),

            }
            const verify_refresh_token_API_response = await fetch(verify_refresh_token_API_endpoint, 
                                                                    verify_refresh_token_API_option,);
            const verify_refresh_token_API_response_data = await verify_refresh_token_API_response.json();
            if(verify_refresh_token_API_response.status !== 200)
            {
                return false;
            }
            else if(verify_refresh_token_API_response.status === 200 &&  verify_refresh_token_API_response_data.hasOwnProperty("access"))
            {
                localStorage.setItem("access", verify_refresh_token_API_response_data["access"]);
                localStorage.setItem("refresh", verify_refresh_token_API_response_data["refresh"]);
                return true
            }
            else
            {
                throw new Error("Can not get new access token ....");
            }
        }

        const  verifyAccessToken_response = await verifyAccessToken();

        if(verifyAccessToken_response === true)
        {
            // const response = await fetch(url)
            // const data = await response.json()
            fetch_data_function(url, token["access_token"])
        }
        else
        {
            let verifyRefreshToken_response = null;
            try
            {
                verifyRefreshToken_response = await verifyRefreshToken();
            }
            catch(err)
            {
                alert(err);
            }
            if(verifyRefreshToken_response === true)
            {
                fetch_data_function(url, token["access_token"]);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

    }

    useEffect(()=>{
            if(time_delay===0)
            {
                verify_and_get_data(fetch_data_function, callbackSetSignIn, host, url); 
            }
            else
            {
                if(data === null)            //!< this is for the total component always render the first time and then the next time will be setTimeOut
                {
                    verify_and_get_data(fetch_data_function, callbackSetSignIn, host, url); 
                }
                else
                {
                    const timer = setTimeout(()=>{
                            verify_and_get_data(fetch_data_function, callbackSetSignIn, host, url); 
                        }, time_delay);
                    return () => clearTimeout(timer);
                }
            }
    },[isLoading])


    return(
        <>
            {
                isLoading ?
                <h1>Loading...</h1>
                :
                    <Box>
                        <div className='aqiwidget aqiwidget-xxl' style={{ height: '420px; overflow: hidden;' }}>
                            <div className='aqiwidget-table-x' style={{ width: '460px;' }}>
                            <div style={{ textAlign: 'left; padding: 1px; padding-left: 5px; padding-right: 5px; line-height: 1.15;' }}>

                            <Box>

                                <table style={{ border: '0px solid black; valign: top; padding: 0px; margin: 0px; border-spacing: 0px; width: 100%;' }}>
                                <tr>
                                    <td nowrap="true">
                                    <div className='aqiwgt-table-title' id='aqiwgttitle' style={{ width: '370px; overflow: hidden;' }}>
                                        <span style={{ fontSize: '15px;' }}>
                                            <b>Hanoi AQI</b>
                                        : 
                                        </span>
                                        <span style={{ fontSize: '12px;' }} id='aqiwgttitle2'>Hanoi Real-time Air Quality Index (AQI). </span>
                                    </div>
                                    </td>
                                    
                                    <td className='aqiwgtsharebtn' style={{ verticalAlign: 'text-top;min-width:22px;' }}>
                                    <a href='javascript:clickShareWidget()' title='Share'>
                                        <span style={{ height: '16px;border:0px solid red;position:absolute;' }}>
                                        </span>
                                    </a>
                                    </td>
                                    <td className='aqiwgtfullscreenbtn'>
                                    <a href='https://aqicn.org/city/vietnam/hanoi/m/' title='full screen view' className='aqihreftarget'>
                                        </a>
                                    </td>
                                    </tr>
                                </table>

                                <table style={{ 
                                    textAlign: 'left', 
                                    padding: '0px', 
                                    paddingTop: '3px', 
                                    paddingBottom: '8px', 
                                    margin: '0px', 
                                    borderSpacing: '0px', 
                                    border: '0px solid black', 
                                    width: '100%',
                                    paddingLeft: "20px",
                                    }} >
                                <tr>
                                    <td style={{ 
                                        paddingRight: '5px',
                                        width: "30%",
                                    }}
                                    >
                                        <div className='aqivalue' id='aqiwgtvalue' style={{ 
                                            fontSize: '80px', 
                                            backgroundColor:  `${data["rating"]["color"]}`, 
                                            color: '#000000', 
                                            }} 
                                            
                                            >
                                            {data["aqi"]}
                                        </div>
                                    </td>

                                    <td 
                                        style={{ 
                                            width: '70%',

                                        }} 
                                    >
                                        <div  
                                            style={{ fontSize: '30px', textShadow: '1px 1px 0 #000000', 
                                            color: `${data["rating"]["color"]}`, 
                                        }}
                                        >
                                            {data["rating"]["rate"]}
                                        </div>
                                    <div style={{ fontSize: '16px', fontWeight: 'light' }}>
                                        <span id='aqiwgtutime'>
                                            Updated on {
                                                    (()=>{
                                                        const new_time = data.time - 60*7*60;
                                                        const utcDate = new Date(new_time * 1000); // Convert seconds to milliseconds
                                                        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
                                                        const formattedDateTime = utcDate.toLocaleDateString('en-US', options);

                                                        return formattedDateTime;
                                                        })()   //run this function
                                                }
                                        </span>
                                    </div>
                                    <div style={{ fontSize: '12px' }}></div>
                                    <div style={{ fontSize: '12px', paddingTop: '5px' }} id='aqiwgtxtrainfo'>
                                        Temp.:{' '}
                                        <span>
                                        <b>{data["t"]}</b>
                                        &deg;C
                                        </span>
                                        </div>
                                </td>
                                </tr>
                                </table>
                                </Box>
            

                                <Box display="flex" justifyContent="center">
                                        
                                    <table style={{ fontSize: '11px', border: '0px solid black', padding: '0px', margin: '0px', borderSpacing: '0px' }}>
                                    <tr style={{}}>

                                        {/* _____________________________SET UP THE LENGTH OF ALL TABLE_________________________ */}
                                        <td colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold', width: '300px' }} align="center" nowrap="true">Current</td>
                                    </tr>
                                    <tr id='tr_pm25'  style={{ height: '26px', backgroundColor: '#edf6fb' }}>
                                        <td id='hdr_pm25' nowrap>
                                        <div className='tditem'>
                                            <span style={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                                            PM2.5  <span style={{ fontWeight: 'normal', color: '#888', fontSize: '10px', fontFamily: '"Arial Narrow",Arial, Helvetica, sans-serif' }}>AQI</span>
                                            </span>
                                        </div>
                                        </td>
                                        <td id='cur_pm25' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["pm25"]}</td>
                                        <td id='td_pm25' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>
                                                                                        </td>
                                    </tr>
                                    <tr id='tr_pm10'  style={{ height: '26px', backgroundColor: '#' }}>
                                    <td id='hdr_pm10' nowrap>
                                        <div className='tditem'>
                                        <span style={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                                            PM10  <span style={{ fontWeight: 'normal', color: '#888', fontSize: '10px', fontFamily: '"Arial Narrow",Arial, Helvetica, sans-serif' }}>AQI</span>
                                        </span>
                                        </div>
                                    </td>
                                    <td id='cur_pm10' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["pm10"]}</td>
                                    <td id='td_pm10' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>
                                    </td>
                                    </tr>
                                    <tr id='tr_o3' style={{ height: '26px', backgroundColor: '#edf6fb' }}>
                                    <td id='hdr_o3' nowrap>
                                        <div className='tditem'>
                                        <span style={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                                            O3  <span style={{ fontWeight: 'normal', color: '#888', fontSize: '10px', fontFamily: '"Arial Narrow", Arial, Helvetica, sans-serif' }}>AQI</span>
                                            </span>
                                    </div>
                                    </td>
                                    <td id='cur_o3' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["o3"]}</td>
                                    <td id='td_o3' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>
                                    </td>
                                    </tr>
                                    <tr id='tr_no2'  style={{ height: '26px', backgroundColor: '#'}}>
                                        <td id='hdr_no2' nowrap>
                                            <div className='tditem'>
                                                <span style={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                                                    NO2  <span style={{ fontWeight: 'normal', color: '#888', fontSize: '10px', fontFamily: "Arial Narrow,Arial,Helvetica,sans-serif" }}>AQI</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td id='cur_no2' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["no2"]}</td>
                                        <td id='td_no2' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>
                                                                                        </td>



                                    </tr>
                                    <tr id='tr_so2' style={{ height: '26px', backgroundColor: '#f6fbfd' }}>
                                        <td id='hdr_so2' nowrap>
                                            <div className='tditem'>
                                                <span style={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                                                    SO2  <span style={{ fontWeight: 'normal', color: '#888', fontSize: '10px', fontFamily: "Arial Narrow,Arial,Helvetica,sans-serif" }}>AQI</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td id='cur_so2' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["so2"]}</td>
                                        <td id='td_so2' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>


                                                                                        </td>


                                    </tr>
                                    <tr id='tr_co' style={{ height: '26px', backgroundColor: '#' }}>
                                        <td id='hdr_co' nowrap>
                                            <div className='tditem'>
                                                <span style={{ fontWeight: 'bold', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>
                                                    CO  <span style={{ fontWeight: 'normal', color: '#888', fontSize: '10px', fontFamily: "Arial Narrow,Arial,Helvetica,sans-serif" }}>AQI</span>
                                                </span>
                                            </div>
                                        </td>
                                        <td id='cur_co' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["co"]}</td>
                                        <td id='td_co' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>


                                        </td>

                                    </tr>
                                    <tr id='tr_t'  style={{ height: '26px', backgroundColor: '#f6fbfd' }}>
                                        <td id='hdr_t' nowrap>
                                            <div className='tditem'>
                                                <div title='Hanoi, Vietnam  t (temp.) , expressed in degrees celcius and  measured by wunderground.com'>
                                                    <span style={{ fontWeight: 'normal', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>Temp. </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id='cur_t' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">
                                            <span className='temp' format='nu' temp="19">{data["t"]}</span>
                                        </td>
                                        <td id='td_t' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>


                                        </td>


                                    
                                    </tr>
                                    <tr id='tr_p' style={{ height: '26px', backgroundColor: '#' }}>
                                        <td id='hdr_p' nowrap>
                                            <div className='tditem'>
                                                <div title='Hanoi, Vietnam  p (pressure:)  measured by wunderground.com'>
                                                    <span style={{ fontWeight: 'normal', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>Pressure </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id='cur_p' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["p"]}</td>
                                        <td id='td_p' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>


                                        </td>


                                    
                                    </tr>
                                    <tr id='tr_h' style={{ height: '26px', backgroundColor: '#f6fbfd' }}>
                                        <td id='hdr_h' nowrap>
                                            <div className='tditem'>
                                                <div title='Hanoi, Vietnam  h (humidity)  measured by wunderground.com'>
                                                    <span style={{ fontWeight: 'normal', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>Humidity </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id='cur_h' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["h"]}</td>
                                        <td id='td_h' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>
                                        </td>

                                        
                                    </tr>
                                    <tr id='tr_w'  style={{ height: '26px', backgroundColor: '#' }}>
                                        <td id='hdr_w' nowrap>
                                            <div className='tditem'>
                                                <div title='Hanoi, Vietnam  w (wind)  measured by wunderground.com'>
                                                    <span style={{ fontWeight: 'normal', display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>Wind </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id='cur_w' className='tdcur' style={{ fontWeight: 'bold', fontSize: '11px' }} align="center">{data["w"]}</td>
                                        <td id='td_w' style={{ margin: '0px', cellSpacing: '0px', padding: '0px' }}>


                                        </td>
                                        

                                    </tr>
                                    </table>
                                </Box>
                                                </div>
                                            </div>
                                        </div>
                    </Box>
            }
        </>
    );
}