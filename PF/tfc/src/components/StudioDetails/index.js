import {useContext, useEffect} from "react";
import APIContext from "../../Contexts/APIContext";
import {useParams} from 'react-router-dom';
import StudioDetailTable from "./StudioDetailsTable";

const StudioDetails = () => {
    const studio_id = useParams().id;
    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        fetch(`http://localhost:8000/studios/${studio_id}/details/`)
            .then(res => res.json())
            .then(json => {
                setStudios(json);
            })
    }, [])


    return (
        <>
            <StudioDetailTable params={studio_id}/>
        </>
    )
}
export default StudioDetails;