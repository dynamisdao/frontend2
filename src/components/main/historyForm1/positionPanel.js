import React, { PropTypes } from 'react';

const PositionPanelComponent = (props) => {
  return (
    <div className="position position-secondary">
      <div className="position-head">
        <h4>{props.position.jobTitile}</h4>
        <p>
          <span>{props.position.companyName}</span> <span>{props.position.city}, {props.position.state}</span>
        </p>
        <span>July 20, 2015 – Present</span>
        <strong>9.75 months</strong>
        <a href="" className="link">edit</a>
      </div>
      <div className="position-body">
        <p>Reference</p>
        <p>
          <span>{props.position.confirmerName}</span> <span>{props.position.confirmerEmail}</span>
        </p>
        <a href="" className="link">
          <i className="material-icons">attach_file</i>
          paystub7-24-16.pdf
        </a>
      </div>
    </div>
  );
};

PositionPanelComponent.propTypes = {
  position: PropTypes.object.isRequired
};

export default PositionPanelComponent;
