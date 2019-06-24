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
    this.toggleOwnerModal = this.toggleOwnerModal.bind(this);
    this.toggleHostModal = this.toggleHostModal.bind(this);
    this.toggleAddressModal = this.toggleAddressModal.bind(this);
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
      ownerModalOpen: false,
      hostModalOpen: false,
      addressModalOpen: false,
      picModalOpen: false
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

  handleOwnerUserId = userId => {
    this.setState({ ownerUserId: userId });
    console.log(this.state.ownerUserId);
  };

  handleGuId = guid => {
    this.setState({ guid: guid });
    console.log(this.state.guid);
  };

  render() {
    console.log(this.props.hostInfo);
    return (
      <Fragment>
        <UncontrolledDropdown>
          <DropdownToggle caret color="secondary" outline>
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
            <OwnerForm ownerId={this.props.hostInfo.ownerUserId} />
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
            <UploadForm />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
export default injectIntl(HostActions);
