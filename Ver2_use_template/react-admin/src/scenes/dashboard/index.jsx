import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import { LineChartApex } from "../../components/ApexChart/LineChartApex";
import { BarChartApex } from "../../components/ApexChart/BarChartApex";
import useFetch from "../../data/dataFetch";
import { useState } from "react";
import Control  from "../../components/GaugeChart/Control";

const Dashboard = ({image}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [id, setId] = useState(1); 
    const chart_data_api = `http://127.0.0.1:8000/api/get/${id}`   
    const {temperature,humidity,co2,dust,sound,light,time} = useFetch(chart_data_api);    //cái này là object destructor, fetch data for chart 

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
                        <LineChartApex nameChart={'Temperature level'} id={id} time={time} value={temperature}/>

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
                        <LineChartApex nameChart={'Humidity level'} id={id} time={time} value={humidity}/>
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
                        <LineChartApex nameChart={'CO2 level'} id={id} time={time} value={co2}/>
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
                        <LineChartApex nameChart={'Light level'} id={id} time={time} value={light}/>
                    </Box>

                </Box>
            </Box> 
        </Box>
    )
}

export default Dashboard;