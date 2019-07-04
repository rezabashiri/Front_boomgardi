import { serverConfig } from "../constants/defaultValues";
import { apiContext } from "../helpers/contextHelper";
import QueryString from "./queryString.jsx";

export default class roomService {
  async getRoomType() {
    try {
      let response = await apiContext().get(
        serverConfig.hostTypeUrl + "?type=residencyunit"
      );
      return response.data;
    } catch (e) {}
  }
  /*
  async getRooms(filterParam) {
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.unitUrl + filter);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }*/
  async getRooms(filterObject) {
    try {
      console.log("this is get room service:" + filterObject);
      let filter = filterObject === undefined ? "" : filterObject;
      let queryService = new QueryString();
      let queryString = queryService.buildQuery(filter);
      let response = await apiContext().get(serverConfig.unitUrl + queryString);
      return response.data;
    } catch (e) {}
  }

  async addRoom(model) {
    try {
      let response = await apiContext().post(
        serverConfig.unitUrl,
        model.getData()
      );
      return response;
    } catch (e) {}
  }
  async deleteRoom(guid) {
    try {
      let response = await apiContext().delete(
        serverConfig.unitUrl + "/" + guid
      );
      return response;
    } catch (e) {}
  }
}
