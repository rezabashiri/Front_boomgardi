import axios from "axios";
import qs from "qs";
import { serverConfig } from "../constants/defaultValues";
export default class addressService {
  async getOstan() {
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.ostanUrl);
      return response.data;
    } catch (e) {}
  }
  async getShahrestan(codeostan) {
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.shahrestanUrl + codeostan);
      return response.data;
    } catch (e) {}
  }
  async getBakhsh(shahrestanId) {
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.bakhshUrl + shahrestanId);
      return response.data;
    } catch (e) {}
  }
  async getDehestan(idBakhsh) {
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.dehestanUrl + idBakhsh);
      return response.data;
    } catch (e) {}
  }
  async getRoosta(idDehestan) {
    try {
      let response = await axios
        .create()
        .get(serverConfig.baseUrl + serverConfig.roostaUrl + idDehestan);
      return response.data;
    } catch (e) {}
  }
}
