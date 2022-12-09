import {createContext, useState} from "react";

export const useSubscriptionMessageContext = () => {
    const [ messages, setMessages ] = useState([]);

    return {
        messages,
        setMessages,

    }
}

const APISubscriptionMessageContext = createContext({
    messages: null, setMessages: () => {},
})

export default APISubscriptionMessageContext;