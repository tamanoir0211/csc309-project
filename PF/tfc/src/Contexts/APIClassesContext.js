import {createContext, useState} from "react";

export const useAPIClassesContext = () => {
    const [classes, setClasses] = useState([]);
    const [enrollMsg, setEnrollMsg] = useState([]);

    return {
        classes,
        setClasses,
        enrollMsg,
        setEnrollMsg,
    }
}

const APIClassesContext = createContext({
    classes: null, setClasses: () => {},
    enrollMsg: null, setEnrollMsg: () => {},
})

export default APIClassesContext;