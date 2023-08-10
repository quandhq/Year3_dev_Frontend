import { useState , createContext} from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
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

export const  UserContext = createContext();
function App() {
  const [isSignIn, setIsSignin] = useState(false)			//set to true for debungging
  const [theme, colorMode] = useMode();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserContext.Provider value={setIsSignin}>
      {
        !isSignIn ?
        <>
          <SignIn/>
        </>
        :
          <>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline/>
      
                <div className="app">				
                  <main className="content">
                      <Topbar/>

                      <Routes>
                        <Route path="" element={<Landing />} />
                        <Route path="/landing1/dashboard" element={<Dashboard/>} />
                        <Route path="/landing" element={<Landing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
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
