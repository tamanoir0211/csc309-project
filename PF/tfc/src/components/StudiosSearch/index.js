import {useContext, useEffect, useState} from "react";
import StudiosSearchTable from "./StudiosSearchTable";
import APIContext from "../../Contexts/APIContext";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material";

const StudiosSearch = () => {
    const perPage = 6;
    const [params, setParams] = useState({name: "", amenity: "", class_name: "", coach: ""})

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setOffset((value - 1) * perPage);
    };

    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        const { name, amenity, class_name, coach } = params;
        fetch(`http://localhost:8000/studios/search/?studio_name=${name||""}&amenity=${amenity||""}&class_name=${class_name||""}&coach=${coach||""}&limit=${perPage}&offset=`+offset)
            .then(res => res.json())
            .then(json => {
                setStudios(json.results);
                setCount(Math.ceil(json.count/perPage));
            })
    }, [params, offset])

    return (
        <>
            <Typography variant="h2" gutterBottom align="center" style={{marginTop: "1rem"}}>
                Studio Search <SearchIcon style={{width: "50px", height: "40px"}}/>
            </Typography>
            <div align="center" style={{marginLeft: 20, fontSize: 20}}>
                <TextField
                    sx={{marginLeft: 2, marginRight: 2}}
                    size="small"
                    label="Studio name"
                    value={params.name||''}
                    onChange={(event) => {
                        setParams({
                            name: event.target.value,
                            amenity: params.amenity,
                            class_name: params.class_name,
                            coach: params.coach,
                        })
                        setOffset(0);
                        setPage(1);
                    }}
                />
                <TextField
                    sx={{marginLeft: 2, marginRight: 2}}
                    label="Amenity name"
                    size="small"
                    value={params.amenity||''}
                    onChange={(event) => {
                        setParams({
                            name: params.name,
                            amenity: event.target.value,
                            class_name: params.class_name,
                            coach: params.coach,
                        })
                        setOffset(0);
                        setPage(1);
                    }}
                />
                <TextField
                    sx={{marginLeft: 2, marginRight: 2}}
                    label="Class name"
                    size="small"
                    value={params.class_name||''}
                    onChange={(event) => {
                        setParams({
                            name: params.name,
                            amenity: params.amenity,
                            class_name: event.target.value,
                            coach: params.coach,
                        })
                        setOffset(0);
                        setPage(1);
                    }}
                />
                <TextField
                    sx={{marginLeft: 2, marginRight: 2}}
                    label="Coach name"
                    size="small"
                    value={params.coach||''}
                    onChange={(event) => {
                        setParams({
                            name: params.name,
                            amenity: params.amenity,
                            class_name: params.class_name,
                            coach: event.target.value,
                        })
                        setOffset(0);
                        setPage(1);
                    }}

                />
            </div>

            <StudiosSearchTable perPage={perPage} params={params} />
            <Stack spacing={2} style={{marginTop: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: "5rem"}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary" size="large"/>
            </Stack>
        </>
    )
}

export default StudiosSearch;