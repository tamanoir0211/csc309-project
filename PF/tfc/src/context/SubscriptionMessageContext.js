import {createContext, useState} from "react";

export const useSubscriptionMessageContext = () => {
    const [ message, setMessage ] = useState([]);

    return {
        message,
        setMessage,
    }
}

const APISubscriptionMessageContext = createContext({
    message: null, setMessage: () => {},
})

export default APISubscriptionMessageContext;