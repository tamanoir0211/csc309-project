import {useContext} from "react";
import APIContext from "../../Contexts/APIContext";
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


const ClassSearchTable = ({ params }) => {
    const { classes } = useContext(APIContext);
    console.log()

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
        <TableContainer component={Paper} style={{marginTop: "20px"}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Description</StyledTableCell>
                        <StyledTableCell align="center">Coach</StyledTableCell>
                        <StyledTableCell align="center">Capacity</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {classes.map((cl) => (
                        <TableRow
                            key={cl.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* <p>{cl.name}</p> */}
                            <StyledTableCell align="center">{cl.name}</StyledTableCell>
                            <StyledTableCell align="center">{ cl.description}</StyledTableCell>
                            <StyledTableCell align="center">{ cl.coach.name}</StyledTableCell>
                            <StyledTableCell align="center">{ cl.capacity}</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}
export default ClassSearchTable;