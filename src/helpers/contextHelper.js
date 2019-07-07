import authConfig from "../constants/defaultValues";
import { serverConfig } from "../constants/defaultValues";
import axios from "axios";
import { getJwt } from "../helpers/Jwt";
import { CreateNotification } from "./notification";

export const userContext = () => {
  return axios.create({
    baseURL: authConfig.serverUrl,
    headers: { appKey: authConfig.appKey }
  });
};
export const loginContext = () => {
  return axios.create({
    baseURL: authConfig.serverUrl + authConfig.loginUrl,
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
};
export const apiContext = () => {
  return axios.create({
    baseURL: serverConfig.baseUrl,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${getJwt()}`
    }
  });
};

export const postData = async (data, url) => {
  let response = await apiContext().post(url, data);
  CreateNotification(response);
  return response;
};

export const deleteData = async url => {
  let response = await apiContext().delete(url);
  CreateNotification(response);
  return response;
};
