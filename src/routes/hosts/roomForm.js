import React, { Component, Fragment } from "react";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import roomService from "../../services/roomService.jsx";
import roomModel from "../../models/roomModel.jsx";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { serverConfig } from "../../constants/defaultValues";
//import Select from "react-select";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";

import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class RoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: this.props.roomInfo.name,
      hostId: this.props.roomInfo.residenceId,
      roomDetail: this.props.roomInfo.description,
      roomTypeId: this.props.roomInfo.residencyTypeId,
      roomCapacity: this.props.roomInfo.capacity
    };
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.handleRoomDetailChange = this.handleRoomDetailChange.bind(this);
    this.handleRoomTypeChange = this.handleRoomTypeChange.bind(this);
    this.handleRoomCapacityChange = this.handleRoomCapacityChange.bind(this);
  }
  async componentDidMount() {
    console.log(this.props.roomInfo);
    this.setState({ hostId: this.props.roomInfo.residenceId });
  }

  async addRoom() {
    var service = new roomService();
    var model = new roomModel();
    model["name"] = this.state.roomName;
    model["guid"] = this.props.roomInfo.guid;
    model["residenceId"] = this.state.hostId;
    model["description"] = this.state.roomDetail;
    model["capacity"] = this.state.roomCapacity;
    model["residencyTypeId"] = this.state.roomTypeId;
    model["serivces"] = ["حمام اختصاصی", "دستشویی فرنگی"];
    let result = await service.addRoom(model);

    if (result.status === 201) {
      console.log(result.data.guid);
      this.props.onHandleComplete && this.props.onHandleComplete();
      this.props.onHandleGuId && this.props.onHandleGuId(result.data.guid);
      this.props.onToggleModal && this.props.onToggleModal();
      await this.props.onGetRooms();
      //this.props.getRoom && this.props.getRoom();
    }
  }
  handleRoomNameChange(e) {
    this.setState({ roomName: e.target.value });
  }
  handleRoomTypeChange(e) {
    this.setState({ RoomTypeId: e.target.value });
  }
  handleRoomDetailChange(e) {
    this.setState({ roomDetail: e.target.value });
  }
  handleDetailChange(e) {
    this.setState({ detail: e.target.value });
  }
  handleRoomCapacityChange(e) {
    this.setState({ roomCapacity: e.target.value });
  }

  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="menu.add-roomdata" />
                </CardTitle>
                <AvForm>
                  <AvGroup row>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="roomName">
                          <IntlMessages id="forms.room-name" />
                        </Label>
                        <AvInput
                          name="roomName"
                          id="roomName"
                          value={this.state.roomName}
                          onChange={this.handleRoomNameChange}
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.roomname-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.room-type" />
                        </Label>
                        <AvInput
                          name="roomTypeId"
                          id="roomTypeId"
                          value={this.state.roomTypeId}
                          onChange={this.handleRoomTypeChange}
                          required
                        />
                      </AvGroup>
                      <AvFeedback>
                        <IntlMessages id="forms.roomtype-message" />
                      </AvFeedback>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="roomDetail">
                          <IntlMessages id="forms.room-detail" />
                        </Label>
                        <AvInput
                          name="roomDetail"
                          id="roomDetail"
                          value={this.state.roomDetail}
                          onChange={this.handleRoomDetailChange}
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.roomdetail-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="roomCapacity">
                          <IntlMessages id="forms.room-capacity" />
                        </Label>
                        <AvInput
                          type="number"
                          name="RoomCapacity"
                          value={this.state.roomCapacity}
                          onChange={this.handleRoomCapacityChange}
                          id="roomCapacity"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.roomcapacity-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                  </AvGroup>
                </AvForm>
                <Button onClick={this.addRoom} color="primary">
                  <IntlMessages id="layouts.submit" />
                </Button>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default RoomForm;
