import React from 'react'
import { useSelector } from 'react-redux'

import BreweryCard from '../BreweryCard/BreweryCard'

import './BreweryResults.css'

const BreweryResults = () => {

    const data = useSelector(state => state.lastApiResponse)

    return <div className="cards">
        {data ? data.map(brewery => <BreweryCard
            data={brewery}
            key={brewery.id} />)
            : 'Here will be results'}
    </div>
}

export default BreweryResults