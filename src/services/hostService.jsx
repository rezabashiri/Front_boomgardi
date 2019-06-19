import { serverConfig } from "../constants/defaultValues";
import { apiContext } from "../helpers/contextHelper";

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
    console.log(model.getData());
    try {
      let response = await apiContext().post(
        serverConfig.hostUrl,
        model.getData()
      );
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async addAddress(model) {
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
