import React, { Component, Fragment } from "react";
import {  Row,  Card,  CardBody,  CardTitle} from "reactstrap";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import IntlMessages from "Util/IntlMessages";
import {PopoverItem,TooltipItem } from "Components/PopoverTooltip";


class PopoverTooltipUi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popovers: [
        {
          placement: "top",
          text: "تولتیپ در بالا",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        },
        {
          placement: "bottom",
          text: "تولتیپ در پایین",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        },
        {
          placement: "left",
          text: "تولتیپ در چپ",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        },
        {
          placement: "right",
          text: "تولتیپ در راست",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        }
      ],

      tooltips: [
        {
          placement: "top",
          text: "تولتیپ در بالا",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        },
        {
          placement: "bottom",
          text: "تولتیپ در پایین",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        },
        {
          placement: "left",
          text: "تولتیپ در چپ",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        },
        {
          placement: "right",
          text: "تولتیپ در راست",
          body: "توضیحات در تولتیپ که در اینجا قرار می گیرد"
        }
      ]
    };
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.popover-tooltip" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="popover-tooltip.popover" />
                </CardTitle>

                {this.state.popovers.map((popover, i) => {
                  return <PopoverItem key={i} item={popover} id={i} />;
                })}
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <CardTitle>
                  <IntlMessages id="popover-tooltip.tooltip" />
                </CardTitle>

                {this.state.tooltips.map((tooltip, i) => {
                  return <TooltipItem key={i} item={tooltip} id={i} />;
                })}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default PopoverTooltipUi;
