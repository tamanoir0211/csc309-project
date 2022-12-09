import React, { useContext, useState, useEffect } from 'react';
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
import AuthContext from "../../context/AuthContext";
import { Alert, AlertTitle } from '@mui/material';
import {Link} from "react-router-dom";
import APIDropClassContext from '../../Contexts/APIDropClassContext';
import {useParams} from "react-router-dom";
import ClassDropMessage from './classDropMessage';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const color = grey[700];
const dark_grey = grey[800];

function formatDate(string, end){
    if (end){
        const date = new Date(string)
        return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':00';
    }
    return new Date(string).toString().replace("GMT-0500 (Eastern Standard Time)", '');
}

const UserClasses = () => {

    const perPage = 5;
    const [classes, setUserClasses] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const [ showAlert, setShowAlert] = useState(null)
    const { setDropMsg } = useContext(APIDropClassContext)
    const [dropped, SetDropped] = useState(null)

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setOffset((value - 1) * perPage);
    };

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

    const fetchclassData = async () => {
        fetch(`http://localhost:8000/user/classes/?limit=${perPage}&offset=`+offset,
        { method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + authTokens,
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                console.log(data.results)
                setUserClasses(data.results)
                setCount(Math.ceil(data.count/perPage))
                SetDropped(false)
            })    
    }


    const handleClassDrop = async (classtime_id) => {
        const response =  fetch('http://localhost:8000/studios/classtime/'+classtime_id+'/drop/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.message)
            setDropMsg(data.message)
            SetDropped(true)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false);
              }, 5000);
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

    const handleDropAll = async () => {
        const response = await fetch('http://localhost:8000/user/classes/drop_all/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + authTokens,
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        })          
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data.message)
            setDropMsg(data.message)
            setShowAlert(true)
            SetDropped(true)
            setTimeout(() => {
                setShowAlert(false);
              }, 3000);
        })  
    }
    
    useEffect(() => {
        fetchclassData()     
    }, [])

    useEffect(() => {
        fetchclassData()     
    }, [dropped])

    useEffect(() => {
        fetchclassData()     
    }, [offset])

    console.log("classes are")
    console.log(classes)

    if (classes != null){
        
        if(!classes.length > 0){
            return(<>
                 
                <TableContainer component={Paper} style={{marginTop: "20px"}} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableHeader align="center"> </StyledTableHeader>
                                <StyledTableHeader align="center"
                                sx={{
                                    fontSize: "1rem",
                                  }}><b>Classes</b></StyledTableHeader>
                                <StyledTableHeader align="center"><Button 
                                        variant="contained"
                                        onClick={() => handleDropAll()}>Drop ALL!</Button></StyledTableHeader>
        
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">Class Name</StyledTableCell>
                                <StyledTableCell align="center">Time</StyledTableCell>
                                <StyledTableCell align="center">Drop Now</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableCell colSpan={3} align="center">
                                You are not currently enrolled in any classes. <Link to={`/studios/search`}>Click here to see classes offered by our studios.
                                </Link></StyledTableCell>
                        </TableBody>
                    </Table>
            </TableContainer>
            { showAlert? <ClassDropMessage></ClassDropMessage>: ""}
            <Stack spacing={2} style={{marginTop: "1rem", marginBottom: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
            </>)
        }
        else{
            return (
            <>
            <TableContainer component={Paper} style={{marginTop: "20px"}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeader></StyledTableHeader>
                            <StyledTableHeader align="center"
                                sx={{
                                    fontSize: "1rem",

                                  }}><b>Classes</b></StyledTableHeader>
                                <StyledTableHeader align="center"><Button 
                                    variant="contained"
                                    onClick={() => handleDropAll()}>Drop ALL!</Button></StyledTableHeader>
    
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">Class Name</StyledTableCell>
                            <StyledTableCell align="center">Time</StyledTableCell>
                            <StyledTableCell align="center">Drop Now</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.map((each_class) => (
                            <TableRow
                                key={each_class.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell align="center">{ each_class.classes.name }</StyledTableCell>
                                <StyledTableCell align="center">{ formatDate(each_class.time, false) } - {formatDate(each_class.end_time, true)}</StyledTableCell>
                                <StyledTableCell align="center"><Button 
                                    variant="contained"
                                    onClick={() => handleClassDrop(each_class.id)}>Drop</Button></StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            { showAlert? <ClassDropMessage></ClassDropMessage>: ""}
            <Stack spacing={2} style={{marginTop: "1rem", marginBottom: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
            </>
            );
        }
        }
}

export default UserClasses;

