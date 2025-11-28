import './TravelPostDetails.css'
import { useParams, useNavigate } from 'react-router'
import { useEffect, useState, useContext } from 'react'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { showTravelPost } from '../../services/travelPosts'
import TravelPostDelete from "../TravelPostDelete/TravelPostDelete";
import { UserContext } from '../../contexts/UserContext'
import { Link } from 'react-router'


const TravelPostDetails = () => {

    const { user } = useContext(UserContext)


    const [travelPost, setTravelPost] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorData, setErrorData] = useState({})

    const { travelPostId } = useParams()
  const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await showTravelPost(travelPostId)
                console.log("API RESPONSE:", data)
                setTravelPost(data)
            } catch (error) {
                console.log(error)
                setErrorData(error.response.data)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [travelPostId, navigate])


    return (
        <div className="travelpost-details-container">

            <h1 className="travelpost-title">
                {travelPost?.location || "Travel Post Details"}
            </h1>

            {errorData.message ? (
                <p className="error-message">{errorData.message}</p>
            ) : isLoading ? (
                <LoadingIcon />
            ) : !travelPost ? (
                <p>Nothing to display.</p>
            ) : (


                <section className="travelpost-details-card">
                    <ul>

                        <li>
                            <span className="label">Author:</span>
                            <span className="value">{travelPost.author.username}</span>
                        </li>

                        <li>
                            <span className="label">Country:</span>
                            <span className="value">{travelPost.country.name}</span>
                        </li>

                        <li>
                            <span className="label">Location:</span>
                            <span className="value">{travelPost.location}</span>
                        </li>

                        <li>
                            <span className="label">What They Did:</span>
                            <span className="value">{travelPost.whatTheyDid}</span>
                        </li>

                        <li>
                            <span className="label">Recommendations:</span>
                            <span className="value">{travelPost.recommendations}</span>
                        </li>

                        <li className="image-item">
                            <span className="label">Image:</span>
                            <img
                                src={travelPost.images[0].url}
                                alt={`${travelPost.location} travel-post-image`}
                                className="travelpost-image"
                            />
                        </li>

                    </ul>
                    {user._id === travelPost.author._id && <TravelPostDelete travelPostId={travelPostId} />}

                    {user._id === travelPost.author._id && (
                        <Link to={`/travelPost/${travelPostId}/edit`} className="edit-button">
                            Edit Travel Post
                        </Link>
                    )}


                </section>
            )}
        </div>
    )
}
export default TravelPostDetails