import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { UserContext } from '../../App';

function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="https://mui.com/">
			HUST
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function SignIn() {
  // const backend_host = "27.71.227.1";
  const backend_host = "localhost:8000";




	const callbackSetIsSignIn = useContext(UserContext);
	/*
	*brief: function to get token-authentication from user 
	*return: boolean, true if the access-token is still valid, false otherwise
	*/
    const getAuthentication  = async (username, password) =>
    {
        //call the API to get user authentication
        const get_authentication_API_endpoint = `http://${backend_host}/api/token`;
        const get_authentication_API_data = 
        {
            "username": username, 
            "password": password,
        };
        const get_authentication_API_option = 
        {
			"method": "POST",
			"headers": 
			{
				"Content-Type": "application/json",
			},
			"body": JSON.stringify(get_authentication_API_data), 
		}
		const get_authentication_API_response = await fetch(get_authentication_API_endpoint, get_authentication_API_option);
		const get_authentication_API_response_data = await get_authentication_API_response.json();
		console.log(get_authentication_API_response_data);
		if(get_authentication_API_response.status !== 200)
		{
			return false;
		}
		else if(get_authentication_API_response.status === 200 && 
				get_authentication_API_response_data.hasOwnProperty("access") &&
				get_authentication_API_response_data.hasOwnProperty("refresh"))
		{
			localStorage.setItem("access", get_authentication_API_response_data["access"]);
			localStorage.setItem("refresh", get_authentication_API_response_data["refresh"]);
		}
		else
		{
			throw new Error("Cannot get access and refresh token or user is not authenticated ...");
		}
		return true;
     }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data)
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
	localStorage.setItem("username", data.get('username'))
	let isAuthenticated = null;
	try
	{
		isAuthenticated = await getAuthentication(data.get("username"), data.get("password"));
	}
	catch(err)
	{
		alert(err);
		callbackSetIsSignIn(false);
	}
	if(isAuthenticated === true)
	{
		callbackSetIsSignIn(true);
	}
	else
	{
		alert("Cannot call to get_authentication_API....");
	}
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {/* Forgot password? */}
                </Link>
              </Grid>

              <Grid item>
                <Link href="#" variant="body2">
                  {/* {"Don't have an account? Sign Up"} */}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}