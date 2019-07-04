import React, { Component, Fragment, lazy, Suspense } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { injectIntl } from "react-intl";
import { Colxx, Separator } from "Components/CustomBootstrap";
//import BreadcrumbContainer from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";

import "rc-switch/assets/index.css";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "react-fine-uploader/gallery/gallery.css";

import RoomForm from "./roomForm";
//import RoomUploadForm from "./roomUploadForm";
const RoomUploadForm = React.lazy(() => import("./roomUploadForm"));

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

const steps = ["ثبت اطلاعات پایه", "آپلود عکس"];

class AddRoomWizard extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleStep = this.handleStep.bind(this);
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
      attachId: null,
      guid: null
    };
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <RoomForm
            onHandleGuId={this.handleGuId}
            roomInfo={this.props.roomInfo}
            onHandleComplete={this.handleComplete}
            onGetRooms={this.props.onGetRooms}
          />
        );
      case 1:
        return (
          <Suspense fallback={<div>کمی صبر کنید</div>}>
            <RoomUploadForm
              attachId={this.state.guid}
              onHandleComplete={this.handleComplete}
            />
          </Suspense>
        );
      default:
        return "مرحله تعریف نشده";
    }
  }

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
                  <IntlMessages id="room.action.all-completed" />
                </Typography>
                <Button onClick={this.handleReset}>
                  <IntlMessages id="room.action.reset" />
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
                    <IntlMessages id="room.action.prev" />
                  </Button>
                  <Button
                    hidden
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    <IntlMessages id="room.action.next" />
                  </Button>
                  {this.state.activeStep !== steps.length &&
                    (this.state.completed[this.state.activeStep] ? (
                      <Typography
                        variant="caption"
                        className={classes.completed}
                      >
                        <IntlMessages id="room.action.completed" />
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
export default injectIntl(AddRoomWizard);
