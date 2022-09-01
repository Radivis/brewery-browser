import React, { useState } from 'react';
import { useDispatch } from "react-redux"

import BreweryResults from '../BreweryResults/BreweryResults';

import makeApiCall from '../../helpers/makeApiCall';

import './BrewerySearch.css'
import PageHeader from '../PageHeader/PageHeader';

const BrewerySearch = () => {

    const validTypes = [
        'micro',
        'nano',
        'regional',
        'brewpub',
        'large',
        'planning',
        'bar',
        'contract',
        'proprietor',
        'closed'
    ]

    const dispatch = useDispatch()

    const [city, setCity] = useState('')
    const [type, setType] = useState('')
    const [results, setResults] = useState(null)

    /* map each state variable name to the corresponding setter
    , so that I don't need to use conditional statements to get the right setter */
    const setterMap = new Map()
    setterMap.set('city', setCity)
    setterMap.set('type', setType)

    const handleChange = ev => {
        setterMap.get(ev.target.name)(ev.target.value)
    }

    const handleSubmit = ev => {
        ev.preventDefault()

        if (type) {
            if (city) {
                makeApiCall({
                    path: 'combined',
                    dispatch,
                    params: { city, type }
                })
            } else {
                makeApiCall({
                    path: 'by_type',
                    dispatch,
                    params: { type }
                })
            }
        } else {
            makeApiCall({
                path: 'by_city',
                dispatch,
                params: { city }
            })
        }
    }

    return <div>
        <PageHeader title="Find Breweries" isHome={true} />
        <form className="search-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="city">City</label>
                <input type="text" name="city" placeholder="Dublin" value={city} onChange={handleChange}></input>
            </div>
            <div>
                <label htmlFor="type">Type</label>
                <select name="type" value={type} onChange={handleChange}>
                    <option value="" key="nothing selected">-Select a type-</option>
                    {validTypes.map(validType => <option value={validType} key={validType}>{validType}</option>)}
                </select>
            </div>
            <button type="submit">Search Breweries</button>
        </form>
        <BreweryResults />
    </div>
}

export default BrewerySearch