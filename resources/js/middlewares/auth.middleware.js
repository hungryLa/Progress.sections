import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // console.log(error)
        if(error.response.status === 401) {
            localStorage.removeItem('token')
        }
        return Promise.reject(error)
    }
)

export default api
