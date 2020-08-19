import React , {useState , useEffect} from 'react'
import {NativeSelect , FormControl} from "@material-ui/core"
import {fetchCountries} from "../../api/index"
import styles from "./CountryPicker.module.css"

const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        
        const fetchapi = async () => {
            setFetchedCountries(await fetchCountries())
        }
        fetchapi();

    } , []);

    return (
        <FormControl className = {styles.formcontrol}>
            <NativeSelect defaultValue = "" onChange = {(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country , i) => <option key = {i} value = {country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker
