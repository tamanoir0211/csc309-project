import {useContext} from "react";
import APIContext from "../../../Contexts/APIContext";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import { blue } from '@mui/material/colors';
import ImageList from '@mui/material/ImageList';
import TablePagination from '@mui/material/TablePagination';
import ImageListItem from '@mui/material/ImageListItem';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const color = blue[500];

const columns = [
    { id: 'amenity', label: 'Amenity', minWidth: 150 },
    { id: 'quantity', label: 'Quantity', minWidth: 110 },
];

function createData(amenity, quantity) {
    return { amenity, quantity };
}

const StudioDetailTable = () => {
    const {studios} = useContext(APIContext);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(3);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (studios.length === 0) {
        return (<Paper></Paper>);
    }
    else {
        const amenities_list = [];
        studios.amenities.map((amenity) => (
            amenities_list.push(createData(amenity.type, amenity.quantity))
        ));

        const itemData = [];
        studios.images.map((image) => (
            itemData.push({img: image.image})
        ));

        return (
            <Paper
                sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 800,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
            >
                <Grid container spacing={2} align="center" >
                    <Grid item xs={14} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div" style={{fontSize: '40px'}}>
                                    {studios.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{fontSize: '20px'}}>
                                    {studios.phone_number}
                                </Typography>
                                <Typography variant="body2" gutterBottom style={{fontSize: '20px'}}>
                                    {studios.location.address} {studios.location.postal_code}
                                </Typography>

                                <a href={studios.url_direction} target="_blank" style={{fontSize: '18px'}}>Direction</a>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <TableContainer sx={{ maxHeight: 440 }} style={{marginTop: "15px"}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="center"
                                        style={{ minWidth: column.minWidth, backgroundColor: color}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {amenities_list
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell align="center">
                                                {row.amenity}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.quantity}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={amenities_list.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <div>Studio Images</div>
                <ImageList sx={{ width: "100%", height: "100%" }} variant="woven" cols={2} gap={8}>
                    {itemData.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={`${item.img}?w=161&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Paper>

        );
    }
}
export default StudioDetailTable;