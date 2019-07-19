import React, { Component, Fragment } from "react";
import { Colxx, Separator } from "Components/CustomBootstrap";
import IntlMessages from "Util/IntlMessages";
import { NavLink } from "react-router-dom";

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

    this.toggleAuthModal = this.toggleAuthModal.bind(this);
    this.changeView = this.changeView.bind(this);

    this.state = {
      authModalOpen: false,
      view: "login"
    };
  }
  toggleAuthModal() {
    this.setState({
      authModalOpen: !this.state.authModalOpen
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
            onClick={this.toggleAuthModal}
          >
            <IntlMessages id="user.register-login" />
          </a>
        </div>
        <Modal
          isOpen={this.state.authModalOpen}
          toggle={this.toggleAuthModal}
          size="lg"
        >
          <ModalHeader toggle={this.toggleAuthModal} />
          <ModalBody>
            {this.state.view === "login" && (
              <Login
                onChangeView={this.changeView}
                onToggleModal={this.toggleAuthModal}
                {...this.props}
              />
            )}
            {this.state.view === "register" && (
              <Register
                onChangeView={this.changeView}
                onToggleModal={this.toggleAuthModal}
              />
            )}
            {this.state.view === "forgot" && (
              <ForgotPassword
                onChangeView={this.changeView}
                onToggleModal={this.toggleAuthModal}
              />
            )}
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}
