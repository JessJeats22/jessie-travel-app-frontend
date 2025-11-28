import './TravelPostUpdate.css'
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router'
import { UserContext } from '../../contexts/UserContext.jsx'
import { showTravelPost, updateTravelPost } from '../../services/travelPosts'

const TravelPostUpdate = () => {

  // Context
  const { user } = useContext(UserContext)

  // State
  const [formData, setFormData] = useState({
    country: "",
    location: "",
    whatTheyDid: "",
    recommendations: "",
    images: [{ url: "", caption: "" }]
  })

  const [countries, setCountries] = useState([])  
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})  

  const { travelPostId } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const input = e.target
    setFormData({ ...formData, [input.name]: input.value })
  }

  const handleImageChange = (e, index) => {
    const updated = [...formData.images]
    updated[index] = { url: e.target.value }
    setFormData({ ...formData, images: updated })
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

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await showTravelPost(travelPostId)

        setFormData({
          country: data.country._id,
          location: data.location,
          whatTheyDid: data.whatTheyDid,
          recommendations: data.recommendations,
          images: data.images.length ? data.images : [{ url: "", caption: "" }]
        })
      } catch (error) {
        console.log(error)
        const { status, data } = error.response
        if (status === 500) {
          setErrorData({ message: 'Something went wrong. Please try again.' })
        } else if (status === 404) {
          navigate('/page-not-found')
        } else {
          setErrorData(data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [travelPostId, navigate])

  

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
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor="whatTheyDid">Tell us about your trip!</label>
          <input
            type="text"
            name="whatTheyDid"
            id="whatTheyDid"
            placeholder="Tell us about your trip!"
            value={formData.whatTheyDid}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-control'>
          <label htmlFor="recommendations">Recommendations</label>
          <input
            type="text"
            name="recommendations"
            id="recommendations"
            placeholder="Recommendations"
            value={formData.recommendations}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="image-url">Image URL</label>
          <input
            type="text"
            id="image-url"
            placeholder="Image URL"
            value={formData.images[0].url}
            onChange={(e) => handleImageChange(e, 0)}
          />
        </div>

        <button type="submit">Update Travel Post</button>

      </form>
    </>
  )
}

export default TravelPostUpdate
