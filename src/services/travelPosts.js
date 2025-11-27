import axios from 'axios'
import { getToken } from '../utils/token'


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/travelPost`
})

export const createTravelPost = (formData) => {
    return api.post ('' , formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}

export const showTravelPost = (id) => {
  return api.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
