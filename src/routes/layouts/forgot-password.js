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

class ForgotPasswordLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: ""
    };
  }

  componentDidMount() {
    document.body.classList.add("background");
  }
  componentWillUnmount() {
    document.body.classList.remove("background");
  }
  render() {
    return (
      <Fragment>
        <div className="fixed-background" />
        <main>
          <div className="container">
            <Row className="h-100">
              <Colxx xxs="12" md="10" className="mx-auto my-auto">
                <Card className="auth-card">
                  <div className="position-relative image-side ">
                    <p className="white mb-0">
                      رمز جدید برای شما ارسال خواهد شد
                    </p>
                  </div>
                  <div className="form-side">
                    <NavLink to={`/`} className="white">
                      <span className="logo-single" />
                    </NavLink>
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
                    </AvForm>
                  </div>
                </Card>
              </Colxx>
            </Row>
          </div>
        </main>
      </Fragment>
    );
  }
}

export default ForgotPasswordLayout;
