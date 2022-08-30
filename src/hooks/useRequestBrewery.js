/*
This custom hook fetches brewery data, if necessary
If a name is already provided, it is assumed that the data
has already been fetched.

Otherwise the data is fetched from the API for the
brewery with the given id,
unless it has already been fetched by this hook,
in which case the loadedData would already have been passed to it!
*/

import { useState } from "react"

const useFetchBrewery = ({
    id,
    name,
    loadedData,
    setLoadedData } = {}) => {

    const [loading, setLoading] = useState(false)

    if (!loading) {
        if (!name && !loadedData) {
            const urlBase = 'https://api.openbrewerydb.org/breweries'

            const url = `${urlBase}/${id}`

            setLoading(true)

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    // DEBUG
                    console.log("data from API call");
                    console.log(data);

                    setLoadedData(data)
                    setLoading(false)
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false)
                })
        }
    }
}

export default useFetchBrewery