import authConfig from "../constants/defaultValues";

let userName = Symbol("userName");
let password = Symbol("password");
let mobile = Symbol("mobile");
let roles = Symbol("roles");
let email = Symbol("email");
let firstName = Symbol("firstname");
let lastName = Symbol("lastname");
export default class registerModel {
  set userName(val) {
    this[userName] = val;
  }
  set firstName(val) {
    this[firstName] = val;
  }
  set lasName(val) {
    this[lasName] = val;
  }
  set password(val) {
    this[password] = val;
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
      firstName: this[firstName],
      lastName: this[lastName],
      email: this[email],
      password: this[password],
      mobile: this[mobile],
      roles: this[roles]
    };
  };
}
