import {useContext, useEffect, useState} from "react";
import StudiosListTable from "./StudiosListTable";
import APIContext from "../../Contexts/APIContext";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Button from '@mui/material/Button';
import { indigo } from '@mui/material/colors';
import NearMeIcon from '@mui/icons-material/NearMe';

const button_color = indigo[900];

const StudiosList = () => {
    const perPage = 3;
    const [params, setParams] = useState({latitude: 0, longitude: 0})

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setOffset((value - 1) * perPage);
    };

    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        const { latitude, longitude } = params;
        fetch(`http://localhost:8000/studios/list/?latitude=${latitude||0}&longitude=${longitude||0}&limit=${perPage}&offset=${offset}`)
            .then(res => res.json())
            .then(json => {
                setStudios(json.results);
                setCount(Math.ceil(json.count/perPage));
            })
    }, [params, offset])
    return (
        <>
        <div align="center">
        <Button variant="contained"
                endIcon={<NearMeIcon />}
                style={{backgroundColor: button_color, marginBottom: "1rem", marginTop: "1rem"}}
                value="Use my current location"

                onClick={(event) => {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log("Latitude is :", position.coords.latitude);
                        console.log("Longitude is :", position.coords.longitude);
                        setParams({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                        setOffset(0);
                        setPage(1);
                    });
                }}>
            Use my current location to list studios from the closest one
        </Button>
        </div>

            <StudiosListTable params={params} />
            <Stack spacing={2} style={{marginTop: "1rem", marginLeft: "1rem", marginBottom: "3rem"}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default StudiosList;