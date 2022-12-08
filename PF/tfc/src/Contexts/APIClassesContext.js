import {createContext, useState} from "react";

export const useAPIClassesContext = () => {
    const [classes, setClasses] = useState([]);

    return {
        classes,
        setClasses,
    }
}

const APIClassesContext = createContext({
    classes: null, setClasses: () => {},
})

export default APIClassesContext;