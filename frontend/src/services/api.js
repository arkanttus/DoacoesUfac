import axios from "axios";
import { getToken } from "./auth";

const baseURL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
                    ? 'http://localhost:8000/api/v1/' : 'https://doacao.ufac.br/api/v1/'

const api = axios.create({
    baseURL: baseURL
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

async function getFromRequest(type, url, params) {
    const response = await sendRequest(type, url, params);
    if(response.status === 200)
        return response.data;
    return null;
}

export async function getInstitutionById(id) {
    return await getFromRequest("GET", "institutions/"+id, {})
}

export async function getInstitutionTypes() {
    return await getFromRequest("GET", "type_institutions/", {})
}

export async function getDonationsByUserId(id) {
    return await getFromRequest("GET", `donates/`, {})
}

export async function getDonationsByInstitutionId(id) {
    return await getFromRequest("GET", `institutions/${id}/need_donates`, {})
}

export async function getDonations() {
    return await getFromRequest("GET", `donates/`, {})
}

export async function getDonationById(id) {
    return await getFromRequest("GET", "donates/"+id, {})
}

