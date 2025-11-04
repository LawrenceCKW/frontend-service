import axios from "axios";

console.log("API_URL: ", import.meta.env.APP_API_URL)

// TODO: Create Axios Instance
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.APP_API_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    withCredentials: true
})

// TODO: Adding a request interceptor to include JWT and CSRF tokens
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("JWT_TOKEN")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        let csrfToken = localStorage.getItem("CSRF_TOKEN")
        if (!csrfToken) {
            try {
                const response = await axios.get(
                    `${import.meta.env.APP_API_URL}/api/csrf-token`,
                    { withCredentials: true }
                )
                csrfToken = response.data.token
                localStorage.setItem("CSRF_TOKEN", csrfToken)
            }
            catch (error) {
                console.error("Failed to fetch CSRF token", error)
            }
        }

        if (csrfToken) {
            config.headers["X-CSRF-TOKEN"] = csrfToken
        }
        console.log("X-XSRF-TOKEN" + csrfToken)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance