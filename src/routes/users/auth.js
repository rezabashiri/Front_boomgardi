import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";

import Register from "./register";
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import {
  Row,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.toggleRegisterModal = this.toggleRegisterModal.bind(this);
    this.changeView = this.changeView.bind(this);

    this.state = {
      registerModalOpen: false,
      view: "login"
    };
  }
  toggleRegisterModal() {
    this.setState({
      registerModalOpen: !this.state.registerModalOpen
    });
  }
  changeView(view) {
    this.setState({
      view: view
    });
  }

  render() {
    return (
      <Fragment>
        <div className="position-relative d-none d-none d-lg-inline-block">
          <a
            className="btn btn-outline-primary btn-sm mb-2 mr-3"
            target="_top"
            onClick={this.toggleRegisterModal}
          >
            <IntlMessages id="user.register-login" />
          </a>
        </div>
        <Modal
          isOpen={this.state.registerModalOpen}
          toggle={this.toggleRegisterModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleRegisterModal} />
          <ModalBody>
            {this.state.view === "login" && (
              <Login onChangeView={this.changeView} />
            )}
            {this.state.view === "register" && (
              <Register onChangeView={this.changeView} />
            )}
            {this.state.view === "forgot" && (
              <ForgotPassword onChangeView={this.changeView} />
            )}
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
