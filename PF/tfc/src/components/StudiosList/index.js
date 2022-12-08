import {useContext, useEffect, useState} from "react";
import StudiosListTable from "./StudiosListTable";
import APIContext from "../../Contexts/APIContext";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

const StudiosList = () => {
    const perPage = 2;
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
            <button
                style={{width: 400, height: 20, fontSize: 14, alignItems:"center", cursor: "pointer"}}
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
                }}
            >Use my current location to list studios from the closest one</button>

            <StudiosListTable  />
            <Stack spacing={2} style={{marginTop: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default StudiosList;