import React from "react";
import {Routes, Route} from 'react-router-dom'

import BrewerySearch from "../BrewerySearch/BrewerySearch";
import BreweryDetails from "../BreweryDetails/BreweryDetails";
import Favorites from "../Favorites/Favorites";
import Rankings from "../Rankings/Rankings";
import Login from "../Login/Login";
import Register from "../Register/Register";

const BreweryRouter = () => {
    return <Routes>
        <Route path="/" element={<BrewerySearch />}/>
        <Route path="/details/:id" element={<BreweryDetails />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/rankings" element={<Rankings />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        {/* <Route path="/change-user-data" element={<ChangeUserData />}/>
        <Route path="/highscores" element={<HighScores />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/logout" element={<Logout />}/>
        <Route path="/register" element={<RegisterUser />}/> */}
    </Routes>
}

export default BreweryRouter