import authConfig from "../constants/defaultValues";
import axios from "axios";
import qs from "qs";
import { setJwt } from "../helpers/Jwt.js";
export default class userService {
  async registerUser(register) {}
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
  }
  async getUsers() {
    try {
      let response = await axios
        .create()
        .get(authConfig.serverUrl + authConfig.userUrl + authConfig.appKey);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
}
