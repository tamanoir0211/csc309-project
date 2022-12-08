import {useContext} from "react";
import APIClassesContext from "../../../Contexts/APIClassesContext";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
import Button from '@material-ui/core/Button';
import {useParams} from "react-router-dom";

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
    console.log(classes)
    console.log(classes.length)


    const handleClassEnrol = async (classtime_id) => {
        const response = await fetch('http://localhost:8000/studios/classtime/'+classtime_id+'/enrol/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });

        if (response.status >= 200 && response.status <= 299) {
            // setError(false)
            // setIfEnrolled(true)
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            if (response.status == 401 || response.statusText == 'Unauthorized'){
                // setError(true)
                // setIfEnrolled(false)
            }
            // TODO: Other error handling for 400 and 404
        }
    }

        const handleEnrollAll = async () => {
        const response = await fetch('http://localhost:8000/studios/'+studio_id+'/classes/'+class_id+'/enrol_all/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
        });

        if (response.status >= 200 && response.status <= 299) {
            // setError(false)
            // setIfEnrolled(true)
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            if (response.status == 401 || response.statusText == 'Unauthorized'){
                // setError(true)
                // setIfEnrolled(false)
            }
            // TODO: Other error handling for 400 and 404
        }
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

    
    if(classes != null && classes.length > 0){
        
        return (
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
        );
    }
    
}
export default ClassScheduleTable;
