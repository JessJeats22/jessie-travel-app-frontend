import './TravelPostCreate.css'
import { useEffect, useState, useContext } from 'react'
import { countryIndex } from '../../services/country'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { createTravelPost } from '../../services/travelPosts'
import { useNavigate, Navigate } from 'react-router'
import { UserContext } from '../../contexts/UserContext.jsx'
import ImageUploadField from '../ImageUploadField/ImageUploadField'

const TravelPostCreate = () => {

    const { user } = useContext(UserContext)


    const [errorData, setErrorData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [countries, setCountries] = useState([])
    const [formData, setFormData] = useState({
        country: "",
        location: "",
        whatTheyDid: "",
        recommendations: "",
        images: [
            {
                url: "",
                caption: ""
            }
        ]

    })

    const navigate = useNavigate()

    useEffect(() => {
        const getData = async () => {
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
        getData()
    }, []);



    const handleChange = (e) => {

        const input = e.target

        setFormData({ ...formData, [input.name]: input.value })

    }

    const handleImageChange = (e, index) => {
        const updatedImages = [...formData.images];
        updatedImages[index].url = e.target.value;
        setFormData({ ...formData, images: updatedImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await createTravelPost(formData)
            // console.log(response)
            navigate(`/travelPost/${data._id}`)
        } catch (error) {
            console.log(error)
            if (error.response.status === 500) {
                return setErrorData({ message: 'Something went wrong. Please try again.' })
            }
            setErrorData(error.response.data)
        }
    }


    if (!user) {
        return <Navigate to="/sign-in" />
    }

    return (
        <>
            <h1>Add your own Travel Post!!</h1>

            <form onSubmit={handleSubmit}>

                <div className='form-control'>
                    <select
                        name="country" id="country" value={formData.country} onChange={handleChange} required >

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
                    <input type="text" name="location" id="location" placeholder='Location' value={formData.location} onChange={handleChange} required />
                </div>

                <div className='form-control'>
                    <label htmlFor="whatTheyDid">Tell us about your trip!</label>
                    <input type="text" name="whatTheyDid" id="whatTheyDid" placeholder='Tell us about your trip!' value={formData.whatTheyDid} onChange={handleChange} required />
                </div>

                <div className='form-control'>
                    <label htmlFor="recommendations">Recommendations</label>
                    <input type="text" name="recommendations" id="recommendations" placeholder='Recommendations' value={formData.recommendations} onChange={handleChange} required />
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

                <ImageUploadField
                    labelText="Upload Travel Post Image"
                />

                <button type="submit">Create Travel Post </button>

            </form>
        </>

    )
}

export default TravelPostCreate