import React from 'react';
import '../stylesheet/Button.css';

const Button = ({children,onClick}) => {
    return (
      <div className="btn-container">
        <div className="btn-center">
          <button className="cust-btn" onClick={onClick}>
            <svg
              width="180px"
              height="45px"
              viewBox="0 0 180 45"
              className="border"
            >
              <polyline
                points="179,1 179,44 1,44 1,1 179,1"
                className="bg-line"
              />
              <polyline
                points="179,1 179,44 1,44 1,1 179,1"
                className="hl-line"
              />
            </svg>
            <span>{children}</span>
          </button>
        </div>
      </div>
    );
}

export default Button;