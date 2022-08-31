import React from "react";
import {Routes, Route} from 'react-router-dom'

import BrewerySearch from "../BrewerySearch/BrewerySearch";
import BreweryDetails from "../BreweryDetails/BreweryDetails";
import Favorites from "../Favorites/Favorites";
import Rankings from "../Rankings/Rankings";
import Contact from "../Contact/Contact";
import Login from "../Login/Login";
import Register from "../Register/Register";

const BreweryRouter = () => {
    return <Routes>
        <Route path="/" element={<BrewerySearch />}/>
        <Route path="/details/:id" element={<BreweryDetails />}/>
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="/rankings" element={<Rankings />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
    </Routes>
}

export default BreweryRouter