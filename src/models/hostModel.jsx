let name = Symbol("name");
let tell = Symbol("tell");
let address = Symbol("address");
let residencyTypeId = Symbol("residencyTypeId");
let ownerUserId = Symbol("ownerUserId");
let guid = Symbol("guid");
let description = Symbol("description");

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
  set ownerUserId(val) {
    this[ownerUserId] = val;
  }
  set guid(val) {
    this[guid] = val;
  }
  set description(val) {
    this[description] = val;
  }

  getData = () => {
    return {
      name: this[name],
      tell: this[tell],
      address: this[address],
      residencyTypeId: this[residencyTypeId],
      ownerUserId: this[ownerUserId],
      guid: this[guid],
      description: this[description]
    };
  };
}
