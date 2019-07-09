let name = Symbol("name");
let typeId = Symbol("typeId");
let residenceId = Symbol("residenceId");
let description = Symbol("description");
let capacity = Symbol("capacity");
let guid = Symbol("guid");
let serviceList = Symbol("serviceList");

export default class roomModel {
  set name(val) {
    this[name] = val;
  }
  set typeId(val) {
    this[typeId] = val;
  }
  set residenceId(val) {
    this[residenceId] = val;
  }
  set description(val) {
    this[description] = val;
  }
  set capacity(val) {
    this[capacity] = val;
  }
  set guid(val) {
    this[guid] = val;
  }
  set serviceList(val) {
    this[serviceList] = val;
  }

  getData = () => {
    return {
      name: this[name],
      typeId: this[typeId],
      residenceId: this[residenceId],
      description: this[description],
      capacity: this[capacity],
      guid: this[guid],
      serviceList: this[serviceList]
    };
  };
}
