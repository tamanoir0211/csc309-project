import React, { Children } from 'react';
import './App.css';
import {useState, useEffect, useContext} from 'react';
import Login from './views/Login';
import {StyledEngineProvider } from '@mui/material/styles';
// Views
import Account from './views/Account';
import {AuthContext, AuthProvider} from './context/AuthContext';
import CssBaseline from '@mui/material/CssBaseline';
import StudiosSearch from "./components/StudiosSearch";
import StudiosList from "./components/StudiosList";
import StudioDetails from "./components/StudioDetails";
import ClassSchedule from "./components/ClassSchedule";
import APIContext, {useAPIContext} from "./Contexts/APIContext";
import APIClassesContext, {useAPIClassesContext} from "./Contexts/APIClassesContext";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from "react-router-dom";
import Layout from "./components/Layout";



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
                    <Route index element={studio_search} />
                    <Route path="studios/search" element={studio_search} />
                    <Route path="studios/list" element={studio_list} />
                    <Route path='studios/list/details/:id' element={studio_details} />
                    <Route path='studios/:studio_id/classes/:class_id/schedule' element={class_schedule} />
                </Route>
            </Routes>
        </AuthProvider>
        </BrowserRouter>

      </StyledEngineProvider>

    )
}

export default App;
