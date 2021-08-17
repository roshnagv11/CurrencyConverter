import React, { useState } from 'react';
import CountrySearchBar from './CountrySearchBar/CountrySearchBar';
import CountryDetailsCard from './CountryDetailsCard/CountryDetailsCard';

const CurrencyConversionComponent = (props) => {

    const [selectedCountry, setSelectedCountry] = useState(null);

    return (
        <div>
            <CountrySearchBar selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
            { selectedCountry != null ? <CountryDetailsCard selectedCountry={selectedCountry} /> : null }
        </div>
    );
}

export default CurrencyConversionComponent;