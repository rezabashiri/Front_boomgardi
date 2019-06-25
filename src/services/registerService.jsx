import { userContext } from "../helpers/contextHelper";
import authConfig from "../constants/defaultValues";

export default class registerService {
  async registerUser(model) {
    return await userContext().post(authConfig.registerUrl, model.getData());
  }
}
