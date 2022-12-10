import AuthContext from "../context/AuthContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
const theme = createTheme();

const RegisterPage = () => {

    const {user, authTokens, loadUser, logoutUser, updateUser, setUser, setAuthTokens} = useContext(AuthContext);
    
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value, 
            password: e.target.password.value, 
            first_name: e.target.first_name.value, 
            last_name: e.target.last_name.value, 
            phone_number: e.target.phone_number.value
            //avatar: e.target.avatar.value
        };

        fetch('http://localhost:8000/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.status === 200){
                return res.json();
            }
            else{
                return null;
            }
        }).then((data) => {
            console.log("registered");
            window.location.href = "/login";
        })
    }



    const [passwordError, setPasswordError] = useState(false);
    const [password2Error, setPassword2Error] = useState(false);
    const [password1, setPassword1] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleFirstNameInput = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameInput = (e) => {
        setLastName(e.target.value);
    };

    const handlePhoneNumberInput = (e) => {
        setPhoneNumber(e.target.value);
    };


    const [password2, setPassword2] = useState("");
    const handlepasswordInput = (e) => {
        if (e.target.value.length < 6) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
        setPassword1(e.target.value);
        if (e.target.value !== password2) {
            setPassword2Error(true);
        } else {
            setPassword2Error(false);
        }
    };

    const handlepassword2Input = (e) => {
        if (e.target.value !== password1) {
            setPassword2Error(true);
        }
        else {
            setPassword2Error(false);
        }
        setPassword2(e.target.value);
    };

    const handleEmailInput = (e) => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(e.target.value)){
            setEmailError(true);
        } else {
            setEmailError(false);
        }

    };

    
    return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Typography component="h1" variant="h5">
        Register
    </Typography>
    <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailInput}
            error={emailError}
            helperText={emailError && "Please enter a valid email"}
        />
        <TextField
            margin="normal"
            fullWidth
            required
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
            required
            name="password2"
            label="Confirm Password"
            type="password"
            id="password2"
            onChange={handlepassword2Input}
            error={password2Error}
            helperText={password2Error && "Passwords don't match"}
        />
        <TextField
            margin="normal"
            fullWidth
            required
            id="first_name"
            label="First Name"
            name="first_name"
            onChange={handleFirstNameInput}
        />
        <TextField
            margin="normal"
            fullWidth
            required
            id="last_name"
            label="Last Name"
            name="last_name"
            onChange={handleLastNameInput}
        />
        <TextField
            margin="normal"
            id="phone_number"
            fullWidth
            required
            label="Phone Number"
            name="phone_number"
            onChange={handlePhoneNumberInput}
        />
        {/* <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
        >
            Upload Profile Picture
            <input
                type="file"
                id="avatar"
                hidden
            />
        </Button> */}
        <Button
            type="submit"
            fullWidth
            required
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={((passwordError || password2Error)) || emailError || (firstName === "" || lastName === "" || phoneNumber === "" || password1 === "")}
        >
            Register
        </Button>
    </Box>
    </Container>
    </ThemeProvider>
    
    )
}

export default RegisterPage;
