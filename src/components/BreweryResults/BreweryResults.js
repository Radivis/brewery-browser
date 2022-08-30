import React from 'react'
import { useSelector } from 'react-redux'

import BreweryCard from '../BreweryCard/BreweryCard'

import './BreweryResults.css'

const BreweryResults = () => {

    const data = useSelector(state => state.lastApiResponse)

    if (data) {
        if (data.length === 0) {
            return <p>Sorry, no registered breweries in this city!</p>
        } else {
            return (
                <div className="cards">
                    {data.map(brewery => <BreweryCard
                        data={brewery}
                        key={brewery.id} />
                    )}
                </div>
            )
        }
    } else {
        <p>Come on, search for breweries!</p>
    }
}

export default BreweryResults