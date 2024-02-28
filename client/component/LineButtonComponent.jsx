import React from 'react';

const LineButtonComponent = ({ line, currTrainGroup }) => {
  return (
    <>
      <button className={'mta-line-btn'} id={'group-' + currTrainGroup}>
        {line}
      </button>
    </>
  );
};

export default LineButtonComponent;
