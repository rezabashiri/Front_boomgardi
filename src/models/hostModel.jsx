let name = Symbol("name");
let tell = Symbol("tell");
let address = Symbol("address");
let typeId = Symbol("typeId");
let ownerUserId = Symbol("ownerUserId");
let guid = Symbol("guid");
let description = Symbol("description");
let serviceList = Symbol("serviceList");

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
  set typeId(val) {
    this[typeId] = val;
  }
  set ownerUserId(val) {
    this[ownerUserId] = val;
  }
  set guid(val) {
    this[guid] = val;
  }
  set description(val) {
    this[description] = val;
  }
  set serviceList(val) {
    this[serviceList] = val;
  }

  getData = () => {
    return {
      name: this[name],
      tell: this[tell],
      address: this[address],
      typeId: this[typeId],
      ownerUserId: this[ownerUserId],
      guid: this[guid],
      description: this[description],
      serviceList: this[serviceList]
    };
  };
}
