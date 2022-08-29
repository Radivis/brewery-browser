const useApi = (path, params) => {
    const urlBase = 'https://api.openbrewerydb.org/breweries'

    let url = urlBase

    switch (path) {
        case 'by_city':
            url += `by_city${params.city}`
            break;
    
        default:
            break;
    }

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })
}

export default useApi