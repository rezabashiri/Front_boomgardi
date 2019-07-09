import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";

import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";
import OwnerForm from "./ownerForm";
import HostForm from "./hostForm";
import UploadForm from "./uploadForm";
import AddressForm from "./addressForm";
import AddRoomWizard from "./add-room";

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
    this.handleGuId = this.handleGuId.bind(this);
    this.toggleOwnerModal = this.toggleOwnerModal.bind(this);
    this.toggleHostModal = this.toggleHostModal.bind(this);
    this.toggleAddressModal = this.toggleAddressModal.bind(this);
    this.togglePicModal = this.togglePicModal.bind(this);
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
      ownerModalOpen: false,
      hostModalOpen: false,
      addressModalOpen: false,
      picModalOpen: false,
      roomModalOpen: false
    };
  }

  toggleOwnerModal() {
    this.setState({
      ownerModalOpen: !this.state.ownerModalOpen
    });
  }
  toggleHostModal() {
    this.setState({
      hostModalOpen: !this.state.hostModalOpen
    });
  }
  toggleAddressModal() {
    this.setState({
      addressModalOpen: !this.state.addressModalOpen
    });
  }
  togglePicModal() {
    this.setState({
      picModalOpen: !this.state.picModalOpen
    });
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
          <DropdownToggle caret color="primary" outline>
            <IntlMessages id="host.action" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.toggleOwnerModal}>
              <IntlMessages id="host.action.edit-owner" />
            </DropdownItem>
            <DropdownItem onClick={this.toggleHostModal}>
              <IntlMessages id="host.action.edit-hostinfo" />
            </DropdownItem>
            <DropdownItem onClick={this.toggleAddressModal}>
              <IntlMessages id="host.action.edit-address" />
            </DropdownItem>
            <DropdownItem onClick={this.togglePicModal}>
              <IntlMessages id="host.action.edit-hostpic" />
            </DropdownItem>
            <DropdownItem onClick={this.toggleRoomModal}>
              <IntlMessages id="host.action.add-room" />
            </DropdownItem>
            <DropdownItem hidden>
              <IntlMessages id="host.action.delete-host" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Modal
          isOpen={this.state.ownerModalOpen}
          toggle={this.toggleOwnerModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleOwnerModal}>
            <IntlMessages id="host.action.edit-owner" />
          </ModalHeader>
          <ModalBody>
            <OwnerForm
              ownerId={this.props.hostInfo.ownerUserId}
              getHost={this.props.getHost}
              onToggleModal={this.toggleOwnerModal}
            />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.hostModalOpen}
          toggle={this.toggleHostModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleHostModal}>
            <IntlMessages id="host.action.edit-hostinfo" />
          </ModalHeader>
          <ModalBody>
            <HostForm
              hostInfo={this.props.hostInfo}
              ownerUserId={this.props.hostInfo.ownerUserId}
              getHost={this.props.getHost}
              onToggleModal={this.toggleHostModal}
            />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.addressModalOpen}
          toggle={this.toggleAddressModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleAddressModal}>
            <IntlMessages id="host.action.edit-address" />
          </ModalHeader>
          <ModalBody>
            <AddressForm
              guid={this.props.hostInfo.guid}
              addressInfo={this.props.hostInfo.address}
              getHost={this.props.getHost}
              onToggleModal={this.toggleAddressModal}
            />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.picModalOpen}
          toggle={this.togglePicModal}
          size="lg"
        >
          <ModalHeader toggle={this.togglePicModal}>
            <IntlMessages id="host.action.edit-hostpic" />
          </ModalHeader>
          <ModalBody>
            <UploadForm
              attachId={this.props.hostInfo.guid}
              getHost={this.props.getHost}
              onToggleModal={this.togglePicModal}
            />
          </ModalBody>
        </Modal>
        <Modal
          isOpen={this.state.roomModalOpen}
          toggle={this.toggleRoomModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleRoomModal}>
            <IntlMessages id="host.action.add-room" />
          </ModalHeader>
          <ModalBody>
            <AddRoomWizard
              roomInfo={{ residenceId: this.props.hostInfo.id }}
              onToggleModal={this.toggleRoomModal}
            />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
export default injectIntl(HostActions);
