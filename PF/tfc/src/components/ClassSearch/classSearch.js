import {useContext, useEffect, useState} from "react";
import ClassSearchTable from "./classSearchTable";
import APIContext from "../../Contexts/APIContext";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {TextField} from "@mui/material";

const ClassSearch = () => {
    const perPage = 6;
    const [params, setParams] = useState({class_name: "", coach_name: "", date: "", time_start: "", time_end: ""})

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setOffset((value - 1) * perPage);
    };

    console.log("before useing context")
    const { setClasses } = useContext(APIContext);

    useEffect(() => {
        const { class_name, coach_name, date, time_start, time_end } = params;
        fetch(`http://localhost:8000/studios/classes/search/?class_name=${class_name||""}&coach_name=${coach_name||""}&date=${date||""}&time_start=${time_start||""}&time_end=${time_end||""}&limit=${perPage}&offset=`+offset)
            .then(res => {
                console.log(res)
                return res.json()
            })  
            .then(json => {
                console.log(json)
                setClasses(json.results);
                setCount(Math.ceil(json.count/perPage))
            })
    }, [params, offset])

    return (
        <>
            <Typography variant="h2" gutterBottom align="center" style={{marginTop: "1rem"}}>
                Class Search <SearchIcon style={{width: "50px", height: "40px"}}/>
            </Typography>
            <div align="center" style={{marginLeft: 20, fontSize: 18}}>
                <TextField
                    sx={{marginLeft: 2, marginRight: 2}}
                    size="small"
                    label="Class Name"
                    value={params.class_name||''}
                    onChange={(event) => {
                        setParams({
                            class_name: event.target.value,
                            coach_name: params.coach_name,
                            date: params.date,
                            time_start: params.time_start,
                            time_end: params.time_end,
                        })
                        setOffset(0);
                        setPage(1);
                    }}
                />
                <TextField
                    sx={{marginLeft: 1.5, marginRight: 1.5}}
                    size="small"
                    label="Coach Name"
                    value={params.coach_name||''}
                    onChange={(event) => {
                        setParams({
                            class_name: params.class_name,
                            coach_name: event.target.value,
                            date: params.date,
                            time_start: params.time_start,
                            time_end: params.time_end,
                        })
                        setOffset(0);
                        setPage(1);
                    }}
                />
                <TextField
                    sx={{marginLeft: 1.5, marginRight: 1.5}}
                    size="small"
                    label="Date"
                    value={params.date||''}
                    onChange={(event) => {
                        setParams({
                            class_name: params.class_name,
                            coach_name: params.coach_name,
                            date: event.target.value,
                            time_start: params.time_start,
                            time_end: params.time_end,
                        })
                        setOffset(0);
                        setPage(1);
                    }}
                />
                <TextField
                    sx={{marginLeft: 1.5, marginRight: 1.5}}
                    size="small"
                    label="Start Time"
                    value={params.time_start||''}
                    onChange={(event) => {
                        setParams({
                            class_name: params.class_name,
                            coach_name: params.coach_name,
                            date: params.date,
                            time_start: event.target.value,
                            time_end: params.time_end,
                        })
                        setOffset(0);
                        setPage(1);
                    }}

                />
                <TextField
                    sx={{marginLeft: 1.5, marginRight: 1.5}}
                    size="small"
                    label="End Time"
                    value={params.time_end||''}
                    onChange={(event) => {
                        setParams({
                            class_name: params.class_name,
                            coach_name: params.coach_name,
                            date: params.date,
                            time_start: params.time_start,
                            time_end: event.target.value,
                        })
                        setOffset(0);
                        setPage(1);
                    }}

                />
            </div>

            <ClassSearchTable perPage={perPage} params={params} />
            <Stack spacing={2} style={{marginTop: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: "5rem"}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default ClassSearch;