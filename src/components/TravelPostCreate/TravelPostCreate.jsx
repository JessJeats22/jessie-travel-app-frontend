import './TravelPostCreate.css'
import { useState} from 'react'

const TravelPostCreate = () => {

 // State
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


const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        // Consume service function here! 
    } catch (error) {
        console.log(error)
        
    }

}

return
<>
 <h1>Add your own Travel Post!!</h1>
 <form onSubmit={handleSubmit}>

 </form>
</>

}

export default TravelPostCreate