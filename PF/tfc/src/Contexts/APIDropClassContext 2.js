import {createContext, useState} from "react";

export const useAPIDropClassContext = () => {
    const [dropMsg, setDropMsg] = useState([]);

    return {
        dropMsg,
        setDropMsg,
    }
}

const APIDropClassContext = createContext({
    dropMsg: null, setDropMsg: () => {},
})

export default APIDropClassContext;
