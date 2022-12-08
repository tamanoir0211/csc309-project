import {createContext, useState} from "react";

export const useAPIContext = () => {
    const [classes, setClasses] = useState([]);

    console.log("inside user API")
    return {
        classes,
        setClasses,
    }
}

const APIContext = createContext({
    classes: null, setClasses: () => {},
})


export default APIContext;