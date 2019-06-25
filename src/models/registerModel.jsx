let userName = Symbol("userName");
let password = Symbol("password");
let mobile = Symbol("mobile");
let roles = Symbol("roles");
let email = Symbol("email");
let firstName = Symbol("firstname");
let lastName = Symbol("lastname");
let nationalCode = Symbol("nationalcode");
export default class registerModel {
  set userName(val) {
    this[userName] = val;
  }
  set firstName(val) {
    this[firstName] = val;
  }
  set lastName(val) {
    this[lastName] = val;
  }
  set password(val) {
    this[password] = val;
  }
  set mobile(val) {
    this[mobile] = val;
  }
  set nationalCode(val) {
    this[nationalCode] = val;
  }
  set roles(val) {
    let array = [];
    if (this[roles]) array = this[roles];
    array.push({ name: val });
    this[roles] = array;
  }

  getData = () => {
    return {
      userName: this[userName],
      firstName: this[firstName],
      lastName: this[lastName],
      email: this[email],
      password: this[password],
      mobile: this[mobile],
      roles: this[roles],
      nationalCode: this[nationalCode]
    };
  };
}
