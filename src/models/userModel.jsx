import authConfig from "../constants/authConst";
let userName = Symbol("user");
let pass = Symbol("pass");

export default class userModel {
  set userName(val) {
    this[userName] = val;
  }
  set password(val) {
    this[pass] = val;
  }

  getData = () => {
    return {
      username: this[userName],
      password: this[pass],
      grant_type: "password",
      client_id: authConfig.appKey
    };
  };
}
