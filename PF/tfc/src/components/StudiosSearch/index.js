import {useContext, useEffect, useState} from "react";
import StudiosSearchTable from "./StudiosSearchTable";
import APIContext from "../../Contexts/APIContext";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const StudiosSearch = () => {
    const perPage = 5;
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
                setCount(Math.ceil(json.count/perPage))
            })
    }, [params, offset])

    return (
        <>
            <div style={{marginLeft: 20}}>
                Studio name
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

            <StudiosSearchTable perPage={perPage} params={params} />
            <Stack spacing={2} style={{marginLeft: "30rem"}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default StudiosSearch;