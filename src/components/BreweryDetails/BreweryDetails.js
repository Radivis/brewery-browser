import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import useUser from '../../hooks/useUser';
import useFetchBrewery from '../../hooks/useFetchBrewery';
import ActionPanel from '../ActionPanel/ActionPanel';
import Comments from '../Comments/Comments';

const BreweryDetails = () => {

    const user = useUser()

    const { id } = useParams()

    const [loadedData, setLoadedData] = useState(null)

    useFetchBrewery({
        id,
        loadedData,
        setLoadedData
    })

    // Extract relevant data from the data object
    const {
        name,
        brewery_type,
        street,
        country,
        state,
        county_province,
        // created_at,
        // updated_at,
        city,
        postal_code,
        phone,
        website_url
    } = loadedData || {} // variables remain undefined, if data not yet loaded

    // DEBUG
    console.log(loadedData);

    return <div className="card">
        <h3>{name}</h3>
        <div>Type: {brewery_type}</div>
        <div className="address">
            <div>{street}</div>
            <div>{postal_code}, {city}, {state}</div>
            <div>{county_province}</div>
            <div>{country}</div>
        </div>
        {phone && <div>Phone: {phone}</div>}
        <div>API-ID: {id}</div>
        {website_url && <a href={website_url}>Website</a>}
        {user && loadedData ? <ActionPanel data={loadedData} showDetailsLink={false} /> : ''}
        <Comments id={id} />
    </div>
}

export default BreweryDetails