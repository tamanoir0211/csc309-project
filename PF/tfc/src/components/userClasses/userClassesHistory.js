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

const UserClassesHistory = () => {

    const perPage = 5;
    const [classes, setUserClasses] = useState(null);
    const { authTokens } = useContext(AuthContext);


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
        fetch(`http://localhost:8000/user/classes/history/?limit=${perPage}&offset=`+offset,
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
            })    
    }


    useEffect(() => {
        fetchclassData()     
    }, [])

    useEffect(() => {
        fetchclassData()     
    }, [offset])

    if (classes != null){
        
        if(!classes.length > 0){
            return(<>
                 
                <TableContainer component={Paper} style={{marginTop: "20px"}} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableHeader align="center" colSpan={2}
                                sx={{
                                    fontSize: "1rem",
                                  }}><b>Past Classes</b></StyledTableHeader> 
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">Class Name</StyledTableCell>
                                <StyledTableCell align="center">Time</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableCell colSpan={2} align="center">
                                You have no past classes. </StyledTableCell>
                        </TableBody>
                    </Table>
            </TableContainer>
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
                                <StyledTableHeader align="center" colSpan={2}
                                sx={{
                                    fontSize: "1rem",
                                  }}><b>Past Classes</b></StyledTableHeader> 
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">Class Name</StyledTableCell>
                                <StyledTableCell align="center">Time</StyledTableCell>
                            </TableRow>
                        </TableHead>
                    <TableBody>
                        {classes.map((each_class) => (
                            <TableRow
                                key={each_class.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell align="center">{ each_class.classes.name }</StyledTableCell>
                                <StyledTableCell align="center">{ formatDate(each_class.time, false) } - {formatDate(each_class.end_time, true)}</StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack spacing={2} style={{marginTop: "1rem", marginBottom: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
            </>
            );
        }
        }
}

export default UserClassesHistory;

