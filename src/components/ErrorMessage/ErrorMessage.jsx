import React from 'react';
import PropTypes from 'prop-types';
export default function ErrorMessage({ message }) {
  return (
    <div role="alert">
      <h2>{message}</h2>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
