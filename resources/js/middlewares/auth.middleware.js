import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:8001/api/'
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
        // console.log(error)
        if(error?.response?.status === 401) {
            // console.log(window.location.href)
            if(window.location.href === 'http://localhost:8001/') {
                localStorage.clear()
            } else {
                localStorage.clear()
                window.location.href = '/'
            }
        }
        return Promise.reject(error)
    }
)

export default api
