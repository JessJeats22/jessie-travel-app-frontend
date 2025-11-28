import './CountryDetails.css'
import { useParams } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import { countryShow } from '../../services/country'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { getAllTravelPosts } from '../../services/travelPosts'
import { Link } from 'react-router'
import { UserContext } from '../../contexts/UserContext'


const CountryDetails = () => {

    const { user } = useContext(UserContext)

    const [country, setCountry] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})
    const [travelPosts, setTravelPosts] = useState([]);


    const { countryId } = useParams()


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

                                <li className="flag-item">
                    
                                {country.flag ? (
                                    <span className="flag-emoji">{country.flag}</span>

                                ) : (
                                    <span className="value">N/A</span>
                                )}
                            </li>

                            <li>
                                <span className="label">Population:</span>
                                <span className="value">{country.population?.toLocaleString()}</span>
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

                        </ul>
                    </section>

                    <section className="country-travelposts">
                        <h2>Travel Posts for this Country</h2>

                        {!user ? (
                            <p className="signin-message">
                                You must <Link to="/sign-in">sign in</Link> to view and create travel posts.
                            </p>
                        ) : (
                            <>
                                {travelPosts.length === 0 ? (
                                    <p>No travel posts yet.</p>
                                ) : (
                                    <div className="travelposts-grid">
                                        {travelPosts.map(post => (
                                            <Link key={post._id} to={`/travelPost/${post._id}`} className="travelpost-card">

                                                <h3 className="post-location">{post.location}</h3>

                                                <p className="post-description">
                                                    {post.whatTheyDid?.slice(0, 80)}{post.whatTheyDid?.length > 80 ? "..." : ""}
                                                </p>

                                            </Link>
                                        ))}
                                    </div>
                                )}

                                <Link className="add-post-button" to={`/travelPost/new?country=${countryId}`}>
                                    Add A Travel Post!
                                </Link>
                            </>
                        )}
                    </section>

                </>
            )}
        </div>
    )
}
export default CountryDetails
