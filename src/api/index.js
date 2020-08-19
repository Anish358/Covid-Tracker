import axios from "axios" // helps so send get and post requests 

// url
const url = "https://covid19.mathdro.id/api";

// will fetch data asynchronously 
export const fetchData = async (country) => {

    let changebleURL = url;

    if(country){
      changebleURL = `${url}/countries/${country}`
    }

    try {
        const {data : {confirmed ,  recovered , deaths , lastUpdate} } = await axios.get(changebleURL);
        return {
            confirmed,
            recovered , 
            deaths,
            lastUpdate
        }
    } catch (error) {
        
    }
}
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get(`${url}/daily`);
  
      return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
    } catch (error) {
      return error;
    }
  };

  export const fetchCountries = async () => {
    try {
      const { data: { countries } } = await axios.get(`${url}/countries`);
  
      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };