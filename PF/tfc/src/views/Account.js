import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Account(props) {
    const {currUser, setCurrUser, handleSnackbarClick} = props;

    const [drawerItem, setDrawerItem] = useState("Account Settings");
    const [open, setOpen] = useState(false);
    const [newEmail, setNewEmail] = useState("");
    const []
}