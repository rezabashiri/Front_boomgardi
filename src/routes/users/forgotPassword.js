import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardTitle, Form, Label, Input, Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import { Colxx } from "Components/CustomBootstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvField
} from "availity-reactstrap-validation";
import { mobileValidation } from "../../constants/validations";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: ""
    };
  }

  render() {
    return (
      <Fragment>
        <Row className="h-100">
          <Colxx xxs="12" md="10" className="mx-auto my-auto">
            <div className="form-side">
              <CardTitle className="mb-4">
                <IntlMessages id="user.forgot-password" />
              </CardTitle>
              <AvForm>
                <Label className="form-group has-float-label mb-4">
                  <AvField
                    name="userName"
                    id="userName"
                    validate={mobileValidation}
                  />
                  <IntlMessages id="forms.mobile" />
                </Label>

                <div className="d-flex justify-content-end align-items-center">
                  <Button
                    href="/app"
                    color="primary"
                    className="btn-shadow"
                    size="lg"
                  >
                    <IntlMessages id="user.reset-password-button" />
                  </Button>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <a onClick={() => this.props.onChangeView("login")}>
                    {" "}
                    <IntlMessages id="user.login-title" />
                  </a>
                </div>
              </AvForm>
            </div>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default ForgotPassword;
