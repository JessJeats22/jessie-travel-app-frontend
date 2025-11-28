import './TravelPostUpdate.css'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext.jsx'
import { showTravelPost, updateTravelPost } from '../../services/travelPosts'
import { countryIndex } from '../../services/country'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

const TravelPostUpdate = () => {
  const { user } = useContext(UserContext)
  const { travelPostId } = useParams()
  const navigate = useNavigate()

  if (!user) return <Navigate to="/sign-in" />

  const [formData, setFormData] = useState({
    country: "",
    location: "",
    whatTheyDid: "",
    recommendations: "",
    image: ""
  })

  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  const setTravelPostImage = (imageURL) => {
    setFormData(prev => ({ ...prev, image: imageURL }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateTravelPost(travelPostId, formData)
      navigate(`/travelPost/${travelPostId}`)
    } catch (error) {
      console.log(error)
      if (error.response.status === 500) {
        return setErrorData({ message: 'Something went wrong. Please try again.' })
      }
      setErrorData(error.response.data)
    }
  }

  // Load post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await showTravelPost(travelPostId)

        setFormData({
          country: data.country._id,
          location: data.location,
          whatTheyDid: data.whatTheyDid,
          recommendations: data.recommendations,
          image: data.image || ""
        })
      } catch (error) {
        console.log(error)
        const { status, data } = error.response
        if (status === 404) navigate("/page-not-found")
        else setErrorData(data)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [travelPostId, navigate])

  // Load countries
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const { data } = await countryIndex()
        setCountries(data)
      } catch (error) {
        console.log(error)
      }
    }
    loadCountries()
  }, [])

  if (isLoading) return <p>Loading...</p>

  return (
    <>
      <h1>Update your Travel Post</h1>

      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a country --</option>
            {countries.map(country => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-control'>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor="whatTheyDid">Tell us about your trip!</label>
          <textarea
            name="whatTheyDid"
            id="whatTheyDid"
            value={formData.whatTheyDid}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor="recommendations">Recommendations</label>
          <textarea
            name="recommendations"
            id="recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            required
          />
        </div>

        {/* Use the exact same ImageUploadField as Create */}
        <ImageUploadField
          labelText="Upload Travel Post Image"
          fieldName="image"
          setImage={setTravelPostImage}
          imageURL={formData.image}
        />

        <button type="submit">Update Travel Post</button>
      </form>
    </>
  )
}

export default TravelPostUpdate
