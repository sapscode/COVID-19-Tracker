import axios from 'axios'; //axios module to get the APIs

const url = 'https://covid19.mathdro.id/api'; // url of api

export const fetchData = async(country) => {
    let changeurl = url

    if(country){ // if there is a country , then url will request the country details from the API or else the URL will have same details
        changeurl = `${url}/countries/${country}`
    }
    try{ // if fetch is successful
        // const response = await axios.get(changeurl)
        const  {data} = await axios.get(changeurl) // destructuring the response, i.e response.data
        const modifiedData = { // making an object which will return only the parts of data we need

            confirmed : data.confirmed,
            recovered : data.recovered,
            deaths: data.deaths,
            lastUpdate: data.lastUpdate
        }

        return modifiedData 

    }catch(error){
        console.log(error)
    }
}

export const fetchDailyData = async() => {
    try{
        const { data } = await axios.get(`${url}/daily `) // string formatting to add /daily at the end of url to get daily data from API
        const modifiedDailyData = data.map(dailyData => ({ // data returned from the API is an array, hence we use map
            confirmed: dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date: dailyData.reportDate
        }))

        return modifiedDailyData
    }
    catch(error){
        console.log(error)
    }
}

export const fetchCountries = async() => {
    try{
        const { data: { countries } } = await axios.get(`${url}/countries`);
        return countries.map((country) => country.name);
    }
    catch(error){
        console.log(error)
    }
}