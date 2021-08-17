import React, { useState, useEffect} from 'react';
import './CountrySearchBar.css';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';

axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';

const SearchBar = (props) => {

    const [listOfCountryDetails, setListOfCountryDetails] = useState([]);
    const [listOfCountryNames, setListOfCountryNames] = useState([]);

    useEffect(() => {
         getListOfCountryDetails();
    }, []);

    useEffect(() => {
        const countryNames = listOfCountryDetails.map(countryDetail => countryDetail.name);
        setListOfCountryNames(countryNames);

    }, [listOfCountryDetails]);

    const getListOfCountryDetails = async () => {

        const response = await axios.get('/all');
        const countryDetails = response.data;
        setListOfCountryDetails(countryDetails);

    }

    return (
        <div className="country-search-bar">
            <Autocomplete
                id="combo-box-demo"
                options={listOfCountryNames}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search Country" variant="outlined" />}
                onChange={(event, newValue) => {
                    props.setSelectedCountry(newValue);
                }}
                value={props.selectedCountry}
            />
        </div>
    )
}

export default SearchBar;