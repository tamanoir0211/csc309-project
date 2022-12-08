// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
import React from 'react';
import './App.css';
import StudiosSearch from "./components/StudiosSearch";
import StudiosList from "./components/StudiosList";
import StudioDetails from "./components/StudioDetails";
import ClassSchedule from "./components/ClassSchedule";
import ClassSearch from './components/ClassSearch/classSearch';
import SubscriptionList from './components/Subscriptions/subscriptionList';
import UserClasses from './components/userClasses - TBA/userClasses';
import UserSubscriptions from './components/userSubscription /userSubscription';
import APIContext, {useAPIContext} from "./Contexts/APIContext";
import APIClassesContext, {useAPIClassesContext} from "./Contexts/APIClassesContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";

function App() {
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
        <APIContext.Provider value={useAPIContext()}>
            <SubscriptionList />
        </APIContext.Provider>
    )

    const user_subscription = (
        <APIContext.Provider value={useAPIContext()}>
            <UserSubscriptions />
        </APIContext.Provider>
    )

    const user_classes = (
        <APIContext.Provider value={useAPIContext()}>
            <UserClasses />
        </APIContext.Provider>
    )


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
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
        </BrowserRouter>
    )
}

export default App;