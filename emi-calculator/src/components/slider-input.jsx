import React from "react";
import { numberWithCommas } from "../utils/config";
import PropTypes from 'prop-types';

function SliderInput({
  title,
  state,
  min,
  max,
  onChange,
  labelMin,
  labelMax,
  underlineTitle
}) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      {state > 0 && (
        <span className="title" style={{ textDecoration: "underline" }}>
          {underlineTitle}
        </span>
      )}
      <div>
        <input
          type="range"
          min={min}
          max={max}
          className="slider"
          value={state}
          onChange={onChange}
        />
        <div className="lables">
          <label>{labelMin ?? numberWithCommas(min)}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </React.Fragment>
  );
}

SliderInput.propTypes = {
  title: PropTypes.string.isRequired,
  state: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  labelMin: PropTypes.string,
  labelMax: PropTypes.string,
  underlineTitle: PropTypes.string
};

export default SliderInput;