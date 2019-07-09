import React, { Component, Fragment } from "react";
import { Colxx } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import roomService from "../../services/roomService.jsx";
import hostService from "../../services/hostService.jsx";
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
  FormText,
  Form,
  CardSubtitle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Button from "reactstrap-button-loader";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import { serverConfig } from "../../constants/defaultValues";
//import Select from "react-select";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";

import { roomNameValidation } from "../../constants/validations";

import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class RoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      roomName: this.props.roomInfo.name,
      hostId: this.props.roomInfo.residenceId,
      roomDetail: this.props.roomInfo.description,
      roomTypeId: this.props.roomInfo.typeId,
      roomType: [],
      roomTypeSelected: null,
      selectedServices: [], //this.props.roomInfo.serviceList?this.props.roomInfo.serviceList : [],
      roomServices: [],
      roomCapacity: this.props.roomInfo.capacity
    };
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.handleRoomDetailChange = this.handleRoomDetailChange.bind(this);
    this.handleRoomTypeChange = this.handleRoomTypeChange.bind(this);
    this.handleRoomCapacityChange = this.handleRoomCapacityChange.bind(this);
    this.getRoomType = this.getRoomType.bind(this);
    this.handleAddService = this.handleAddService.bind(this);
    this.getServices = this.getServices.bind(this);
  }
  async componentDidMount() {
    this.getRoomType();
    this.getServices();
    this.setState({
      roomTypeSelected: {
        value: this.props.roomInfo.typeId,
        label: this.props.roomInfo.type
      }
    });

    this.setState({ hostId: this.props.roomInfo.residenceId });
  }

  async addRoom() {
    console.log("this is addroom");
    this.setState({
      loading: 1
    });
    var service = new roomService();
    var model = new roomModel();
    model["name"] = this.state.roomName;
    model["guid"] = this.props.roomInfo.guid;
    model["residenceId"] = this.state.hostId;
    model["description"] = this.state.roomDetail;
    model["capacity"] = this.state.roomCapacity;
    model["typeId"] = this.state.roomTypeSelected.value;
    model["serviceList"] = this.state.selectedServices;
    let result = await service.addRoom(model);

    if (result.status === 201) {
      this.setState({
        loading: 0
      });
      this.props.onHandleComplete && this.props.onHandleComplete();
      this.props.onHandleGuId && this.props.onHandleGuId(result.data.guid);
      this.props.onToggleModal && this.props.onToggleModal();
      this.props.onGetRooms && (await this.props.onGetRooms());
    }
  }
  async getRoomType() {
    var typeService = new hostService();
    let roomTypes = await typeService.getRoomType();
    let newRoomType = roomTypes.map(c => {
      return { label: c.name, value: c.id };
    });
    this.setState({
      roomType: newRoomType
    });
  }
  async getServices() {
    var typeService = new hostService();
    let roomServices = await typeService.getServices("residencyunit");
    let newRoomServices = roomServices.map((service, index) => {
      return { label: service.name, value: service.id };
    });
    this.setState({
      roomServices: newRoomServices
    });
  }
  handleAddService = selectedServices => {
    this.setState({ selectedServices });
  };
  handleRoomNameChange(e) {
    this.setState({ roomName: e.target.value });
  }
  handleRoomTypeChange = selectedRoomType => {
    this.setState({ roomTypeSelected: selectedRoomType });
  };
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
                <AvForm onValidSubmit={this.addRoom}>
                  <AvGroup row>
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="roomName">
                          <IntlMessages id="forms.room-name" />
                        </Label>
                        <AvField
                          name="roomName"
                          id="roomName"
                          value={this.state.roomName}
                          onChange={this.handleRoomNameChange}
                          validate={roomNameValidation}
                        />
                      </AvGroup>
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
                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label" for="hostType">
                          <IntlMessages id="forms.room-type" />
                        </Label>
                        <Select
                          id="roomTypeId"
                          options={this.state.roomType}
                          onChange={this.handleRoomTypeChange}
                          value={this.state.roomTypeSelected}
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.roomtype-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={12}>
                      <AvGroup>
                        <Label className="av-label" for="hostServices">
                          <IntlMessages id="forms.host-services" />
                        </Label>
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          isMulti
                          name="form-field-name"
                          value={this.state.selectedServices}
                          onChange={this.handleAddService}
                          options={this.state.roomServices}
                        />
                      </AvGroup>
                    </Colxx>
                  </AvGroup>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Button
                        color="primary"
                        className="btn-shadow"
                        size="lg"
                        type="submit"
                        loading={this.state.loading}
                      >
                        <IntlMessages id="layouts.submit" />
                      </Button>
                    </FormGroup>
                  </Colxx>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default RoomForm;
