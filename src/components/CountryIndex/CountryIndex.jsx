import './CountryIndex.css'
import { useEffect, useState } from 'react'
import { countryIndex } from '../../services/country'

import { Link } from 'react-router'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const CountryIndex = () => {
  const [countries, setCountries] = useState([])
  const [errorData, setErrorData] = useState({})
  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await countryIndex()
        setCountries(data)
      } catch (error) {
        console.log(error)
        setErrorData(error.response.data)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCountries()
  }, []);

  return (
    <>

      <h1>All Countries</h1>
      {errorData.message
        ? <p className='error-message'>{errorData.message}</p>
        : isLoading
          ? <LoadingIcon />
          : (
            <div className="country-grid">
              {countries.map(country => (
                <div key={country._id} className="country-card">
                  <Link to={`/countries/${country._id}`}>
                    <h2>{country.name}</h2>
                    <p>{country.description}...</p>
                  </Link>
                </div>
              ))}
            </div>

          )
      }

    </>
  )
}

export default CountryIndex;
