import { serverConfig } from "../constants/defaultValues";
import { apiContext } from "../helpers/contextHelper";

export default class hostService {
  async getHostType() {
    try {
      let response = await apiContext().get(serverConfig.hostTypeUrl);
      return response.data;
    } catch (e) {}
  }
  async getHosts(filterParam) {
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.hostUrl + filter);
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
      return response;
    } catch (e) {}
  }
  async addAddress(model) {
    try {
      let response = await apiContext().post(
        serverConfig.hostUrl,
        model.getData()
      );
      return response;
    } catch (e) {}
  }
}
