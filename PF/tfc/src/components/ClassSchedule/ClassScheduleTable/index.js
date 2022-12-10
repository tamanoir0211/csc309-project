import React, { useContext, useState, useEffect } from 'react';
import APIClassesContext from "../../../Contexts/APIClassesContext";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import {useParams} from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import EnrollMessageHandler from './classSearchMessage';
import {Link} from "react-router-dom";

const color = grey[700];
const dark_grey = grey[800];

function formatDate(string, end){
    if (end){
        const date = new Date(string)
        return String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0') + ':00';
    }
    return new Date(string).toString().replace("GMT-0500 (Eastern Standard Time)", '');
}



const ClassScheduleTable = () => {
    const { classes } = useContext(APIClassesContext);
    const studio_id = useParams().studio_id;
    const class_id = useParams().class_id;
    const { authTokens } = useContext(AuthContext);
    const [ showAlert, setShowAlert] = useState(null)
    const { setEnrollMsg } = useContext(APIClassesContext);



    const handleClassEnrol = async (classtime_id) => {
        const response = await fetch('http://localhost:8000/studios/classtime/'+classtime_id+'/enrol/', {
            method: 'POST',
            //mode: 'cors',
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
            setEnrollMsg(data.message)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false);
              }, 5000);
        })  
    }

        const handleEnrollAll = async () => {
        const response = await fetch('http://localhost:8000/studios/'+studio_id+'/classes/'+class_id+'/enrol_all/', {
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
            setEnrollMsg(data.message)
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false);
              }, 5000);
        })  

    }

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

    console.log(classes)

    
    if(classes != null ){
        if (! classes.length > 0){
            return(
            <>
            <TableContainer component={Paper} style={{marginTop: "20px"}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                            <StyledTableHeader align="center" colSpan={2}
                             sx={{
                                fontSize: "1rem",
                                }}>Class Schedule</StyledTableHeader>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell align="center">Time</StyledTableCell>
                            <StyledTableCell align="center">Enroll Now!</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableCell colSpan={2} align="center">
                                There are currently no class times for this class. <Link to={`/classes/search`}>Click here to see othr classes offered by our studios.
                                </Link></StyledTableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            
            </>
            )
        }

        else{
            
            return (
                <>
                <TableContainer component={Paper} style={{marginTop: "20px"}} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                                <StyledTableHeader align="center">{classes[0].classes.name}</StyledTableHeader>
                                <StyledTableHeader align="center"><Button 
                                        variant="contained"
                                        onClick={() => handleEnrollAll()}>Enroll ALL!</Button></StyledTableHeader>
        
                            </TableRow>
                            <TableRow>
                                <StyledTableCell align="center">Time</StyledTableCell>
                                <StyledTableCell align="center">Enroll Now!</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {classes.map((each_class) => (
                                <TableRow
                                    key={each_class.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{ formatDate(each_class.time, false) } - {formatDate(each_class.end_time, true)}</StyledTableCell>
                                    <StyledTableCell align="center"><Button 
                                        variant="contained"
                                        onClick={() => handleClassEnrol(each_class.id)}>Enroll</Button></StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                { showAlert? <EnrollMessageHandler></EnrollMessageHandler>: ""}
                </>
            );
        }
        }
        
    
}
export default ClassScheduleTable;
