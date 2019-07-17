import authConfig from "../constants/defaultValues";
import qs from "qs";
import { setJwt } from "../helpers/Jwt.js";
import { userContext } from "../helpers/contextHelper";
import { loginContext } from "../helpers/contextHelper";
export default class userService {
  async getToken(userModel) {
    try {
      let data = qs.stringify(userModel.getData());

      let response = await loginContext().post("/", data);
      setJwt(response.data.access_token);
    } catch (e) {}
  }
  async getUsers(filterParam) {
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await userContext().get(authConfig.userUrl + filter);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }

  async addUser(model) {
    try {
      const response = await userContext().post(
        authConfig.userUrl,
        model.getData()
      );
      //console.log(response.data);
      return response;
    } catch (e) {}
  }
}
