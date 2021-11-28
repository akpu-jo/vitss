import axios from "axios";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { API } from "../config";


export const axiosPublic = axios.create({
    baseURL: API
})
export const axiosPrivate = axios.create({
    baseURL: API
})

axiosPrivate.interceptors.request.use(async (config) =>{
    const auth = getAuth(app);
    let user = await auth.currentUser;
    config.headers.token = user? await user.getIdToken(true) : ''
    return config
}, (error) => {
    return Promise.reject(error)
})