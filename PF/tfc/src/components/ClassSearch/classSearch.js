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

    const { setClasses } = useContext(APIContext);

    useEffect(() => {
        const { class_name, coach_name, date, time_start, time_end } = params;
        fetch(`http://localhost:8000/studios/classes/search/?class_name=${class_name||""}&coach_name=${coach_name||""}&date=${date||""}&time_start=${time_start||""}&time_end=${time_end||""}&limit=${perPage}&offset=`+offset)
            .then(res => {
                console.log(res)
                res.json()
            })  
            .then(json => {
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
                Amenity name
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
                Class name
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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
                Coach name
                <input
                    style={{width: 150, height: 20, fontSize: 18, margin: 5}}
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

            <ClassSearchTable perPage={perPage} params={params} />
            <Stack spacing={2} style={{marginLeft: "30rem"}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default ClassSearch;