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
import { Link } from "react-router-dom";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DetailsIcon from '@mui/icons-material/Details';


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

const Landing = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    
    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Landing" subtitle="Welcome to Landing page" />
            

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
                        Download 
                    </Button>
                </Box> */}
            </Box>   

            {/* GRID & CHARTS , GRID for whole page, 12 columns*/}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="10px"
            >
                {/* Row 1  */}
                <Box
                gridColumn="span 6"
                gridRow="span 4"
                backgroundColor={colors.primary[400]}
                >
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                            >
                            Cart 1
                        </Typography>
                    </Box>

                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center" 
                    >
                        <Link to="/landing1/dashboard">
                            <Button
                                sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                }}
                            >
                                <DetailsIcon sx={{ mr: "10px" }} />
                                Details    
                            </Button>
                        </Link>
                    </Box>

                    {/* <Box height="400px" mt="-100px">    */}
                    <Box 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="400px" 
                    mt="50px"
                    >
                        <img
                        alt="profile-user"
                        width="150%"
                        height="150%"
                        src={`../../assets/room1.svg`}
                        // style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    {/* </Box> */}
                </Box>

                <Box
                gridColumn="span 6"
                gridRow="span 4"
                backgroundColor={colors.primary[400]}
                >
                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    >
                        <Typography
                            variant="h5"
                            fontWeight="600"
                            sx={{ padding: "30px 30px 0 30px" }}
                            >
                            Cart 1
                        </Typography>
                    </Box>

                    <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center" 
                    >
                        <Link to="/landing1/dashboard">
                            <Button
                                sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "10px 20px",
                                }}
                            >
                                <DetailsIcon sx={{ mr: "10px" }} />
                                Details    
                            </Button>
                        </Link>
                    </Box>

                    {/* <Box height="400px" mt="-100px">    */}
                    <Box 
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="400px" 
                    mt="50px"
                    >
                        <img
                        alt="profile-user"
                        width="150%"
                        height="150%"
                        src={`../../assets/room1.svg`}
                        // style={{ cursor: "pointer", borderRadius: "50%" }}
                        />
                    </Box>
                    {/* </Box> */}
                </Box>
            </Box> 
        </Box>
    )
}

export default Landing;