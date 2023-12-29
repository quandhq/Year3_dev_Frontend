import { useState , createContext} from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Dashboard from "./scenes/dashboard";
import Landing from "./scenes/landing";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignIn from "./scenes/signIn";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Footer from "./scenes/global/Footer";
import About from "./scenes/about";
import Contact from "./scenes/contact";
import Configuration from "./scenes/configuration/Configuration";
import SignUp from "./scenes/signUp";
import Weatherdata from "./scenes/weatherdata/Weatherdata";

const debug_mode = false;
// export const host = "27.71.227.1:8002";
export const host = "localhost:8000";


export const  UserContext = createContext();
function App() {
    const [isSignIn, setIsSignin] = useState(debug_mode);		//set true for debungging
    const [signUp, setSignUp] = useState(false);
    const [theme, colorMode] = useMode();
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <UserContext.Provider value={setIsSignin}>
        {
            !isSignIn ?
            <>
                {!signUp && <SignIn setSignUp={setSignUp} setIsSignin={setIsSignin}/>}
                {signUp && <SignUp setSignUp={setSignUp}/>}
            </>
            :
            <>
                <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
        
                    <div className="app">			
                    <main className="content">
                        <Topbar setIsSignin={setIsSignin}/>

                        <Routes>
                            <Route path="" element={<Landing />} />
                            <Route path="/landing/dashboard" element={<Dashboard/>} />
                            <Route path="/landing" element={<Landing />} />
                            {
                                localStorage.getItem("is_superuser").toString() === "1"
                                &&
                                <Route path="/configuration" element={<Configuration />} />
                            }
                            <Route path="/weatherdata" element={<Weatherdata/>} />
                        </Routes>

                        <Footer/>
                    </main>
                    </div>
                </ThemeProvider>
                </ColorModeContext.Provider>
            </>
        }
        </UserContext.Provider>
        </LocalizationProvider>
    );
}

export default App;
