/* Summarizes the most important information
of a brewery in a card */

import React from "react";

import './BreweryCard.css';

const BreweryCard = ({data}) => {

    const {name,
        brewery_type,
        street,
        country,
        state,
        city,
        website_url
        } = data

return <div className="card">
    <h3>{name}</h3>
    <div>Type: {brewery_type}</div>
    <div className="address">
        <div>{street}</div>
        <div>{city}, {state}</div>
        <div>{country}</div>
    </div>
    {website_url && <a href={website_url}>Website</a>}
</div>
}

export default BreweryCard