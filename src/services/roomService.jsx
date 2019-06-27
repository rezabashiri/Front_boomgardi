import { serverConfig } from "../constants/defaultValues";
import { apiContext } from "../helpers/contextHelper";

export default class roomService {
  async getRoomType() {
    try {
      let response = await apiContext().get(serverConfig.hostTypeUrl);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async getRooms(filterParam) {
    console.log(filterParam);
    console.log("room list");

    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.unitUrl + filter);
      console.log(response.data);
      return response.data;
    } catch (e) {}
  }
  async addRoom(model) {
    console.log(model.getData());

    try {
      let response = await apiContext().post(
        serverConfig.unitUrl,
        model.getData()
      );
      return response;
    } catch (e) {}
  }
}
