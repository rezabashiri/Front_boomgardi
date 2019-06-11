import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";
import AddHostWizard from "./addHostWizard";
//import StepperExample from "./hostWizard";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  Button,
  FormText,
  Form,
  CardSubtitle
} from "reactstrap";
import Select from "react-select";
import CustomSelectInput from "Components/CustomSelectInput";
import DatePicker from "react-datepicker";
import moment from "moment";
import TagsInput from "react-tagsinput";

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from "availity-reactstrap-validation";
import "react-tagsinput/react-tagsinput.css";
import "react-datepicker/dist/react-datepicker.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

const selectData = [
  { label: "تهران", value: "tehran", key: 0 },
  { label: "اصفهان", value: "isfahan", key: 1 },
  { label: "شیراز", value: "shiraz", key: 2 }
];

class FormsUi extends Component {
  constructor(props) {
    super(props);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleTagChangeLabelOver = this.handleTagChangeLabelOver.bind(this);
    this.handleChangeDateLabelOver = this.handleChangeDateLabelOver.bind(this);
    this.handleTagChangeLabelTop = this.handleTagChangeLabelTop.bind(this);
    this.handleChangeLabelTop = this.handleChangeLabelTop.bind(this);
    this.handleChangeDateLabelTop = this.handleChangeDateLabelTop.bind(this);

    this.state = {
      selectedOption: "",
      selectedOptionLabelOver: "",
      selectedOptionLabelTop: "",
      startDate: null,
      startDateLabelOver: null,
      startDateLabelTop: null,
      startDateTime: null,
      startDateRange: null,
      endDateRange: null,
      embeddedDate: moment(),
      tags: [],
      tagsLabelOver: [],
      tagsLabelTop: []
    };
  }

  handleTagChange(tags) {
    this.setState({ tags });
  }

  handleTagChangeLabelOver(tagsLabelOver) {
    this.setState({ tagsLabelOver });
  }

  handleTagChangeLabelTop(tagsLabelTop) {
    this.setState({ tagsLabelTop });
  }

  handleChangeLabelOver = selectedOptionLabelOver => {
    this.setState({ selectedOptionLabelOver });
  };

  handleChangeLabelTop = selectedOptionLabelTop => {
    this.setState({ selectedOptionLabelTop });
  };

  handleChangeDateLabelOver(date) {
    this.setState({
      startDateLabelOver: date
    });
  }
  handleChangeDateLabelTop(date) {
    this.setState({
      startDateLabelTop: date
    });
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.add-host" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="menu.add-hostowner" />
                </CardTitle>

                <AvForm className="mb-5 row">
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="firstName">
                        <IntlMessages id="forms.firstname" />
                      </Label>
                      <AvInput
                        className="form-control"
                        name="firstName"
                        id="firstName"
                        required
                      />
                      <AvFeedback>
                        <IntlMessages id="forms.firstname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="lastName">
                        <IntlMessages id="forms.lastname" />
                      </Label>

                      <AvInput name="lastName" id="lastName" required />
                      <AvFeedback>
                        <IntlMessages id="forms.lastname-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="avexampleCity">
                        <IntlMessages id="forms.mobile" />
                      </Label>
                      <AvInput name="rank" id="avexampleMobile" required />
                      <AvFeedback>
                        <IntlMessages id="forms.mobile-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <AvGroup>
                      <Label className="av-label" for="email">
                        <IntlMessages id="forms.email" />
                      </Label>
                      <AvInput name="email" id="email" required />
                      <AvFeedback>
                        <IntlMessages id="forms.email-message" />
                      </AvFeedback>
                    </AvGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Button color="primary">
                        <IntlMessages id="layouts.submit" />
                      </Button>
                    </FormGroup>
                  </Colxx>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mb-4">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <CardTitle>
                  <IntlMessages id="menu.add-hostdata" />
                </CardTitle>
                <AvForm>
                  <AvGroup row>
                    <Colxx sm={6}>
                      <AvGroup>
                        <Label className="av-label" for="hostName">
                          <IntlMessages id="forms.host-name" />
                        </Label>
                        <AvInput name="hostName" id="hostName" required />
                        <AvFeedback>
                          <IntlMessages id="forms.hostname-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={6}>
                      <AvGroup>
                        <Label className="av-label" for="hostCity">
                          <IntlMessages id="forms.city" />
                        </Label>
                        <AvInput
                          type="password"
                          name="hostCity"
                          id="hostCity"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostcity-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <AvGroup>
                        <Label className="av-label" for="hostAddress">
                          <IntlMessages id="forms.address" />
                        </Label>
                        <AvInput
                          type="text"
                          name="exampleAddressGrid"
                          id="hostAddress"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostaddress-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={12}>
                      <AvGroup>
                        <Label className="av-label" for="hostDetail">
                          <IntlMessages id="forms.host-detail" />
                        </Label>
                        <AvInput
                          type="text"
                          name="hostDetail"
                          id="hostDetail"
                          required
                        />
                        <AvFeedback>
                          <IntlMessages id="forms.hostdetail-message" />
                        </AvFeedback>
                      </AvGroup>
                    </Colxx>

                    <Colxx sm={4}>
                      <AvGroup>
                        <Label className="av-label">
                          <IntlMessages id="forms.state" />
                        </Label>
                        <Select options={selectData} />
                      </AvGroup>
                    </Colxx>
                    <Colxx sm={8}>
                      <FormGroup>
                        <Label for="hostTags" className="av-label">
                          <IntlMessages id="forms.tags" />
                        </Label>
                        <TagsInput
                          value={this.state.tagsLabelOver}
                          onChange={this.handleTagChangeLabelOver}
                          inputProps={{ placeholder: messages["forms.tags"] }}
                        />
                      </FormGroup>
                    </Colxx>
                  </AvGroup>

                  <Button color="primary">
                    <IntlMessages id="layouts.submit" />
                  </Button>
                </AvForm>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <AddHostWizard />
      </Fragment>
    );
  }
}
export default injectIntl(FormsUi);
