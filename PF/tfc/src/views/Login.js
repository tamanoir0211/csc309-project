import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

const theme = createTheme();


const LoginPage = () => {
    const { loginUser, loading, setLoading, incorrectCreds, setIncorrectCreds } = useContext(AuthContext);
    
    const handleSubmit = (e) => {

        setLoading(true);
        setIncorrectCreds(true);
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        loginUser(email, password);
        setLoading(false);
    };
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const incorrectPassword = (<Typography component="h1" variant="h5" color="red">
        Incorrect email or password
        </Typography>);

    const handlepasswordInput = (e) => {
        if (e.target.value.length < 6) {
            setPasswordError(true);
        }
        else {
            setPasswordError(false);
        }
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
        <Container maxWidth="xs" component="main">
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
                {incorrectCreds && incorrectPassword}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        onChange={handlepasswordInput}
                        error={passwordError}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={passwordError || emailError}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
    );
};

export default LoginPage;