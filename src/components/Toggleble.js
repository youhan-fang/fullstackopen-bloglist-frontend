import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Toggleble = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const visibleStyle = { display: visible ? null : 'none' };
  const hiddenStyle = { display: visible ? 'none' : null };

  console.log('toggleble visiblity: ', visible);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div>
      <div style={hiddenStyle}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={visibleStyle}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

Toggleble.displayName = 'Toggleble';

Toggleble.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Toggleble;
