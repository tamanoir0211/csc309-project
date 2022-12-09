import {createContext, useState} from "react";

export const useAPIContext = () => {
    const [studios, setStudios] = useState([]);
    const [classes, setClasses] = useState([]);


    return {
        studios,
        setStudios,
        classes,
        setClasses,

    }
}

const APIContext = createContext({
    studios: null, setStudios: () => {},
    classes: null, setClasses: () => {},

})

export default APIContext;

