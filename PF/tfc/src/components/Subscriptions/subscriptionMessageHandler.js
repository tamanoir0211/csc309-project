import { useContext } from 'react';
import APISubscriptionMessageContext from '../../context/SubscriptionMessageContext';
import { Alert, AlertTitle } from '@mui/material';


const SubMessageHandler = () => {

    const { messages } = useContext(APISubscriptionMessageContext);
    console.log("the message is")
    console.log(messages)

    // useEffect(() => {
    //     if (map && latitude !== 0 && longitude !== 0) {
    //         const bounds = new window.google.maps.LatLngBounds(user_location);
    //         studios.map((marker) => (
    //             bounds.extend({ lat: parseFloat(marker.location.latitude), lng: parseFloat(marker.location.longitude) })
    //         ))
    //         map.fitBounds(bounds);
    //     }
    // }, [params])

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
        } else{
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