import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function ClassTimes(props) {

    const [classes, setClasses] = useState(null);
    const [error, setError] = useState(null);
    const [enrolled, setIfEnrolled] = useState(null);
    const [dropped, setIfDropped] = useState(null);

    const fetchClasstimeData = async (studio_id, class_id) => {
        fetch('http://localhost:8000/'+studio_id+'/classes/'+class_id+'/')
            .then(response => {
                console.log("print response")
                console.log(response)
                console.log(typeof(response))
                return response.json()
            })
            .then(data => {
                console.log("print data")
                console.log(data)
                setClasses(data)
            })    
    }


    const handleClassEnrol = async (classtime_id) => {
        const response = await fetch('http://localhost:8000/classtime/'+classtime_id+'/enrol/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });

        if (response.status >= 200 && response.status <= 299) {
            setError(false)
            setIfEnrolled(true)
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            if (response.status == 401 || response.statusText == 'Unauthorized'){
                setError(true)
                setIfEnrolled(false)
            }
            // TODO: Other error handling for 400 and 404
        }
    }


    const handleEnrollAll = async (classtime_id) => {
        const response = await fetch('http://localhost:8000/'+studio_id+'/classes/'+class_id+'/enrol_all/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });

        if (response.status >= 200 && response.status <= 299) {
            setError(false)
            setIfEnrolled(true)
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            if (response.status == 401 || response.statusText == 'Unauthorized'){
                setError(true)
                setIfEnrolled(false)
            }
            // TODO: Other error handling for 400 and 404
        }
    }



    console.log("before use effect ")
    useEffect(() => {
        console.log("use effect ")
        fetchClasstimeData()      
    }, [])

    //console.log("printing class")


    if (classes != null){
        return (
            <>
                <h1> Below are the classes available: </h1>

                    {classes.results.map((data) => (

                        <>
                            //<p key={data.class_id}> price is {data.price}, length is {data.length_months} months</p>
                            <Button 
                                variant="contained"
                                onClick={() => handleClassEnrol(data.class_id)} >Enroll</Button>
                            
                        </>
                    ))}

                <Button 
                    variant="contained"
                    onClick={() => handleEnrollAll(data.class_id)} >Enroll</Button>
                    

                
            </>
        )
    }

}