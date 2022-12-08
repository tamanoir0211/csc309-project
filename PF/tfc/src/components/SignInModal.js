import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function SignInModal(props) {
    const {open, handleClose} = props;
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    function handleEmail(e) {

    }

    function handlePassword(e) {

    }

    function handleSignIn() {

    }
    return (
        <Dialog 
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Sign in to access this page.
                </DialogContentText>
                <TextField className="email" label="Email" onChange={handleEmail} />
                <TextField className="password" label="Password" onChange={handlePassword}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSignIn} color="primary">
                    Sign In
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}