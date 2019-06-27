let roomName = Symbol("roomName");
let roomTypeId = Symbol("roomTypeId");
let hostId = Symbol("hostId");
let roomDetail = Symbol("roomDetail");
let roomCapacity = Symbol("roomCapacity");

export default class roomModel {
  set roomName(val) {
    this[roomName] = val;
  }
  set roomTypeId(val) {
    this[roomTypeId] = val;
  }
  set hostId(val) {
    this[hostId] = val;
  }
  set roomDetail(val) {
    this[roomDetail] = val;
  }
  set roomCapacity(val) {
    this[roomCapacity] = val;
  }

  getData = () => {
    return {
      roomName: this[roomName],
      roomTypeId: this[roomTypeId],
      hostId: this[hostId],
      roomDetail: this[roomDetail],
      roomCapacity: this[roomCapacity]
    };
  };
}
