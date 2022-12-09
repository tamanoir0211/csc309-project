import React, { Children } from 'react';
import './App.css';
import {useState, useEffect, useContext} from 'react';
import Login from './views/Login';
import Register from './views/Register';
import Payment from './views/Payment';
import {StyledEngineProvider } from '@mui/material/styles';
// Views
import Account from './views/Account';
import {AuthContext, AuthProvider} from './context/AuthContext';
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
import APIDropClassContext, {useAPIDropClassContext} from './Contexts/APIDropClassContext';
import UserClassesHistory from './components/userClasses/userClassesHistory';

function PrivateRoute({children}){
    const { authTokens } = useContext(AuthContext);
    let location = useLocation();
    if(!authTokens){
        return <Navigate to="/login" state={{ from: location}} replace/>
    } else {
      return children;
    }
};
//<PrivateRoute element={<Account/>} path="account" />

function NonPrivateRoute({children}){
    const { authTokens } = useContext(AuthContext);
    let location = useLocation();
    if(authTokens){
        return <Navigate to="/account" state={{ from: location}} replace/>
    } else {
      return children;
    }
}

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
        <APIDropClassContext.Provider value={useAPIDropClassContext()}>
            <UserClasses />
        </APIDropClassContext.Provider>
    )

    const user_classes_history = (
          <UserClassesHistory />
  )



    return (
      <StyledEngineProvider injectFirst>

        <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route element={<Login/>} path="login" />
                    <Route 
                      path="account"
                      element={
                        <PrivateRoute>
                          <Account />
                        </PrivateRoute>
                      }
                    />
                    <Route 
                      path="register"
                      element={
                        <NonPrivateRoute>
                          <Register />
                        </NonPrivateRoute>
                      }
                    />
                    <Route 
                      path="payment"
                      element={
                        <PrivateRoute>
                          <Payment />
                        </PrivateRoute>
                      }
                    />
                    <Route index element={studio_search} />
                    <Route path="studios/search" element={studio_search} />
                    <Route path="studios/list" element={studio_list} />
                    <Route path='studios/list/details/:id' element={studio_details} />
                    <Route path='studios/:studio_id/classes/:class_id/schedule' element={class_schedule} />
                    <Route path="classes/search" element={class_search} />
                    <Route path="subscriptions" element={subscriptions_list} />
                    <Route path="user/subscription" element={user_subscription} />
                    <Route path="user/classes" element={user_classes} />
                    <Route path="user/classes/history" element={user_classes_history} />
                    
                </Route>
            </Routes>
        </AuthProvider>
        </BrowserRouter>

      </StyledEngineProvider>

    )
}

export default App;
