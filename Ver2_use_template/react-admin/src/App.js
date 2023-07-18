import { useState , createContext} from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
// import Form from "./scenes/form";
import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
import Landing from "./scenes/landing";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Welcome from "./scenes/welcome";
import SignIn from "./scenes/sign_in";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Footer from "./scenes/global/Footer";
import About from "./scenes/about";
import Contact from "./scenes/contact";

export const  UserContext = createContext();
function App() {
  const [isSignIn, setIsSignin] = useState(false)			//set true for debungging
  const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
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
                        {/* <Route path="/invoices" element={<Invoices />} /> */}
                        {/* <Route path="/form" element={<Form />} /> */}
                        <Route path="/bar" element={<Bar />} />
                        {/* <Route path="/pie" element={<Pie />} /> */}
                        <Route path="/line" element={<Line />} />
                        {/* <Route path="/faq" element={<FAQ />} /> */}
                        {/* <Route path="/calendar" element={<Calendar />} /> */}
                        <Route path="/geography" element={<Geography />} />
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
