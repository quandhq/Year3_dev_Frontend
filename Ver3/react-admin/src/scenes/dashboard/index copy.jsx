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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Control  from "../../components/GaugeChart/Control";
import { UserContext } from "../../App";
import ProgressCircle from "../../components/ProgressCircle";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import MultipleYAxis from "../../components/ApexChart/MixChartApex";
import { DatePicker } from "@mui/x-date-pickers";
import { FetchTest } from "../../data/testing_dataFetchAuthentication";
import { FetchCopy } from "../../data/dataFetchAuthentication copy";
import { Chart } from "../../data/Chart";
import {host} from "../../App";
import { TroubleshootRounded } from "@mui/icons-material";
import { Slider } from '@mui/material';



const Dashboard = () => {
    // const backend_host = "27.71.227.1:800"
    const backend_host = host;

    
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
    <>
    <Box 
        component="main"
        sx={{
            flexGrow: 1,
            // py: 8
        }}
        m="10px"
    >
        <Box display="flex" justifyContent="center" alignItems="center" mb="5vh">
            <Header title="Dashboard" fontSize="60px"/>
        </Box>

        {/* Container of image and all charts */}
        <Container maxWidth="xl">
            <Grid
                container={true}
                spacing={1}
                style={{display: "flex", height: "100%"}}
            >
                {/* Container of image and other Item*/}
                <Grid
                    item={true}
                    xs={12}
                    sm={6}
                    lg={3}
                    container={true}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ height: "100%" }}
                    spacing={0}
                >
                    <Grid 
                        item={true}
                        style={{width: "100%", textAlign: "left"}}
                        mt="2vh"
                    >
                        <p style={{fontWeight: 'bold', fontSize: "16px"}}>Map view</p>
                    </Grid>
                    <Grid 
                        item={true}
                        style={{width: "100%", display: "flex", justifyContent: "center"}}
                    >
                        <img
                            alt="profile-room"
                            // width="100%"
                            // height="100%"
                            src={`../../smartfarm/assets/plan.svg`}
                            style={{ width: "100%", maxWidth: "100%", height: "auto", cursor: "pointer", borderRadius: "0%" }}
                        />
                    </Grid>
                </Grid>
                {/* Container of charts and history option */}
                <Grid
                    // item={true}
                    xs={12}
                    sm={6}
                    lg={9}
                    container={true}
                    direction="column"
                    alignItems="center"     //horizontally
                    justify="center"        //vertically
                    spacing={0}
                >
                    {/* Container of 2 Charts */}
                    <Box
                        container={true}
                        style={{width: "100%", display: "flex", justifyContent: "center"}}
                        m={2}
                    >
                        {/* Charts*/}
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
                    </Box>

                    {/* Container of history option */}
                    <Box
                            container={true}
                            display="flex"
                            direction="row"
                            justifyContent="center"
                            m={2}
                        >
                                {/* calendar */}
                                <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    alignItems="center"
                                >
                                    {/* Start Time */}
                                    <Box>
                                        <Header title="Start Time" fontSize="15px"/>
                                        <DatePicker onChange={(new_value)=>{
                                                                    setUnixTimestampStart(Date.parse(new_value)/1000);
                                                                }
                                                            }
                                        />
                                    </Box>
                                    <Box m={1} mt="5vh">
                                        {/* <Header title="-:-" fontSize="30px"/> */}
                                    </Box>
                                    {/* End Time */}
                                    <Box>
                                        <Header title="End Time" fontSize="15px"/>
                                        <DatePicker onChange={(new_value)=>{
                                                                    setUnixTimestampEnd(Date.parse(new_value)/1000)
                                                                }
                                                            }
                                        />
                                    </Box>
                                </Box>
                                <Box m={4}/>
                                {/* 3 buttons */}
                                <Box 
                                    display="flex" 
                                    justifyContent="center" 
                                    alignItems="center"
                                    mt="22px"
                                    >
                                    {/* <Header title="Data options" variant="h3"/> */}
                                        <Button
                                            sx={{
                                                backgroundColor: colors.blueAccent[700],
                                                color: colors.grey[100],
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                padding: "8px 18px",
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
                                        <Box m={0.5} />
                                        <Button
                                            sx={{
                                                backgroundColor: colors.blueAccent[700],
                                                color: colors.grey[100],
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                padding: "8px 18px",
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
                                        <Box m={0.5} />
                                        <Button
                                            sx={{
                                                backgroundColor: colors.blueAccent[700],
                                                color: colors.grey[100],
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                padding: "8px 18px",
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
                                        <Box m={0.5} />
                                        <Button
                                            sx={{
                                                backgroundColor: colors.blueAccent[700],
                                                color: colors.grey[100],
                                                fontSize: "15px",
                                                fontWeight: "bold",
                                                padding: "8px 18px",
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
                            {/* End option chase back */}
                        </Box>
                </Grid>
                
                {/* Container of auto controlling */}
                <Grid
                    item={true}
                    mt={8}
                    xs={12}
                    sm={12}
                    lg={8}
                    container={true}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ height: "100%" }}
                    spacing={0}
                >
                    <ControlPanel/>
                </Grid>
                {/* Container of manual controlling */}
                <Grid
                    mt={2}
                    xs={12}
                    sm={12}
                    lg={4}
                >
                    <Header title="Manual" fontSize="15px"/>
                    <Control/>
                </Grid>
                


            </Grid>
        </Container>    
    </Box>
    </>
    );
}

export default Dashboard;

