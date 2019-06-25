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
    /*
    try {
      let filter = filterParam === undefined ? "" : filterParam;
      let response = await apiContext().get(serverConfig.hostUrl + filter);
      console.log(response.data);
      return response.data;
    } catch (e) {}
    */
  }
  async addRoom(model) {
    console.log(model.getData());
    /*
    try {
      let response = await apiContext().post(
        serverConfig.hostUrl,
        model.getData()
      );
      console.log(response.data);
      return response.data;
    } catch (e) {}*/
  }
}
