import React from "react";
import {Routes, Route} from 'react-router-dom'

import BrewerySearch from "../BrewerySearch/BrewerySearch";

const BreweryRouter = () => {
    return <Routes>
        <Route path="/" element={<BrewerySearch />}/>
        {/* <Route path="/change-user-data" element={<ChangeUserData />}/>
        <Route path="/highscores" element={<HighScores />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/register" element={<RegisterUser />}/> */}
    </Routes>
}

export default BreweryRouter