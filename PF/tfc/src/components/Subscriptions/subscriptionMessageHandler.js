import { useContext } from 'react';
import APISubscriptionMessageContext from '../../context/SubscriptionMessageContext';
import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";


const SubMessageHandler = () => {

    const { messages } = useContext(APISubscriptionMessageContext);
    console.log("the message is")
    console.log(messages)



    if (messages != null){
        if (messages.includes('Success')){
            return(
                <>
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    You have been subscribed!
                </Alert>
                </>
            )
        } else if(messages.toLowerCase().includes('payment')){
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {messages + ' '}<Link to={`/user/payment`}>Click here to set up payment information.</Link>
                    </Alert>
            )
        } else if(messages.toLowerCase().includes('already has')){
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {messages + ' '}<Link to={`/user/subscription`}>Click here to manage current subscription.</Link>
                    </Alert>
            )
        }
        else{
            return(
                <Alert severity="error">
                    <AlertTitle>You encountered a problem:</AlertTitle>
                    {messages}
                    </Alert>
            )
        }
    }
    
}

export default SubMessageHandler;