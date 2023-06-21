import axios from "axios";

let URL;

if (import.meta.env.MODE === "development") {
    URL = `http://127.0.0.1:8000/api`
} else {
    URL = `/api`
}

const api = axios.create({
    baseURL: URL
})

const getToken = () => {
    let token = null
    const localStorage = window.localStorage.getItem('token')
    if (localStorage) {
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
        if (error?.response?.status === 401) {
            if (window.location.href === URL) {
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
