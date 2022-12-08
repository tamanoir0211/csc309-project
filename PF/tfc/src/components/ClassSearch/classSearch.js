import {useContext, useEffect, useState} from "react";
import {createContext} from "react";
import ClassSearchTable from "./classSearchTable";
import APIContext from "./APIContext";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ClassSearch = () => {
    const perPage = 5;
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
            <div style={{marginLeft: 20}}>
                Class name
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
                Coach Name
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
                Date
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
                Start Time
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
                End Time
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
            <Stack spacing={2} style={{marginLeft: "30rem"}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default ClassSearch;