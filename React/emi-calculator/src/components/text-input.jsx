import React from "react";
import PropTypes from "prop-types"

function TextInput({ title, state, setState }) {
  return (
    <React.Fragment>
      <span className="title">{title}</span>
      <input
        type="number"
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </React.Fragment>
  );
}

TextInput.propTypes = {
  title: PropTypes.string.isRequired,
  state: PropTypes.number.isRequired,
  setState: PropTypes.func.isRequired
}
export default TextInput;