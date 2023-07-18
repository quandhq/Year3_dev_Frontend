import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { LineChartApex } from "../../components/ApexChart/LineChartApex";
import { BarChartApex } from "../../components/ApexChart/BarChartApex";
import {Fetch, verifyAccessToken, verifyRefreshToken} from "../../data/dataFetchTestAuthentication";
import { FetchHistory } from "../../data/dataHistoryFetchAuthentication";
import { useState, useContext } from "react";


import Control  from "../../components/GaugeChart/Control";
import { UserContext } from "../../App";
import ProgressCircle from "../../components/ProgressCircle";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import MultipleYAxis from "../../components/ApexChart/MixChartApex";
import { DatePicker } from "@mui/x-date-pickers";


const Dashboard = () => {
    // const backend_host = "27.71.227.1:800"
    const backend_host = "localhost:8000"

    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const callbackSetSignIn = useContext(UserContext);
    const [id, setId] = useState(1);
    const [optionData, setOptionData] = useState("now");
    // const [apiHistoryChart, setApiHistoryChart] = useState(`http://${backend_host}/ai/v1.1/monitor/data/${id}`);
    // const dataHistoryChart = useFetch(apiRealtimeChart, callbackSetSignIn, 20000);    //cái này là object destructor, fetch data for chart 
    // {co2HistoryChart, tempHistoryChart, humHistoryChart, timeHistoryChart}
    const [unixTimestampStart, setUnixTimestampStart] = useState(0);
    const [unixTimestampEnd, setUnixTimestampEnd] = useState(0);
    const apiRealtimeChart = `http://${backend_host}/api/v1.1/monitor/data/${id}`; 
    console.log("DOING DATA REALTIMEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    const dataRealtimeChart = Fetch(apiRealtimeChart, callbackSetSignIn, 8000, 'now');
    console.log("ENDING REALTIME")
    const apiHistoryChart = `http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${'day'}`;
    console.log("RRRRRRRRRreload component")
    const dataHistoryChart = Fetch(apiHistoryChart, callbackSetSignIn, 0, 'day'); 
    console.log(dataHistoryChart)
    console.log(dataRealtimeChart)
    console.log("ENdng loading HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHistory chart")
    // if(optionData === "day")
    // {
    //     let id = window.setTimeout(function() {}, 0);
    //     while (id--) {
    //         window.clearTimeout(id); // will do nothing if no timeout with id is present
    //         console.log("Clear TIMER OUT")
    //     }
    //     console.log("Clear TIMER OUT ALLLLLLLLLLLLLLLLL")
    // }
    console.log("CALL AFTER THISSSS")
    // const [totalState, setTotalState] = useState(true);



    const checkUndefined = (object) => 
    {
        if(object === null)
        {
            return false;
        }
        let buffer = [];
        for(let i of Object.keys(object))
        {   
            buffer.push(object.i);
        }
        if(buffer.every((j) => {return (j === undefined)})){
            return false;
        }  
        else{
            return true;
        }
    }

    const checkTimeOption = (time_start, time_end, option) => 
    {
        console.log(time_start);
        console.log(time_end);
        if(option === 'day')
        {
            if(time_start === time_end)
            {
                return true;
            }
            return false;
        }
        else if(option === 'month')
        {
            if(Math.round((time_end - time_start)/(3600*24)) >= 30)
            {
                return true;
            }
            return false;
        }
        else if(option === 'year')
        {
            if(Math.round((time_end - time_start)/(3600*24*31)) >= 12)
            {
                return true;
            }
            return false;
        }
        else
        {
            return false;
        }
    }
    

    return (
        <div>
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex"  mb="50px">
                <Header title="Dashboard" subtitle="Welcome to your dashboard" />
            
                {/* <Box>
                    <Button
                        sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "10px 20px",
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box> */}
            </Box>
                  



            {/* GRID & CHARTS , GRID for whole page, 12 columns*/}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                // gridTemplateRows="repeat(1, 1fr)"
                gridAutoRows="190px"
                gap="10px"
            >
            {/* Row 1  */}
                {/* Row 1: Part 1 */}
                <Box
                    gridColumn="span 4"
                    gridRow="span 4"
                    // backgroundColor={colors.primary[400]}
                    
                >
                    {/* <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Temperature
                    </Typography> */}
                    
                    <Box 
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="1000px" 
                        // height="100%"
                        mt="-160px"
                    >
                        <img
                        alt="profile-room"
                        // width="100%"
                        // height="100%"
                        src={`../../smartfarm/assets/room1.svg`}
                        // style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                </Box>

                {/* Row 1: Part 2*/}
                <Box
                gridColumn="span 8"
                gridRow="span 4"
                // backgroundColor={colors.primary[400]}
                // backgroundColor={"red"}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        // gridTemplateRows="repeat(1, 1fr)"
                        gridAutoRows="180px"
                        gap="10px"
                    >

                    {/* (Row1: Part2) : Row 1 */}
                        {/* ((Row1: Part2) : Row 1): Part 1 */}
                        <Box
                            gridColumn="span 6"
                            gridRow="span 2"
                            // backgroundColor={colors.primary[400]}
                        >
                            <Box height="400px" mt="0px">   

                                {
                                    (() => {
                                        if(optionData === "now")
                                        {
                                            return (
                                                checkUndefined(dataRealtimeChart) || dataRealtimeChart === null ? 
                                                <MultipleYAxis  nameChart={'Temperature and Humidity'} 
                                                                id={id} 
                                                                time={[]} 
                                                                temperature={[]} 
                                                                humidity={[]} 
                                                                option={[]}
                                                />
                                                :
                                                <MultipleYAxis  nameChart={'Temperature and Humidity'} 
                                                                id={id} 
                                                                time={dataRealtimeChart.time} 
                                                                temperature={dataRealtimeChart.temp}
                                                                humidity={dataRealtimeChart.hum} 
                                                                option={optionData}
                                                />
                                            );
                                        }
                                        else if(optionData  === "day")
                                        {
                                            
                                            return (
                                                checkUndefined(dataHistoryChart) || dataHistoryChart === null ? 
                                                <MultipleYAxis  nameChart={'Temperature and Humidity'} 
                                                                id={id} 
                                                                time={[]} 
                                                                temperature={[]} 
                                                                humidity={[]} 
                                                                option={[]}
                                                />
                                                :
                                                <MultipleYAxis  nameChart={'Temperature and Humidity'} 
                                                                id={id} 
                                                                time={dataHistoryChart.time} 
                                                                temperature={dataHistoryChart.temp} 
                                                                humidity={dataHistoryChart.hum} 
                                                                option={optionData}
                                                />
                                            );
                                        }
                                    })() //execute the function
                                           
                                }
                            </Box>
                        </Box>

                        {/* ((Row 1: Part2): Row 1): Part2 */}
                        <Box
                            gridColumn="span 6"
                            gridRow="span 2"
                            // backgroundColor={colors.primary[400]}
                        >
                            <Box height="400px" mt="0px">   
                                {
                                    (() => 
                                    {

                                        if(optionData === "now")
                                        {
                                            return (
                                                checkUndefined(dataRealtimeChart) || dataRealtimeChart === null ? 
                                                <LineChartApex  nameChart={'Co2 Level'} 
                                                                id={id} 
                                                                time={[]} 
                                                                value={[]} 
                                                                option={[]}
                                                />
                                                :
                                                <LineChartApex  nameChart={'Co2 Level'} 
                                                                id={id} 
                                                                time={dataRealtimeChart.time} 
                                                                value={dataRealtimeChart.co2} 
                                                                option={optionData}
                                                />
                                            );
                                        }
                                        else if(optionData  === "day")
                                        {
                                            return (
                                                checkUndefined(dataHistoryChart) || dataHistoryChart === null ? 
                                                <LineChartApex  nameChart={'Co2 Level'} 
                                                                id={id} 
                                                                time={[]} 
                                                                value={[]} 
                                                                option={[]}
                                                />
                                                :
                                                <LineChartApex  nameChart={'Co2 Level'} 
                                                                id={id} 
                                                                time={dataHistoryChart.time} 
                                                                value={dataHistoryChart.co2} 
                                                                option={optionData}
                                                />
                                            );
                                        }
                                    })()        //execute the function
                                    
                                }
                                
                            </Box>
                        </Box>

                    {/* (Row1: Part2): Row 2 */}

                        <Box
                            gridColumn="span 12"
                            gridRow="span 1"
                            height="180px"
                            // backgroundColor={colors.primary[400]}
                            display="flex"
                            justifyContent="center"
                        >
                            {/* Data history chase back option*/} 
                            <Box alignItems="center" 
                                // backgroundColor={colors.primary[400]} 
                                width="90%">
                                {/* buttons */}
                                <Box display="flex"  alignItems="center" ml="15vh" mt="5vh" >
                                    <Header title="Data options" variant="h3"/>

                                    <Box mb="10px" ml="5px">
                                        <Button
                                            sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "2px 5px",
                                            }}
                                            onClick={()=>{
                                                // setApi(`http://${backend_host}/api/get/daily_data/${id}`)
                                                if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'year'))
                                                {
                                                    alert("Valid option!")
                                                }
                                                else
                                                {
                                                    alert("Invalid optionnnnn!!!!!!")    
                                                }
                                            }}
                                        >
                                            <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                            Year
                                        </Button>
                                    </Box>
                                    

                                    <Box mb="10px" ml="5px">
                                        <Button
                                            sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "2px 5px",
                                            }}
                                            onClick={()=>{
                                                // setApi(`http://${backend_host}/api/get/secondly_data/${id}`)
                                                if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'month'))
                                                {
                                                    alert("Valid option!")
                                                }
                                                else
                                                {
                                                    alert("Invalid optionnnnn!!!!!!")    
                                                }
                                            }}
                                        >
                                            <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                            Month
                                        </Button>
                                    </Box>

                                    <Box mb="10px" ml="5px">
                                        <Button
                                            sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "2px 5px",
                                            }}
                                            onClick={async() => {
                                                // setApi(`http://${backend_host}/api/get/secondly_data/${id}`)
                                                // setOption(1);
                                                if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'day'))
                                                {
                                                    
                                                    alert("Valid option!");
                                                    // const api_day_data = 
                                                    // `http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${'day'}`;
                                                    // const api_day_data_option = {
                                                    //     'method': "POST",
                                                    //         // "Authorization": `Bearer ${"..."}`,
                                                    //     }
                                                    // const api_day_data_response = await fetch(api_day_data, api_day_data_option);
                                                    // const api_day_data_response_data = await api_day_data_response.json()
                                                    // alert(api_day_data_response_data['history_request_result'])
                                                    clearTimeout(dataRealtimeChart.timer);
                                                    alert("done clear real time cahrt")
                                                    
                                                    setOptionData("day")
                                                    console.log("SSSSSSSSSSSSSSSSset option to day")
                                                
                                                }
                                                else
                                                {
                                                    alert("Invalid optionnnnn!!!!!!")    
                                                }
                                            }}
                                                
                                                
                                        >
                                            <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                            Day
                                        </Button>
                                    </Box>

                                    <Box mb="10px" ml="5px">
                                        <Button
                                            sx={{
                                            backgroundColor: colors.blueAccent[700],
                                            color: colors.grey[100],
                                            fontSize: "14px",
                                            fontWeight: "bold",
                                            padding: "2px 5px",
                                            }}
                                            onClick={(e) =>
                                                {
                                                    console.log("set option to now")
                                                    setOptionData("now")
                                                    // setTotalState(!totalState);
                                                    // console.log("SET ALL STATE")
                                                }
                                            }
                                                
                                                
                                        >
                                            <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                                            Now
                                        </Button>
                                    </Box>
                                </Box>

                                {/* calendar */}
                                <Box display="flex" ml="20vh">
                                    {/* Start Time */}
                                    <Box>
                                        <Header title="Start Time" variant="h4"/>
                                        <Box ml="5vh">
                                            <DatePicker onChange={(new_value)=>{
                                                                        setUnixTimestampStart(Date.parse(new_value)/1000);
                                                                    }
                                                                }
                                            />
                                        </Box>
                                    </Box>

                                    {/* End Time */}
                                    <Box>
                                        <Header title="End Time" variant="h4"/>
                                        <Box ml="5vh">
                                            <DatePicker onChange={(new_value)=>{
                                                                        setUnixTimestampEnd(Date.parse(new_value)/1000)
                                                                    }
                                                                }
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            {/* End option chase back */}
                        </Box>

                        {/* ((Row1: Part2): Row 2): Part 1 */}
                    

                        
                        <Box
                            mt="25px"
                            gridColumn="span 8"
                            gridRow="span 1"
                            // backgroundColor={colors.primary[400]}
                            display="flex"
                            justifyContent="center"
                        >
                            {/* <Header title="Fan Speed" variant="h5"/>
                            <Box
                                justifyContent="center"
                                alignItems="center"
                                mt={5}
                            >
                                <ProgressCircle/>
                            </Box> */}
                            {/* Control panel */}
                            <Box display="flex" 
                                // backgroundColor={colors.primary[400]} 
                                width="100%">
                                {/* Control Panel */}
                                <Box alignItems="center" width="100%">
                                    <ControlPanel/>
                                </Box>
                            </Box>
                        </Box>                        


                        {/* ((Row1: Part2): Row 2): Part 2 */}
                        <Box
                            mt="30px"
                            gridColumn="span 4"
                            gridRow="span 1"
                            // backgroundColor={colors.primary[400]}
                            // display="flex"
                            // // display="flex"
                            // justifyContent="center"
                            // alignItems="center"
                            // height="1000px"
                            // alignItems="stretch"  // Ensures the inner Control component stretches to fill the height
                        >
                            {/* <ControlPanel/> */}
                            {/* <Box flex={1}
                                ml={5}
                                justifyContent="flex-end"
                                >
                                <Header title="Fan speed Control" variant="h5"/>
                            </Box>*/}
                            
                            <Box 
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                // mr="50px"
                                // mt="20px"
                            >
                                <Control/>
                            </Box> 
                        </Box>
                        
                    </Box>
                </Box>

                
            </Box> 
        </Box>
        </div>
    )
}

export default Dashboard;



/*
<Box
gridColumn="span 4"
gridRow="span 2"
backgroundColor={colors.primary[400]}
>
    <Typography
        variant="h5"
        fontWeight="600"
        sx={{ padding: "30px 30px 0 30px" }}
    >
        Control
    </Typography>

    <Box 
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="400px" 
    mt="-100px"
    >
        <Control/>
    </Box>
</Box>

<Box
gridColumn="span 4"
gridRow="span 2"
backgroundColor={colors.primary[400]}
>
    

    <Box height="400px" mt="0px">
        <LineChartApex nameChart={'CO2 level'} id={id} time={time} value={co2} option={option}/>
    </Box>

</Box>

<Box
gridColumn="span 4"
gridRow="span 2"
backgroundColor={colors.primary[400]}
>

    <Box height="400px" mt="0px">
        <LineChartApex nameChart={'Co2 level again'} id={id} time={time} value={co2} option={option}/>
    </Box>

</Box>
 
 */