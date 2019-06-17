import { serverConfig } from "../constants/defaultValues";
import axios from "axios";
import { apiContext } from "../helpers/contextHelper";
import qs from "qs";

export default class hostService {
  async getHostType() {
    try {
      let response = await apiContext().get(serverConfig.hostTypeUrl);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async getHosts() {
    try {
      let response = await apiContext().get(serverConfig.hostUrl);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async addHost(model) {
    try {
      let response = await apiContext().post(
        serverConfig.hostUrl,
        model.getData()
      );
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
}
