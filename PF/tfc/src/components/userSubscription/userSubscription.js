import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AuthContext from "../../context/AuthContext";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const color = grey[700];

export default function UserSubscriptions(props) {

    const [sub, setUserSubscription] = useState(null);
    const [error, setError] = useState(null);
    const [subscribed, setIfSubscribed] = useState(null);
    const { authTokens } = useContext(AuthContext);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: color,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const fetchSubData = () => {
        const res = fetch('http://localhost:8000/user/subscription/',{ 
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens,
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
                setUserSubscription(data)
            })    
    }

    // const fetchSubData = async () => {
    //     const res = await fetch('http://localhost:8000/subscriptions/'+1+'/subscribe/', {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Token ' + authTokens,
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //     }).then(response => {
    //         return response.json()
    //     })
    //     .then(data => {
    //         console.log(data)
    //         console.log(data.message)
    //     })
    // }


    const handleUnsubscription = async => {
        const response = fetch('http://localhost:8000/user/unsubscribe/', {
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
            const jsonResponse =  response.json();
            console.log(jsonResponse);
        } else {
            if (response.status == 401 || response.statusText == 'Unauthorized'){
                setError(true)
                setIfSubscribed(false)
            }
        }
  
    }
    

    useEffect(() => {
        fetchSubData()     
    }, [])

    

    if (sub != null){


        return (
            <TableContainer component={Paper} style={{marginTop: "20px"}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
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
                                <StyledTableCell align="center">{data.price}</StyledTableCell>
                                <StyledTableCell align="center">{data.length_months}</StyledTableCell>
                                <StyledTableCell align="center"><Button 
                                variant="contained"
                                onClick={() => handleUnsubscription}>Unubscribe</Button></StyledTableCell>

                            </TableRow>

                        ))}

                    </TableBody>
    
                </Table>
            </TableContainer>
        );
    }

}
