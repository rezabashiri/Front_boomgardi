import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import {
  Row /*,
  Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  UncontrolledDropdown,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  CardBody,
  CardSubtitle,
  CardImg,
  Label,
  CardText,
  Badge,
  Table,
  Col*/
} from "reactstrap";
import "../../assets/css/material.css";
import MaterialTable from "material-table";

import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import { BreadcrumbItems } from "Components/BreadcrumbContainer";
import mouseTrap from "react-mousetrap";

import userService from "../../services/userService.jsx";

class DataListLayout extends Component {
  constructor(props) {
    super(props);
    this.getUsersList = this.getUsersList.bind(this);

    this.state = {
      isLoading: false,
      items: []
    };
  }

  async componentDidMount() {
    this.getUsersList();
  }

  async getUsersList() {
    let srv = new userService();
    let users = await srv.getUsers();

    this.setState({
      items: users,
      isLoading: true
    });
  }

  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
        <div className="disable-text-selection">
          <Row>
            <Colxx xxs="12">
              <div className="mb-2">
                <h1>
                  <IntlMessages id="menu.user-list" />
                </h1>
                <BreadcrumbItems match={this.props.match} />
              </div>
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <MaterialTable
            title=" "
            columns={[
              { title: "نام کاربری", field: "userName" },
              { title: "موبایل", field: "systemProfile" },
              { title: "ایمیل", field: "eMail" },
              { title: "نقش کاربری", field: "roles" }
            ]}
            data={this.state.items}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...this.state.items];
                    data.push(newData);
                    this.setState({ items: data });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...this.state.items];
                    data[data.indexOf(oldData)] = newData;
                    this.setState({ items: data });
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    const data = [...this.state.items];
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({ items: data });
                  }, 600);
                })
            }}
            options={{
              sorting: true,
              filtering: true
            }}
          />
        </div>
      </Fragment>
    );
  }
}
export default injectIntl(mouseTrap(DataListLayout));
