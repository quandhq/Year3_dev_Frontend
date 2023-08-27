import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle, variant = "h2", fontSize }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box 
      // mb="10px"
    >
      <Typography
        // variant= {variant}
        color={colors.grey[100]}
        fontWeight="bold"
        fontSize= {fontSize}
        sx={{ m: "0 0 0 0" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
