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

const Dashboard = ({image}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const callbackSetSignIn = useContext(UserContext);
    const [id, setId] = useState(1);
    const [option, setOption] = useState(1);
    const [api, setApi] = useState(`http://127.0.0.1:8000/api/get/secondly_data/${id}`);
    const {temperature,humidity,co2,dust,sound,light,time} = useFetch(api, callbackSetSignIn);    //cái này là object destructor, fetch data for chart 

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Dashboard" subtitle="Welcome to your dashboard" />
            
                <Box>
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
                </Box>
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
                            setApi(`http://127.0.0.1:8000/api/get/daily_data/${id}`)
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
                            setApi(`http://127.0.0.1:8000/api/get/secondly_data/${id}`)
                            setOption(1);
                        }}
                    >
                        <HistoryToggleOffOutlinedIcon sx={{ mr: "10px" }} />
                        Second
                    </Button>
                </Box>
            </Box>

            {/* GRID & CHARTS , GRID for whole page, 12 columns*/}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="20px"
            >
                {/* Row 1  */}
                <Box
                gridColumn="span 4"
                gridRow="span 2"
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
                    height="400px" 
                    mt="-20px"
                    >
                        <img
                        alt="profile-user"
                        width="100%"
                        height="100%"
                        src={image}
                        // style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                </Box>

                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                >
                    {/* <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography> */}

                    <Box height="400px" mt="0px">   
                        <LineChartApex nameChart={'Temperature level'} id={id} time={time} value={temperature} option={option}/>

                        {/* <BarChart isDashboard={true}/> */}
                    </Box>
                </Box>

                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                >
                    {/* <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography> */}

                    <Box height="400px" mt="0px">
                        {/* <BarChart isDashboard={true} /> */}
                        <LineChartApex nameChart={'Humidity level'} id={id} time={time} value={humidity} option={option}/>
                    </Box>
                </Box>

                {/* Row 2 */}
                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                >
                    {/* 3 columns and 2 row for chart */}
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
                    {/* 3 columns and 2 row for chart */}
                    {/* <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography> */}

                    <Box height="400px" mt="0px">
                        {/* <BarChart isDashboard={true} /> */}
                        <LineChartApex nameChart={'CO2 level'} id={id} time={time} value={co2} option={option}/>
                    </Box>

                </Box>

                <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                >
                    {/* 3 columns and 2 row for chart */}
                    {/* <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ padding: "30px 30px 0 30px" }}
                    >
                        Sales Quantity
                    </Typography> */}

                    <Box height="400px" mt="0px">
                        {/* <BarChart isDashboard={true} /> */}
                        <LineChartApex nameChart={'Light level'} id={id} time={time} value={light} option={option}/>
                    </Box>

                </Box>
            </Box> 
        </Box>
    )
}

export default Dashboard;