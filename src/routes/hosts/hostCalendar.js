import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import HostPriceForm from "./hostPriceForm";
import IntlMessages from "Util/IntlMessages";
import { Colxx } from "Components/CustomBootstrap";
import {
  Row,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Switch from "rc-switch";
//import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
//import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
//import { toMoment } from "@fullcalendar/moment"; // only for formatting
//import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/fa";

class HostCalendar extends Component {
  calendarRef = React.createRef();
  constructor(props) {
    super(props);
    this.togglePriceModal = this.togglePriceModal.bind(this);

    this.state = {
      calendarModalOpen: false,
      calendarEvents: [],
      eventType: "lastMin",
      lastMinEvent: false,
      picTimeEvent: true
    };
  }

  render() {
    return (
      <Fragment>
        <Row className="mb-4">
          <Colxx xxs="4">
            <label>
              <IntlMessages id="تخفیف لحظه آخر" />
            </label>
            <Switch
              className="custom-switch custom-switch-primary"
              checked={this.state.lastMinEvent}
              onChange={lastMinEvent => {
                this.setState({
                  lastMinEvent: lastMinEvent,
                  picTimeEvent: !this.state.picTimeEvent
                });
              }}
            />
          </Colxx>
          <Colxx xxs="4">
            <label>
              <IntlMessages id="روز پیک" />
            </label>
            <Switch
              className="custom-switch custom-switch-primary"
              checked={this.state.picTimeEvent}
              onChange={picTimeEvent => {
                this.setState({
                  picTimeEvent: picTimeEvent,
                  lastMinEvent: !this.state.lastMinEvent
                });
              }}
            />
          </Colxx>
        </Row>

        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={esLocale}
          timeZone="Asia/Tehran"
          events={this.state.calendarEvents}
          dateClick={this.handleDateClick}
          selectable={true}
          ref={this.calendarRef}
        />
        <Modal
          isOpen={this.state.priceModalOpen}
          toggle={this.togglePriceModal}
          size="lg"
        >
          <ModalHeader toggle={this.togglePriceModal}>
            <IntlMessages id="room.action.price" />
          </ModalHeader>
          <ModalBody>
            <HostPriceForm />
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
  togglePriceModal() {
    this.setState({
      priceModalOpen: !this.state.priceModalOpen
    });
  }
  handlePicTime = (arg, calendarApi) => {
    let todayEvent = calendarApi.getEventById(arg.dateStr + "-picTime");
    if (todayEvent !== null) {
      todayEvent.remove();
    } else {
      calendarApi.addEvent({
        id: arg.dateStr + "-picTime",
        title: "روز پیک",
        start: arg.date,
        allDay: true,
        editable: true,
        resourceEditable: true
      });
    }
  };
  handleLastMin = (arg, calendarApi) => {
    let todayEvent = calendarApi.getEventById(arg.dateStr + "-lastMin");
    if (todayEvent !== null) {
      todayEvent.remove();
    } else {
      calendarApi.addEvent({
        id: arg.dateStr + "-lastMin",
        title: "لحظه آخری",
        start: arg.date,
        allDay: true,
        editable: true,
        resourceEditable: true
      });
    }
  };

  handleDateClick = arg => {
    let calendarApi = this.calendarRef.current.getApi();
    if (this.state.lastMinEvent) {
      this.handleLastMin(arg, calendarApi);
    }
    if (this.state.picTimeEvent) {
      this.handlePicTime(arg, calendarApi);
    }

    //console.log(calendarApi.getEvents());
    //console.log(this.state.eventType);
  };
  onDataClick = arg => {
    this.setState({
      priceModalOpen: !this.state.priceModalOpen
    });
  };
}

export default HostCalendar;
