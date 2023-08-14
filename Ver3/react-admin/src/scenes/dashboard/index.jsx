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
import {Fetch, verifyAccessToken, verifyRefreshToken} from "../../data/dataFetchAuthentication"
import { FetchHistory } from "../../data/dataHistoryFetchAuthentication";
import { useState, useContext } from "react";


import Control  from "../../components/GaugeChart/Control";
import { UserContext } from "../../App";
import ProgressCircle from "../../components/ProgressCircle";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import MultipleYAxis from "../../components/ApexChart/MixChartApex";
import { DatePicker } from "@mui/x-date-pickers";
import { FetchTest } from "../../data/testing_dataFetchAuthentication";
import { FetchCopy } from "../../data/dataFetchAuthentication copy";
import { Chart } from "../../data/Chart";


const Dashboard = () => {
    // const backend_host = "27.71.227.1:800"
    const backend_host = "localhost:8000"

    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const callbackSetSignIn = useContext(UserContext);
    const [id, setId] = useState(1);
    const [optionData, setOptionData] = useState("now");        //change option to show different Chart
    // const [optionChartData, setOptionChartData] = useState("day")   //change option to make different url
    const [optionChartData, setOptionChartData] = useState("now")
    const [unixTimestampStart, setUnixTimestampStart] = useState(0);
    const [unixTimestampEnd, setUnixTimestampEnd] = useState(0);
    const apiRealtimeChart = `http://${backend_host}/api/v1.1/monitor/data?farm_id=1`; 
    // const dataRealtimeChart = Fetch(apiRealtimeChart, callbackSetSignIn, 8000, 'now');   //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const dataRealtimeChart = null

    // console.log("ENDING REALTIME")
    const apiHistoryChart = `http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`;
    const [apiHistoryChartState, setApiHistoryChartState] = useState(apiHistoryChart)
    // console.log("RRRRRRRRRreload component")
    // const dataHistoryChart = Fetch(apiHistoryChartState, callbackSetSignIn, 0, optionChartData); >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const dataHistoryChart = null 

    // console.log(dataHistoryChart)
    // console.log(dataRealtimeChart)
    console.log("ENdng loading HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHistory chart")



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
                        <>
                            {
                                optionChartData === "now" ?
                                <Chart url={apiRealtimeChart} 
                                        callbackSetSignIn={callbackSetSignIn} 
                                        timedelay={5000} 
                                        optionData={optionChartData}/>
                                :
                                <Chart url={apiHistoryChart} 
                                        callbackSetSignIn={callbackSetSignIn} 
                                        timedelay={0} 
                                        optionData={optionChartData}/>
                            }
                        </>

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
                                                    alert("done clear real time chart")
                                                    
                                                    setOptionData("year")
                                                    setOptionChartData("year")
                                                    console.log("Set option to Year")
                                                    setApiHistoryChartState(`http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`)
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
                                                    alert("done clear real time cahrt")
                                                    
                                                    setOptionData("month")
                                                    setOptionChartData("month")
                                                    console.log("SSSSSSSSSSSSSSSSset option to month")
                                                    setApiHistoryChartState(`http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`)
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
                                                    alert("done clear real time cahrt")
                                                    
                                                    setOptionData("day")
                                                    setOptionChartData("day")
                                                    console.log("SSSSSSSSSSSSSSSSset option to day")
                                                    setApiHistoryChartState(`http://${backend_host}/api/v1.1/monitor/data/history?farm_id=1&time_start=${unixTimestampStart}&time_end=${unixTimestampEnd}&option=${optionChartData}`)
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
                                                    setOptionChartData("now")
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

