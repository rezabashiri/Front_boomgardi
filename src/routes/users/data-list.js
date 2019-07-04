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

 
import mouseTrap from "react-mousetrap";

import userService from "../../services/userService.jsx";
import registerService from "../../services/registerService.jsx";
import registerModel from "../../models/registerModel.jsx";
let regService; 
class DataListLayout extends Component {
  constructor(props) {
    super(props);
    this.getUsersList = this.getUsersList.bind(this);
    regService=new registerService();

    this.state = {
      isLoading: false,
      items: []
    };
  }

  async componentDidMount() {
    await this.getRoleList();
    await this.getUsersList();
  }

  async getUsersList() {
    try
    {
    let srv = new userService();
    let users = await srv.getUsers();

    this.setState({
        items: users,
        isLoading: true
    });
    }
    catch(e)
  {

  } 
  }
async getRoleList() {

   
  var result = await regService.getListRoles();
  if (result.status === 200) {

      let roles = {};

      roles = result.data.map((value, key) =>   value.name );

      console.log("crated role")
      console.log(roles)

      const headerStyle = { fontFamily: 'iransans', fontSize: 14, textAlign: 'center' };
      const rowStyle = { fontFamily: 'iransans', fontSize: 14, textAlign: 'center' };

      this.setState({
          columns:
              [
                  {
                      title: "ID", field: "id", headerStyle: headerStyle,
                      render: rowData => <span style={rowStyle}> {rowData.id}</span>,
                  },
                  {
                      title: "نام کاربری (موبایل)",
                      field: "userName",
                      headerStyle: headerStyle,
                      render: rowData => <span style={rowStyle}> {rowData.userName}</span>,
                  },
                  {
                      title: "نام", field: "firstName", headerStyle: headerStyle,
                      render: rowData => <span style={rowStyle}> {rowData.firstName}</span>,
                  },
                  {
                      title: "نام خانوادگی", field: "lastName", headerStyle: headerStyle,
                      render: rowData => <span style={rowStyle}> {rowData.lastName}</span>,
                  },
                  {
                      title: "کد ملی", field: "nationalCode", headerStyle: headerStyle,
                      render: rowData => <span style={rowStyle}> {rowData.nationalCode}</span>,
                  },
                  {
                      title: "ایمیل", field: "eMail", headerStyle: headerStyle,
                      render: rowData => <span style={rowStyle}> {rowData.eMail}</span>,
                  },

                  

                  {
                      title: 'نقش', field: 'roles',
                      headerStyle: { fontFamily: 'iransans', fontSize: 14 },
                      render: rowData => <span style={rowStyle}> {rowData.roles[0].name}</span>,
                      lookup: roles    // { 1: 'İstanbul', 6: 'Şanlıurfa' },
                  },

              ],

          isLoading: true

      })

  }

}
async handleSave(newData) {

 

  let model = new registerModel();


  Object.keys(newData).forEach((value, key) => {
      if (value !== 'roles')
          (model[value] = newData[value])
      else {
       
          newData.roles.forEach((value, key) => model.roles=value.name)
      }
            
  });
 
  var res =  await regService.registerUser(model);
   if (res.status === 201)
   {
    await this.getUsersList();

   }
}
  render() {
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
      <Fragment>
      <div className="disable-text-selection">

          <MaterialTable
              title=" "
              columns={this.state.columns}
              data={this.state.items}
              options={{
                  rowStyle: {
                      backgroundColor: '#fafafa',
                  },
                  filtering: true,
                  sorting: true
              }}
              editable={{

                  onRowAdd: newData =>
                      this.handleSave(newData)
                  ,
                  onRowUpdate: (newData, oldData) =>
                      this.handleSave(newData)
                  // ,

                  // onRowDelete: oldData =>
                  //   this.handleDelete(oldData)

              }}
          />
      </div>
  </Fragment>



  );
  }
}
export default injectIntl(mouseTrap(DataListLayout));
