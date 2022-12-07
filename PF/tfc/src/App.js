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
import APIContext, {useAPIContext} from "./Contexts/APIContext";
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

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={studio_search} />
                    <Route path="studios/search" element={studio_search} />
                    <Route path="studios/list" element={studio_list} />
                    <Route path='studios/list/details/:id' element={studio_details} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;