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
import useFetch from "../../data/dataFetchTestAuthentication";
import { useState, useContext } from "react";
import Control  from "../../components/GaugeChart/Control";
import { UserContext } from "../../App";
import ProgressCircle from "../../components/ProgressCircle";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import MultipleYAxis from "../../components/ApexChart/MixChartApex";


const Dashboard = ({image}) => {
    const backend_host = "27.71.227.1"
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const callbackSetSignIn = useContext(UserContext);
    const [id, setId] = useState(1);
    const [option, setOption] = useState(1);
    const [api, setApi] = useState(`http://${backend_host}/api/get/secondly_data/${id}`); 
    const {co2, temp, hum, time} = useFetch(api, callbackSetSignIn);    //cái này là object destructor, fetch data for chart 

    return (
        <div>
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
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
               

            {/* data chase back option */}
            <Box display="flex"  alignItems="center">
                <Header title="Data options" variant="h3"/>

                <Box mb="30px" ml="5px">
                    <Button
                        sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "2px 5px",
                        }}
                        onClick={()=>{
                            setApi(`http://${backend_host}/api/get/daily_data/${id}`)
                            setOption(2);
                        }}
                    >
                        <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                        Day
                    </Button>
                </Box>
                

                <Box mb="30px" ml="5px">
                    <Button
                        sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "2px 5px",
                        }}
                        onClick={()=>{
                            setApi(`http://${backend_host}/api/get/secondly_data/${id}`)
                            setOption(1);
                        }}
                    >
                        <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                        Second
                    </Button>
                </Box>
            </Box>

            {/* Control Panel */}
            <Box alignItems="center">
                <Box width="40%">
                    <ControlPanel/>
                </Box>
                {/* <Control/> */}
            </Box>

            {/* GRID & CHARTS , GRID for whole page, 12 columns*/}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="10px"
            >
            {/* Row 1  */}
                {/* Row 1: Part 1 */}
                <Box
                    gridColumn="span 5"
                    gridRow="span 4"
                    backgroundColor={colors.primary[400]}
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
                        width="100%"
                        height="100%"
                        src={image}
                        // style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                </Box>
                {/* Row 1: Part 2*/}
                <Box
                gridColumn="span 7"
                gridRow="span 4"
                // backgroundColor={colors.primary[400]}
                >
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(12, 1fr)"
                        gridAutoRows="140px"
                        gap="10px"
                    >
                    {/* Row1: Part2 : Row 1 */}
                        {/* Row1: Part2 : Row 1: Part 1 */}
                        <Box
                            gridColumn="span 6"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                        >
                            <Box height="400px" mt="0px">   
                                <MultipleYAxis nameChart={'Temperature and Humidity level'} 
                                                id={id} 
                                                time={time} 
                                                temperature={temp} 
                                                humidity={hum} 
                                                option={option}
                                />
                            </Box>
                        </Box>

                        {/* Row 1: Part2: Row 1: Part2 */}
                        <Box
                            gridColumn="span 6"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                        >
                            <Box height="400px" mt="0px">   
                                <LineChartApex nameChart={'Co2 level'} 
                                                id={id} 
                                                time={time} 
                                                value={co2} 
                                                option={option}/>
                            </Box>
                        </Box>

                    {/* Row1: Part2: Row 2 */}
                        {/* Row1: Part2: Row 2: Part 1 */}

                        <Box
                            gridColumn="span 7"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            // alignItems="stretch"  // Ensures the inner Control component stretches to fill the height
                        >
                            {/* <ControlPanel/> */}
                            <Box flex={1}
                                ml={5}
                                justifyContent="flex-end"
                                >
                                <Header style={{ height: '100%' }} title="Fan speed Control" variant="h4"/>
                            </Box>
                            
                            <Box flex={3} ml={0}
                            justifyContent="center"
                            alignItems="center">
                                <Control/>
                            </Box>
                        </Box>
                        


                        {/* Row1: Part2: Row 2: Part 2 */}
                        <Box
                            marginLeft="10%"
                            gridColumn="span 5"
                            gridRow="span 2"
                            backgroundColor={colors.primary[400]}
                            display="flex"
                            justifyContent="center"
                        >
                            <Header title="Fan Speed" variant="h5"/>
                            <Box
                                justifyContent="center"
                                alignItems="center"
                                mt={5}
                            >
                                <ProgressCircle/>
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