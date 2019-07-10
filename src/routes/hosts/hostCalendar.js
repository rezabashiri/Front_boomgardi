import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import HostPriceForm from "./hostPriceForm";
import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
//import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
//import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
//import { toMoment } from "@fullcalendar/moment"; // only for formatting
//import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/fa";

class HostCalendar extends Component {
  constructor(props) {
    super(props);
    this.togglePriceModal = this.togglePriceModal.bind(this);

    this.state = {
      calendarModalOpen: false,
      calendarEvents: [
        {
          title: "روز غیر پیک",
          start: new Date(),
          allDay: true,
          editable: true,
          resourceEditable: true,
          resourceId: "a"
        }
      ]
    };
  }
  calendarRef = React.createRef();
  togglePriceModal() {
    this.setState({
      priceModalOpen: !this.state.priceModalOpen
    });
  }
  handleDateClick = arg => {
    this.setState({
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title: "روز پیک",
        start: arg.date,
        allDay: arg.allDay,
        resourceId: "a",
        editable: true
      })
    });
    /*this.calendarRef.addEvent({
      title: "روز غیر پیک",
      start: new Date(),
      allDay: true,
      editable: true,
      resourceEditable: true
    });*/
  };
  onDataClick = arg => {
    this.setState({
      priceModalOpen: !this.state.priceModalOpen
    });
  };

  render() {
    return (
      <Fragment>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin, interactionPlugin]}
          locale={esLocale}
          timeZone="Asia/Tehran"
          resources={[
            {
              id: "a",
              title: "Room A"
            }
          ]}
          events={this.state.calendarEvents}
          dateClick={this.handleDateClick}
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
}

export default HostCalendar;
