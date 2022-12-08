import React, { useContext, useState, useEffect } from 'react';
import AuthContext from "../../context/AuthContext";
import Button from '@material-ui/core/Button';
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

export default function Subscribe(props) {

    const [sub, setSubscription] = useState(null);
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

    const fetchSubData = async () => {
        fetch('http://localhost:8000/subscriptions/list/', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })
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
  
    }
    

    console.log("before use effect ")
    useEffect(() => {
        console.log("use effect ")
        fetchSubData()

        
    }, [])

    console.log("printing sub")

    

    if (sub != null){
        // return (
        //     <>
        //         <h1> Below are the subscriptions available: </h1>

        //             {sub.results.map((data) => (

        //                 <>
        //                     <p key={data.sub_id}> price is {data.price}, length is {data.length_months} months</p>
        //                     <Button 
        //                         variant="contained"
        //                         onClick={() => handleSubscription(data.sub_id)} >Subscribe</Button>
                            
        //                 </>
        //             ))}
                    
        //         {error? <p>User must be logged in to subscribe.</p>:""}
        //         {subscribed? <p>Successfully subscribed!</p>:""}

                
        //     </>
        // )

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
                                onClick={() => handleSubscription(data.sub_id)}>Subscribe</Button></StyledTableCell>

                            </TableRow>

                        ))}

                    </TableBody>
    
                </Table>
            </TableContainer>
        );
    }

}
