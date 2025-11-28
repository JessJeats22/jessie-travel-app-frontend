import './CountryDetails.css'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import { countryShow } from '../../services/country'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { getAllTravelPosts } from '../../services/travelPosts'
import { Link } from 'react-router'


const CountryDetails = () => {
    const [country, setCountry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [travelPosts, setTravelPosts] = useState([]);

    
    const { countryId } = useParams()
    // console.log("PARAMS:", useParams())
   
    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await countryShow(countryId)
                console.log("API RESPONSE:", data)
                setCountry(data.country)
            } catch (error) {
                console.log(error)
                setErrorData(error.response.data)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [countryId])

    useEffect(() => {
    const fetchTravelPosts = async () => {
        try {
            const { data } = await getAllTravelPosts();
            console.log("THIS IS DATA", data)
            const filtered = data.filter(post => post.country._id === countryId);
            setTravelPosts(filtered);
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };

    fetchTravelPosts();
}, [countryId]);


    
    return (
        <div className="country-details-container">

            <h1 className="country-title">
                {country?.name || "Country Details"}
            </h1>

            {errorData.message ? (
                <p className='error-message'>{errorData.message}</p>
            ) : isLoading ? (
                <LoadingIcon />
            ) : !country ? (
                <p>Nothing to display.</p>
            ) : (
                <>
                    <section className="country-details-card">
                        <ul>
                            <li>
                                <span className="label">Population:</span>
                                <span className="value">{country.population?.toLocaleString()}</span>
                            </li>

                            <li className="flag-item">
                                <span className="label">Flag:</span>
                                {country.flag ? (
                                    <img className="flag" src={country.flag} alt={`${country.name} flag`} />
                                ) : (
                                    <span className="value">N/A</span>
                                )}
                            </li>

                            <li>
                                <span className="label">Description:</span>
                                <span className="value">{country.description}</span>
                            </li>

                            <li>
                                <span className="label">Continent:</span>
                                <span className="value">{country.continent}</span>
                            </li>

                            <li>
                                <span className="label">Languages:</span>
                                <span className="value">
                                    {Array.isArray(country.languages)
                                        ? country.languages.join(", ")
                                        : country.languages}
                                </span>
                            </li>

                            <li>
                                <span className="label">Currency:</span>
                                <span className="value">{country.currency}</span>
                            </li>

                            <li>
                                <span className="label">Created by:</span>
                                <span className="value">{country.createdBy}</span>
                            </li>
                        </ul>
                    </section>

                    <section className="country-travelposts">
                        <h2>Travel Posts for this Country</h2>

                        {travelPosts.length === 0 ? (
                            <p>No travel posts yet.</p>
                        ) : (
                            <ul className="travelposts-list">
                                {travelPosts.map(post => (
                                    <li key={post._id}>
                                        <Link to={`/travelPost/${post._id}`}>
                                            {post.location}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <Link className="add-post-button" to={`/travelPost/new?country=${countryId}`}>
                            Add Your Travel Post
                        </Link>
                    </section>
                </>
            )}
        </div>
    )
}
export default CountryDetails
