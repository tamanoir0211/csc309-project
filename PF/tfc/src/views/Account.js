import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
//import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const theme = createTheme();
const AccountPage = () => {
    const {user, authTokens, loadUser} = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (!user){
            loadUser();
        }
    }, [user]);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="sm" component="main">
                <CssBaseline />
                <Box 
                    sx={{ 
                        mt: 8, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center' }}
                >
                    <Typography component="h1" variant="h5">
                        Email: {user.email}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        First Name: {user.first_name}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Last Name: {user.last_name}
                    </Typography>
                    <Typography component="h1" variant="h5">
                        Phone Number: {user.phone_number}
                    </Typography>

                </Box>    
            </Container>
        </ThemeProvider>
    );
}

export default AccountPage;