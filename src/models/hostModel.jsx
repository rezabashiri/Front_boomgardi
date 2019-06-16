let name = Symbol("name");
let tell = Symbol("tell");
let address = Symbol("address");
let residencyTypeId = Symbol("residencyTypeId");

export default class hostModel {
  set name(val) {
    this[name] = val;
  }
  set tell(val) {
    this[tell] = val;
  }
  set address(val) {
    this[address] = val;
  }
  set residencyTypeId(val) {
    this[residencyTypeId] = val;
  }

  getData = () => {
    return {
      name: this[name],
      tell: this[tell],
      address: this[address],
      residencyTypeId: this[residencyTypeId]
    };
  };
}
