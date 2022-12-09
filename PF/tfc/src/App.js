import React, { Children } from 'react';
import './App.css';
import {useState, useEffect, useContext} from 'react';
import Login from './views/Login';
import {StyledEngineProvider } from '@mui/material/styles';
// Views
import Account from './views/Account';
import { AuthProvider } from './context/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';
import StudiosSearch from "./components/StudiosSearch";
import StudiosList from "./components/StudiosList";
import StudioDetails from "./components/StudioDetails";
import ClassSchedule from "./components/ClassSchedule";
import ClassSearch from './components/ClassSearch/classSearch';
import SubscriptionList from './components/Subscriptions/subscriptionList';
import UserClasses from './components/userClasses/userClasses';
import UserSubscriptions from './components/userSubscription/userSubscription';
import APIContext, {useAPIContext} from "./Contexts/APIContext";
import APIClassesContext, {useAPIClassesContext} from "./Contexts/APIClassesContext";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from "react-router-dom";
import Layout from "./components/Layout";
import APISubscriptionMessageContext, {useSubscriptionMessageContext} from './context/SubscriptionMessageContext';



function PrivateRoute({children}){
    const { authTokens } = useContext(AuthProvider);
    let location = useLocation();
    if(!authTokens){
        return <Navigate to="/login" state={{ from: location}} replace/>
    } else {
      return Children;
    }
};
//<PrivateRoute element={<Account/>} path="account" />

function App() {
    //const {authTokens} = useContext(AuthProvider);
    const studio_search = (
        <APIContext.Provider value={useAPIContext()}>
            <StudiosSearch />
        </APIContext.Provider>
    )

    const studio_list = (
        <APIContext.Provider value={useAPIContext()}>
            <StudiosList />
        </APIContext.Provider>
    )

    const studio_details = (
        <APIContext.Provider value={useAPIContext()}>
            <StudioDetails />
        </APIContext.Provider>
    )

    const class_schedule = (
        <APIClassesContext.Provider value={useAPIClassesContext()}>
            <ClassSchedule />
        </APIClassesContext.Provider>
    )

    const class_search = (
        <APIContext.Provider value={useAPIContext()}>
            <ClassSearch />
        </APIContext.Provider>
    )

    const subscriptions_list = (
        <APISubscriptionMessageContext.Provider value={useSubscriptionMessageContext()}>
            <SubscriptionList />
        </APISubscriptionMessageContext.Provider>
    )

    const user_subscription = (
        //<APIContext.Provider value={useAPIContext()}>
            <UserSubscriptions />
        //</APIContext.Provider>
    )

    const user_classes = (
        //<APIContext.Provider value={useAPIContext()}>
            <UserClasses />
        //</APIContext.Provider>
    )


    return (
      <StyledEngineProvider injectFirst>

        <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<Login/>} path="login" />
                    <Route index element={studio_search} />
                    <Route path="studios/search" element={studio_search} />
                    <Route path="studios/list" element={studio_list} />
                    <Route path='studios/list/details/:id' element={studio_details} />
                    <Route path='studios/:studio_id/classes/:class_id/schedule' element={class_schedule} />
                    <Route path="classes/search" element={class_search} />
                    <Route path="subscriptions" element={subscriptions_list} />
                    <Route path="user/subscription" element={user_subscription} />
                    <Route path="user/classes" element={user_classes} />
                    
                </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>

      </StyledEngineProvider>

    )
}

export default App;
