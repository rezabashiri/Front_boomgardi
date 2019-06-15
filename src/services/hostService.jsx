import { serverConfig } from "../constants/defaultValues";
import axios from "axios";
import qs from "qs";

export default class hostService {
  /*
  async getToken(userModel) {
    try {
      let data = qs.stringify(userModel.getData());

      let response = await axios
        .create()
        .post(authConfig.serverUrl + authConfig.loginUrl, data, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });
      setJwt(response.data.access_token);
    } catch (e) {}
  }*/
  async getHostType() {
    console.log(serverConfig.baseUrl + serverConfig.hostTypeUrl);
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.hostTypeUrl);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
}
