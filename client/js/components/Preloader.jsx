import React from 'react';

const Preloader = () => (
  <div>
    <svg className="circular" height="50" width="50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="2"
        strokeMiterlimit="10"
      />
    </svg>
  </div>
);

export default Preloader;
