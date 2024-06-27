import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Spinner({size}) {
  return (
    <div className="spinner-container">
      <FontAwesomeIcon icon={faSpinner} spin size={size} />
    </div>
  );
}

export default Spinner;
