import { Box, IconButton, useTheme, Typography, Fade } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PhoneIcon from '@mui/icons-material/Phone';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import logo from '../../assets/logo_lab.png'

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const username = localStorage.getItem("username");

  return (
    <Box display="flex" justifyContent="space-between"
					paddingRight={2}
					paddingLeft={2}
					backgroundColor="black"
					>
		<Box display="flex">

				{/* IMGAGE */}
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					width={100} // Adjust the width of the inner Box component as needed
					height={50} // Adjust the height of the inner Box component as needed
					>
					<img
					alt="profile-user"
					//   width="200px"
					//   height="100px"
					style={{ maxWidth: '120%', maxHeight: '120%' }}
					src={logo}
					// style={{ cursor: "pointer", borderRadius: "50%" }}
					/>
				</Box>


				{/* LANDING LINK */}
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%">
					<Link to="/landing">
						<IconButton>
							<HomeIcon style={{ fill: 'white' }}/>
							<Typography variant="h5" 
										color="white"
										display="inline"
										paddingLeft="5%">
								Home
							</Typography>
						</IconButton>	
					</Link>
				</Box>

				{/* About us */}
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%">
					<Link to="/about">
						<IconButton>
							<PeopleIcon style={{ fill: 'white' }}/>
							<Typography variant="h5" 
										color="white" 
										display="inline"
										paddingLeft="5%">
								About
							</Typography>
						</IconButton>	
					</Link>
				</Box>

				{/* Contact */}
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%">
					<Link to="/contact">
						<IconButton >
							<PhoneIcon style={{ fill: 'white' }}/>
							<Typography variant="h5" 
										color="white" 
										display="inline"
										paddingLeft="5%">
								Contact
							</Typography>
						</IconButton>	
					</Link>
				</Box>

                {/* Config */}
				<Box display="flex"
					justifyContent="center"
					alignItems="center"
					paddingLeft="5%">
					<Link to="/configuration">
						<IconButton >
							<SettingsIcon style={{ fill: 'white' }}/>
							<Typography variant="h5" 
										color="white" 
										display="inline"
										paddingLeft="5%">
								Configuration
							</Typography>
						</IconButton>	
					</Link>
				</Box>
		</Box>

		{/* ICONS */}
		<Box display="flex">
				{/* <IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "light" ? (
					<DarkModeOutlinedIcon />
					) : (
					<LightModeOutlinedIcon />
					)}
				</IconButton> */}

				{/* <IconButton>
					<NotificationsOutlinedIcon />
				</IconButton> */}

				{/* <IconButton>
					<SettingsOutlinedIcon />
				</IconButton> */}
				
				<Box display="flex" alignItems="center"> {/* Wrap the icon and text in a Box component */}
					<IconButton>
						<PersonOutlinedIcon style={{ fill: 'white' }}/>
					</IconButton>

					<Typography variant="h5" color="white" display="inline">
						Welcome {username}
					</Typography>
				</Box>

				{/* <IconButton>
					<PersonOutlinedIcon/>
				</IconButton>

				<Typography variant="h5" color={colors.greenAccent[400]} display="inline">
				Hello
				</Typography> */}
		</Box>
	</Box>
  );
};

export default Topbar;
