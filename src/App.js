import React  from "react"
import {Charts ,  CountryPicker , Cards} from "./Components"
import styles from "./App.module.css"
import {fetchData} from "./api/index"

export class App extends React.Component {

    state = {
        data : {} ,
        country :""
    }

    // fetching the data as the componenet gets mounted
    async componentDidMount(){ 
        const fetchedData = await fetchData();
        this.setState({data : fetchedData})
    }

    handleCountryChange = async (country) =>  {
        const fetchedData = await fetchData(country);
        this.setState({data : fetchedData , country : country})
    }
    render() {
        // destructuring the data 
        const {data , country} = this.state;
        return (
            <div className = {styles.container}>
                <img src = " https://i.ibb.co/7QpKsCX/image.png" className = {styles.image} alt = "COVID -19" />
                <Cards data = {data}/>
                <CountryPicker handleCountryChange = {this.handleCountryChange}/>
                <Charts data = {data} country = {country}/>
            </div>
        )
    }
}

export default App
