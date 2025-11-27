import './CountryIndex.css'
import { useEffect, useState } from 'react'
import {countryIndex} from '../../services/country'

import { Link } from 'react-router'

const CountryIndex = () => {
    const [countries, setCountries] = useState ([])
    const [errorData, setErrorData] = useState({})
    const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    const getData = async () => {
        try {
            const {data} = await countryIndex()
            setCountries(data)
        } catch (error) {
            console.log(error)
            setErrorData(error.response.data)
        } finally {
            setIsLoading(false)
        }
    }
    getData()
  }, []);

  return(
  <>

   <h1>All Countries</h1>
   { errorData.message
        ? <p className='error-message'>{errorData.message}</p>
        : isLoading
        ? <p>Loading...</p>
        : countries.map(country => {
              return (
                <div key={country._id} className='country-card'>
                  <Link to={`/countries/${country._id}`}>
                    <h2>{country.name}</h2>
                    <p>{country.description.substring(0, 15)}...</p>
                  </Link>
                </div>
              )
            })
      }
    </>
  )
}

export default CountryIndex;
