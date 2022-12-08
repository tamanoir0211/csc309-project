import React from 'react';
import SubscriptionList from './components/Subscriptions/subscriptionList'
import ClassSearch from './components/ClassSearch/classSearch'
import APIContext, {useAPIContext} from "./components/ClassSearch/APIContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App(){

    return (
        <SubscriptionList />
    )
    
}

export default App;