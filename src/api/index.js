import axios from "axios";

export const signUpApi = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
})
export const authApi = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
})
export const signInApi = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-Type": "application/json"
    }
})
//인터셉터는
signUpApi.interceptors.request.use(

    async config => {
        try {
            const { data } = await authApi.get("/user")
            if (await data.find(item => item.id === config.data.id)) {
                console.log('중복 아이디가 있습니다.')
                return Promise.reject('Duplicate ID found')
            }
            return config

        } catch (error) {
            console.error('Error fetching data:', error)
            return Promise.reject(error)
        }
    }
)

