import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import {useState, useEffect} from 'react';
import SignInModal from './components/SignInModal';
import Login from './views/Login';
import {StyledEngineProvider } from '@mui/material/styles';
// Views
import Account from './views/Account';
import { AuthProvider } from './context/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    color: 'black',
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <StyledEngineProvider injectFirst>
    <Router>

      <AuthProvider>
        <Routes>
          <Route element={<Login/>} path="/login" />
          <Route element={<Account/>} path="/account" />
        </Routes>

      </AuthProvider>
    </Router>
    </StyledEngineProvider>

  );
}

export default App;

    {/*<StyledEngineProvider injectFirst>*/}
      {/* <SignInModal 
        open={open} 
        handleClose={() => setOpen(false)}
        setCurrUser={setUser}
        handleSnackbarClick={(newState) => setSnackbar({ open: true, ...newState})}
        handleSnackbarClose={handleSnackbarClose}
      /> */}

          {/* <Routes>
            <Route path="/account" children={<Account/>}>
              <h1>Home</h1>
            </Route>
            <Route component={<Login/>} path="/login" />
          </Routes> */}
          // <Login/>
    // </StyledEngineProvider>