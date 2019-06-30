let name = Symbol("name");
let residencyTypeId = Symbol("residencyTypeId");
let residenceId = Symbol("residenceId");
let description = Symbol("description");
let capacity = Symbol("capacity");
let guid = Symbol("guid");

export default class roomModel {
  set name(val) {
    this[name] = val;
  }
  set residencyTypeId(val) {
    this[residencyTypeId] = val;
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

  getData = () => {
    return {
      name: this[name],
      residencyTypeId: this[residencyTypeId],
      residenceId: this[residenceId],
      description: this[description],
      capacity: this[capacity],
      guid: this[guid]
    };
  };
}
