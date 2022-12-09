import { useContext } from 'react';
import APIDropClassContext from '../../Contexts/APIDropClassContext';
import { Alert, AlertTitle } from '@mui/material';
import {Link} from "react-router-dom";


const DropMessageHandler = () => {

    const { dropMsg } = useContext(APIDropClassContext);
    console.log("the message is")
    console.log(dropMsg)


    if (dropMsg != null){
        if (dropMsg.includes('Success')){
            return(
                <>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {dropMsg}
                </Alert>
                </>
            )
        } else{
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {dropMsg}
                    </Alert>
            )
        }
    }
}

export default DropMessageHandler;