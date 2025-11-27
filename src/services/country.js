import axios from 'axios'


const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/country`
})

export const countryIndex = () => {
    return api.get("")
}

export const countryShow = (countryId) => {
    return api.get(`/${countryId}`)
}