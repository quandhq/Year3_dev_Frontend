import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    SvgIcon,
    Typography,
    useTheme
  } from '@mui/material';
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import Header from "./Header";
import {host} from "../App"
import { useEffect, useState } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import temp_icon from "../assets/temperature.svg";
import hum_icon from "../assets/humidity.svg";
import co2_icon from "../assets/co2.svg";
import tvoc_icon from "../assets/tvoc.svg";
import dust_icon from "../assets/dust.svg";
import sound_icon from "../assets/sound.svg";
import light_icon from "../assets/light.svg";
import motion_icon from "../assets/motion.svg";



const InformationTag = ({url, callbackSetSignIn, time_delay}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const backend_host = host;
    const api_informationtag = url;
    console.log(host);

    const [isLoading, setIsLoading] = useState(true)
    const [co2, getCo2] = useState(null)
    const [hum, getHum] = useState(null)
    const [temp, getTemp] = useState(null)
    const [time, getTime] = useState(null)
    const [infoData, getInfoData] = useState([])
    const [nodeData, getNodeData] = useState([])

    const iconMap = {
        temp: (
            <img height="70px" width="70px"  src={temp_icon} />
        ),
        hum: (
            <img height="70px" width="70px"  src={hum_icon} />
        ),
        co2: (
            <img height="70px" width="70px"  src={co2_icon} />
        ),
        tvoc: (
            <img height="70px" width="70px"  src={tvoc_icon} />
        ),
        dust: (
            <img height="70px" width="70px"  src={dust_icon} />
        ),
        light: (
            <img height="70px" width="70px"  src={light_icon} />
        ),
        sound: (
            <img height="70px" width="70px"  src={sound_icon} />
        ),
        motion: (
            <img height="70px" width="70px"  src={motion_icon} />
        ),
      };
    const dict_of_enviroment_para_names = {
                    "temp": {"name":" Temparature", "icon":iconMap["temp"], "unit":"°C"}, 
                    "hum": {"name":"Humidity", "icon":iconMap["hum"], "unit":"%"}, 
                    "co2": {"name":"Co2", "icon":iconMap["co2"], "unit":"ppm"}, 
                    "tvoc": {"name":"TVOC","icon":iconMap["tvoc"], "unit":"µg/m3"},
                    "dust": {"name": "Dust", "icon":iconMap["dust"], "unit": "µm"},
                    "sound": {"name": "Sound", "icon":iconMap["sound"], "unit": "dB"},
                    "light": {"name": "Light", "icon":iconMap["light"], "unit": "lux"},
                    "motion": {"name": "Motion Detection", "icon":iconMap["motion"], "unit": ""},
                }


    

    const get_information_data = async (url, access_token) => 
    {
        const response = await fetch(url)
        const data = await response.json()
        if(data)
        {
            if(response.status === 200)
            {
                getCo2(data.co2)
                getHum(data.hum)
                getTemp(data.temp)
                getTime(data.time)
            }
            
            let newInfoData = []
            
            const array_of_keys_in_dict_of_enviroment_para_names = Object.keys(dict_of_enviroment_para_names);
            array_of_keys_in_dict_of_enviroment_para_names.forEach((each_key) => {
                    if (data.hasOwnProperty(each_key) && each_key === "motion")
                    // if (data.hasOwnProperty(each_key) && data[each_key][data[each_key].length-1] !== 0) 
                    {
                        const motion_data = (data[each_key][data[each_key].length-1] == 1 ? "Yes" : "No");    //!< data[each_key][data[each_key].length-1] (last element of array)
                        newInfoData.push({ 
                            "title": dict_of_enviroment_para_names[each_key]["name"], 
                            "icon": dict_of_enviroment_para_names[each_key]["icon"], 
                            "value": motion_data,
                            "unit": dict_of_enviroment_para_names[each_key]["unit"],
                                        })  
                    }
                    else if (data.hasOwnProperty(each_key) && each_key !== "motion")
                    // if (data.hasOwnProperty(each_key) && data[each_key][data[each_key].length-1] !== 0) 
                    {
                        newInfoData.push({
                            "title": dict_of_enviroment_para_names[each_key]["name"], 
                            "icon": dict_of_enviroment_para_names[each_key]["icon"], 
                            "value": data[each_key][data[each_key].length-1],    //last element of array data
                            "unit": dict_of_enviroment_para_names[each_key]["unit"],
                                        })  
                    }
                });

            getInfoData(newInfoData);
            console.log(newInfoData)
            let newNodeData = {}
            newNodeData["sensor"] = data["node_info"]["sensor"]
            newNodeData["actuator"] = data["node_info"]["actuator"]
            getNodeData(newNodeData)
            setIsLoading(false)
        }
        else
        {
            alert("Some error happened, try to reload page!");
        }
    }

    const verify_and_get_data = async (fetch_data_function, callbackSetSignIn, backend_host) => 
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

    useEffect(() => {
        if(co2 === null)
        {
            verify_and_get_data(get_information_data, callbackSetSignIn, backend_host, api_informationtag); 
        }
        else
        {
            setTimeout(()=>{
                    console.log('This is in settime out of information tag'); 
                    verify_and_get_data(get_information_data, callbackSetSignIn, backend_host, api_informationtag); 
                    console.log("Done getting data in useEffect of Informationtag")
                }, time_delay)
        }
    },[co2, temp, hum, time])



    return (

        <>
            {
            isLoading ? 
            <>
                <Box height="250px" mt="0px">   
                    <h1>Loading...</h1>
                </Box>
            </>
            :
            <Box 
                sx={{boxShadow: 1,
                    borderRadius: '5px', 
                    backgroundColor: "white",
                    // height:"500px",
                    width: "100%", // Set the width to 100%
                    }}
                
            >
                <Box>
                    <Box display="flex" justifyContent="center">
                        <Header title="Information" fontSize="40px"/>
                    </Box>
                    <Box display="flex" 
                         marginLeft={{ xs: "5px", md: "40px", lg: "60px" }} // Adjust margins based on screen size
                         marginRight={{ xs: "5px", md: "40px", lg: "60px"}} // Adjust margins based on screen size
                    >
                            <Header title="Current conditions:" fontSize="30px"/>
                    </Box>
                    {/* Current condition enviroment */}
                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" 
                         marginLeft={{ xs: "2px", md: "30px", lg:"45px" }} // Adjust margins based on screen size
                         marginRight={{ xs: "2px", md: "30px", lg:"45px" }} // Adjust margins based on screen size
                    >
                        {
                            infoData.map(each_element_in_infoData =>(
                                    <Box
                                        display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                                    >
                                        <Header title={each_element_in_infoData["title"]} fontSize="20px"/>
                                        <Box>
                                            {each_element_in_infoData["icon"]}
                                        </Box>
                                        <Box>
                                            <Header 
                                                title={`${each_element_in_infoData["value"]} ${each_element_in_infoData["unit"]}`} 
                                                fontSize="25px"
                                            />
                                        </Box>
                                    </Box>
                                    )
                                )
                        }

                    </Box>
                    {/* Nodes avvailable */}
                    <Box display="flex" 
                         marginLeft={{ xs: "5px", md: "40px", lg: "60px" }} // Adjust margins based on screen size
                         marginRight={{ xs: "5px", md: "40px", lg: "60px"}} // Adjust margins based on screen size
                    >
                            <Header title="Nodes available:" fontSize="30px"/>
                    </Box>
                    {/* Current condition enviroment */}
                    <Box>
                    {
                        (()=>{
                            let sensor_content = "Sensor id: ";
                            let actuator_content = "Actuator id: ";
                            let new_list = [];
                            nodeData["sensor"].forEach((i)=>{
                                new_list.push(i["node_id"])
                                })
                            new_list.sort()
                            new_list.forEach((j)=>{
                                sensor_content += `${j}, `;});
                            new_list = []                                
                            nodeData["actuator"].forEach((i)=>{
                                new_list.push(i["node_id"])
                                new_list.sort()
                                new_list.forEach((j)=>{
                                    actuator_content += `${j}, `;});
                                })
                            return (
                                <Box display="flex" flexDirection="column"
                                    marginLeft={{ xs: "10px", md: "80px", lg:"100px" }} // Adjust margins based on screen size
                                    marginRight={{ xs: "10px", md: "80px", lg:"100px" }} // Adjust margins based on screen size
                                >
                                    <Header title={sensor_content} fontSize="23px" />
                                    <Header title={actuator_content} fontSize="23px" />
                                </Box>
                            );
                        })()
                    }
                    </Box>
                    
                </Box>
            </Box>

            
            }

        </>
        
    );
};

export default InformationTag;
