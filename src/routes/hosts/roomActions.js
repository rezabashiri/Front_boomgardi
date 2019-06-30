import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";

import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";
import RoomForm from "./roomForm";
import RoomUploadForm from "./roomUploadForm";

import {
  Row,
  Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  Collapse,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  ButtonDropdown,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge
} from "reactstrap";

import "react-tagsinput/react-tagsinput.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

class HostActions extends Component {
  constructor(props) {
    super(props);

    this.handleOwnerUserId = this.handleOwnerUserId.bind(this);
    //this.handleAttachId = this.handleAttachId.bind(this);
    this.handleGuId = this.handleGuId.bind(this);
    this.toggleRoomModal = this.toggleRoomModal.bind(this);
    this.togglePicModal = this.togglePicModal.bind(this);

    this.state = {
      selectedOption: "",
      selectedOptionLabelOver: "",
      selectedOptionLabelTop: "",
      tags: [],
      tagsLabelOver: [],
      tagsLabelTop: [],
      ownerUserId: null,
      attachId: null,
      guid: null,
      roomModalOpen: false,
      picModalOpen: false
    };
  }

  toggleRoomModal() {
    this.setState({
      roomModalOpen: !this.state.roomModalOpen
    });
  }
  togglePicModal() {
    this.setState({
      picModalOpen: !this.state.picModalOpen
    });
  }

  handleOwnerUserId = userId => {
    this.setState({ ownerUserId: userId });
  };

  handleGuId = guid => {
    this.setState({ guid: guid });
  };

  render() {
    return (
      <Fragment>
        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" outline>
            <IntlMessages id="room.action" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.toggleRoomModal}>
              <IntlMessages id="room.action.edit-roominfo" />
            </DropdownItem>
            <DropdownItem onClick={this.togglePicModal}>
              <IntlMessages id="room.action.edit-roompic" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Modal
          isOpen={this.state.roomModalOpen}
          toggle={this.toggleRoomModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleRoomModal}>
            <IntlMessages id="host.action.add-room" />
          </ModalHeader>
          <ModalBody>
            <RoomForm
              roomInfo={this.props.roomInfo}
              onToggleModal={this.toggleRoomModal}
            />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.picModalOpen}
          toggle={this.togglePicModal}
          size="lg"
        >
          <ModalHeader toggle={this.togglePicModal}>
            <IntlMessages id="room.action.edit-roompic" />
          </ModalHeader>
          <ModalBody>
            <RoomUploadForm
              attachId={this.props.roomInfo.guid}
              onToggleModal={this.togglePicModal}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
export default injectIntl(HostActions);
