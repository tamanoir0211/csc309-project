import React from 'react';
import SubscriptionList from './components/Subscriptions/subscriptionList'
import ClassSearch from './components/ClassSearch/classSearch'
import APIContext, {useAPIContext} from "./components/ClassSearch/APIContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App(){
    const class_search = (
        <APIContext.Provider value={useAPIContext()}>
            <ClassSearch />
        </APIContext.Provider>
    )

    return (
        <APIContext.Provider value={useAPIContext()}>
            <ClassSearch />
        </APIContext.Provider>
    )
    
}

export default App;