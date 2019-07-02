import { serverConfig } from "../constants/defaultValues";
import { apiContext } from "../helpers/contextHelper";

export default class roomService {
  async getRoomType() {
    try {
      let response = await apiContext().get(
        serverConfig.hostTypeUrl + "?type=residencyunit"
      );
      return response.data;
    } catch (e) {}
  }
  async getRooms(filterParam) {
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.unitUrl + filter);
      console.log(response.data);
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
