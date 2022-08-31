import React from 'react';
import { useSelector } from 'react-redux';
import deepCopy from '../../helpers/deepCopy';

const Rankings = () => {

    const rankingData = useSelector(state => {
        // First iterate through all users to get the ranking data
        const users = state.users

        const rankingData = []

        users.forEach(user => {
            // Iterate through all breweries the user has rated
            user.breweries.filter(brewery => brewery.rating > 0).forEach(brewery => {
                // Check whether the bakery is already in rankingData!
                const alreadyAddedBrewery = rankingData.find(data => data.id === brewery.id)
                
                if (!alreadyAddedBrewery) {
                    // First occurence of the bakery, start with an array with one rating 
                    rankingData.push({
                        id: brewery.id,
                        ratings: [brewery.rating]
                    })
                } else {
                    alreadyAddedBrewery.ratings.push(brewery.rating)
                }
            })
        })

        return rankingData
    })

    // Compute the total and average ratings and add them to the rankingData
    rankingData.forEach(brewery => {
        brewery.totalRating = brewery.ratings.reduce((acc, next) => acc+next, 0)
        brewery.averageRating = brewery.totalRating / brewery.ratings.length

        // Use the id to get the brewery name, because it's not stored in the Redux store!
        const nameParts = brewery.id.split("-")
        const capitalizedNameParts = nameParts.map(part => part[0].toUpperCase() + part.substring(1))
        brewery.name = capitalizedNameParts.join(" ")
    })


    // Sort the rankingData by averageRating after making a deep copy
    const sortedRankingData = deepCopy(rankingData)
    sortedRankingData.sort((a,b) => b.averageRating - a.averageRating)

    console.log(sortedRankingData);

    return <div>
        <h2>Highest average ratings</h2>
        <ol>
            {sortedRankingData.map(brewery => <li>
                {brewery.name}: {brewery.averageRating} (total stars: {brewery.totalRating})
            </li>)}
        </ol>
    </div>
}

export default Rankings