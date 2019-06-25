let roomName = Symbol("roomName");
let roomTypeId = Symbol("roomTypeId");
let hostId = Symbol("hostId");

let roomDetail = Symbol("roomDetail");

export default class hostModel {
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

  getData = () => {
    return {
      roomName: this[roomName],
      roomTypeId: this[roomTypeId],
      hostId: this[hostId],
      roomDetail: this[roomDetail]
    };
  };
}
