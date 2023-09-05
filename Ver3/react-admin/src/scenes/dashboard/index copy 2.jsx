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
import InformationTag from "../../components/InformationTag";
import AirQualityIndex from "../../components/AirQualityIndex";
import plan from "../../assets/plan.svg";
import { useLocation } from "react-router-dom";



const Dashboard = () => {
    // const backend_host = "27.71.227.1:800"
    const backend_host = host;
    const location = useLocation(); /*!< This is used to get the "state" component that is passed into <Link> */
    const data_passed_from_landingpage = location.state;
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
    const apiInformationTag = `http://${backend_host}/api/v1.1/monitor/data?room_id=${data_passed_from_landingpage.room_id}`;
    
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
        {/* COntainer of Dashboard and onverall condition */}
        <Container maxWtdth="xl">
            <Grid
                container="true"
                spacing={0}
                style={{
                    display: "flex",
                    height: "100%",
                }}
            >
                {/* empty Box  */}
                <Grid
                    item="true"
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >

                </Grid>
                {/* Header Dashboard */}
                <Grid
                    item="true"
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                >
                    <Box display="flex" 
                        flexDirection="column" 
                        // justifyContent="center" 
                        alignItems="center"
                        mt="40px"
                    >
                        <Header title="Dashboard" fontSize="60px"/>
                    </Box>
                </Grid>

                <Grid
                    item="true"
                    xs={12}
                    sm={12}
                    md={4}
                    lg={4}
                >
                    <Box width="100%" 
                            // sx={{backgroundColor: colors.blueAccent[800]}} 
                            alignItems="center">
                            <Box display="flex" justifyContent="center" marginTop="10px">
                                <Header title="Overall condition" />
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                {/* <ProgressCircle progress = "0.75" size = "200"/> */}
                                <AirQualityIndex aqi={100} />
                            </Box>
                        </Box>
                </Grid>
            </Grid>
        </Container>
        

        {/* Container of all componment */}
        <Container maxWidth="xl">
            {/* Container of Information, overall quality, controlling, image of room  */}
            <Grid
                container={true}
                spacing={0}
                style={{
                        display: "flex", 
                        height: "100%", 
                        // backgroundColor: "red"
                    }}

            >
                {/* Container of everything except image of room, this is set to the most left */}
                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={8}
                    container="true"
                    display="flex"
                    direction="column"
                    // alignItems="center"
                    // justifyItems="center"
                >
                    {/* line 1 is information and overall air quality */}
                    <Box
                        container="true"
                        display="flex"
                        direction="row"
                        // alignItems="center"
                        // justifyItems="center"
                        m={1}
                    >
                        {/* Information */}
                        <Box
                            width="100%"
                            // ml="80px"
                            // mt="20px"
                            >
                                <Box 
                                sx={{boxShadow: 1,
                                    borderRadius: '5px', 
                                    backgroundColor: "white"}}
                                >
                                    {/* <Box>
                                        <Box display="flex" justifyContent="center">
                                            <Header title="Information" fontSize="30px"/>
                                        </Box>
                                        <Box marginLeft={6} marginRight={6}>
                                            <Box display="flex">
                                                <Header title="Current conditions" fontSize="20px"/>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Header title="Temparature"/>
                                                <Header title={`${300} oC`}/>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Header title="Humidity"/>
                                                <Header title={`${100} %`}/>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Header title="Co2"/>
                                                <Header title={`${"..."} ...`}/>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Header title="TVOC"/>
                                                <Header title={`${"..."} ...`}/>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Header title="Light"/>
                                                <Header title={`${"..."} ...`}/>
                                            </Box>
                                            <Box display="flex" justifyContent="space-between">
                                                <Header title="Light"/>
                                                <Header title={`${"..."} ...`}/>
                                            </Box>
                                        </Box>
                                        
                                    </Box> */}

                                    <InformationTag url={apiInformationTag} callbackSetSignIn={callbackSetSignIn} time_delay={10000}/>
                                </Box>

                        </Box>
                        
                        {/* Overall conidtion */}
                        {/* <Box width="50%" 
                            // sx={{backgroundColor: colors.blueAccent[800]}} 
                            alignItems="center">
                            <Box display="flex" justifyContent="center" marginTop="10px">
                                <Header title="Overall condition" />
                            </Box>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <AirQualityIndex aqi={100} />
                            </Box>
                        </Box> */}
                    </Box>

                    {/* Controling */}
                    <Box mt="0px">
                        <Grid
                            container={true}
                            spacing={1}
                            // style={{display: "flex", height: "100%"}}
                        >
                            {/* auto control */}
                                <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={8}
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="center"
                                    justify="center"
                                    spacing={0}
                                    width="100%"
                                    // sx={{backgroundColor: "blue"}}
                                >
                                    <Box marginLeft="10px" marginBottom="10px">
                                        <Header title="Control Panel" fontSize="15px"/>
                                    </Box>
                                    <ControlPanel/>
                                </Grid>
                                
                                <Grid
                                    item={true}
                                    xs={12}
                                    sm={12}
                                    lg={4}
                                    display="flex"
                                    direction="column"
                                    alignItems="center"
                                    justify="center"
                                >
                                    <Header title="Manual Control" fontSize="15px"/>
                                    <Control/>
                            </Grid>  
                        </Grid>
                    </Box>

                </Grid>

                {/* Container of image */}
                <Grid
                    xs={12}
                    sm={12}
                    md={12}
                    lg={4}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    // style={{ height: "100%",}}
                    spacing={0}
                >
                    <Grid 
                        item={true}
                        style={{width: "100%", textAlign: "center"}}
                        mt="10px"
                    >
                        <p style={{fontWeight: 'bold', fontSize: "16px"}}>Map view</p>
                    </Grid>
                    <Grid 
                        item={true}
                        style={{width: "100%", display: "flex",  alignItems: "center"}}
                        
                    >
                        <img
                            alt="profile-room"
                            // width="100%"
                            // height="100%"
                            src={plan}
                            style={{ width: "100%", maxWidth: "100%", height: "auto", cursor: "pointer", borderRadius: "0%" }}
                        />
                    </Grid>
                </Grid>

            </Grid>

            {/* COntainer of data option and charts */}
            <Container maxWidth="lg"
                sx={{ marginTop: '20px' }}
            >
                <Box
                    container={true}
                    display="flex"
                    direction="row"
                    justifyContent="center"
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
                                    backgroundColor: colors.blueAccent[400],
                                    color: colors.grey[100],
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                onClick={()=>{
                                    // setApi(`http://${backend_host}/api/get/daily_data/${id}`)
                                    if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'year'))
                                    {
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
                                    backgroundColor: colors.blueAccent[400],
                                    color: colors.grey[100],
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                    padding: "8px 18px",
                                    }}
                                onClick={()=>{
                                    // setApi(`http://${backend_host}/api/get/secondly_data/${id}`)
                                    if(checkTimeOption(unixTimestampStart, unixTimestampEnd, 'month'))
                                    {
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
                                    backgroundColor: colors.blueAccent[400],
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
                                    backgroundColor: colors.blueAccent[400],
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
                </Box>
                {/* End option chase back */}

                {/* Container of Chart */}
                <Grid
                   container={true}
                   spacing={1}
                   style={{display: "flex", height: "100%"}} 
                   mt="10px"
                >
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
                </Grid>
                                    
            </Container>
                
        </Container>    
    </Box>
    </>
    );
}

export default Dashboard;

