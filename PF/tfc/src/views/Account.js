import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const theme = createTheme();

const AccountPage = () => {
    const {user, authTokens, loadUser, logoutUser, updateUser} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!user){
            loadUser();
        }
    }, [user]);

    const handleSubmit = (e) => {
        const data = {};
        if (e.target.first_name.value !== "" && e.target.first_name.value !== user.first_name)
            data.first_name = e.target.first_name.value;
        
        if (e.target.last_name.value !== "" && e.target.last_name.value !== user.last_name)
            data.last_name = e.target.last_name.value;
        

        if (e.target.phone_number.value !== "" && e.target.phone_number.value !== user.phone_number)
            data.phone_number = e.target.phone_number.value;
        

        if (e.target.password.value !== "" && e.target.password.value === e.target.password2.value)
            data.password = e.target.password.value;
        updateUser(data);

    };

    const [passwordError, setPasswordError] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);
    const [password1, setPassword1] = useState("");
    const handlepasswordInput = (e) => {
        if (e.target.value.length < 6) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
        setPassword1(e.target.value);
    };

    const handlepassword2Input = (e) => {
        if (e.target.value !== password1) {
            setPassword2Error(true);
        }
        else {
            setPassword2Error(false);
        }
    
    };


    return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="xs" component="main">
    <CssBaseline />
    <Box 
        sx={{ 
            mt: 8, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' }}
    >
        <Typography component="h1" variant="h5">
            Edit Account
        </Typography>
        <Typography component="h1" variant="h5">
            Email: {user.email}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                defaultValue={user.first_name}
            />
            <TextField
                margin="normal"
                fullWidth
                id="last_name"
                label="Last Name"
                name="last_name"
                defaultValue={user.last_name}
            />
            <TextField
                margin="normal"
                id="phone_number"
                fullWidth
                label="Phone Number"
                name="phone_number"
                defaultValue={user.phone_number}
            />
            <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handlepasswordInput}
                error={passwordError}
                helperText={passwordError && "Password must be at least 6 characters"}
            />
            <TextField
                margin="normal"
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                onChange={handlepassword2Input}
                error={password2Error}
                helperText={password2Error && "Passwords don't match"}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={(passwordError || password2Error) && (password1.length > 0)}
                >Update</Button>
        </Box>

        <Button fullWidth variant="contained" onClick={logoutUser}>Logout</Button>
    </Box>    
    </Container>
    </ThemeProvider>
    );
}

export default AccountPage;