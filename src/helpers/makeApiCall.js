/*
Helper function that makes API calls after a user
submits the search form

This is not a custom hook, because custom hooks
can't be used in or as event handlers!
*/

// useDispatch can't be used in a regular function, so dispatch is passed as argument
const makeApiCall = ({
    path,
    dispatch,
    params } = {}) => {
    const urlBase = 'https://api.openbrewerydb.org/breweries'

    let url = urlBase

    switch (path) {
        case 'by_city': {
            const underscoreEncodedCity = params.city.toLowerCase().replaceAll(' ', '_')

            console.log(underscoreEncodedCity);

            url += `?by_city=${underscoreEncodedCity}`
        }
        break;

        case 'by_type': {
            url += `?by_type=${params.type}`
        }
        break;

        case 'combined': {
            const underscoreEncodedCity = params.city.toLowerCase().replaceAll(' ', '_')

            console.log(underscoreEncodedCity);

            url += `?by_city=${underscoreEncodedCity}&by_type=${params.type}`
        }
        break;

        default:
            break;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {

            // DEBUG
            console.log("data from API call");
            console.log(data);

            dispatch({ type: 'UPDATE_API_RESULTS', data })
        })
}

export default makeApiCall