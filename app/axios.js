import axios from "axios";



const api = axios.create({
    baseURL: "http://192.168.3.14:8000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});



api.interceptors.request.use(
    async (config) => {
        const accessToken = global.accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
           originalRequest._retry = true;

           try {
            const res = await axios.post(`${api.defaults.baseURL}/refresh`, {
            refresh_token: globalThis.refreshToken,
            });

            global.accessToken = res.data.access_token;

            originalRequest.headers.Authorization = `Bearer ${globalThis.accessToken}`;
            return api (originalRequest);
           } catch (err) {
            console.log("Refresh failed:", err);
            return Promise.reject(err)
           }
        }
        return Promise.reject(error)
     }
);
export default api;
