import {useContext} from "react";
import APIContext from "../../../Contexts/APIContext";
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
import {Link} from "react-router-dom";

const color = grey[700];


const StudiosSearchTable = ({ params }) => {
    const { studios } = useContext(APIContext);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: color,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <div style={{minHeight: "28rem"}}>
        <TableContainer component={Paper} style={{marginTop: "2rem"}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{height: "4rem"}}>
                        <StyledTableCell align="center" style={{width: "40%", fontSize:20}}>Name</StyledTableCell>
                        <StyledTableCell align="center" style={{width: "60%", fontSize:20}}>Address</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {studios.map((studio) => (
                        <TableRow
                            key={studio.location.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            style={{height: "4rem"}}
                        >
                            <StyledTableCell align="center" style={{fontSize:20}}><Link to={`/studios/list/details/${studio.id}`} align={"center"}>{studio.name}</Link></StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize:20}}>{ studio.location.address }, { studio.location.postal_code }</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}
export default StudiosSearchTable;
