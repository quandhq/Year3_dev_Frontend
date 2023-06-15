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


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const username = localStorage.getItem("username");

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
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
					style={{ maxWidth: '100%', maxHeight: '100%' }}
					src={`../../assets/logo-dai-hoc-bach-khoa.png`}
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
							<HomeOutlinedIcon/>
							<Typography variant="h5" 
										color={colors.grey[100]} 
										display="inline"
										paddingLeft="5%">
								Landing
							</Typography>
						</IconButton>	
					</Link>
				</Box>

			{/* SEARCH BAR */}
			{/* <Box
				// display="flex"
				backgroundColor={colors.primary[400]}
				// borderRadius="3px"
				justifyContent="left"
			>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />

				<IconButton type="button" sx={{ p: 1 }}>
				<SearchIcon />
				</IconButton>
			</Box> */}
		</Box>

		{/* ICONS */}
		<Box display="flex">
				<IconButton onClick={colorMode.toggleColorMode}>
					{theme.palette.mode === "dark" ? (
					<DarkModeOutlinedIcon />
					) : (
					<LightModeOutlinedIcon />
					)}
				</IconButton>

				{/* <IconButton>
					<NotificationsOutlinedIcon />
				</IconButton> */}

				{/* <IconButton>
					<SettingsOutlinedIcon />
				</IconButton> */}
				
				<Box display="flex" alignItems="center"> {/* Wrap the icon and text in a Box component */}
					<IconButton>
						<PersonOutlinedIcon />
					</IconButton>

					<Typography variant="h5" color={colors.greenAccent[400]} display="inline">
						Hi {username}
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
