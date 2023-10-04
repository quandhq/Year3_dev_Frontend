import { Box, Typography, useTheme, Button} from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import Header from "./Header";
import {host} from "../App"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { isFriday } from "date-fns/esm";






const AirQualityIndex = ({room_id, callbackSetSignIn, time_delay}) => {

    const backend_host = host;

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

    const rating_co2 = [
        {key: 1 , min: 0, max: 50},
        {key: 2 ,min: 51, max: 100},
        {key: 3, min: 101, max: 150},
        {key: 4, min: 151, max: 200},
        {key: 5, min: 201, max: 300},
        {key: 6, min: 301, max: 500},
    ];
    
    const rating_tvoc = [
        {key: 1 , min: 0, max: 50},
        {key: 2 ,min: 51, max: 100},
        {key: 3, min: 101, max: 150},
        {key: 4, min: 151, max: 200},
        {key: 5, min: 201, max: 300},
        {key: 6, min: 301, max: 500},
    ];
    
    const rating_climate = 
    {
        "16" : {"10": 6, "20": 6, "30": 6, "40": 6, "50": 5, "60": 5, "70": 5, 80: 5, "90": 6,},
        "17" : {"10": 6, "20": 5, "30": 5, "40": 5, "50": 5, "60": 4, "70": 4, 80: 4, "90": 5,},
        "18" : {"10": 6, "20": 5, "30": 5, "40": 5, "50": 4, "60": 3, "70": 3, 80: 2, "90": 4,},
        "19" : {"10": 6, "20": 5, "30": 4, "40": 4, "50": 3, "60": 2, "70": 2, 80: 2, "90": 3,},
        "20" : {"10": 6, "20": 5, "30": 4, "40": 3, "50": 2, "60": 1, "70": 1, 80: 2, "90": 3,},
        "21" : {"10": 6, "20": 5, "30": 4, "40": 3, "50": 1, "60": 1, "70": 1, 80: 2, "90": 3,},
        "22" : {"10": 6, "20": 5, "30": 4, "40": 3, "50": 1, "60": 1, "70": 1, 80: 2, "90": 3,},
        "23" : {"10": 6, "20": 5, "30": 4, "40": 2, "50": 1, "60": 2, "70": 2, 80: 3, "90": 4,},
        "24" : {"10": 6, "20": 5, "30": 4, "40": 2, "50": 2, "60": 2, "70": 3, 80: 4, "90": 5,},
        "25" : {"10": 6, "20": 5, "30": 4, "40": 3, "50": 3, "60": 3, "70": 4, 80: 5, "90": 5,},
        "26" : {"10": 6, "20": 5, "30": 4, "40": 4, "50": 4, "60": 4, "70": 5, 80: 5, "90": 6,},
        "27" : {"10": 6, "20": 5, "30": 5, "40": 5, "50": 5, "60": 5, "70": 5, 80: 5, "90": 6,},
        "28" : {"10": 6, "20": 6, "30": 6, "40": 6, "50": 6, "60": 6, "70": 6, 80: 6, "90": 6,},
    }


    const [backgroundColor, setBackgroundColor] = useState({co2: null, tvoc: null, climate: null, overall: null, });
    const [level, setLevel] = useState({co2: null, tvoc: null, climate: null, overall: null, });
    const [isLoading, setIsLoading] = useState(true);


    const api_to_fetch = `http://${backend_host}/api/room/information_tag?room_id=${room_id}`;



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

        let response;
        let data;
        try
        {
            response = await fetch(api, option_fetch);
        }
        catch(err)
        {
            alert("Error happend while getting data. Error: " + err);
        }
        if(response.status === 200)
        {   
            data = await response.json();
            const new_backgroundColor = {co2: null, tvoc: null, climate: null, overall: null, };
            const new_level = {co2: null, tvoc: null, climate: null, overall: null, };
            let index;
            let overall_index = []

            for(let i=0; i<rating_co2.length; ++i)
            {
                if(Math.round(data["co2"][0]) >= 5001)
                {
                    index = 6;
                    break;
                }
                else if(Math.round(data["co2"][0]) <= 5000 && Math.round(data["co2"][0]) <= rating_co2[i].max && Math.round(data["co2"][0]) >= rating_co2[i].min)
                {
                    index = rating_co2[i].key;
                    break;
                }
            }
            overall_index.push(index);
            new_backgroundColor["co2"] = rating_index[index]["colour"];
            new_level["co2"] = {"level": rating_index[index]["level"], "index": index};
            
            for(let i=0; i<rating_tvoc.length; ++i)
            {
                if(Math.round(data["tvoc"][0]) >= 301)
                {
                    index = 6;
                    break;
                }
                else if(Math.round(data["tvoc"][0]) <= 300 && Math.round(data["tvoc"][0]) <= rating_tvoc[i].max && Math.round(data["tvoc"][0]) >= rating_tvoc[i].min)
                {
                    index = rating_tvoc[i].key;
                    break;
                }
            }
            overall_index.push(index);
            new_backgroundColor["tvoc"] = rating_index[index]["colour"];
            new_level["tvoc"] = {"level": rating_index[index]["level"], "index": index};

            if((Math.round(data["temp"][0]) <= 28 && Math.round(data["temp"][0]) >=15) && (Math.round(data["hum"][0]) >= 10 && Math.round(data["hum"][0]) <= 90))
            {
                const index_hum = (Math.round(data["hum"][0])%10) >= 5 ? (Math.round(data["hum"][0]) - Math.round(data["hum"][0])%10 + 10) : (Math.round(data["hum"][0]) - Math.round(data["hum"][0])%10);
                const index_temp = Math.round(data["temp"][0]);
                console.log(index_temp)
                const h = index_hum.toString();
                const t = index_temp.toString();
                index = rating_climate[t][h];
            }
            else
            {
                index = 6;
            }
            overall_index.push(index);
            new_backgroundColor["climate"] = rating_index[index]["colour"];
            new_level["climate"] = {"level": rating_index[index]["level"], "index": index};
            new_backgroundColor["overall"] = rating_index[Math.max(...overall_index)]["colour"];
            // new_level["overall"] = rating_index[Math.max(...overall_index)]["level"]; 
            new_level["overall"] = {"level": rating_index[Math.max(...overall_index)]["level"], "index": Math.max(...overall_index)};    
            setLevel(new_level);
            setBackgroundColor(new_backgroundColor);  
            setIsLoading(false);     
        }

    }


    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host, api_to_fetch) => 
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
            fetch_data_function(api_to_fetch, token["access_token"])
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
                fetch_data_function(api_to_fetch, token["access_token"]);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }
    }

    useEffect(()=>{
        if(time_delay !== 0)
        {
            if(backgroundColor["overall"] === null)            //!< this is for the total component always render the first time and then the next time will be setTimeOut
            {
                verify_and_get_data(fetch_data_function, callbackSetSignIn, backend_host, api_to_fetch); 
            }
            else
            {
                setTimeout(()=>{
                        console.log('This is in settime out of AQI'); 
                        verify_and_get_data(fetch_data_function, callbackSetSignIn, backend_host, api_to_fetch); 
                        console.log("Done getting data in useEffect of AQI");
                    }, time_delay)
            }
        }
        else
        {
            verify_and_get_data(fetch_data_function, callbackSetSignIn, backend_host, api_to_fetch);
        }
    }, []);

    return (
        <>
        {
            isLoading ?
            <Box>
                <h1>Loading...</h1>
            </Box>
            :
            <Box
                container="true"
                display="flex"
                flexDirection="column"
                alignItems="center"
                // jutifyContent="center"
            >
                {/* Total AQI */}
                <Box>
                    <Box display="flex" justifyContent="center" marginTop="10px">
                        <Header title="Overall condition" />
                    </Box>
                    <Button onClick={() => {
                        window.open( "https://www.airnow.gov/aqi/aqi-calculator/", "_blank")
                            }} 
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: "100%",
                            fontSize: 50,
                            background: backgroundColor["overall"],
                            border: "2px solid",
                        }}
                    > 
                            <div style={{ textAlign: 'center',}}>
                                <Header title={level["overall"]["level"]} fontSize="20px" color={level["overall"]["index"] <=3 ? "black" : "white"}/>
                            </div>
                    </Button>
                </Box>
                
                {/* Three parameters */}
                {/* <Box
                    display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
                    gap="0px"
                >
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" justifyContent="center" marginTop="10px">
                            <Header title="CO2" />
                        </Box>
                        <Button 
                            onClick={() => {
                                window.open( "https://www.breeze-technologies.de/blog/calculating-an-actionable-indoor-air-quality-index/", "_blank")
                                    }} 
                            style={{
                                width: 120,
                                height: 50,
                                fontSize: 50,
                                background: backgroundColor["co2"],
                                borderRadius: 0,
                                borderTop: "2px solid",
                                borderLeft: "2px solid",
                                borderBottom: "2px solid",
                                }}
                            > 
                                <div style={{ textAlign: 'center' }}>
                                    <Header title={level["co2"]["level"]} fontSize="15px" color={level["co2"]["index"] <=3 ? "black" : "white"}/>
                                </div>
                        </Button>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" justifyContent="center" marginTop="10px">
                            <Header title="TVOC" />
                        </Box>
                        <Button 
                            onClick={() => {
                                window.open( "https://www.breeze-technologies.de/blog/calculating-an-actionable-indoor-air-quality-index/", "_blank")
                                    }} 
                            style={{
                                width: 120,
                                height: 50,
                                fontSize: 50,
                                background: backgroundColor["tvoc"],
                                borderRadius: 0,
                                borderTop: "2px solid",
                                borderLeft: "2px solid",
                                borderBottom: "2px solid",
                                }}
                            > 
                                <div style={{ textAlign: 'center' }}>
                                    <Header title={level["tvoc"]["level"]} fontSize="15px" color={level["tvoc"]["index"] <=3 ? "black" : "white"}/>
                                </div>
                        </Button>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box display="flex" justifyContent="center" marginTop="10px">
                            <Header title="CLIMATE" />
                        </Box>
                        <Button 
                            onClick={() => {
                                window.open( "https://www.breeze-technologies.de/blog/calculating-an-actionable-indoor-air-quality-index/", "_blank")
                                    }} 
                            style={{
                                width: 120,
                                height: 50,
                                fontSize: 50,
                                background: backgroundColor["climate"],
                                borderRadius: 0,
                                borderTop: "2px solid",
                                borderLeft: "2px solid",
                                borderBottom: "2px solid",
                                borderRight: "2px solid",
                                }}
                            > 
                                <div style={{ textAlign: 'center' }}>
                                    <Header title={level["climate"]["level"]} fontSize="15px" color={level["climate"]["index"] <=3 ? "black" : "white"}/>
                                </div>
                        </Button>
                    </Box>
                </Box> */}
            </Box>
        }
        </>

    );
};

export default AirQualityIndex;