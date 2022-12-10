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
        <div style={{minHeight: 500}}>
        <TableContainer component={Paper} style={{marginTop: "1rem"}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow style={{height: "3.5rem"}}>
                        <StyledTableCell align="center" style={{width: "14.5%"}}>Name</StyledTableCell>
                        <StyledTableCell align="center" style={{width: "14.5%"}}>Studio Name</StyledTableCell>
                        <StyledTableCell align="center" style={{width: "45%"}}>Description</StyledTableCell>
                        <StyledTableCell align="center" style={{width: "14.5%"}}>Coach</StyledTableCell>
                        <StyledTableCell align="center" style={{width: "11.5%"}}>Capacity</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {classes.map((cl) => (
                        <TableRow
                            key={cl.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            style={{height: 73}}
                        >
                            {/* <p>{cl.name}</p> */}
                            <StyledTableCell align="center" style={{fontSize: 16}}>
                            <Link to={`/studios/${cl.studio.id}/classes/${cl.id}/schedule`} align={"center"}>
                                {cl.name}</Link></StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize: 16}}>
                                <Link to={`/studios/list/details/${cl.studio.id}`} align={"center"}>
                                {cl.studio.name}
                                </Link>
                            </StyledTableCell>
                            <StyledTableCell style={{width: "50%"}}>{ cl.description}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize: 16}}>{ cl.coach.name}</StyledTableCell>
                            <StyledTableCell align="center" style={{fontSize: 16}}>{ cl.capacity}</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
        </div>
    );
}
export default ClassSearchTable;