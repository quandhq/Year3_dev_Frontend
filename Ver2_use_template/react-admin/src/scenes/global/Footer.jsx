import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://hust.edu.vn/">
          hust
        </Link>
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Footer = (props) => {
    const footers = [
        {
            title: "Phone",
            icon: (<CallIcon/>),
            description: "Phone: ........................."
        },
        {
            title: "Email",
            icon: (<EmailIcon/>),
            description: "Email: ..........................",
        },
        {
            title: "Address",
            icon: (<LocationOnIcon/>),
            description: "Address: .......................",
        },
      ];
      
      // TODO remove, this demo shouldn't need to reset the theme.
      const defaultTheme = createTheme();

    return (
        <Container
            maxWidth="md"
            component="footer"
            sx={{
                borderTop: (theme) => `1px solid ${theme.palette.divider}`,
                mt: 8,
                py: [3, 6],
            }}
        >
            <Grid container spacing={4} justifyContent="space-evenly">
                <Grid item xs={6} sm={3}>
                    <Box 
                        display="flex"
                        justifyContent="center"
                    >
                        <Typography variant="h4" color="text.primary" gutterBottom>
                        Smart Farm
                        </Typography>
                    </Box>

                    {footers.map((footer) => (
                        <Box key= {footer.title} display="flex" gap="10px">
                            <Box>
                                {footer.icon}
                            </Box>
                            <Box>
                                <Typography variant="h6" color="text.primary" gutterBottom>
                                {footer.description}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Grid>

                <Grid item xs={6} sm={3}>
                    <Box 
                        display="flex"
                        justifyContent="center"
                    >
                        <Typography variant="h4" color="text.primary" gutterBottom>
                            Social
                        </Typography>
                    </Box>
                    <Box 
                        display="flex" 
                        justifyContent="center"
                    >
                        <Link color="inherit" href="https://hust.edu.vn/">
                            <GoogleIcon/>
                        </Link>
                        <Link color="inherit" href="https://hust.edu.vn/">
                            <FacebookIcon/>
                        </Link>
                    </Box>
                </Grid>

                {/* <Grid item xs={6} sm={3}>
                    3
                </Grid> */}

            
            </Grid>
            <Copyright sx={{ mt: 5 }} />

        </Container>
    );
}

export default Footer;