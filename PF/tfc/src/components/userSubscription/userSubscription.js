import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AuthContext from "../../context/AuthContext";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle } from '@mui/material';
import {Link} from "react-router-dom";


const color = grey[700];
const dark_grey = grey[800];

export default function UserSubscriptions(props) {

    const [sub, setUserSubscription] = useState(null);
    const [error, setError] = useState(null);
    const [unsubscribed, setUnsubscribed] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const [showAlert, setShowAlert] = useState(null);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: color,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableHeader = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: dark_grey,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 20,
        },
    }));

    const fetchSubData = async () => {
        fetch('http://localhost:8000/user/subscription/',{ 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens,
            },
        })
            .then(response => {
                //TODO error checking
                // console.log("print response")
                // console.log(response)
                return response.json()
            })
            .then(data => {
                // console.log("print data")
                // console.log(data)
                setUserSubscription(data)
                setUnsubscribed(false)
            })    
    }

    const handleUnsubscription = async => {
        const response = fetch('http://localhost:8000/user/unsubscribe/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })
        .then(response => {
            //TODO error checking
            console.log("print response")
            console.log(response)
            return response.json()
        })
        .then(data => {
            console.log("print data")
            console.log(data)
            setUnsubscribed(true)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false);
              }, 3000);
        })    

        // if (response.status >= 200 && response.status <= 299) {
        //     setError(false)
        //     setIfSubscribed(true)
        //     const jsonResponse =  response.json();
        //     console.log(jsonResponse);
        // } else {
        //     if (response.status == 401 || response.statusText == 'Unauthorized'){
        //         setError(true)
        //         setIfSubscribed(false)
        //     }
        // }
    }

    useEffect(() => {
        fetchSubData()     
    }, [])

    useEffect(() => {
        fetchSubData()     
    }, [unsubscribed])


    
    console.log(sub)

    if (sub != null){
        console.log(sub)
        if(sub.count == 0){
            return(<>
                 
                <TableContainer component={Paper} style={{marginTop: "20px"}} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                                <StyledTableHeader align="center" colSpan={3}
                                    sx={{
                                        fontSize: "1rem",
                                    }}><b>My Subscriptions</b></StyledTableHeader>        
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">Subscription Price</StyledTableCell>
                                <StyledTableCell align="center">Payment Period</StyledTableCell>
                                <StyledTableCell align="center">Subscribe Now!</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableCell colSpan={3} align="center">
                                You have no current subscriptions. <Link to={`/subscriptions`}>Click here to see a list of subscription plan we offer.
                                </Link></StyledTableCell>
                        </TableBody>
                    </Table>
            </TableContainer>
            {showAlert ? <Alert severity="success"><AlertTitle>Success</AlertTitle>Subscription dropped successfully!</Alert>: ""}
            </>)
            
        }
        else {
            return (
                <>
                <TableContainer component={Paper} style={{marginTop: "20px"}} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableHeader align="center" colSpan={3}
                                    sx={{
                                        fontSize: "1rem",
                                    }}><b>My Subscriptions</b></StyledTableHeader>        
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">Subscription Price</StyledTableCell>
                                <StyledTableCell align="center">Payment Period</StyledTableCell>
                                <StyledTableCell align="center">Subscribe Now!</StyledTableCell>
                            </TableRow>
                        </TableHead>
        
                        <TableBody>
                            {sub.results.map((data) => (
                                <TableRow
                                    key={data.sub_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {/* <p>{cl.name}</p> */}
                                    <StyledTableCell align="center">${data.price}</StyledTableCell>
                                    <StyledTableCell align="center">{data.length_months} months</StyledTableCell>
                                    <StyledTableCell align="center"><Button 
                                    variant="contained"
                                    onClick={() => handleUnsubscription()}>Unubscribe</Button></StyledTableCell>
    
                                </TableRow>
    
                            ))}
    
                        </TableBody>
        
                    </Table>
                </TableContainer>
                
                </>
            );
        }
        }
        

}
