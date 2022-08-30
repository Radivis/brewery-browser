/* Summarizes the most important information
of a brewery in a card */

import React, { useState } from "react";

import ActionPanel from "../ActionPanel/ActionPanel";
import useUser from "../../hooks/useUser";
import useFetchBrewery from "../../hooks/useFetchBrewery";

import './BreweryCard.css';

const BreweryCard = ({ data }) => {

    const user = useUser()

    const [loadedData, setLoadedData] = useState(null)

    // If data has been fetched from the API, overwrite the data from props!
    if(loadedData) data = loadedData

    // Extract relevant data from the data object
    const {
        id,
        name,
        brewery_type,
        street,
        country,
        state,
        city,
        website_url
    } = data

    // If name could not be found, then assume that the brewery data wasn't loaded
    useFetchBrewery({
        id,
        name,
        loadedData,
        setLoadedData
    })

    return <div className="card">
        <h3>{name}</h3>
        <div>Type: {brewery_type}</div>
        <div className="address">
            <div>{street}</div>
            <div>{city}, {state}</div>
            <div>{country}</div>
        </div>
        {website_url && <a href={website_url}>Website</a>}
        {user ? <ActionPanel data={data} /> : ''}
    </div>
}

export default BreweryCard