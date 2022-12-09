import React, { useContext, useState, useEffect } from 'react';
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
import AuthContext from "../../context/AuthContext";
import { Alert, AlertTitle } from '@mui/material';
import {Link} from "react-router-dom";
import APIDropClassContext from '../../Contexts/APIDropClassContext';
import {useParams} from "react-router-dom";
import ClassDropMessage from './classDropMessage';



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

    const [classes, setUserClasses] = useState(null);
    const { authTokens } = useContext(AuthContext);
    const studio_id = useParams().studio_id;
    const class_id = useParams().class_id;
    const [ showAlert, setShowAlert] = useState(null)
    const { setDropMsg } = useContext(APIDropClassContext)
    const [dropped, SetDropped] = useState(null)

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
        fetch('http://localhost:8000/user/classes/',
        { method: 'GET',
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
                setUserClasses(data.results)
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

    console.log("classes are")
    console.log(classes)

    if (classes != null){
        
        if(classes.count === 0){
            return(<>
                <Alert severity="info">
                    <AlertTitle>No Classes</AlertTitle>
                    You have no classes. <Link to={`/studios/list`}>Click here to check out some classes we offer!</Link>
                </Alert>
            </>)
        }
        else{
            return (
            <>
            <TableContainer component={Paper} style={{marginTop: "20px"}} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <StyledTableHeader align="center"></StyledTableHeader>
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
            </>
            );
        }
        }
}

export default UserClasses;

