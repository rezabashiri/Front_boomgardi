import React, { Component, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
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
  Button /*,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  CustomInput,
  FormText,
  Form,
  CardSubtitle*/
} from "reactstrap";

import "react-tagsinput/react-tagsinput.css";
import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

const steps = [
  " ثبت اطلاعات مالک ",
  "ثبت اطلاعات اقامتگاه ",
  "ثبت آدرس اقامتگاه",
  "آپلود عکس و مدارک"
];

class FormsUi extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleOwnerUserId = this.handleOwnerUserId.bind(this);
    //this.handleAttachId = this.handleAttachId.bind(this);
    this.handleGuId = this.handleGuId.bind(this);

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
      tags: [],
      tagsLabelOver: [],
      tagsLabelTop: [],
      activeStep: 0,
      completed: {},
      ownerUserId: null,
      attachId: null,
      guid: null
    };
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <OwnerForm
            onHandleOwnerUserId={this.handleOwnerUserId}
            onHandleComplete={this.handleComplete}
          />
        );
      case 1:
        return (
          <HostForm
            ownerUserId={this.state.ownerUserId}
            onHandleGuId={this.handleGuId}
            hostInfo={{}}
            onHandleComplete={this.handleComplete}
            //guid={this.state.guid}
          />
        );
      case 2:
        return (
          <AddressForm
            guid={this.state.guid}
            addressInfo={{ lat: 32.65246, lng: 51.67462 }}
            onHandleComplete={this.handleComplete}
          />
        );
      case 3:
        return (
          <UploadForm
            attachId={this.state.guid}
            onHandleComplete={this.handleComplete}
          />
        );
      default:
        return "مرحله تعریف نشده";
    }
  }

  handleOwnerUserId = userId => {
    this.setState({ ownerUserId: userId });
  };
  /*
  handleAttachId = attachId => {
    this.setState({ attachId: attachId });
    console.log(this.state.attachId);
  };*/
  handleGuId = guid => {
    this.setState({ guid: guid });
  };

  totalSteps() {
    return steps.length;
  }

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  handleNext() {
    const newActiveStep =
      this.isLastStep() && !this.allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in this.state.completed))
        : this.state.activeStep + 1;
    this.setState({ activeStep: newActiveStep });
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  handleStep = step => () => {
    this.setState({ activeStep: step });
  };

  handleComplete() {
    const newCompleted = this.state.completed;
    newCompleted[this.state.activeStep] = true;
    this.setState({ completed: newCompleted });
    this.handleNext();
  }

  handleReset() {
    this.setState({ activeStep: 0 });
    this.setState({ completed: {} });
  }

  render() {
    const classes = makeStyles(theme => ({
      root: {
        width: "90%"
      },
      button: {
        marginRight: theme.spacing(1)
      },
      completed: {
        display: "inline-block"
      },
      stepper: {
        iconColor: "green"
      },
      instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
      }
    }));
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
        <div className={classes.root}>
          <Stepper className={classes} activeStep={this.state.activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.allStepsCompleted() ? (
              <div>
                <Typography className={classes.instructions}>
                  <IntlMessages id="host.action.all-completed" />
                </Typography>
                <Button onClick={this.handleReset}>
                  <IntlMessages id="host.action.reset" />
                </Button>
              </div>
            ) : (
              <div>
                {this.getStepContent(this.state.activeStep)}
                <div>
                  <Button
                    hidden
                    disabled={this.state.activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    <IntlMessages id="host.action.prev" />
                  </Button>
                  <Button
                    hidden
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    <IntlMessages id="host.action.next" />
                  </Button>
                  {this.state.activeStep !== steps.length &&
                    (this.state.completed[this.state.activeStep] ? (
                      <Typography
                        variant="caption"
                        className={classes.completed}
                      >
                        <IntlMessages id="host.action.completed" />
                      </Typography>
                    ) : (
                      <Button
                        hidden
                        variant="contained"
                        color="primary"
                        onClick={this.handleComplete}
                      >
                        {this.completedSteps() === this.totalSteps() - 1
                          ? "اتمام"
                          : "تکمیل مرحله"}
                      </Button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default injectIntl(FormsUi);
