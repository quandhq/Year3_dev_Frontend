import React, {useState, useEffect} from "react"
import MultipleYAxis from "../components/ApexChart/MixChartApex"
import { LineChartApex } from "../components/ApexChart/LineChartApex"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import {host} from "../App"



export const Chart = ({url, callbackSetSignIn, timedelay, optionData}) => {
    console.log(host);
    const [isLoading, setIsLoading] = useState(true)
    const [co2, getCo2] = useState([])
    const [hum, getHum] = useState([])
    const [temp, getTemp] = useState([])
    const [time, getTime] = useState([])


    const token = {access_token: null, refresh_token: null}
    // const backend_host = host;
    const backend_host = "27.71.227.1:8002";
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

    const get_chart_data = async (url, access_token) => 
    {
        const response = await fetch(url)
        const data = await response.json()
        getCo2(data.co2)
        getHum(data.hum)
        getTemp(data.temp)
        getTime(data.time)
        setIsLoading(false)
    }

    const get_data = async () => 
    {
        const  verifyAccessToken_response = await verifyAccessToken();

        if(verifyAccessToken_response === true)
        {
            const response = await fetch(url)
            const data = await response.json()
            get_chart_data(url, token["access_token"])
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
                get_chart_data(url, token["access_token"]);
            }
            else
            {
                callbackSetSignIn(false);
            }
        }

        
    }

    useEffect(() => {
        if(optionData==="now")
        {
            setTimeout(() => {console.log("This is in test effect"); 
                            get_data(); 
                            console.log(hum, temp); 
                            console.log("ENDDDD")
                        }, timedelay)
            // get_data()
        }
        else
        {
            console.log("NOT NOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
            get_data()
            console.log("ENDDDDDDDDDDDDDDDDDDDD NOWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
        }
    },[co2, hum, temp, time])

    

    return (
        <>
        {
            isLoading ? 
            <>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box height="400px" mt="0px">   
                        <h1>Loading...</h1>
                    </Box>
                </Grid>

                {/* ((Row 1: Part2): Row 1): Part2 */}
                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box height="400px" mt="0px">   
                        <h1>Loading...</h1>
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box height="400px" mt="0px">   
                        <h1>Loading...</h1>
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box height="400px" mt="0px">   
                        <h1>Loading...</h1>
                    </Box>
                </Grid>
            
            </>
            :
            <>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box
                        item
                        style={{width: "100%"}}
                    // backgroundColor={colors.primary[400]}
                    >
                        <LineChartApex nameChart={"Temp"}  id={1} time={time} value={temp} option={optionData}/>
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box
                        item
                        style={{width: "100%"}}
                    // backgroundColor={colors.primary[400]}
                    >
                        <LineChartApex nameChart={"Hum"}  id={1} time={time} value={hum} option={optionData}/>
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box
                        item
                        style={{width: "100%"}}
                    // backgroundColor={colors.primary[400]}
                    >
                        <LineChartApex nameChart={"Co2"}  id={1} time={time} value={co2} option={optionData}/>
                    </Box>
                </Grid>

                <Grid
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box
                        item
                        style={{width: "100%"}}
                    // backgroundColor={colors.primary[400]}
                    >
                        <LineChartApex nameChart={"TVOC"}  id={1} time={time} value={[]} option={optionData}/>
                    </Box>
                </Grid>
            </>
        }
        
        </>
    );
}