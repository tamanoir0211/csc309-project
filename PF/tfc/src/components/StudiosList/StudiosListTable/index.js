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

const StudiosListTable = () => {
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
        <TableContainer component={Paper} style={{marginTop: "20px"}} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" style={{width: "40%"}}>Name</StyledTableCell>
                        <StyledTableCell align="center" style={{width: "60%"}}>Address</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studios.map((studio) => (
                        <TableRow
                            key={studio.location.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center"><Link to={`/studios/list/details/${studio.id}`} align={"center"}>{studio.name}</Link></StyledTableCell>
                            <StyledTableCell align="center">{ studio.location.address }, { studio.location.postal_code }</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StudiosListTable;
