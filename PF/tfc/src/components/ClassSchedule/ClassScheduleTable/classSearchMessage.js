import { useContext } from 'react';
import APIClassesContext from '../../../Contexts/APIClassesContext';
import { Alert, AlertTitle } from '@mui/material';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";


const EnrollMessageHandler = () => {

    const { enrollMsg } = useContext(APIClassesContext);
    console.log("the message is")
    console.log(enrollMsg)



    if (enrollMsg != null){
        if (enrollMsg.includes('Success')){
            return(
                <>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {enrollMsg}
                </Alert>
                </>
            )
        } else if(enrollMsg.toLowerCase().includes('payment')){
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {enrollMsg + ' '}<Link to={`/user/payment`}>Click here to set up payment information.</Link>
                    </Alert>
            )
        } else if(enrollMsg.toLowerCase().includes('already has')){
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {enrollMsg + ' '}<Link to={`/user/subscription`}>Click here to manage current subscription.</Link>
                    </Alert>
            )
        }
        else{
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {enrollMsg}
                    </Alert>
            )
        }
    }
    
}

export default EnrollMessageHandler;