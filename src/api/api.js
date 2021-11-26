export const getCities = async () =>
    fetch('https://docs.openaq.org/v2/cities?limit=10000&page=1&offset=0&sort=asc&order_by=city')
    .then(response => response.json())
    .then(data => data.results)
    .catch(err => console.log(err));


export const getMeasurements = async () =>
   fetch('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2021-11-25T01%3A00%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&order_by=datetime')
   .then(response => response.json())
   .then(data => data.results)
   .catch(err => console.log(err));


export const getCountries = async () =>
   fetch('https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/countries?limit=200&page=1&offset=0&sort=asc&order_by=country')
   .then(response => response.json())
   .then(data => data.results)
   .catch(err => console.log(err));