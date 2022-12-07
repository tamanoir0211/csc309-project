import {useContext, useEffect, useState} from "react";
import StudiosListTable from "./StudiosListTable";
import APIContext from "../../Contexts/APIContext";

const StudiosList = () => {
    const perPage = 20;
    const [params, setParams] = useState({page: 0, latitude: 0, longitude: 0})

    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        const { page, latitude, longitude } = params;
        fetch(`http://localhost:8000/studios/list/?latitude=${latitude||0}&longitude=${longitude||0}&limit=${perPage}&offset=${page}`)
            .then(res => res.json())
            .then(json => {
                setStudios(json.results);
            })
    }, [params])
    return (
        <>
            <button
                style={{width: 200, height: 20, fontSize: 14, margin: 4}}
                value="Use my current location"
                onClick={(event) => {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log("Latitude is :", position.coords.latitude);
                        console.log("Longitude is :", position.coords.longitude);
                        setParams({
                            page: 0,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                    });
                }}
            >Use my current location</button>

            <StudiosListTable perPage={perPage} params={params} />
            <button onClick={() => setParams({
                ...params,
                page: Math.max(0, params.page - perPage)
            })}>
                prev
            </button>
            <button onClick={() => setParams({
                ...params,
                page: params.page + perPage
            })}>
                next
            </button>
        </>
    )
}

export default StudiosList;