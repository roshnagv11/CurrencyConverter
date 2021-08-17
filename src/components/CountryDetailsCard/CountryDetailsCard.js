import React, { useState, useEffect } from 'react';
import './CountryDetailsCard.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 20,
        marginBottom: 12,
    },
});

const CountryDetailsCard = (props) => {
    const classes = useStyles();

    const [countryDetailsList, setCountryDetailsList] = useState([]);
    const [countryNamePopulationCurrenyDetailsList, setCountryNamePopulationCurrenyDetailsList] = useState([]);
    const [currencyRatesList, setCurrencyRatesList] = useState([]);
    const [population, setPopulation] = useState('');
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {

        setDataOnInitialComponentLoad();

    }, []);

    useEffect(() => {

        setCountryNamePopulationCurrenyDetailsList(
            countryDetailsList.map(countryDetail => {
                return { name: countryDetail.name, population: countryDetail.population, currencies: countryDetail.currencies }
            }))

    }, [countryDetailsList])

    useEffect(() => {

        if (props.selectedCountry != null) {

            const countryDetail = countryNamePopulationCurrenyDetailsList.filter(datum => datum.name === props.selectedCountry)[0];

            setPopulation(countryDetail?.population)
            setCurrencies(countryDetail?.currencies || []);

        }

    }, [props.selectedCountry, countryNamePopulationCurrenyDetailsList])

    const setDataOnInitialComponentLoad = async () => {

        axios.defaults.baseURL = 'https://restcountries.eu/rest/v2';

        let response = await axios.get('/all');
        const countryDetails = response.data;
        setCountryDetailsList(countryDetails);

        axios.defaults.baseURL = 'http://data.fixer.io/api/latest?access_key=b33e24a5d5cfaeaf32c812b5f2bab5c7&format=1';

        response = await axios.get('/');
        const currencyRates = response.data.rates;
        setCurrencyRatesList(currencyRates);

    }

    const calculateCrossCurrencyExchangeRate = (baseCurrencyCode, crossCurrencyPairCodes) => {

        return (currencyRatesList[crossCurrencyPairCodes[0]] / currencyRatesList[baseCurrencyCode]) *
            (currencyRatesList[baseCurrencyCode] / currencyRatesList[crossCurrencyPairCodes[1]])

    }

    return (

        <div style={{ marginLeft: '6px' }}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        <div style={{ textAlign: 'left' }}>{props.selectedCountry}</div>
                    </Typography>
                    <Typography variant="body2" component="div">
                        <div style={{ textAlign: 'left' }}><strong>Population</strong> : {population}</div>
                    </Typography>
                    <Typography variant="body2" component="div">
                        <div style={{ textAlign: 'left' }}>
                            <strong>Currencies</strong> :
                            <ul style={{ listStyleType: 'none' }}>
                                {currencies.map(currency =>
                                    <li style={{ textAlign: 'left' }}>
                                        {`1 ${currency.name}(${currency.code})  =  ${calculateCrossCurrencyExchangeRate('EUR', ['INR', currency.code])} Indian rupees(INR) `}
                                    </li>)}
                            </ul>
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default CountryDetailsCard;
