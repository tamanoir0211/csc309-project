import {useContext, useEffect, useState} from "react";
import APIClassesContext from "../../Contexts/APIClassesContext";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useParams} from "react-router-dom";
import ClassScheduleTable from "./ClassScheduleTable";

const ClassSchedule = () => {
    const perPage = 5;
    const studio_id = useParams().studio_id;
    const class_id = useParams().class_id;
    const [error, setError]= useState(null);

    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const handleChange = (event, value) => {
        setPage(value);
        setOffset((value - 1) * perPage);
    };

    const { setClasses } = useContext(APIClassesContext);

    useEffect(() => {
        fetch(`http://localhost:8000/studios/${studio_id}/classes/${class_id}/schedule/?limit=${perPage}&offset=`+offset)
            .then(res => res.json())
            .then(json => {
                setClasses(json.results);
                //console.log(json.results)
                setCount(Math.ceil(json.count/perPage))
            })
    }, [offset])


    return (
        <>
            <ClassScheduleTable  />
            <Stack spacing={2} style={{marginTop: "1rem", marginBottom: "1rem", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Pagination count={count} page={page} onChange={handleChange} variant="outlined" color="primary"/>
            </Stack>
        </>
    )
}

export default ClassSchedule;