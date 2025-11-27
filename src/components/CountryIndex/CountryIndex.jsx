import './CountryIndex.css'
import { useEffect, useState } from 'react'
import {countryIndex} from '../../services/country'

const CountryIndex = () => {
    const [countries, setCountries] = useState ([])


  useEffect(() => {
    const getData = async () => {
        try {
            const {data} = await countryIndex()
            console.log(data)
        } catch (error) {
            console.log(error)
            
        }
    }
    getData()
  }, []);

  return <h1>CountryIndex</h1>;
};

export default CountryIndex;
