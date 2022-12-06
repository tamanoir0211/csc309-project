import logo from './logo.svg';
import './App.css';
import { StylesProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {useState, useEffect} from 'react';
import SignInModal from './components/SignInModal';


// Views
import Account from './views/Account';

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
    <StylesProvider injectFirst>
      <SignInModal 
        open={open} 
        handleClose={() => setOpen(false)}
        setCurrUser={setUser}
        handleSnackbarClick={(newState) => setSnackbar({ open: true, ...newState})}
        handleSnackbarClose={handleSnackbarClose}
      />

      <Router>
        <div>
          <Switch>
            <Route path="/account" children={<Account/>}>
              <h1>Home</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    </StylesProvider>

  );
}

export default App;
