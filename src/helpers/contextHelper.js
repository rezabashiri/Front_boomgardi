import authConfig from "../consts/authConst.jsx";
import { serverConfig } from "../consts/defaultValues";
import axios from 'axios';
import { getJwt } from '../helpers/Jwt';

export const userContext = () => {
    return axios.create({
        baseURL: authConfig.serverUrl  ,
        headers: { appKey: authConfig.appKey }
    });
}
export const loginContext = () => {
    return axios.create({
        baseURL: authConfig.serverUrl + authConfig.loginUrl,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
}
export const apiContext = () => {
    return axios.create({
        baseURL: serverConfig.baseUrl  ,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            "Authorization": `Bearer ${getJwt()}`
        }
    });
}