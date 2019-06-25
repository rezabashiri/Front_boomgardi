let userName = Symbol("userName");
let password = Symbol("password");
let mobile = Symbol("mobile");
let roles = Symbol("roles");
let email = Symbol("email");
let firstName = Symbol("firstname");
let lastName = Symbol("lastname");
let nationalCode = Symbol("nationalcode");
let confirmPassword = Symbol("confirmPassword");
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
  set confirmPassword(val){
    this[confirmPassword]=val;
  }
  get password(){
    return this[password];
  }
  get confirmPassword () {return this[confirmPassword]}
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
