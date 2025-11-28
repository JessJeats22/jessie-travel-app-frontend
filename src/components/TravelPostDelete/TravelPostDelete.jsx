import { useState } from 'react'
// import LoadingIcon from '../LoadingIcon/LoadingIcon'
import {deleteTravelPost}  from '../../services/travelPosts'
import { useNavigate } from 'react-router'

const TravelPostDelete = ({travelPostId}) => {
  // State
  const [isLoading, setIsLoading] = useState(true)
  const [errorData, setErrorData] = useState({})

  const navigate = useNavigate()

    const handleDelete = async () => {
    try {
      await deleteTravelPost(travelPostId)
      navigate('/countries')
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status === 500) {
        setErrorData({ message: 'Something went wrong. Please try again.' })
      } else {
        setErrorData(data)
      }
    } finally {
      setIsLoading(false)
    }
  }

  
    return (
    <>
      <button onClick={handleDelete}>
        Delete Post
      </button>
      {errorData.message && <p className='error-message'>{errorData.message}</p>}
    </>
  )
}

export default TravelPostDelete