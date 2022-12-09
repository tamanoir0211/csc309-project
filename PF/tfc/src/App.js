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
import {BrowserRouter, Route, Routes, Navigate, useLocation, Link as RouterLink, MemoryRouter} from "react-router-dom";
import Layout from "./components/Layout";
import APISubscriptionMessageContext, {useSubscriptionMessageContext} from './context/SubscriptionMessageContext';
import APIDropClassContext, {useAPIDropClassContext} from './Contexts/APIDropClassContext';
import MyAppBar from './components/Header';
import { LinkProps } from '@mui/material/Link';
import { StaticRouter } from 'react-router-dom/server';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PropTypes from 'prop-types'
import UserClassesHistory from './components/userClasses/userClassesHistory';

const LinkBehavior = React.forwardRef((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
  });
  
  LinkBehavior.propTypes = {
    href: PropTypes.oneOfType([
      PropTypes.shape({
        hash: PropTypes.string,
        pathname: PropTypes.string,
        search: PropTypes.string,
      }),
      PropTypes.string,
    ]).isRequired,
  };
  
  function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
      return <StaticRouter location="/">{children}</StaticRouter>;
    }
  
    return <MemoryRouter>{children}</MemoryRouter>;
  }
  
  Router.propTypes = {
    children: PropTypes.node,
  };
  
  const theme = createTheme({
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

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
        <ThemeProvider theme={theme}>
        <BrowserRouter>
        <AuthProvider>
                <MyAppBar />

            <Routes>
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
                    
            </Routes>
        </AuthProvider>
        </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>

    )
}

export default App;
