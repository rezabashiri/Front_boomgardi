import { serverConfig } from "../constants/defaultValues";
import { apiContext } from "../helpers/contextHelper";
import QueryString from "./queryString.jsx";

export default class hostService {
  async getHostType() {
    try {
      let response = await apiContext().get(
        serverConfig.hostTypeUrl + "?type=residency"
      );
      return response.data;
    } catch (e) {}
  }
  async getRoomType() {
    try {
      let response = await apiContext().get(
        serverConfig.hostTypeUrl + "?type=residencyunit"
      );
      return response.data;
    } catch (e) {}
  }
  /*
  async getHosts(filterParam) {
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.hostUrl + filter);
      return response.data;
    } catch (e) {}
  }*/
  async getHosts(filterObject) {
    try {
      let filter = filterObject === undefined ? "" : filterObject;
      let queryService = new QueryString();
      let queryString = queryService.buildQuery(filter);
      let response = await apiContext().get(serverConfig.hostUrl + queryString);
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
  async deleteHost(guid) {
    try {
      let response = await apiContext().delete(
        serverConfig.hostUrl + "/" + guid
      );
      return response;
    } catch (e) {}
  }
  async getHostPics(filterParam) {
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.picUrl + filter);
      return response;
    } catch (e) {}
  }
}
