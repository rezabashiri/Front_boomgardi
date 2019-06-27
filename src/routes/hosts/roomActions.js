import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";

import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";
import RoomForm from "./roomForm";

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
      roomModalOpen: false
    };
  }

  toggleRoomModal() {
    this.setState({
      roomModalOpen: !this.state.roomModalOpen
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
            <IntlMessages id="host.action" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.toggleRoomModal}>
              <IntlMessages id="host.action.add-room" />
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
              roomInfo={{
                roomName: "اتاق 1",
                roomCapacity: 4,
                hostId: this.props.hostInfo.id
              }}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
export default injectIntl(HostActions);
