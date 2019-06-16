import { serverConfig } from "../constants/defaultValues";
import axios from "axios";
import qs from "qs";

export default class hostService {
  async getHostType() {
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.hostTypeUrl);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async getHosts() {
    console.log(serverConfig.baseUrl + serverConfig.hostUrl);
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.hostUrl);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async addHost(model) {
    console.log(serverConfig.baseUrl + serverConfig.hostUrl);
    try {
      let response = await axios
        .create()
        .post(serverConfig.baseUrl + serverConfig.hostUrl, model.getData());
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
}
