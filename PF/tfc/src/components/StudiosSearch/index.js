import {useContext, useEffect, useState} from "react";
import StudiosSearchTable from "./StudiosSearchTable";
import APIContext from "../../Contexts/APIContext";

const StudiosSearch = () => {
    const perPage = 20;
    const [params, setParams] = useState({page: 0, name: "", amenity: "", class_name: "", coach: ""})

    const { setStudios } = useContext(APIContext);

    useEffect(() => {
        const { page, name, amenity, class_name, coach } = params;
        fetch(`http://localhost:8000/studios/search/?studio_name=${name||""}&amenity=${amenity||""}&class_name=${class_name||""}&coach=${coach||""}&limit=${perPage}&offset=${page}`)
        .then(res => res.json())
        .then(json => {
            setStudios(json.results);
        })
    }, [params])

    return (
        <>
            Studio name
            <input
                style={{width: 150, height: 20, fontSize: 18, margin: 4}}
                value={params.name}
                onChange={(event) => {
                    setParams({
                        name: event.target.value,
                        page: 0,
                    })
                }}
            />
            Amenity name
            <input
                style={{width: 150, height: 20, fontSize: 18, margin: 4}}
                value={params.amenity}
                onChange={(event) => {
                    setParams({
                        amenity: event.target.value,
                        page: 0,
                    })
                    console.log(params.amenity)
                }}
            />
            Class name
            <input
                style={{width: 150, height: 20, fontSize: 18, margin: 4}}
                value={params.class_name}
                onChange={(event) => {
                    setParams({
                        class_name: event.target.value,
                        page: 0,
                    })
                }}
            />
            Coach name
            <input
                style={{width: 150, height: 20, fontSize: 18, margin: 4}}
                value={params.coach}
                onChange={(event) => {
                    setParams({
                        coach: event.target.value,
                        page: 0,
                    })
                }}
            />

            <StudiosSearchTable perPage={perPage} params={params} />
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

export default StudiosSearch;