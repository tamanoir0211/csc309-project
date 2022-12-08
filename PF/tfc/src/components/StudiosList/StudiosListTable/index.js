import {useContext, useEffect, useState} from "react";
import './style.css';
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
import {GoogleMap, InfoWindowF, MarkerF, useJsApiLoader} from "@react-google-maps/api";


const containerStyle = {
    width: '100%',
    height: '100%'
};

const color = grey[700];


const StudioListTable = (params) => {

    const { studios } = useContext(APIContext);
    const latitude = params.params.latitude;
    const longitude = params.params.longitude;

    const user_location = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };
    const default_1 = {
        lat: 43.664486,
        lng: -79.399689
    };
    const default_2 = {
        lat: 43.634486,
        lng: -79.399689
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

    const [activeMarker, setActiveMarker] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBOxO5-F96081MsbNbPnTgdgUY-1s-nf6M"
    })

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

    const [map, setMap] = React.useState(null)

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(default_1);
        bounds.extend(default_2)
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    useEffect(() => {
        if (map && latitude !== 0 && longitude !== 0) {
            const bounds = new window.google.maps.LatLngBounds(user_location);
            studios.map((marker) => (
                bounds.extend({ lat: parseFloat(marker.location.latitude), lng: parseFloat(marker.location.longitude) })
            ))
            map.fitBounds(bounds);
        }
    }, [params])

    return isLoaded ? (
        <div className="splitScreen">
            <div className="left">
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
            </div>
            <div className="right">
                <GoogleMap
                    onLoad={onLoad}
                    // center={center}
                    onClick={() => setActiveMarker(null)}
                    mapContainerStyle={containerStyle}
                    onUnmount={onUnmount}
                    zoom={6}
                >
                    {studios.map(marker => (
                        <MarkerF
                            position={{ lat: parseFloat(marker.location.latitude), lng: parseFloat(marker.location.longitude) }}
                            key={marker.id}
                            onClick={() => handleActiveMarker(marker.id)}
                        >
                            {activeMarker === marker.id ?  (
                                <InfoWindowF position={{ lat: parseFloat(marker.location.latitude), lng: parseFloat(marker.location.longitude)}} onCloseClick={() => setActiveMarker(null)}>
                                    <div><Link to={`/studios/list/details/${marker.id}`} align={"center"}>{marker.name}</Link>
                                        <div>{ marker.location.address }, { marker.location.postal_code }</div>
                                    </div>
                                </InfoWindowF>
                            ) : null}
                        </MarkerF>
                    ))}
                </GoogleMap>
            </div>
        </div>
    ) : <></>
}


export default StudioListTable;