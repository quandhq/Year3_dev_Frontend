import React, {useState, useEffect} from "react"
import MultipleYAxis from "../components/ApexChart/MixChartApex"
import { LineChartApex } from "../components/ApexChart/LineChartApex"
import { Box } from "@mui/material"
import Grid from "@mui/material/Grid"
import {host} from "../App"
import * as V from 'victory';
import VictoryBarChart from "../components/VictoryChart/VictoryBarChart"
import VictoryLineChart from "../components/VictoryChart/VictoryLineChart"
import Header from "../components/Header"
import VictoryBarChartV2 from "../components/VictoryChart/VictoryBarChartVert2"
import {Button} from "@mui/material";
import SmallFilter from "./SmallFilter"

const Chart = ({room_id, callbackSetSignIn, timedelay, optionData, paraFilter, nodeIdFilter}) => {
    const dict_filter = {"1D": 1, "1W": 2, "1M": 3, "6M": 4, "1Y": 5}

    const [isLoading, setIsLoading] = useState(true)
    const [numberOfData, setNumberOfData] = useState(1);
    const [dataChart, setDataChart] = useState({co2: null, hum: null, temp: null, tvoc: null, light: null, dust: null, time: null})
    const para_filter_dict = {0: "all", 1: "temp", 2: "hum", 3: "co2", 4: "tvoc", 5: "light", 6: "dust"};
    const para_name = {0: "All", 1: "Temperature", 2: "Humidity", 3: "Co2", 4: "TVOC", 5: "Light", 6: "Dust"};
    const backend_host = host;
    const url = `http://${backend_host}/api/v1.1/monitor/data?room_id=${room_id}&filter=${numberOfData}&node_id=${nodeIdFilter}`;

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

    const get_chart_data = async (url, access_token) => 
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

        const response = await fetch(url, option_fetch);
        if(response.status === 200)
        {
            const data = await response.json();
            const key = ["co2", "temp", "hum", "light", 
            "dust", "sound", "red", "green", 
            "blue", "tvoc", "motion", "time",];
            let newDataChart = {};
            key.forEach((i) => {
                if(i in data)
                {
                    newDataChart[i] = data[i]; 
                }
                else
                {
                    newDataChart[i] = [0];
                }
            })
            setDataChart(newDataChart);
            setIsLoading(false)
        }
        else
        {
            const key = ["co2", "temp", "hum", "light", 
            "dust", "sound", "red", "green", 
            "blue", "tvoc", "motion", "time",];
            let newDataChart = {};
            key.forEach((i) => {
                newDataChart[i] = [0]; 
            })
            setDataChart(newDataChart);
            setIsLoading(false)
        }
    }



    useEffect(() => {
        
        verify_and_get_data(get_chart_data, callbackSetSignIn, host, url);
        // if(optionData==="now")
        // {
        //     if(dataChart.co2 === null)
        //     {
        //         verify_and_get_data(get_chart_data, callbackSetSignIn, host, url); 
        //     }
        //     else
        //     {
        //         setTimeout(() => {
        //                         verify_and_get_data(get_chart_data, callbackSetSignIn, host, url); 
        //                     }, timedelay)
        //     }
        // }
        // else
        // {
        //     verify_and_get_data(get_chart_data, callbackSetSignIn, host, url);
        // }
    },[isLoading])

    

    return (
        <>
        <SmallFilter  setNumberOfData={setNumberOfData} setDataChart={setDataChart} setIsLoading={setIsLoading}/>
        {
            isLoading ? 
            <>

                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    item
                    style={{width: "100%"}}
                // backgroundColor={colors.primary[400]}
                >
                    <Box height="400px" mt="0px">   
                        <h1>Loading chart...</h1>
                    </Box>
                </Grid>
            </>
            :
            <>
            {
            (
                ()=>
                {
                    if(paraFilter===0)
                    {
                        return(
                            <>

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%"}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[1]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryBarChartV2 data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[1]]} option_data={optionData}/>
                                </Box>
                            </Grid>

                            <Box m={2} />

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%"}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[1]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[1]]} option_data={optionData}/>
                                </Box>
                            </Grid>

                            <Box m={2} />

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%",}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[2]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[2]]} option_data={optionData}/>
                                </Box>
                            </Grid>

                            <Box m={2} />

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%"}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[3]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[3]]} option_data={optionData}/>
                                </Box>
                            </Grid>

                            <Box m={2} />

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%"}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[4]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[4]]} option_data={optionData}/>
                                </Box>
                            </Grid>

                            <Box m={2} />

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%"}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[5]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[5]]} option_data={optionData}/>
                                </Box>
                            </Grid>

                            <Grid
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                item
                                style={{width: "100%"}}
                            // backgroundColor={colors.primary[400]}
                            >
                                <Header title={para_name[6]} fontSize="20px" />
                                <Box
                                    item
                                    style={{
                                        width: "100%", 
                                        border: "2px solid",
                                        }}
                                // backgroundColor={colors.primary[400]}
                                >
                                    <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[6]]} option_data={optionData}/>
                                </Box>
                            </Grid>
                            </>
                        );
                    }
                    else
                    {
                        return(
                        <>
                        
                        <Grid
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            item
                            style={{width: "100%"}}
                        // backgroundColor={colors.primary[400]}
                        >
                            <Header title={para_name[paraFilter]} fontSize="20px" />
                            <Box
                                item
                                style={{
                                    width: "100%", 
                                    border: "2px solid",
                                    }}
                            // backgroundColor={colors.primary[400]}
                            >
                                <VictoryLineChart data_x={dataChart["time"]} data_y={dataChart[para_filter_dict[paraFilter]]} option_data={optionData}/>
                            </Box>
                        </Grid>
                        </>
                        );
                    }
                }
            )()
            }
            </>
        }
        
        </>
    );
}


export default Chart;