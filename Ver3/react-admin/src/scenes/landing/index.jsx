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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';


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
        <Link to={to}/>
      </MenuItem>
    );
  };

const Landing = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const cards = [
        {
            image: "../../smartfarm/assets/room1.svg",
            title: "Farm 1",
            subtitle1: {
                name: "Temperature",
                value: `${100}`
            },
            subtitle2: {
                name: "Humidity",
                value: `${27}%`
            },
            subtitle3: {
                name: "Co2 Level",
                value: `${200} ppm`
            },
        },
        {
            image: "../../smartfarm/assets/room1.svg",
            title: "Farm 1",
            subtitle1: {
                name: "Temperature",
                value: `${100}`
            },
            subtitle2: {
                name: "Humidity",
                value: `${27}%`
            },
            subtitle3: {
                name: "Co2 Level",
                value: `${200} ppm`
            },
        },
        {
            image: "../../smartfarm/assets/room1.svg",
            title: "Farm 1",
            subtitle1: {
                name: "Temperature",
                value: `${100}`
            },
            subtitle2: {
                name: "Humidity",
                value: `${27}%`
            },
            subtitle3: {
                name: "Co2 Level",
                value: `${200} ppm`
            },
        },
        {
            image: "../../smartfarm/assets/room1.svg",
            title: "Farm 1",
            subtitle1: {
                name: "Temperature",
                value: `${100}`
            },
            subtitle2: {
                name: "Humidity",
                value: `${27}%`
            },
            subtitle3: {
                name: "Co2 Level",
                value: `${200} ppm`
            },
        },
        {
            image: "../../smartfarm/assets/room1.svg",
            title: "Farm 1",
            subtitle1: {
                name: "Temperature",
                value: `${100}`
            },
            subtitle2: {
                name: "Humidity",
                value: `${27}%`
            },
            subtitle3: {
                name: "Co2 Level",
                value: `${200} ppm`
            },
        },
        {
            image: "../../smartfarm/assets/room1.svg",
            title: "Farm 1",
            subtitle1: {
                name: "Temperature",
                value: `${100}`
            },
            subtitle2: {
                name: "Humidity",
                value: `${27}%`
            },
            subtitle3: {
                name: "Co2 Level",
                value: `${200} ppm`
            },
        }
    ];

    
    return (
        <Box m="20px">

            {/* HEADER */}
            <Container sx={{ py: 1 }} maxWidth="lg">
            {/* <Box mb="50px"> */}

                <Box display="flex" justifyContent="center" alignItems="center">
                    <h1>
                        Project Smart farm and building
                    </h1>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center" >
                    
                    {/* <p sx={{
                        textAlignVertical: "center",
                        textAlign: "center"
                        }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Tenetur saepe rem pariatur doloremque soluta consectetur enim? 
                        Optio accusantium quo quasi assumenda. 
                        Sed totam debitis quasi aspernatur voluptatibus, eum accusamus voluptatem!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                        Nostrum voluptates nobis id in, 
                        commodi repudiandae dolore eveniet deserunt ab quam 
                        voluptatem consectetur accusantium ducimus tenetur vero fugit voluptas amet sequi.
                    </p> */}

                    <Box
                        sx={{
                            // position: 'relative',
                            // backgroundColor: 'grey.800',
                            // color: '#fff',
                            mb: 2,
                            boxShadow: 1,
                            borderRadius: '5px',
                            backgroundImage: "../../smartfarm/assets/logo_lab.png",
                        }}
                        >
                        {/* Increase the priority of the hero background image */}
                        {<img src="../../smartfarm/assets/logo_lab.png" alt="NOT FOUND" />}
                    
                        {/* <Grid container>
                            <Grid item md={6}>
                            <Box
                                sx={{
                                position: 'relative',
                                p: { xs: 3, md: 6 },
                                pr: { md: 0 },
                                }}
                            >
                                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                                "..................."
                                </Typography>
                                <Typography variant="h5" color="inherit" paragraph>
                                "..................."
                                </Typography>
                                <Link variant="subtitle1" href="#">
                                "..................."
                                </Link>
                            </Box>
                            </Grid>
                        </Grid> */}

                        </Box>
                </Box>

                   {/* Readmore button  */}
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Link to="/about">
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
                                        Read more   
                                    </Button>
                    </Link> 
                </Box>  
            {/* </Box> */}
            </Container>
            {/* End HEADER */}


            {/* Body */}
            <main>
            <Container sx={{ py: 6 }} maxWidth="lg">    {/* This container is the most ouside*/}
                <Grid container spacing={5}>            {/* This Grid container is the one that make every child Grid inside in order*/}
                    {cards.map((card) => (
                    // {/* This function return an array of Grid component*/}          
                    <Grid item key={card} xs={12} sm={4} md={4}>  
                    {/* xs=collum's width sm={16} md={4} */}
                        <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                        <CardMedia
                            component="div"
                            sx={{
                            // 16:9
                            pt: '100%',
                            }}
                            image={card.image}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h4" component="h2" sx={{fontWeight: "bold"}}>
                                {card.title}
                            </Typography>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>
                                    {card.subtitle1.name}
                                </Typography>
                                <Typography>
                                    {card.subtitle1.value}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>
                                    {card.subtitle2.name}
                                </Typography>
                                <Typography>
                                    {card.subtitle2.value}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Typography>
                                    {card.subtitle3.name}
                                </Typography>
                                <Typography>
                                    {card.subtitle3.value}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Link to="/landing1/dashboard">
                                <Button 
                                    size="small"
                                    sx={{
                                        backgroundColor: colors.blueAccent[700],
                                        color: colors.grey[100],
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        padding: "5px 8px",
                                    }}
                                    >
                                    <DetailsIcon sx={{ mr: "10px" }} />
                                    Detail   
                                </Button>
                                {/* <Button size="small">View</Button>
                                <Button size="small">Edit</Button> */}
                            </Link>
                        </CardActions>
                        </Card>
                    </Grid>
                    ))}
                </Grid>
                </Container>
            </main>
            {/* End body */}

        </Box>
    )
}

export default Landing;