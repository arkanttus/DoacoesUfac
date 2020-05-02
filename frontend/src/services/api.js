import axios from "axios";
import { getToken } from "./auth";

const ip = "localhost"//process.env.REACT_APP_HOST

const base_url = "http://" + ip + ":8000/api/v1/"

const api = axios.create({
    baseURL: base_url
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

export default api;

export async function sendRequest(type, url, params) { 
    try {
        var response
        if(type === 'GET')
            response = await api.get(url, params)
        else if(type === 'POST')
            response = await api.post(url, params)
        else if(type === 'PATCH')
            response = await api.patch(url, params)
        else if(type === 'PUT')
            response = await api.put(url, params)

        const { status, data } = response

        if(status => 200 && status < 300)
            return { status, data }
    }
    catch(error) {
        console.log(error)
        return { status: error.response.status, data: error.response.data }
    }
}