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
import FineUploaderTraditional from "fine-uploader-wrappers";
import Gallery from "react-fine-uploader";
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
      roomName: this.props.roomInfo.roomName,
      hostId: this.props.roomInfo.hostId,
      roomDetail: this.props.roomInfo.roomDetail,
      roomTypeId: this.props.roomInfo.roomTypeId,
      roomCapacity: this.props.roomInfo.roomCapacity
    };
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
    this.addRoom = this.addRoom.bind(this);
    this.handleRoomDetailChange = this.handleRoomDetailChange.bind(this);
    this.handleRoomTypeChange = this.handleRoomTypeChange.bind(this);
    this.handleRoomCapacityChange = this.handleRoomCapacityChange.bind(this);
  }
  async componentDidMount() {
    this.setState({ hostId: this.props.roomInfo.hostId });
  }

  async addRoom() {
    console.log("add room done");

    var service = new roomService();
    var model = new roomModel();
    model["name"] = this.state.roomName;
    model["residenceId"] = this.state.hostId;
    model["description"] = this.state.roomDetail;
    model["capacity"] = this.state.roomCapacity;
    model["residencyTypeId"] = this.state.roomTypeId;
    model["serivces"] = ["حمام اختصاصی", "دستشویی فرنگی"];
    let result = await service.addRoom(model);
    console.log("this is addroom result");
    console.log(result.data);
  }
  roomUploader = new FineUploaderTraditional({
    options: {
      chunking: {
        enabled: false
      },
      deleteFile: {
        enabled: true,
        endpoint: serverConfig.baseUrl + serverConfig.picUrl,
        params: { attachId: "8d6fb107492c094" /*this.props.attachId*/ }
      },
      request: {
        endpoint: serverConfig.baseUrl + serverConfig.picUrl,
        params: {
          attachId: "8d6fb107492c094",
          attachType: { part: "residancyUnit", type: "profile" }
        }
      },
      validation: {
        allowedExtensions: ["jpg", "jpeg", "png", "gif", "bmp"],
        allowEmpty: false,
        sizeLimit: 20971520,
        stopOnFirstInvalidFile: true
      }
    }
  });
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
                <Label className="av-label" for="roomPic">
                  <IntlMessages id="form-components.upload-roompic" />
                </Label>
                <Gallery
                  hidden
                  animationsDisabled={true}
                  uploader={this.roomUploader}
                  deleteButton-children={<span>حذف</span>}
                  fileInput-children={<span />}
                  id="roomPic"
                >
                  <span className="react-fine-uploader-gallery-dropzone-content">
                    <IntlMessages id="form-components.drop-files-here" />
                  </span>
                </Gallery>
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
