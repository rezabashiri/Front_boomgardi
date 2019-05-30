import authConfig from "../constants/defaultValues";

let userName = Symbol("userName");
let password = Symbol("password");
let confirmPassword = Symbol("confirmPasswod");
let mobile = Symbol("mobile");
let roles = Symbol("roles");
let email = Symbol("email");
export default class registerModel {
  set userName(val) {
    this[userName] = val;
  }
  set password(val) {
    this[password] = val;
  }
  set confirmPassword(val) {
    this[confirmPassword] = val;
  }
  set mobile(val) {
    this[mobile] = val;
  }
  set roles(val) {
    this[roles] = val;
  }

  getData = () => {
    return {
      userName: this[userName],
      email: this[email],
      password: this[password],
      PasswordConfirm: this[confirmPassword],
      mobile: this[mobile],
      roles: this[roles],
      AppKey: authConfig.appKey
    };
  };
}
