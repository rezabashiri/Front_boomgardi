import React, { Fragment } from "react";
import Slider, { Range } from "rc-slider";

const sliderHandle = props => {
  const { value, dragging, index, offset, ...restProps } = props;
  const positionStyle = {
    position: "absolute",
    left: `${offset}%`
  };
  return (
    <Fragment key={index}>
      <div hidden className="rc-slider-tooltip" style={positionStyle}>
        {value + " تومان"}
      </div>
      <Slider.Handle value={value} offset={offset} {...restProps} />
    </Fragment>
  );
};
const sliderHandleCapacity = props => {
  const { value, dragging, index, offset, ...restProps } = props;
  const positionStyle = {
    position: "absolute",
    left: `${offset}%`
  };
  return (
    <Fragment key={index}>
      <div hidden className="rc-slider-tooltip" style={positionStyle}>
        {value + " نفر"}
      </div>
      <Slider.Handle value={value} offset={offset} {...restProps} />
    </Fragment>
  );
};

export class SliderTooltip extends React.Component {
  render() {
    return (
      <Slider handle={this.props.handle || sliderHandle} {...this.props} />
    );
  }
}

export class RangeTooltip extends React.Component {
  render() {
    return <Range handle={this.props.handle || sliderHandle} {...this.props} />;
  }
}
export class RangeTooltipCapacity extends React.Component {
  render() {
    return (
      <Range
        handle={this.props.handle || sliderHandleCapacity}
        {...this.props}
      />
    );
  }
}
