import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

const getToken = () => {
    let token = null
    const localStorage = window.localStorage.getItem('token')
    if(localStorage) {
        token = localStorage
    }
    return token
}

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error)
        if(error.response.status === 401) {
            localStorage.clear()
            window.location.href = '/'
        }
        return Promise.reject(error)
    }
)

export default api
