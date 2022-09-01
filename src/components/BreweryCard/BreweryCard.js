/* Summarizes the most important information
of a brewery in a card */

import React, { useState } from "react";
import { useSelector } from "react-redux";

import ActionPanel from "../ActionPanel/ActionPanel";
import Comments from "../Comments/Comments";
import useUser from "../../hooks/useUser";
import useFetchBrewery from "../../hooks/useFetchBrewery";
import useFavoriteStatus from "../../hooks/useFavoriteStatus";

import './BreweryCard.css';

const BreweryCard = ({ data }) => {

    const user = useUser()

    const favoriteStatus = useFavoriteStatus(data.id)

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

    return <div className={favoriteStatus === 0 ?
    "card" // regular card
    :
    favoriteStatus === 1 ? "card card-favorited" : "card card-interacted"}>
        <h3>{name}</h3>
        <div>Type: {brewery_type}</div>
        <div className="address">
            <div>{street}</div>
            <div>{city}, {state? `${state},` : ''} {country}</div>
        </div>
        {website_url && <a href={website_url}>Website</a>}
        {user ? <ActionPanel data={data} /> : ''}
        <Comments id={id}/>
    </div>
}

export default BreweryCard