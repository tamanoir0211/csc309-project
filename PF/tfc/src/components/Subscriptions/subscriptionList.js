import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function Subscribe(props) {

    const [sub, setSubscription] = useState(null);
    const [error, setError] = useState(null);
    const [subscribed, setIfSubscribed] = useState(null);

    const fetchSubData = async () => {
        fetch('http://localhost:8000/subscriptions/list/')
            .then(response => {
                console.log("print response")
                console.log(response)
                console.log(typeof(response))
                return response.json()
            })
            .then(data => {
                console.log("print data")
                console.log(data)
                setSubscription(data)
            })    
    }

    function CheckError(response) {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      }

    const handleSubscription = async (subNum) => {
        const response = await fetch('http://localhost:8000/subscriptions/'+subNum+'/subscribe/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });

        if (response.status >= 200 && response.status <= 299) {
            setError(false)
            setIfSubscribed(true)
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            if (response.status == 401 || response.statusText == 'Unauthorized'){
                setError(true)
                setIfSubscribed(false)
            }
        }


            // .then(response => response.json())
            // .then(data => {
            //     // console.log("print data")
            //     // console.log(data)
            //     setSubscription(data)
            // })    
    }

    console.log("before use effect ")
    useEffect(() => {
        console.log("use effect ")
        fetchSubData()

        
    }, [])

    console.log("printing sub")

    

    if (sub != null){
        return (
            <>
                <h1> Below are the subscriptions available: </h1>

                    {sub.results.map((data) => (

                        <>
                            <p key={data.sub_id}> price is {data.price}, length is {data.length_months} months</p>
                            <Button 
                                variant="contained"
                                onClick={() => handleSubscription(data.sub_id)} >Subscribe</Button>
                            
                        </>
                    ))}
                    
                {error? <p>User must be logged in to subscribe.</p>:""}
                {subscribed? <p>Successfully subscribed!</p>:""}

                
            </>
        )
    }

}
