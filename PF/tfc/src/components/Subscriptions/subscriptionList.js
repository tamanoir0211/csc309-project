import React, { useContext, useState, useEffect } from 'react';
import AuthContext from "../../context/AuthContext";
import APISubscriptionMessageContext from '../../context/SubscriptionMessageContext';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SubMessageHandler from './subscriptionMessageHandler';

const thisColor = grey[700];

export default function Subscribe(props) {

    const [sub, setSubscription] = useState(null);
    const [showAlert, setShowAlert] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const { setMessages } = useContext(APISubscriptionMessageContext);

    const perPage = 5;
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setOffset((value - 1) * perPage);
    };


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: thisColor,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

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
                setCount(Math.ceil(data.count/perPage))
            })
    }


    const handleSubscription = async (subNum) => {
        const res = await fetch('http://localhost:8000/subscriptions/'+subNum+'/subscribe/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        }).then(response => {
            return response.json()
        })
        .then(data => {
            setMessages(data.message)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false);
              }, 5000);
        })
        .catch(err => {
            console.log(err.message)
        })

        // if (response.status >= 200 && response.status <= 299) {
        //     setError(false)
        //     setIfSubscribed(true)
        //     const jsonResponse = await response.json();
        //     console.log(jsonResponse);
        // } else {
        //     if (response.status == 401 || response.statusText == 'Unauthorized'){
        //         setError(true)
        //         setIfSubscribed(false)
        //     }
        // }
  
    }
    
    useEffect(() => {
        //console.log("use effect ")
        fetchSubData()
    }, [])

    useEffect(() => {
        fetchSubData()     
    }, [offset])

    if (sub != null){
        return (
            <>
            <TableContainer component={Paper} style={{marginTop: "20px"}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center" sx={{fontSize: "1rem",}}>Subscription Price</StyledTableCell>
                            <StyledTableCell align="center" sx={{fontSize: "1rem",}}>Payment Period</StyledTableCell>
                            <StyledTableCell align="center" sx={{fontSize: "1rem",}}>Subscribe Now!</StyledTableCell>
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
                                onClick={() => handleSubscription(data.sub_id)}>Subscribe</Button></StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            { showAlert? <SubMessageHandler></SubMessageHandler>: ""}
            <Stack spacing={2} style={{marginTop: "1rem", marginBottom: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
            
            </>
        );
    }

}
